// import { useSearchParams } from "next/navigation";
// import ProductFilter from "../../../components/filters/ProductFilter";
// import { useState } from "react";
// import { handleDelete } from "../../../components/functions/handleDelete";
// import { handleEdit } from "../../../components/functions/handleEdit";
// import ProductItem from "./ProductItem";
// import ProductEditForm from "../../../components/forms/ProductEditForm";
// import ProductAddForm from "../../../components/forms/ProductAddForm";
import CreateProductForm from "../../../components/forms/CreateProductForm";

export default function Store() {
  return (
    <>
      <h1>Store Page</h1>
      <CreateProductForm />
    </>
  );
}
