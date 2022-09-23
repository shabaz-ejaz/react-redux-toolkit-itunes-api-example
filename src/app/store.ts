import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mediaReducer from '../features/mediaSearch/mediaSearchSlice';

export const store = configureStore({
  reducer: {
    media: mediaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
