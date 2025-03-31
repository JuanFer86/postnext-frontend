import { create } from "zustand";
import {
  CouponResponseSchema,
  CouponType,
  ProductType,
  ShoppingCartType,
} from "./schemas";
import { devtools } from "zustand/middleware";

interface StoreTypes {
  total: number;
  discount: number;
  contents: ShoppingCartType;
  coupon: CouponType;
  addToCart: (product: ProductType) => void;
  updateQuantity: (id: ProductType["id"], quantity: number) => void;
  removeFromCart: (id: ProductType["id"]) => void;
  calculateTotal: () => void;
  applyCoupon: (coupon: string) => Promise<void>;
  applyDiscount: () => void;
  clearState: () => void;
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  coupon: {
    name: "",
    message: "",
    percentage: 0,
  },
};

export const useStore = create<StoreTypes>()(
  devtools((set, get) => ({
    ...initialState,

    addToCart: (product) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCartType = [];

      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );

      if (duplicated >= 0) {
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].inventory
        )
          return;

        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }
      set(() => ({
        contents,
      }));

      get().calculateTotal();
    },
    updateQuantity: (id, quantity) => {
      //   const contents = get().contents.map((item) =>
      //     item.productId === id ? { ...item, quantity } : item
      //   );
      set((state) => ({
        contents: state.contents.map((item) =>
          item.productId === id ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotal();
    },
    removeFromCart: (id) => {
      const contents = get().contents.filter((item) => item.productId !== id);
      set(() => ({
        contents,
      }));

      if (get().coupon.percentage > 0) get().applyDiscount();

      if (contents.length === 0) get().clearState();
    },
    calculateTotal: () => {
      const total = get().contents.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      set(() => ({
        total,
      }));

      if (get().coupon.percentage > 0) {
        get().applyDiscount();
      }
    },
    applyCoupon: async (couponName: string) => {
      const response = await fetch("/coupons/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon_name: couponName }),
      });

      const data = await response.json();

      const coupon = CouponResponseSchema.parse(data);

      set(() => ({
        coupon,
      }));

      if (get().coupon.percentage > 0) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const subTotalAmount = get().contents.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const discount = (get().coupon.percentage / 100) * subTotalAmount;
      const total = subTotalAmount - discount;

      set(() => ({
        discount,
        total,
      }));
    },
    clearState: () => {
      set(() => ({
        ...initialState,
      }));
    },
  }))
);
