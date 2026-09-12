export function filterRoomsBySubject(rooms, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return rooms;
  }

  return rooms.filter((room) =>
    room.subject.toLowerCase().includes(normalizedQuery)
  );
}