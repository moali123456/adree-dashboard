import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useEffect } from "react";

interface EditProductFormData {
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

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

interface EditProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (productData: {
    id?: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }) => void;
  isLoading?: boolean;
}

export function EditProductModal({
  isOpen,
  onOpenChange,
  product,
  onSubmit,
  isLoading = false,
}: EditProductModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<EditProductFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      brand: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  // Watch form values 
  const formValues = watch();
  const isFormComplete =
    formValues.title &&
    formValues.brand &&
    formValues.category &&
    formValues.price > 0 &&
    formValues.stock >= 0;

  useEffect(() => {
    if (product && isOpen) {
      setValue("title", product.title);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("description", product.description || "");
    }
  }, [product, isOpen, setValue]);

  const handleFormSubmit = (data: EditProductFormData) => {
    onSubmit({
      id: product?.id,
      ...data,
    });
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("edit_product") || "Edit Product"}</DialogTitle>
            <DialogDescription>
              {t("edit_product_description") ||
                "Make changes to the product here. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Product Name */}
            <div className="grid gap-3">
              <Label
                htmlFor="edit-title"
                className={errors.title ? "text-red-500" : ""}
              >
                {t("product_name") || "Product Name"} *
              </Label>
              <Input
                id="edit-title"
                placeholder={t("enter_product_name") || "Product name"}
                {...register("title", {
                  required:
                    t("product_name_required") || "Product name is required",
                  minLength: {
                    value: 2,
                    message:
                      t("product_name_min_length") ||
                      "Product name must be at least 2 characters",
                  },
                })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Brand */}
            <div className="grid gap-3">
              <Label
                htmlFor="edit-brand"
                className={errors.brand ? "text-red-500" : ""}
              >
                {t("brand") || "Brand"} *
              </Label>
              <Input
                id="edit-brand"
                placeholder={t("enter_brand") || "Brand"}
                {...register("brand", {
                  required: t("brand_required") || "Brand is required",
                  minLength: {
                    value: 2,
                    message:
                      t("brand_min_length") ||
                      "Brand must be at least 2 characters",
                  },
                })}
                className={errors.brand ? "border-red-500" : ""}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="grid gap-3">
              <Label
                htmlFor="edit-category"
                className={errors.category ? "text-red-500" : ""}
              >
                {t("category") || "Category"} *
              </Label>
              <Input
                id="edit-category"
                placeholder={t("enter_category") || "Category"}
                {...register("category", {
                  required: t("category_required") || "Category is required",
                  minLength: {
                    value: 2,
                    message:
                      t("category_min_length") ||
                      "Category must be at least 2 characters",
                  },
                })}
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label
                  htmlFor="edit-price"
                  className={errors.price ? "text-red-500" : ""}
                >
                  {t("price") || "Price"} *
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={t("enter_price") || "Price"}
                  {...register("price", {
                    required: t("price_required") || "Price is required",
                    min: {
                      value: 0.01,
                      message: t("price_min") || "Price must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  htmlFor="edit-stock"
                  className={errors.stock ? "text-red-500" : ""}
                >
                  {t("stock") || "Stock"} *
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min="0"
                  placeholder={t("enter_stock") || "Stock"}
                  {...register("stock", {
                    required: t("stock_required") || "Stock is required",
                    min: {
                      value: 0,
                      message: t("stock_min") || "Stock cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className={errors.stock ? "border-red-500" : ""}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="edit-description">
                {t("description") || "Description"}
              </Label>
              <textarea
                id="edit-description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={
                  t("enter_description") || "Enter product description"
                }
                rows={3}
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                {t("cancel") || "Cancel"}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!isFormComplete || isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("updating") || "Updating..."}
                </>
              ) : (
                t("save_changes") || "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
