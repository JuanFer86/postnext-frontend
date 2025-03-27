import ProductCard from "@/components/products/ProductCard";
import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import { redirect } from "next/navigation";

type Params = Promise<{ categoryId: string }>;

const getProducts = async (categoryId: string) => {
  const url = `${process.env.API_URL}categories/${categoryId}?products=true`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    redirect("/");
  }

  const products = CategoryWithProductsResponseSchema.parse(data);
  return products;
};

const StorePage = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;

  const category = await getProducts(categoryId);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default StorePage;
