import { revalidatePath } from "next/cache";

const DeleteProductForm = ({ productId }: { productId: number }) => {
  const handleDeleteProduct = async () => {
    "use server";

    const url = `${process.env.API_URL}products/${productId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.text();
    revalidatePath("/admin/products");
  };

  return (
    <form action={handleDeleteProduct}>
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 cursor-pointer"
        value={"Eliminar"}
      />
    </form>
  );
};

export default DeleteProductForm;
