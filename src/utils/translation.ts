import { Square } from "chess.js";
import { sizes } from "@/constants/tokens";
import { Vector } from "react-native-redash";

export const toTranslation = (to: Square) => {
    "worklet";
    const tokens = to.split("");
    const col = tokens[0];
    const row = tokens[1];
    if (!col || !row) {
      throw new Error("Invalid notation: " + to);
    }
    const indexes = {
      x: col.charCodeAt(0) - "a".charCodeAt(0),
      y: parseInt(row, 10) - 1,
    };
    return {
      x: indexes.x * sizes.square,
      y: 7 * sizes.square - indexes.y * sizes.square,
    };
  };
  
  export const toPosition = ({ x, y }: Vector) => {
    "worklet";
    const col = String.fromCharCode(97 + Math.round(x / sizes.square));
    const row = `${8 - Math.round(y / sizes.square)}`;
    return `${col}${row}` as Square;
  };