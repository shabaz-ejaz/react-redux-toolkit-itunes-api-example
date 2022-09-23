import mediaReducer, {
    MediaSearchState,
    clear
} from './mediaSearchSlice';

describe('media search reducer', () =>
{
    const initialState: MediaSearchState = {
        value: [],
        status: 'idle',
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0
    };
    it('should handle initial state', () =>
    {
        expect(mediaReducer(undefined, {type: 'unknown'})).toEqual({
            value: [],
            status: 'idle',
        });
    });
});
