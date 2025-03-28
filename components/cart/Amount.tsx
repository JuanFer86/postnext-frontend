import { formatCurrency } from "@/src/utils";
import { FC } from "react";

type AmountProps = {
  label: string;
  amount: number;
  discount?: boolean;
};

const Amount: FC<AmountProps> = ({ label, amount, discount }) => {
  return (
    <div className={`flex justify-between`}>
      <dt className="font-bold">{label}</dt>
      <dd className={`${discount ? "text-amber-500" : "text-gray-900"} `}>
        {discount ? "-" : ""}
        {formatCurrency(amount)}
      </dd>
    </div>
  );
};

export default Amount;
