import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { ProductSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Params = Promise<{ id: string }>;

async function getProduct(id: string) {
  const url = `${process.env.API_URL}products/${id}`;
  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    notFound();
  }

  const product = ProductSchema.parse(json);

  return product;
}

const EditProductPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <>
      <Link
        href="/admin/products?page=1"
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>

      <Heading>Editar Producto: {product.name}</Heading>

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductPage;
