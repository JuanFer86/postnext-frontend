"use client";

import { useStore } from "@/src/store";
import ShoppingCartItem from "./ShoppingCartItem";
import { useEffect, useRef, useState } from "react";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
import SubmitOrderForm from "./SubmitOrderForm";

const ShoppingCart = () => {
  const { contents, total, discount } = useStore((state) => state);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(contents.length > 0);
  }, [contents]);

  return (
    <>
      {contents.length ? (
        <>
          <h2
            className={`text-4xl font-bold text-gray-900 transition-opacity duration-400 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            Resumen de Venta
          </h2>
          <ul
            role="List"
            className={`mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 transition-opacity duration-400 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>

          <dl className="space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-500">
            {discount > 0 && (
              <Amount label="Descuento" amount={discount} discount />
            )}
            <Amount label="Total a Pagar" amount={total} />
          </dl>

          <div
            className={`transition-opacity duration-400 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <CouponForm />
            <SubmitOrderForm />
          </div>
        </>
      ) : (
        <>
          <p
            className={`text-xl text-center text-gray-900 transition-all duration-400 ease-in-out ${
              showContent ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            El carrito esta Vacio
          </p>
        </>
      )}
    </>
  );
};

export default ShoppingCart;
