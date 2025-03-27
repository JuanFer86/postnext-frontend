import { formatCurrency } from "@/src/utils";
import { FC } from "react";

type AmountProps = {
  label: string;
  amount: number;
};

const Amount: FC<AmountProps> = ({ label, amount }) => {
  return (
    <div className="flex justify-between">
      <dt className="font-bold">{label}</dt>
      <dd className="text-gray-900">{formatCurrency(amount)}</dd>
    </div>
  );
};

export default Amount;
