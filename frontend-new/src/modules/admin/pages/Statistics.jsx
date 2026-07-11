import { useEffect, useState } from "react";
import { getProductWiseEarnings } from "../../auth/api/authApi";

export default function StatisticsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      const response = await getProductWiseEarnings();

      const sellers = response.data || [];

      const productMap = {};

      sellers.forEach((seller) => {
		console.log("v",seller)
        seller.orders.forEach((order) => {
          if (!productMap[order.productId]) {
			console.log("check")
            productMap[order.productId] = {
              productId: order.productId,
              productName: order.name || "Unknown Product",
              productImage: order.image || "",
              totalSold: 0,
              totalOrders: 0,
              totalEarnings: 0,
            };
          }

          productMap[order.productId].totalSold += order.quantity;
          productMap[order.productId].totalOrders += 1;
          productMap[order.productId].totalEarnings +=
            order.quantity * order.price;
        });
      });
     console.log(Object.values(productMap))
      setProducts(Object.values(productMap));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-green-700">
            Product Earnings Statistics
          </h2>

          <p className="text-gray-500 mt-1">
            Product wise earnings overview.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Product</th>
                <th className="px-5 py-4 text-left">Image</th>
                <th className="px-5 py-4 text-center">Total Sold</th>
                <th className="px-5 py-4 text-center">Orders</th>
                <th className="px-5 py-4 text-center">Earnings</th>
                <th className="px-5 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium">
                    {product.productName}
                  </td>

                  <td className="px-5 py-4">
                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {product.totalSold}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {product.totalOrders}
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-green-700">
                    ₹{product.totalEarnings}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Active
                    </span>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500"
                  >
                    No statistics found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}