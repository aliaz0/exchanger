import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import exchangeReducer from "../features/exchanger/exchangerSlice"

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
