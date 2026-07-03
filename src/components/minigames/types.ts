// Contract every mini-game implements: it calls onWin() when solved. `difficulty`
// runs 0 (easiest) → 1 (hardest) and scales the game's challenge.
export interface MiniGameProps {
  onWin: () => void;
  difficulty: number;
}
