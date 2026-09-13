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
  if (room.members.includes(userId)) {
    return false;
  }

  return !occupancy(room).isFull;
}

export function joinRoom(room, userId) {
  if (!canJoin(room, userId)) {
    return room;
  }

  return {
    ...room,
    members: [...room.members, userId],
    emptySince: null,
  };
}

export function leaveRoom(room, userId) {
  const members = room.members.filter(
    (member) => member !== userId
  );

  return {
    ...room,
    members,
    emptySince:
      members.length === 0 ? Date.now() : null,
  };
}

export function createRoom({
  id,
  subject,
  title,
  description,
  hostId,
  type,
  studyConnection,
}) {
  const capacity = type === "focus" ? 2 : 10;

  return {
    id,
    subject,
    title,
    description,
    host: hostId,
    type,
    capacity,
    members: [hostId],
    studyConnection,
    emptySince: null,
  };
}

export function deleteRoom(rooms, roomId) {
  return rooms.filter((room) => room.id !== roomId);
}