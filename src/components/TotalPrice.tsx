export function TotalPrice() {
  return (
    <div className="mt-6 w-full border rounded-xl p-4 ">
      <div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>Valor total</strong>
          </div>
          <strong>R$ 5.000,00</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 10%</strong>
          </div>
          <strong>R$ 4.500,00</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 20%</strong>
          </div>
          <strong>R$ 4.000,00</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 30%</strong>
          </div>
          <strong>R$ 3.500,00</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>Pontos</strong>
          </div>
          <strong>37500 pts</strong>
        </div>
      </div>
    </div>
  )
}
