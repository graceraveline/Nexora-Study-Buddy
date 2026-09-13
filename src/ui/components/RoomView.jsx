import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

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
  const [showDiscordInfo, setShowDiscordInfo] = useState(false);

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

  async function handleSendMessage(event) {
  event.preventDefault();

  if (!message.trim()) return;

  const newMessage = {
    id: `${room.id}-message-${Date.now()}`,
    sender: currentUser,
    text: message.trim(),
  };

  const updatedMessages = [...messages, newMessage];

  const { error } = await supabase
    .from("rooms")
    .update({
      messages: updatedMessages,
    })
    .eq("id", room.id);

  if (error) {
    console.error("Failed to send message:", error);
    return;
  }

  setMessages(updatedMessages);
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

  if (showDiscordInfo && connection?.platform === "discord") {
    return (
      <section className="room-view room-view--connection">
        <div className="connection-card">
          <button
            type="button"
            className="connection-card__back"
            onClick={() => setShowDiscordInfo(false)}
          >
            ← Back to room
          </button>

          <div className="connection-card__icon">
            💬
          </div>

          <p className="connection-card__eyebrow">
            Study connection
          </p>

          <h1>Add the host on Discord</h1>

          <p className="connection-card__description">
            The host has shared their Discord username.
            Add them on Discord so you can continue studying
            together.
          </p>

          <div className="connection-card__username">
            <span>Discord username</span>

            <strong>{connection.value}</strong>
          </div>

          <div className="connection-card__tip">
            <span>💡</span>

            <p>
              Search for this username in Discord and send
              the host a friend request.
            </p>
          </div>

          <button
            type="button"
            className="connection-card__button"
            onClick={() => setShowDiscordInfo(false)}
          >
            Back to study room
          </button>
        </div>
      </section>
    );
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
                  {showSender && (
                    <strong>{item.sender}</strong>
                  )}

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

          {connection.platform === "discord" ? (
            <button
              type="button"
              onClick={() => setShowDiscordInfo(true)}
            >
              Connect on Discord
            </button>
          ) : (
            <a
              href={connection.value}
              target="_blank"
              rel="noreferrer"
            >
              Open {PLATFORM_NAMES[connection.platform]}
            </a>
          )}
        </div>
      )}
    </section>
  );
}