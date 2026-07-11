import React from "react";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import AIChatBot from "../../ai/components/AiChatBot";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChat,
  openChat,
} from "../../ai/slices/aiSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isChatOpen = useSelector(
    (state) => state.ai.isOpen
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white overflow-x-hidden">
      <HeroSection />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-700">
            Why Choose Quickcart?
          </h2>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Experience smart grocery shopping with fast delivery,
            fresh products, and affordable prices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-5">🥦</div>

              <h3 className="text-2xl font-bold text-green-700">
                Fresh Products
              </h3>

              <p className="text-gray-600 mt-3">
                Farm-fresh vegetables, fruits, and organic groceries
                delivered daily.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-5">🚚</div>

              <h3 className="text-2xl font-bold text-green-700">
                Fast Delivery
              </h3>

              <p className="text-gray-600 mt-3">
                Lightning-fast doorstep delivery with live order
                tracking.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-5">💳</div>

              <h3 className="text-2xl font-bold text-green-700">
                Easy Payments
              </h3>

              <p className="text-gray-600 mt-3">
                Pay securely using UPI, cards, wallets, and cash on
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-600 text-white text-center">
  <h2 className="text-4xl md:text-5xl font-extrabold">
    Shop Smart. Cook Better.
  </h2>

  <p className="mt-4 text-lg text-green-100 max-w-3xl mx-auto">
    Discover fresh groceries, save your favorite AI-generated recipes,
    and prepare delicious meals with everything you need in one place.
  </p>

  <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
    <button
      onClick={() => navigate("/all-products")}
      className="bg-white text-green-700 hover:bg-green-100 px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300"
    >
      Explore Products
    </button>

    <button
      onClick={() => navigate("/recipes")}
      className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-full font-semibold transition-all duration-300"
    >
      Explore Recipes
    </button>
  </div>
</section>

      {!isChatOpen ? (
        <button
          onClick={() => dispatch(openChat())}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-600 text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        >
          <MessageCircle size={30} />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative w-[400px] h-[700px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <button
              onClick={() => dispatch(closeChat())}
              className="absolute top-4 right-4 z-[100] bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <AIChatBot />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;