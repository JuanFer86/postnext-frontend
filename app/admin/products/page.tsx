import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { ProductResponseSchema } from "@/src/schemas";
import { products } from "../../../../posnest/src/seeder/data/products";
import { isValidPage } from "@/src/utils";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}products?take=${take}&skip=${skip}`;

  const response = await fetch(url);
  const json = await response.json();

  const data = ProductResponseSchema.parse(json);

  return { products: data.products, total: data.total };
}

type SearchParams = Promise<{ page: string }>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page } = await searchParams;

  if (!isValidPage(+page)) redirect("/admin/products?page=1");

  const prodctPerPage = 10;

  const skip = (+page - 1) * prodctPerPage;

  const { products, total } = await getProducts(prodctPerPage, skip);

  const totalPages = Math.ceil(total / prodctPerPage);

  if (+page > totalPages) redirect("/admin/products?page=1");

  return (
    <>
      <Link
        href="/admin/products/new"
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Nuevo prodcto
      </Link>

      <Heading>Administrar Productos</Heading>

      <ProductsTable products={products} />

      <Pagination
        page={+page}
        totalPages={totalPages}
        baseUrl="/admin/products"
      />
    </>
  );
};

export default ProductsPage;
