import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import PageHeader from "../../../shared/page-header/page-header";
import ProductsTable from "./products-table";
import TablePagination from "../../../shared/table-pagination/table-pagination";
import TableSearch from "../../../shared/table-search/table-search";
import { useDebounce } from "../../../../hooks/use-debounce";
import { PRODUCTS_URLS } from "../../../../constants/END_POINTS";
import { AddProductModal } from "./add-product-modal";
import { EditProductModal } from "./edit-product-modal";
import { DeleteModal } from "../../../shared/delete-modal/delete-modal";

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  description?: string;
}

const ProductsPage = () => {
  const { t } = useTranslation();

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // items per page
  const ITEMS_PER_PAGE = 8;

  // get products with pagination and search
  const getProductsList = async (page: number, searchQuery: string = "") => {
    try {
      setLoading(true);
      const skip = (page - 1) * ITEMS_PER_PAGE;

      let url: string;
      if (searchQuery) {
        url = PRODUCTS_URLS.searchProducts(searchQuery, skip, ITEMS_PER_PAGE);
      } else {
        url = PRODUCTS_URLS.getProductsList(skip, ITEMS_PER_PAGE);
      }

      console.log(`Fetching products: ${url}`);

      const response = await axios.get(url);

      if (response?.data) {
        setProductsList(response.data?.products || []);
        setTotalItems(response.data?.total || 0);
        console.log("Received products:", response.data.products.length);
        console.log("Total items:", response.data.total);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(t("fetch_products_error") || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // Use debounce
  const debouncedSearch = useDebounce((searchQuery: string) => {
    setCurrentPage(1);
    getProductsList(1, searchQuery);
  }, 500);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
    getProductsList(page, searchTerm);
  };

  // Handle add product button click
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  // Handle add product submission
  const handleAddSubmit = async (productData: {
    title: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }) => {
    try {
      setAddLoading(true);
      console.log("Adding new product:", productData);
      const response = await axios.post(PRODUCTS_URLS.addProduct, productData);
      console.log("Product added successfully:", response.data);

      toast.success(t("add_success") || "Product added successfully");
      setIsAddModalOpen(false);
      getProductsList(currentPage, searchTerm);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(t("add_error") || "Error adding product");
    } finally {
      setAddLoading(false);
    }
  };

  // Handle edit action
  const handleEdit = (productId: string) => {
    const product = productsList.find((p) => p.id.toString() === productId);
    setSelectedProduct(product || null);
    setIsEditModalOpen(true);
  };

  // Handle edit product submission
  const handleEditSubmit = async (productData: {
    id?: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }) => {
    try {
      if (!productData.id) return;

      setEditLoading(true);
      console.log("Editing product:", productData);
      const response = await axios.put(
        PRODUCTS_URLS.updateProduct(productData.id),
        productData
      );
      console.log("Product updated successfully:", response.data);

      toast.success(t("update_success") || "Product updated successfully");
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      getProductsList(currentPage, searchTerm);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(t("update_error") || "Error updating product");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = (productId: string) => {
    const product = productsList.find((p) => p.id.toString() === productId);
    setSelectedProduct(product || null);
    setIsDeleteModalOpen(true);
  };

  // Handle delete
  const handleDeleteConfirm = async (): Promise<void> => {
    if (!selectedProduct?.id) return;

    try {
      setDeleteLoading(true);
      console.log("Deleting product:", selectedProduct.id);

      const response = await axios.delete(
        PRODUCTS_URLS.deleteProduct(selectedProduct.id)
      );
      console.log("Product deleted successfully:", response.data);

      toast.success(t("delete_success") || "Product deleted successfully");

      // Remove the product from the local state for immediate UI update
      setProductsList((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );
      setTotalItems((prev) => prev - 1);

      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(t("delete_error") || "Error deleting product");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getProductsList(currentPage, searchTerm);
  }, [currentPage]);

  return (
    <div id="products-page" className="pt-3">
      {/* Page Header */}
      <PageHeader
        title={t("products")}
        countLabel={t("product")}
        count={totalItems.toString()}
        description={t("products_sub_title")}
        addButtonLabel={t("add_product")}
        onAdd={handleAddProduct}
      />

      {/* Table search */}
      <TableSearch
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t("search_products")}
      />

      {/* Product table */}
      <ProductsTable
        products={productsList}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        nextText={t("next")}
        previousText={t("previous")}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddSubmit}
        isLoading={addLoading}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        product={selectedProduct}
        onSubmit={handleEditSubmit}
        isLoading={editLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        itemName={selectedProduct?.title || ""}
        onConfirm={handleDeleteConfirm}
        title={t("delete_product")}
        confirmText={t("delete_product")}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default ProductsPage;
