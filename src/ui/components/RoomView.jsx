import React from "react";

export default function RoomView({ room, currentUser, onLeave }) {
  const isHost = room.host === currentUser;

  return (
    <section className="room-view">
      <div className="room-view__header">
        <div>
          <p>{room.type === "focus" ? "Focus room" : "Group discussion"}</p>
          <h1>{room.subject}</h1>
        </div>

        <button onClick={onLeave}>Leave room</button>
      </div>

      <div className="room-view__card">
        <h2>Students in this room</h2>

        <ul>
          {room.members.map((member) => (
            <li key={member}>
              {member}
              {member === room.host ? " · host" : ""}
              {member === currentUser ? " · you" : ""}
            </li>
          ))}
        </ul>

        <p>
          {room.members.length}/{room.capacity} seats occupied
        </p>

        {isHost && <p>You started this room.</p>}
      </div>
    </section>
  );
}