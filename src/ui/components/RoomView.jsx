import React, { useEffect, useRef, useState } from "react";

const PLATFORM_NAMES = {
  discord: "Discord",
  zoom: "Zoom",
  "google-meet": "Google Meet",
};

export default function RoomView({
  room,
  currentUser,
  onLeave,
  onDelete,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(room.messages || []);

  const chatRef = useRef(null);

  const isHost = room.host === currentUser;
  const connection = room.studyConnection;

  useEffect(() => {
    setMessages(room.messages || []);
  }, [room.id, room.messages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSendMessage(event) {
    event.preventDefault();

    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `${room.id}-message-${Date.now()}`,
        sender: currentUser,
        text: message.trim(),
      },
    ]);

    setMessage("");
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this study room?"
    );

    if (confirmed) {
      onDelete();
    }
  }

  return (
    <section className="room-view">
      <div className="room-view__header">
        <div>
          <p>
            {room.type === "focus"
              ? "Focus room"
              : "Discussion room"}
          </p>

          <h1>{room.title}</h1>

          <p>{room.description}</p>
        </div>

        <div className="room-view__actions">
          <button type="button" onClick={onLeave}>
            Leave room
          </button>

          {isHost && (
            <button type="button" onClick={handleDelete}>
              Delete room
            </button>
          )}
        </div>
      </div>

      <div className="room-view__card">
        <h2>Chat</h2>

        <div className="room-chat" ref={chatRef}>
          {messages.length === 0 ? (
            <p className="room-chat__empty">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((item, index) => {
              const previousMessage = messages[index - 1];

              const showSender =
                !previousMessage ||
                previousMessage.sender !== item.sender;

              return (
                <div
                  className="room-chat__message"
                  key={item.id}
                >
                  {showSender && <strong>{item.sender}</strong>}

                  <p>{item.text}</p>
                </div>
              );
            })
          )}
        </div>

        <form
          className="room-chat__form"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
          />

          <button type="submit">Send</button>
        </form>
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

      {connection && (
        <div className="room-view__card">
          <h2>Study together</h2>

          <p>
            Continue your study session through{" "}
            <strong>
              {PLATFORM_NAMES[connection.platform]}
            </strong>.
          </p>

          <a
            href={connection.value}
            target="_blank"
            rel="noreferrer"
          >
            Open {PLATFORM_NAMES[connection.platform]}
          </a>
        </div>
      )}
    </section>
  );
}