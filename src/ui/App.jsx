import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FinderRail from "./components/FinderRail.jsx";
import RoomList from "./components/RoomList.jsx";
import RoomView from "./components/RoomView.jsx";
import { initialRooms } from "../data/mockRooms.js";
import { filterRoomsBySubject } from "../core/matching.js";
import { joinRoom, leaveRoom, createRoom } from "../core/rooms.js";

const CURRENT_USER = "undral"; // stand-in until auth exists — see docs/decisions.md

export default function App() {
  const [rooms, setRooms] = useState(initialRooms);
  const [year, setYear] = useState("Year 2");
  const [query, setQuery] = useState("");
  const [recentSubjects, setRecentSubjects] = useState(["COMP304E"]);
  const [activeRoomId, setActiveRoomId] = useState(null);

  const visibleRooms = useMemo(
    () => filterRoomsBySubject(rooms, query),
    [rooms, query]
  );

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || null;

  function handleJoin(room) {
    setRooms((prev) => prev.map((r) => (r.id === room.id ? joinRoom(r, CURRENT_USER) : r)));
    setActiveRoomId(room.id);
    if (!recentSubjects.includes(room.subject)) {
      setRecentSubjects((prev) => [room.subject, ...prev].slice(0, 5));
    }
  }

  function handleLeave() {
    if (!activeRoom) return;
    setRooms((prev) =>
      prev.map((r) => (r.id === activeRoom.id ? leaveRoom(r, CURRENT_USER) : r))
    );
    setActiveRoomId(null);
  }

  function handleStartRoom(type = "focus") {
    if (!query.trim()) {
      alert("Please enter a subject first.");
      return;
    }
    const room = createRoom({
      id: `room-${Date.now()}`,
      subject: query.trim().toUpperCase(),
      hostId: CURRENT_USER,
      type,
    });
    setRooms((prev) => [...prev, room]);
    setActiveRoomId(room.id);
  }

  return (
    <div className="app">
      <Header currentUser={CURRENT_USER} />

      {activeRoom ? (
        <RoomView room={activeRoom} currentUser={CURRENT_USER} onLeave={handleLeave} />
      ) : (
        <>
          <div className="hero">
            <h1>Find your study buddy tonight.</h1>
            <p>
              Search a course code, see who's already in a room for it, and
              join — a focused pair or a full group discussion, your call.
            </p>
          </div>
          <div className="app__body">
            <FinderRail
              year={year}
              setYear={setYear}
              query={query}
              setQuery={setQuery}
              recentSubjects={recentSubjects}
              onPickRecent={setQuery}
            />
            <main className="app__main">
              <RoomList
                rooms={visibleRooms}
                onJoin={handleJoin}
                onStartRoom={() => handleStartRoom("focus")}
                query={query}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
}