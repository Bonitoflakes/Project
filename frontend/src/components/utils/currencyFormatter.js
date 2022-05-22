const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencySign:"standard",
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 3,
});

const compactFormmater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 3,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export { formatter, percentFormatter, compactFormmater };
