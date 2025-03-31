"use client";

import { ReactNode, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "@/actions/update-product-action";

const EditProductForm = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const editProductWithId = updateProduct.bind(null, +id);
  const [state, dispatch] = useActionState(editProductWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }

    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products?page=1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form className="space-y-5" action={dispatch}>
      {children}
      <input
        type="submit"
        className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};

export default EditProductForm;
