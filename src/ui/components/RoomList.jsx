import React from "react";

export default function RoomList({ rooms, onJoin, onStartRoom, query }) {
  return (
    <section className="room-list">
      <div className="room-list__header">
        <h2>Study rooms</h2>
        <button onClick={onStartRoom}>
          Start a focus room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="room-list__empty">
          <p>No rooms found{query ? ` for "${query}"` : ""}.</p>
          {query && (
            <button onClick={onStartRoom}>
              Start one
            </button>
          )}
        </div>
      ) : (
        <div className="room-list__items">
          {rooms.map((room) => {
            const isFull = room.members.length >= room.capacity;

            return (
              <article className="room-card" key={room.id}>
                <div>
                  <h3>{room.subject}</h3>
                  <p>
                    {room.type === "focus" ? "Focus room" : "Group discussion"}
                  </p>
                  <span>
                    {room.members.length}/{room.capacity} students
                  </span>
                </div>

                <button
                  onClick={() => onJoin(room)}
                  disabled={isFull}
                >
                  {isFull ? "Full" : "Join"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}