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

const MAX_RECENT_SUBJECTS = 5;
const EMPTY_ROOM_TIMEOUT = 5 * 60 * 1000;

export default function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    const interval = setInterval(() => {
      setRooms((prev) =>
        prev.filter((room) => {
          if (room.members.length > 0) {
            return true;
          }

          if (!room.emptySince) {
            return true;
          }

          return Date.now() - room.emptySince < EMPTY_ROOM_TIMEOUT;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
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

    setCurrentUser(name);
    setIsLoggedIn(true);
  }

  function handleJoin(room) {
    setRooms((prev) =>
      prev.map((item) =>
        item.id === room.id
          ? joinRoom(item, currentUser)
          : item
      )
    );

    setActiveRoomId(room.id);

    if (!recentSubjects.includes(room.subject)) {
      setRecentSubjects((prev) =>
        [room.subject, ...prev].slice(0, MAX_RECENT_SUBJECTS)
      );
    }
  }

  function handleLeave() {
    if (!activeRoom) return;

    setRooms((prev) =>
      prev.map((item) =>
        item.id === activeRoom.id
          ? leaveRoom(item, currentUser)
          : item
      )
    );

    setActiveRoomId(null);
  }

  function handleDeleteRoom() {
    if (!activeRoom || activeRoom.host !== currentUser) {
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

  function handleCreateRoom(roomDetails) {
    const room = createRoom({
      id: `room-${Date.now()}`,
      subject: query.trim().toUpperCase(),
      hostId: currentUser,
      type: roomDetails.type,
      title: roomDetails.title,
      description: roomDetails.description,
      studyConnection: roomDetails.studyConnection,
    });

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