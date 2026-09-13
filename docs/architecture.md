# Study Buddy Architecture

## Overview

Study Buddy is a React web application that helps students find and join study rooms or create their own.

The application is divided into three main areas:

- `ui/` — React components and styling
- `core/` — application logic
- `data/` — initial study room data

This separation keeps the user interface separate from the logic that manages study rooms and matching.

## User Interface

The user interface is located in `src/ui/`.

### App.jsx

`App.jsx` is the main application component.

It manages:

- The current user's name
- Whether the user is signed in
- Study rooms
- Course search
- Recently searched subjects
- The currently selected room
- Creating rooms
- Light and dark mode

It also connects the UI components to the functions in `src/core/`.

### Header.jsx

Displays the Study Buddy name, the current user's name, and the light/dark mode button.

### FinderRail.jsx

Provides the course search field and subject shortcuts.

### RoomList.jsx

Displays available study rooms.

Users can join rooms that still have available seats or start creating a new room.

### CreateRoomForm.jsx

Allows a user to create a study room.

The user chooses:

- A room title
- A description
- Focus or Discussion room
- A study connection platform
- A Discord username or meeting link

### RoomView.jsx

Displays the selected study room.

It contains:

- Room information
- Room chat
- Students in the room
- The study connection
- Leave room functionality
- Delete room functionality for the host

## Application Logic

The application logic is located in `src/core/`.

### rooms.js

`rooms.js` contains functions for managing study rooms.

These functions include:

- `occupancy()` — calculates the number of members and whether a room is full.
- `canJoin()` — checks whether a user can join a room.
- `joinRoom()` — adds a user to a room when joining is allowed.
- `leaveRoom()` — removes a user from a room.
- `createRoom()` — creates a new study room with the correct capacity.
- `deleteRoom()` — removes a room from the room list.

Focus rooms have a maximum capacity of 2 students.

Discussion rooms have a maximum capacity of 10 students.

### matching.js

`matching.js` contains the course matching logic.

`filterRoomsBySubject()` filters study rooms using the course code entered by the user.

The search is case-insensitive and also ignores extra spaces around the search query.

## Data

Initial study room data is stored in:

`src/data/mockRooms.js`

The application starts with several example study rooms.

Each room contains information such as:

- Room ID
- Subject
- Title
- Description
- Host
- Room type
- Capacity
- Members
- Study connection

The current application uses this data locally rather than a database.

## State Management

The application currently uses React state with `useState`.

Room changes are stored in application state while the app is running.

The selected theme is stored in the browser's `localStorage`, allowing the light/dark mode preference to remain after refreshing the page.

The application does not currently have a backend or persistent database.

## Room Lifecycle

A typical room flow is:

1. A user searches for a subject.
2. The application shows matching study rooms.
3. The user joins an available room.
4. The selected room is displayed in `RoomView`.
5. Users can chat and access the study connection.
6. A user can leave the room.
7. A room with no members is automatically removed after five minutes.

Room deletion by the host is also supported.

## Project Structure

```text
studibudbud/
├── README.md
├── docs/
│   └── architecture.md
├── src/
│   ├── ui/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── FinderRail.jsx
│   │   │   ├── RoomList.jsx
│   │   │   ├── RoomView.jsx
│   │   │   └── CreateRoomForm.jsx
│   │   └── styles/
│   │       └── index.css
│   ├── core/
│   │   ├── rooms.js
│   │   └── matching.js
│   ├── data/
│   │   └── mockRooms.js
│   └── main.jsx
├── tests/
└── assets/