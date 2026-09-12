// Pure functions over the Room shape (see src/data/models.js).
// Kept free of React so they're trivially unit-testable and swappable
// for real backend calls later.

export function occupancy(room) {
  const count = room.members.length;
  return {
    count,
    capacity: room.capacity,
    ratio: count / room.capacity,
    isFull: count >= room.capacity,
  };
}

export function canJoin(room, userId) {
  if (room.members.includes(userId)) return false;
  return !occupancy(room).isFull;
}

export function joinRoom(room, userId) {
  if (!canJoin(room, userId)) return room;
  return { ...room, members: [...room.members, userId] };
}

export function leaveRoom(room, userId) {
  return { ...room, members: room.members.filter((m) => m !== userId) };
}

export function createRoom({ id, subject, hostId, type }) {
  return {
    id,
    subject,
    host: hostId,
    type, // "focus" (cap 2) | "group" (cap 10)
    capacity: type === "focus" ? 2 : 10,
    members: [hostId],
  };
}