import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CurrencyType } from "../wallet/Wallet"
import { RootState } from "../../app/store"

export interface ExchangerState {
  wallets: Record<
    CurrencyType,
    {
      balance: number
      ratio: Record<CurrencyType, number>
    }
  >
  sourceWallet: {
    currency: CurrencyType
    readyToExchange: number | null
    errorMessage: string | null
  }
  targetWallet: {
    currency: CurrencyType
    readyToExchange: number | null
    errorMessage: string | null
  }
}

const initialState: ExchangerState = {
  wallets: {
    GBP: {
      balance: Math.random() * 10000,
      ratio: {
        GBP: 1,
        USD: 1.379853,
      },
    },
    USD: {
      balance: Math.random() * 10000,
      ratio: {
        GBP: 0.724714,
        USD: 1,
      },
    },
  },
  sourceWallet: {
    currency: "GBP",
    readyToExchange: null,
    errorMessage: null,
  },
  targetWallet: {
    currency: "USD",
    readyToExchange: null,
    errorMessage: null,
  },
}

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    exchange: (state) => {
      if (
        state.wallets[state.sourceWallet.currency].balance >
        (state.sourceWallet.readyToExchange ?? 0)
      ) {
        state.wallets[state.sourceWallet.currency].balance -=
          state.sourceWallet.readyToExchange ?? 0

        state.wallets[state.targetWallet.currency].balance +=
          state.targetWallet.readyToExchange ?? 0

        state.sourceWallet.readyToExchange = null
        state.targetWallet.readyToExchange = null
      } else {
        state.sourceWallet.errorMessage = "wallet balance is insufficient"
      }
    },

    changeReadyToExchange: (state, action: PayloadAction<number | null>) => {
      if (action.payload === state.sourceWallet.readyToExchange) {
        return
      }

      state.sourceWallet.errorMessage = null

      state.sourceWallet.readyToExchange = action.payload
      state.targetWallet.readyToExchange = action.payload
        ? parseFloat(
            (
              action.payload *
              state.wallets[state.sourceWallet.currency].ratio[
                state.targetWallet.currency
              ]
            ).toFixed(2),
          )
        : null
    },

    swap: (state) => {
      state.sourceWallet.errorMessage = null
      const temp = state.sourceWallet
      state.sourceWallet = state.targetWallet
      state.targetWallet = temp
    },
  },
})

export const { exchange, changeReadyToExchange, swap } = exchangeSlice.actions

export const selectSourceWallet = (state: RootState) => ({
  currency: state.exchange.sourceWallet.currency,
  value: state.exchange.sourceWallet.readyToExchange,
  balance: Number(
    state.exchange.wallets[
      state.exchange.sourceWallet.currency
    ].balance.toFixed(2),
  ),
  error: state.exchange.sourceWallet.errorMessage,
})

export const selectTargetWallet = (state: RootState) => ({
  currency: state.exchange.targetWallet.currency,
  value: state.exchange.targetWallet.readyToExchange,
  balance: Number(
    state.exchange.wallets[
      state.exchange.targetWallet.currency
    ].balance.toFixed(2),
  ),
  error: state.exchange.targetWallet.errorMessage,
})

export const selectRatio = (state: RootState) =>
  state.exchange.wallets[state.exchange.sourceWallet.currency].ratio[
    state.exchange.targetWallet.currency
  ]

export default exchangeSlice.reducer
