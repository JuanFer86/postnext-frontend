import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";

const SalesPage = async () => {
  const queryClient = new QueryClient();

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: async () => {
      await getSalesByDate(formattedDate);
    },
  });

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-lg">
        En esta sección apareceran las ventas, utiliza el calendario para
        filtrar por fechas
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
};

export default SalesPage;
