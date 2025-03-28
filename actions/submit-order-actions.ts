"use server";

import { OrderSchema } from "@/src/schemas";

export const submitOrder = async (data: unknown, prevState: any) => {
  const order = OrderSchema.parse(data);

  return {
    errors: [],
    success: "Order submitted successfully",
  };
};
