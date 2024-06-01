import { formatSumAsBRL } from "@/utils/fornatBRL";

type totalPrice ={
  price: number
  
}


export function TotalPrice({price}: totalPrice) {
 const totalpoint = (price /250)

  return (
    <div className="mt-6 w-full border rounded-xl p-4 ">
      <div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>Valor total</strong>
          </div>
          <strong>{formatSumAsBRL(price)}</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 10%</strong>
          </div>
          <strong>{formatSumAsBRL(price * 0.9)}</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 20%</strong>
          </div>
          <strong>{formatSumAsBRL(price * 0.8)}</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong>CashBack 30%</strong>
          </div>
          <strong>{formatSumAsBRL(price * 0.7)}</strong>
        </div>
        <div className="flex gap-2 items-center justify-between border-b py-2">
          <div className="">
            <strong title="Baseado no inter black 1pt a cada R$ 2,50">Pontos</strong>
          </div>
          <strong>{totalpoint} pts</strong>
        </div>
      </div>
    </div>
  )
}
