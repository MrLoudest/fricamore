type PriceProps = {
  amount: number
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function Price(props: PriceProps) {
  return <span>{formatter.format(props.amount)}</span>
}
