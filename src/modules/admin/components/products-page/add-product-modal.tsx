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

interface AddProductFormData {
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (productData: AddProductFormData) => void;
  isLoading?: boolean;
}

export function AddProductModal({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddProductModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AddProductFormData>({
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
    formValues.title?.trim() &&
    formValues.brand?.trim() &&
    formValues.category?.trim() &&
    formValues.price > 0 &&
    formValues.stock >= 0;

  const handleFormSubmit = (data: AddProductFormData) => {
    onSubmit(data);
    reset(); 
  };

  const handleClose = () => {
    onOpenChange(false);
    reset(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("add_product") || "Add New Product"}</DialogTitle>
            <DialogDescription>
              {t("add_product_description") ||
                "Fill in the details for the new product. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Product Name */}
            <div className="grid gap-3">
              <Label
                htmlFor="add-title"
                className={errors.title ? "text-red-500" : ""}
              >
                {t("product_name") || "Product Name"} *
              </Label>
              <Input
                id="add-title"
                placeholder={t("enter_product_name") || "Enter product name"}
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
                htmlFor="add-brand"
                className={errors.brand ? "text-red-500" : ""}
              >
                {t("brand") || "Brand"} *
              </Label>
              <Input
                id="add-brand"
                placeholder={t("enter_brand") || "Enter brand"}
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
                htmlFor="add-category"
                className={errors.category ? "text-red-500" : ""}
              >
                {t("category") || "Category"} *
              </Label>
              <Input
                id="add-category"
                placeholder={t("enter_category") || "Enter category"}
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
                  htmlFor="add-price"
                  className={errors.price ? "text-red-500" : ""}
                >
                  {t("price") || "Price"} *
                </Label>
                <Input
                  id="add-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
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
                  htmlFor="add-stock"
                  className={errors.stock ? "text-red-500" : ""}
                >
                  {t("stock") || "Stock"} *
                </Label>
                <Input
                  id="add-stock"
                  type="number"
                  min="0"
                  placeholder="0"
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
              <Label htmlFor="add-description">
                {t("description") || "Description"}
              </Label>
              <textarea
                id="add-description"
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
            <Button type="submit" disabled={!isFormComplete || isSubmitting}>
              {isSubmitting ? (
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
                  {t("adding") || "Adding..."}
                </>
              ) : (
                t("add_product") || "Add Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
