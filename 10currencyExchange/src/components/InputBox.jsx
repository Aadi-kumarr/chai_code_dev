import React, { useId } from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId()

  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-4 mb-4 ${className}`}>
      <label htmlFor={amountInputId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          id={amountInputId}
          type="number"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 outline-none text-gray-800 bg-white"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox
