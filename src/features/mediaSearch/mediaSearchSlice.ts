import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {fetchMedia} from './mediaSearchAPI';
import {SearchTerm} from './types';

export interface MediaSearchState
{
    value: Array<any>;
    status: 'idle' | 'loading' | 'failed';
    page: number
    per_page: number
    total: number
    total_pages: number
}

const initialState: MediaSearchState = {
    value: [],
    status: 'idle',
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0
};

interface ListResponse<T>
{
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T[]
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/*
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

*/


export const search = createAsyncThunk(
    'media/search',
    async (params: SearchTerm) =>
    {
        const response = await fetchMedia(params);
        console.log('response ***', response.data.results)
        console.log('searchTerm ***', params)
        // The value we return becomes the `fulfilled` action payload
        return response.data.results;
    }
);

export const mediaSearchSlice = createSlice({
    name: 'media',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        clear: (state) =>
        {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = [];
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) =>
    {
        builder
            .addCase(search.pending, (state) =>
            {
                state.status = 'loading';
            })
            .addCase(search.fulfilled, (state, action) =>
            {
                state.status = 'idle';
                state.value = [...state.value, ...action.payload];
                // state.value = state.value.concat(action.payload);
            })
            .addCase(search.rejected, (state) =>
            {
                state.status = 'failed';
            });
    },
});

export const {clear} = mediaSearchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMedia = (state: RootState) => state.media.value;
export const selectStatus = (state: RootState) => state.media.status;


export default mediaSearchSlice.reducer;
