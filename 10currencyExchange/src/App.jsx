import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(null)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    if (convertedAmount !== null) {
      setAmount(convertedAmount)
      setConvertedAmount(amount)
    }
  }

  const convert = () => {
    if (!currencyInfo || !currencyInfo[to]) return
    const result = amount * currencyInfo[to]
    setConvertedAmount(parseFloat(result.toFixed(2)))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 p-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white mb-6 drop-shadow-lg">🌍 Currency Converter</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onAmountChange={(val) => val >= 0 && setAmount(val)}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
          />

          <div className="flex justify-center my-4">
            <button
              type="button"
              onClick={swap}
              className="text-xl bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition px-4 py-2 rounded-full shadow-md"
              title="Swap currencies"
            >
              🔄
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount ?? ''}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md text-lg"
          >
            Convert {from.toUpperCase()} ➡ {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
