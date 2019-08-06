import { ActionReducer, Action } from '@ngrx/store';

export const PLAY_X = 'PLAY_X';
export const PLAY_O = 'PLAY_O';
export const RESET = 'RESET';

const initalState = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0];

interface BoardPayload {
    row: number;
    col: number;
}

export const boardReducer: ActionReducer<Array<number>> = (state: Array<number> = initalState, action: Action) => {
    let payload: BoardPayload = (<any>action).payload;
    switch (action.type) {
        case PLAY_X:
            return reduceBoard(state, payload.row, payload.col, 1);
        case PLAY_O:
            return reduceBoard(state, payload.row, payload.col, -1);
        case RESET:
            return initalState;
        default:
            return state;
    }
};

function reduceBoard(board: Array<number>, row: number, col: number, val: number): Array<number> {
    const pos = row * 3 + col;

    if (pos >= 9) {
        throw new Error(`Invalid position row:${row} col:${col}.`);
    }

    if (board[pos] !== 0) {
        throw new Error(`Position aready taken row:${row} col:${col} current value:${board[pos]}.`);
    }

    return [
        ...board.slice(0, pos),
        val,
        ...board.slice(pos + 1, board.length)];
}

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]];

export function checkWinner(board: Array<number>): number {
    for (let winPos of winningPositions) {
        let res = winPos.reduce((sum, index) => sum + board[index], 0);

        if (res === 3 || res === -3) {
            return res / 3;
        }
    }
    return 0;
}