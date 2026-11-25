import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function directionToNeighbor(
  from: Position,
  to: Position,
): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dy === 0 && Math.abs(dx) === 1) return dx > 0 ? "right" : "left";
  if (dx === 0 && Math.abs(dy) === 1) return dy > 0 ? "down" : "up";
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((tile) => {
      const direction = directionToNeighbor(
        session.getState().puzzle.player,
        tile,
      );
      if (direction) session.dispatch({ kind: "move", direction });
    });
  },
};
