import Heading from "@/components/ui/Heading";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="text-center">
      <Heading>Prodcto No encontrado</Heading>
      <p>
        Tal vez quieras volver a:{" "}
        <Link href="/admin/products?page=1" className="text-green-400">
          Productos
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
