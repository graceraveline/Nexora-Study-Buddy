import { describe, it, expect } from "vitest";
import { occupancy, canJoin, joinRoom, createRoom } from "../src/core/rooms.js";

const focusRoom = createRoom({ id: "r1", subject: "CALC101", hostId: "grace", type: "focus" });

describe("room capacity", () => {
  it("a fresh focus room has capacity 2 and one member (the host)", () => {
    expect(focusRoom.capacity).toBe(2);
    expect(occupancy(focusRoom).count).toBe(1);
  });

  it("a second student can join a focus room with one open seat", () => {
    expect(canJoin(focusRoom, "sam")).toBe(true);
    const joined = joinRoom(focusRoom, "sam");
    expect(joined.members).toEqual(["grace", "sam"]);
  });

  it("a full focus room refuses a third member", () => {
    const full = joinRoom(focusRoom, "sam");
    expect(canJoin(full, "priya")).toBe(false);
    const unchanged = joinRoom(full, "priya");
    expect(unchanged.members).toEqual(["grace", "sam"]);
  });
});