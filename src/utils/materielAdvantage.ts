interface Square {
    type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
    color: 'w' | 'b';
  }
  
const pieceValues: { [key: string]: number } = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0
};
  
export function calculateMaterialAdvantage(board: (Square | null)[][]): number {
    let whiteMaterial = 0;
    let blackMaterial = 0;
  
    for (let row of board) {
      for (let square of row) {
        if (square) {
          const value = pieceValues[square.type];
          if (square.color === 'w') {
            whiteMaterial += value;
          } else {
            blackMaterial += value;
          }
        }
      }
    }
  
    const advantage = whiteMaterial - blackMaterial;
    return advantage;
}