"use server";

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas";
import { ActionStateType } from "./add-product-action";

export async function updateProduct(
  id: number,
  prevState: ActionStateType,
  formData: FormData
) {
  const product = ProductFormSchema.safeParse({
    name: formData.get("name") as string,
    price: formData.get("price") as string,
    inventory: formData.get("inventory") as string,
    categoryId: formData.get("categoryId") as string,
  });

  if (!product.success) {
    return {
      errors: product.error.issues.map((error) => error.message),
      success: "",
    };
  }

  // communicatio with api

  const url = `${process.env.API_URL}products/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product.data),
  });

  const json = await response.json();

  if (!response.ok) {
    const errors = ErrorResponseSchema.parse(json);

    return {
      errors: errors.message.map((error) => error),
      success: "",
    };
  }

  return {
    errors: [],
    success: "Producto Actalizado correctamente",
  };
}
