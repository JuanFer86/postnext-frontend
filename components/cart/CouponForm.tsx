import { useStore } from "@/src/store";
import { FormEvent, useState } from "react";

export default function CouponForm() {
  const { applyCoupon, coupon } = useStore((state) => state);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const couponName = formData.get("coupon_name") as string;

    if (couponName.length === 0) return;

    await applyCoupon(couponName);

    setLoading(false);
  };

  return (
    <>
      <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 bg-gray-200 border-gray-300 w-full"
          placeholder="Ingresa un cupón"
          name="coupon_name"
          disabled={loading}
        />
        <input
          type="submit"
          className="p-3 bg-green-400 font-bold hover:cursor-pointer disabled:bg-gray-400"
          value="Canjear"
          disabled={loading}
        />
      </form>

      {coupon.message ? (
        <>
          <p
            className={`py-4 text-center text-sm font-bold ${
              coupon.name ? "text-green-700" : "text-red-300"
            }`}
          >
            {coupon.message}
          </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
