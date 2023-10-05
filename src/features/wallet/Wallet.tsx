import { KeyboardEvent } from "react"
import "./Wallet.css"

export function Wallet({
  disabled = false,
  currency,
  amount,
}: WalletPropsType) {
  return (
    <div className={"wallet-card" + (disabled ? " wallet-card--disabled" : "")}>
      <div className="grid grid--gap-200">
        <select
          className="grid__item--column-1-2 grid__item--row-1-2 select"
          defaultValue={currency}
        >
          <option value={"GBP"}>GBP</option>
          <option value={"USD"}>USD</option>
        </select>
        <span className="grid__item--column-1-2 grid__item--row-2-3 span">
          {amount}
        </span>
        <input
          className={
            "grid__item--column-2-3 grid__item--row-1-3 input" +
            (disabled ? " input--disabled" : "")
          }
          onKeyDown={validate}
          disabled={disabled}
          placeholder={disabled ? "" : "Inter an amount to exchange"}
        />
      </div>
    </div>
  )
}

const validate = (event: KeyboardEvent) => {
  if (event.code === "Backspace" || event.code === "Delete") {
    return
  }

  const regex = /[0-9]|\./
  if (!regex.test(event.key)) {
    event.preventDefault()
  }
}

type WalletPropsType = {
  disabled?: boolean
  currency: "USD" | "GBP"
  amount: number
}
