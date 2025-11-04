import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { PRODUCTS_URLS } from "../../../../constants/END_POINTS";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  discountPercentage: number;
}

interface DashboardStats {
  totalProducts: number;
  totalStock: number;
  averagePrice: number;
  averageRating: number;
  outOfStock: number;
}

const DashboardPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalStock: 0,
    averagePrice: 0,
    averageRating: 0,
    outOfStock: 0,
  });

  // Fetch all products for dashboard
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Get all products (limit to 100 for demo)
      const response = await axios.get(PRODUCTS_URLS.getProductsList(0, 100));
      
      if (response?.data?.products) {
        setProducts(response.data.products);
        calculateStats(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products for dashboard:", error);
      toast.error(t("dashboard_fetch_error") || "Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate dashboard statistics
  const calculateStats = (productsData: Product[]) => {
    const totalProducts = productsData.length;
    const totalStock = productsData.reduce((sum, product) => sum + product.stock, 0);
    const averagePrice = productsData.reduce((sum, product) => sum + product.price, 0) / totalProducts;
    const averageRating = productsData.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
    const outOfStock = productsData.filter(product => product.stock === 0).length;

    setStats({
      totalProducts,
      totalStock,
      averagePrice: Number(averagePrice.toFixed(2)),
      averageRating: Number(averageRating.toFixed(1)),
      outOfStock,
    });
  };

  // Prepare data for category distribution chart
  const getCategoryData = () => {
    const categoryCount: { [key: string]: number } = {};
    
    products.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCount);
    const counts = Object.values(categoryCount);

    return {
      labels: categories,
      datasets: [
        {
          label: t('products_by_category') || 'Products by Category',
          data: counts,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  // Prepare data for price distribution chart
  const getPriceData = () => {
    const priceRanges = {
      '0-50': 0,
      '51-100': 0,
      '101-200': 0,
      '201-500': 0,
      '501+': 0,
    };

    products.forEach(product => {
      if (product.price <= 50) priceRanges['0-50']++;
      else if (product.price <= 100) priceRanges['51-100']++;
      else if (product.price <= 200) priceRanges['101-200']++;
      else if (product.price <= 500) priceRanges['201-500']++;
      else priceRanges['501+']++;
    });

    return {
      labels: Object.keys(priceRanges),
      datasets: [
        {
          label: t('products_by_price') || 'Products by Price Range ($)',
          data: Object.values(priceRanges),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t("loading_dashboard") || "Loading dashboard..."}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t("dashboard") || "Dashboard"}
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("total_products") || "Total Products"}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("total_stock") || "Total Stock"}
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.totalStock}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("average_price") || "Average Price"}
          </h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ${stats.averagePrice}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("average_rating") || "Average Rating"}
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.averageRating}/5
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t("category_distribution") || "Category Distribution"}
          </h3>
          <div className="h-80">
            <Doughnut 
              data={getCategoryData()} 
              options={chartOptions}
            />
          </div>
        </div>

        {/* Price Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t("price_distribution") || "Price Distribution"}
          </h3>
          <div className="h-80">
            <Bar 
              data={getPriceData()} 
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;