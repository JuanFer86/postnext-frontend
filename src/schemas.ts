import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  inventory: z.number(),
  categoryId: z.number(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CategoryResponseSchema = z.array(CategorySchema);

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
});

// shopping cart

const ShoppingCartContentsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  inventory: true,
}).extend({
  productId: z.number(),
  quantity: z.number(),
});

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

export const CouponResponseSchema = z.object({
  name: z.string().default(""),
  message: z.string(),
  percentage: z.number().min(0).max(100).default(0),
});

const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z
    .array(OrderContentSchema)
    .min(1, { message: "El Carrito no puede ir vacio" }),
});

export const SuccessResponseSchema = z.string();
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

// types from schemas
export type ProductType = z.infer<typeof ProductSchema>;
export type ShoppingCartType = z.infer<typeof ShoppingCartSchema>;
export type CartItemType = z.infer<typeof ShoppingCartContentsSchema>;
export type CouponType = z.infer<typeof CouponResponseSchema>;
