import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import "./Wallet.css"
import { useAppDispatch } from "../../app/hooks"
import { changeReadyToExchange } from "../exchanger/exchangerSlice"

export function Wallet({
  disabled = false,
  currency,
  balance,
  value = undefined,
  error = undefined,
}: WalletPropsType) {
  const dispatch = useAppDispatch()

  const [innerValue, setInnerValue] = useState<string | undefined>(
    value === null ? "" : value?.toString(),
  )

  useEffect(() => {
    setInnerValue(value === null ? "" : value?.toString())
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (VALIDATION_REGEX.test(event.target.value)) {
      setInnerValue(event.target.value)
      dispatch(
        changeReadyToExchange(
          event.target.value ? Number(event.target.value) : null,
        ),
      )
    }
  }

  const validate = (event: KeyboardEvent) => {
    if (event.code === "Backspace" || event.code === "Delete") {
      return
    }

    if (!VALIDATION_REGEX.test(innerValue ?? "" + event.key)) {
      event.preventDefault()
    }
  }

  return (
    <div className={"wallet-card" + (disabled ? " wallet-card--disabled" : "")}>
      <div className="grid grid--gap-200">
        <select
          className="grid__item--column-1-2 grid__item--row-1-2 select"
          value={currency}
        >
          <option value={"GBP"}>GBP</option>
          <option value={"USD"}>USD</option>
        </select>
        <span className="grid__item--column-1-2 grid__item--row-2-3 span">
          {balance}
        </span>
        <input
          className={
            "grid__item--column-2-3 grid__item--row-1-2 input" +
            (disabled ? " input--disabled" : "")
          }
          onKeyDown={validate}
          disabled={disabled}
          placeholder={disabled ? "" : "Inter an amount to exchange"}
          value={innerValue}
          onChange={handleChange}
        />
        <span
          className={"grid__item--column-2-3 grid__item--row-2-3 error-message"}
        >
          {error}
        </span>
      </div>
    </div>
  )
}

const VALIDATION_REGEX = /^[0-9]*(\.[0-9]{0,2})?$/

export type CurrencyType = "USD" | "GBP"

type WalletPropsType = {
  disabled?: boolean
  currency: CurrencyType
  balance: number
  value?: number | null
  error?: string | null
}
