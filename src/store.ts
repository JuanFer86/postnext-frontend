import { create } from "zustand";
import { ProductType, ShoppingCartType } from "./schemas";
import { devtools } from "zustand/middleware";

interface StoreTypes {
  total: number;
  contents: ShoppingCartType;
  addToCart: (product: ProductType) => void;
  updateQuantity: (id: ProductType["id"], quantity: number) => void;
  removeFromCart: (id: ProductType["id"]) => void;
  calculateTotal: () => void;
}

export const useStore = create<StoreTypes>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product) => {
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
    },
    calculateTotal: () => {
      const total = get().contents.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      set(() => ({
        total,
      }));
    },
  }))
);
