

import React, {
  useEffect,
  useState,
} from "react";

import {
  Search,
  ShoppingBag,
} from "lucide-react";

import UserProductCard from "../components/UserProduct";

import { getAllProducts } from "../../admin/api/productApi";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addCartItem,
} from "../../cart/slices/cartSlice";

function GroceryProducts() {

  const [products, setProducts] =
    useState([]);

  const dispatch =
    useDispatch();

  const { loading: cartLoading } =
    useSelector(
      (state) => state.cart
    );

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const fetchProducts =
    async () => {

      try {

        const response =
          await getAllProducts();

        setProducts(response);

        setFilteredProducts(
          response
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {

    if (!search.trim()) {

      setFilteredProducts(
        products
      );

    } else {

      const filtered =
        products.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            product.category?.some(
              (cat) =>
                cat
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
            )
        );

      setFilteredProducts(
        filtered
      );
    }
  }, [search, products]);

  const handleAddToCart =
    (product) => {

      dispatch(
        addCartItem({
		
		  userId:product?.userId,
          productId:
            product._id,

          name:
            product.name,

          price:
            product.discountPercentage >
            0
              ? Math.round(
                  product.price -
                    (product.price *
                      product.discountPercentage) /
                      100
                )
              : product.price,

          image:
            product.images?.[0]
              ?.url,

          quantity: 1,
		  userIds:product?.userId
        })
      );
    };

  if (loading) {
    return (
      <div
        className="min-h-screen
        flex items-center
        justify-center
        text-3xl font-bold
        text-green-600"
      >
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div
        className="bg-gradient-to-r
        from-green-600 to-green-700
        py-20 px-6"
      >

        <div className="max-w-7xl mx-auto">

          <div
            className="flex flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8"
          >

            <div>

              <div
                className="flex items-center
                gap-4"
              >

                <div
                  className="w-16 h-16
                  rounded-2xl
                  bg-white/20
                  flex items-center
                  justify-center"
                >
                  <ShoppingBag className="text-white w-8 h-8" />
                </div>

                <div>

                  <h1
                    className="text-5xl
                    font-extrabold
                    text-white"
                  >
                    All Products
                  </h1>

                  <p
                    className="text-green-100
                    mt-2 text-lg"
                  >
                    Explore fresh groceries
                    and daily essentials
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white
              rounded-2xl
              px-5 py-4
              flex items-center
              shadow-xl
              lg:w-[420px]"
            >

              <Search
                className="text-gray-400
                w-5 h-5 mr-3"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full
                outline-none
                text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {filteredProducts.length ===
        0 ? (

          <div
            className="bg-white
            rounded-[32px]
            shadow-xl p-16
            text-center"
          >

            <h2
              className="text-3xl
              font-bold text-gray-700"
            >
              No Products Found
            </h2>

            <p
              className="text-gray-500
              mt-3"
            >
              Try searching with
              another keyword
            </p>
          </div>

        ) : (

          <div
            className="grid
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8"
          >

            {filteredProducts.map(
              (product) => (

                <UserProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                  onAddToCart={
                    handleAddToCart
                  }
                  cartLoading={
                    cartLoading
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroceryProducts;