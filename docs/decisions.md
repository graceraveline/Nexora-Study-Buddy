# Study Buddy Decisions

## 1. React + Vite

### Chosen
React with Vite.

### Why
React makes it easy to split the interface into reusable components, while Vite provides a lightweight development environment.

### Rejected
A larger framework was unnecessary for the current project scope.

---

## 2. Separate UI from core logic

### Chosen
UI components live in `src/ui/` and application logic lives in `src/core/`.

### Why
This keeps business rules independent from the visual interface and makes them easier to test.

---

## 3. Mock data first

### Chosen
Use local mock room data during the initial development stage.

### Why
It allows the main user experience to be built and tested before introducing a backend.

### Future
Persistent storage and authentication can be added later.

---

## 4. No year restriction

### Chosen
Students can search for subjects without selecting Year 1, Year 2, Year 3, or Year 4.

### Why
Study groups can include students from different years, and the subject is more useful for matching than an arbitrary year restriction.

---

## 5. Detailed room descriptions

### Chosen
Rooms can include a detailed study goal or description.

### Why
A course code alone does not explain what a student wants to work on.

For example, a student might want to find someone to discuss algebra and review previous homework from several chapters.

---

## 6. One study connection per room

### Chosen
Each room has one selected study connection.

Supported platforms include:

- Discord
- Zoom
- Google Meet

### Why
The room should have one clear way to continue studying together instead of displaying several competing links.

---

## 7. Chat before external study platform

### Chosen
Students first communicate inside the Study Buddy room.

### Why
This lets students introduce themselves, confirm their study goals, and decide whether they want to study together before moving to another platform.

---

## 8. Study connection privacy

### Chosen
Study-connection information should be available to students who have joined the room.

### Why
Connection details should not unnecessarily be exposed to everyone browsing available rooms.

---

## 9. Small room capacities

### Chosen
Focus rooms have a capacity of 2, while group rooms have a capacity of 10.

### Why
Different study situations need different group sizes while still keeping rooms manageable.