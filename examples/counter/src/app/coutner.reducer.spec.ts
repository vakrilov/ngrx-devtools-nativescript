import { assert } from "chai";
import { counterReducer, INCREMENT, DECREMENT, RESET } from './counter.reducer';

describe('CoutnerReducer', () => {
    it('INCREMENT should increment', () => {
        assert.equal(1, counterReducer(0, { type: INCREMENT }));
    });

    it('DECREMENT should decrement', () => {
        assert.equal(-1, counterReducer(0, { type: DECREMENT }));
    });

    it('RESET should reset', () => {
        assert.equal(0, counterReducer(100, { type: RESET }));
    });
});