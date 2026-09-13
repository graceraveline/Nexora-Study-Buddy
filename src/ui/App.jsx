import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FinderRail from "./components/FinderRail.jsx";
import RoomList from "./components/RoomList.jsx";
import RoomView from "./components/RoomView.jsx";
import CreateRoomForm from "./components/CreateRoomForm.jsx";
import { initialRooms } from "../data/mockRooms.js";
import { filterRoomsBySubject } from "../core/matching.js";
import {
  joinRoom,
  leaveRoom,
  createRoom,
  deleteRoom,
} from "../core/rooms.js";
import { supabase } from "../lib/supabase.js";

const MAX_RECENT_SUBJECTS = 5;
const EMPTY_ROOM_TIMEOUT = 5 * 60 * 1000;

export default function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("study-buddy-user") || ""
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("study-buddy-user"))
  );

  const [rooms, setRooms] = useState(initialRooms);
  const [query, setQuery] = useState("");
  const [recentSubjects, setRecentSubjects] = useState(["COMP304E"]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("study-buddy-theme") === "dark";
  });

  const visibleRooms = useMemo(
    () => filterRoomsBySubject(rooms, query),
    [rooms, query]
  );

  const activeRoom =
    rooms.find((room) => room.id === activeRoomId) || null;

  useEffect(() => {
    async function loadRooms() {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("id");

      if (error) {
        console.error("Failed to load rooms:", error);
        return;
      }

      setRooms(
        data.map((room) => ({
          ...room,
          studyConnection: room.study_connection,
          emptySince: room.empty_since,
        }))
      );
    }

    loadRooms();

    const channel = supabase
      .channel("rooms-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
        },
        () => {
          loadRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function handleToggleTheme() {
    setDarkMode((prev) => {
      const next = !prev;

      localStorage.setItem(
        "study-buddy-theme",
        next ? "dark" : "light"
      );

      return next;
    });
  }

  function handleLogin() {
    const name = currentUser.trim();

    if (!name) {
      return;
    }

    localStorage.setItem("study-buddy-user", name);
    setCurrentUser(name);
    setIsLoggedIn(true);
  }

function handleEditProfile() {
  const newName = window.prompt("Enter your new name:", currentUser);

  if (!newName || !newName.trim()) {
    return;
  }

  const trimmedName = newName.trim();

  localStorage.setItem("study-buddy-user", trimmedName);
  setCurrentUser(trimmedName);
}

function handleLogout() {
  localStorage.removeItem("study-buddy-user");
  setCurrentUser("");
  setIsLoggedIn(false);
  setActiveRoomId(null);
}


  async function handleJoin(room) {
    const { data, error: fetchError } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", room.id)
      .single();

    if (fetchError) {
      console.error("Failed to get latest room:", fetchError);
      return;
    }

    const latestRoom = {
      ...data,
      studyConnection: data.study_connection,
      emptySince: data.empty_since,
    };

    const updatedRoom = joinRoom(latestRoom, currentUser);

    if (updatedRoom === latestRoom) {
      return;
    }

    const { error } = await supabase
      .from("rooms")
      .update({
        members: updatedRoom.members,
        empty_since: updatedRoom.emptySince,
      })
      .eq("id", room.id);

    if (error) {
      console.error("Failed to join room:", error);
      return;
    }

    setRooms((prev) =>
      prev.map((item) =>
        item.id === room.id ? updatedRoom : item
      )
    );

    setActiveRoomId(room.id);

    if (!recentSubjects.includes(room.subject)) {
      setRecentSubjects((prev) =>
        [room.subject, ...prev].slice(0, MAX_RECENT_SUBJECTS)
      );
    }
  }

  async function handleLeave() {
    if (!activeRoom) return;

    const updatedRoom = leaveRoom(activeRoom, currentUser);

    const { error } = await supabase
      .from("rooms")
      .update({
        members: updatedRoom.members,
        empty_since: updatedRoom.emptySince,
      })
      .eq("id", activeRoom.id);

    if (error) {
      console.error("Failed to leave room:", error);
      return;
    }

    setRooms((prev) =>
      prev.map((item) =>
        item.id === activeRoom.id ? updatedRoom : item
      )
    );

    setActiveRoomId(null);
  }

  async function handleDeleteRoom() {
    if (!activeRoom || activeRoom.host !== currentUser) {
      return;
    }

    const { error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", activeRoom.id);

    if (error) {
      console.error("Failed to delete room:", error);
      return;
    }

    setRooms((prev) =>
      deleteRoom(prev, activeRoom.id)
    );

    setActiveRoomId(null);
  }

  function handleStartRoom() {
    if (!query.trim()) {
      alert("Please enter a subject first.");
      return;
    }

    setIsCreatingRoom(true);
  }

  async function handleCreateRoom(roomDetails) {
    const room = createRoom({
      id: `room-${Date.now()}`,
      subject: query.trim().toUpperCase(),
      hostId: currentUser,
      type: roomDetails.type,
      title: roomDetails.title,
      description: roomDetails.description,
      studyConnection: roomDetails.studyConnection,
    });

    const { error } = await supabase
      .from("rooms")
      .insert({
        id: room.id,
        subject: room.subject,
        title: room.title,
        description: room.description,
        host: room.host,
        type: room.type,
        capacity: room.capacity,
        members: room.members,
        study_connection: room.studyConnection,
        messages: [],
        empty_since: null,
      });

    if (error) {
      console.error("Failed to create room:", error);
      return;
    }

    setRooms((prev) => [...prev, room]);
    setIsCreatingRoom(false);
    setActiveRoomId(room.id);

    if (!recentSubjects.includes(room.subject)) {
      setRecentSubjects((prev) =>
        [room.subject, ...prev].slice(0, MAX_RECENT_SUBJECTS)
      );
    }
  }

  if (!isLoggedIn) {
    return (
      <div className={`app login-screen ${darkMode ? "app--dark" : ""}`}>
        <button
          type="button"
          className="login-theme-toggle"
          onClick={handleToggleTheme}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="login-card">
          <h1>Study Buddy 📚</h1>

          <p>Enter your name to get started.</p>

          <input
            type="text"
            placeholder="Your name"
            autoComplete="off"
            value={currentUser}
            onChange={(event) =>
              setCurrentUser(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button
            type="button"
            onClick={handleLogin}
            disabled={!currentUser.trim()}
          >
            Let's Study!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? "app--dark" : ""}`}>
      <Header
        currentUser={currentUser}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout} 
      />

      {activeRoom ? (
        <RoomView
          room={activeRoom}
          currentUser={currentUser}
          onLeave={handleLeave}
          onDelete={handleDeleteRoom}
        />
      ) : isCreatingRoom ? (
        <CreateRoomForm
          subject={query}
          onCreate={handleCreateRoom}
          onCancel={() => setIsCreatingRoom(false)}
        />
      ) : (
        <>
          <div className="hero">
            <h1>Find your study buddy tonight! 📚</h1>

            <p>
              Looking for someone to study with?
              Join an existing room or create your own — focused pair or full group, your call!
            </p>
          </div>

          <div className="app__body">
            <FinderRail
              query={query}
              setQuery={setQuery}
              recentSubjects={recentSubjects}
              onPickRecent={setQuery}
            />

            <main className="app__main">
              <RoomList
                rooms={visibleRooms}
                onJoin={handleJoin}
                onStartRoom={handleStartRoom}
                query={query}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
}