import { useQuery } from "react-query"
import axios from "axios"
import { CurrencyType } from "../features/wallet/Wallet"

const APP_ID = "b0c7315d7d20cef39d48063e"
axios.defaults.baseURL = "https://openexchangerates.org/api"

export function useRatioQuery(base: CurrencyType) {
  return useQuery("currency-list", () => getRatio(base), {
    refetchInterval: 5000,
  })
}

function getRatio(base: CurrencyType) {
  return axios(
    `https://v6.exchangerate-api.com/v6/${APP_ID}/latest/${base}`,
  ).then((result) => result.data)
}
