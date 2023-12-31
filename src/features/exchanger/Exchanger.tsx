import { useEffect } from "react"
import { useRatioQuery } from "../../api/api"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Wallet } from "../wallet/Wallet"
import "./Exchanger.css"
import {
  exchange,
  selectRatio,
  selectSourceWallet,
  selectTargetWallet,
  swap,
  updateRatio,
} from "./exchangerSlice"

export function Exchanger() {
  const dispatch = useAppDispatch()

  const sourceWallet = useAppSelector(selectSourceWallet)
  const targetWallet = useAppSelector(selectTargetWallet)
  const ratio = useAppSelector(selectRatio)

  const { data, error, isLoading } = useRatioQuery(sourceWallet.currency)

  useEffect(() => {
    if (data) {
      dispatch(updateRatio(data))
    }
  }, [data, dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className="vertical-layout">
      <div className="vertical-layout__item relative-box">
        <div className="relative-box__overlay--center ellipse-label">
          {ratio}
        </div>
        <div
          className="relative-box__overlay--left circle-button"
          onClick={() => {
            dispatch(swap())
          }}
        >
          {"S"}
        </div>
        <Wallet
          source
          currency={sourceWallet.currency}
          balance={sourceWallet.balance}
          value={sourceWallet.value}
          error={sourceWallet.error}
        />
        <Wallet
          currency={targetWallet.currency}
          balance={targetWallet.balance}
          value={targetWallet.value}
        />
      </div>
      <button
        className="vertical-layout__item ellipse-button"
        onClick={() => dispatch(exchange())}
      >
        Exchange
      </button>
    </div>
  )
}
