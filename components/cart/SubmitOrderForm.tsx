import { submitOrder } from "@/actions/submit-order-actions";
import { useStore } from "@/src/store";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const SubmitOrderForm = () => {
  const {
    coupon: { name: coupon },
    contents,
    total,
    clearState,
  } = useStore((state) => state);

  const order = {
    coupon,
    contents,
    total,
  };

  const submitOrderWithData = submitOrder.bind(null, order);

  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
      clearState();
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <input
        type="submit"
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase font-bold p-3"
        value="Confirmar Comprar"
      />
    </form>
  );
};

export default SubmitOrderForm;
