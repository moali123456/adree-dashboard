import React from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/data-table/data-table";
import { TableActions } from "../../../shared/table-actions/table-actions";

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: "title" as keyof Product,
      label: t("product_name") || "Product Name",
      className: "w-[200px]",
    },
    {
      key: "brand" as keyof Product,
      label: t("brand") || "Brand",
    },
    {
      key: "category" as keyof Product,
      label: t("category") || "Category",
    },
    {
      key: "price" as keyof Product,
      label: t("price") || "Price",
      align: "right" as const,
      headerAlign: "right" as const,
      render: (value: number) => `$${value}`,
    },
    {
      key: "stock" as keyof Product,
      label: t("stock") || "Stock",
      align: "right" as const,
      headerAlign: "right" as const,
    },
    {
      key: "rating" as keyof Product,
      label: t("rating") || "Rating",
      align: "right" as const,
      headerAlign: "right" as const,
      render: (value: number) => value.toFixed(1),
    },
    {
      key: "id" as keyof Product, // Use existing key, we'll override with render
      label: t("actions") || "Actions",
      align: "center" as const,
      headerAlign: "center" as const,
      render: (value: any, row: Product) => (
        <TableActions
          itemId={row.id.toString()}
          itemName={row.title}
          onEdit={onEdit}
          onDelete={onDelete}
          editLabel={t("edit") || "Edit"}
          deleteLabel={t("delete") || "Delete"}
        />
      ),
    },
  ];

  // Format the product data for the table
  const tableData = products.map((product) => ({
    ...product,
    id: product.id,
  }));

  console.log("ProductsTable rendering with data:", tableData.length);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">No products found</div>
      </div>
    );
  }

  return <DataTable columns={columns} data={tableData} />;
};

export default ProductsTable;
