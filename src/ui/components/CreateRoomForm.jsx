import React, { useState } from "react";

export default function CreateRoomForm({ subject, onCreate, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("focus");
  const [platform, setPlatform] = useState("discord");
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !value.trim()) return;

    onCreate({
      title: title.trim(),
      description: description.trim(),
      type,
      studyConnection: {
        platform,
        value: value.trim(),
      },
    });
  }

  return (
    <section className="create-room">
      <div className="create-room__header">
        <p>Start a study room</p>
        <h1>{subject.toUpperCase()}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Room title
          <input
            type="text"
            placeholder="e.g. Intense COMP304E revision"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label>
          What are you studying?
          <textarea
            placeholder="Describe what you want to work on together..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="5"
          />
        </label>

        <div className="create-room__type">
          <p>Room type</p>

          <div className="room-type-options">
            <button
              type="button"
              className={type === "focus" ? "room-type-option active" : "room-type-option"}
              onClick={() => setType("focus")}
            >
              <strong>Focus room</strong>
              <span>Maximum 2 people</span>
            </button>

            <button
              type="button"
              className={type === "group" ? "room-type-option active" : "room-type-option"}
              onClick={() => setType("group")}
            >
              <strong>Discussion room</strong>
              <span>Maximum 10 people</span>
            </button>
          </div>
        </div>

        <label>
          Study connection
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="discord">Discord</option>
            <option value="zoom">Zoom</option>
            <option value="google-meet">Google Meet</option>
          </select>
        </label>

        <label>
          {platform === "discord"
            ? "Discord username"
            : "Meeting link"}

          <input
            type={platform === "discord" ? "text" : "url"}
            placeholder={
              platform === "discord"
                ? "@your_username"
                : "https://..."
            }
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <div className="create-room__actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit">
            Create room
          </button>
        </div>
      </form>
    </section>
  );
}