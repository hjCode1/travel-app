type ExchangeRates = {
  [currencyCode: string]: number
}

export function useExchangeRates(exchangeRates: ExchangeRates, baseCurrency: string, amount: number) {
  const result: ExchangeRates = {}

  for (const targetCurrency in exchangeRates) {
    const targetRate = exchangeRates[targetCurrency]

    if (targetRate) {
      const exchangeRate = targetRate / exchangeRates[baseCurrency]
      const convertedAmount = amount * exchangeRate
      result[targetCurrency] = convertedAmount
    }
  }

  return result
}
