import React from "react";

export default function RoomList({
  rooms,
  onJoin,
  onStartRoom,
  query,
}) {
  return (
    <section className="room-list">
      <div className="room-list__header">
        <div>
          <p className="room-list__eyebrow">Available now</p>
          <h2>Study rooms</h2>
        </div>

        <button type="button" onClick={onStartRoom}>
          Start a focus room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="room-list__empty">
          <p>
            No rooms found{query ? ` for "${query}"` : ""}.
          </p>

          {query && (
            <button type="button" onClick={onStartRoom}>
              Start one
            </button>
          )}
        </div>
      ) : (
        <div className="room-list__items">
          {rooms.map((room) => {
            const isFull =
              room.members.length >= room.capacity;

            return (
              <article
                className="room-card"
                key={room.id}
              >
                <div className="room-card__content">
                  <div className="room-card__top">
                    <h3>{room.subject}</h3>

                    <span className="room-card__type">
                      {room.type === "focus"
                        ? "Focus"
                        : "Discussion"}
                    </span>
                  </div>

                  <h4 className="room-card__title">
                    {room.title}
                  </h4>

                  <p className="room-card__description">
                    {room.description}
                  </p>

                  <p className="room-card__host">
                    Hosted by {room.host}
                  </p>

                  <span className="room-card__members">
                    {room.members.length}/{room.capacity} students
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onJoin(room)}
                  disabled={isFull}
                >
                  {isFull ? "Full" : "Join room"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}