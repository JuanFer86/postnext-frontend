"use client";

import { getSalesByDate } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";
import dynamic from "next/dynamic";

// import calendar a dependency when its all client component
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TransactionFilter = () => {
  const [date, setDate] = useState<Value>(new Date());

  const formattedDate = format(
    (date?.toString() as string) || new Date(),
    "yyyy-MM-dd"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useQuery<Array<any>>({
    queryKey: ["sales", formattedDate],
    queryFn: async () => await getSalesByDate(formattedDate),
  });

  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar value={date} onChange={setDate} locale="es" />
      </div>
      <div>
        {isLoading && <p>Cargando...</p>}
        {data?.length ? (
          data.map((transaction) => (
            <TransactionSummary
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <p>No hay ventas en esta fecha</p>
        )}

        <p className="my-5 text-lg font-bold text-right">
          Total en un día:{" "}
          <span className="font-normal">{formatCurrency(total)}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionFilter;
