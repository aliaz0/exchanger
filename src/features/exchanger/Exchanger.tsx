import { Wallet } from "../wallet/Wallet"
import "./Exchanger.css"

export function Exchanger() {
  return (
    <div className="relative-box">
      <div className="relative-box__overlay--center ellipse-label">
        {1.379853}
      </div>
      <div className="relative-box__overlay--left circle-button">{"S"}</div>
      <Wallet currency="GBP" amount={1523.31} />
      <Wallet disabled currency="USD" amount={2163.46} />
    </div>
  )
}
