"use server";

import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

export const submitOrder = async (data: unknown) => {
  const order = OrderSchema.parse(data);

  const url = `${process.env.API_URL}transactions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...order }),
  });

  const message = await response.text();

  if (!response.ok) {
    const errors = ErrorResponseSchema.parse(message);
    return {
      errors: errors.message,
      success: "",
    };
  }

  const success = SuccessResponseSchema.parse(message);

  revalidateTag("products-by-category");
  //   revalidatePath("/(store)/[categoryId]", "page"); // another way to revalidate

  return {
    errors: [],
    success: success,
  };
};
