type Player = 'b' | 'w'
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p'
export type Piece = `${Player}${Type}`
type Pieces = Record<Piece, ReturnType<typeof require>>
export const PIECES: Pieces = {
	br: require('@/assets/pieces/br.png'),
	bp: require('@/assets/pieces/bp.png'),
	bn: require('@/assets/pieces/bn.png'),
	bb: require('@/assets/pieces/bb.png'),
	bq: require('@/assets/pieces/bq.png'),
	bk: require('@/assets/pieces/bk.png'),
	wr: require('@/assets/pieces/wr.png'),
	wn: require('@/assets/pieces/wn.png'),
	wb: require('@/assets/pieces/wb.png'),
	wq: require('@/assets/pieces/wq.png'),
	wk: require('@/assets/pieces/wk.png'),
	wp: require('@/assets/pieces/wp.png'),
}