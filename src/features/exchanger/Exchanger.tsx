import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Wallet } from "../wallet/Wallet"
import "./Exchanger.css"
import {
  selectRatio,
  selectSourceWallet,
  selectTargetWallet,
  swap,
} from "./exchangerSlice"

export function Exchanger() {
  const dispatch = useAppDispatch()

  const sourceWallet = useAppSelector(selectSourceWallet)
  const targetWallet = useAppSelector(selectTargetWallet)
  const ratio = useAppSelector(selectRatio)

  return (
    <div className="relative-box">
      <div className="relative-box__overlay--center ellipse-label">{ratio}</div>
      <div
        className="relative-box__overlay--left circle-button"
        onClick={() => {
          dispatch(swap())
        }}
      >
        {"S"}
      </div>
      <Wallet
        currency={sourceWallet.currency}
        balance={sourceWallet.balance}
        value={sourceWallet.value}
      />
      <Wallet
        disabled
        currency={targetWallet.currency}
        balance={targetWallet.balance}
        value={targetWallet.value}
      />
    </div>
  )
}
