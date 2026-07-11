import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socket } from "../api/socket";
import RecipeCard from "./RecipeCard";
import CartCard from "./CartCard";
import { saveRecipe } from "../api/recipeApi";

const DEFAULT_MESSAGES = [
  {
    role: "assistant",
    type: "text",
    content:
      "Hi 👋 Tell me what you want to cook and I'll prepare the recipe along with all required groceries.",
  },
];

export default function AIChatBot() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("ai-chat-history");

    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });
 console.log()
  const [loading, setLoading] = useState(false);

  const [loadingMessage, setLoadingMessage] = useState("");

  const messagesEndRef = useRef(null);

  const handleSaveRecipe = async (
  recipe,
  index
) => {
  try {
    const title = recipe.title;

    const cartItems =
      messages[index + 1]?.type ===
      "cart"
        ? messages[index + 1].cart
        : [];

    const response =
      await saveRecipe({
        title,
        recipe,
        cartItems,
      });

    alert(response.message);
  } catch (error) {
    alert(
      error?.response?.data
        ?.message ||
        "Failed to save recipe."
    );
  }
};
 
  useEffect(() => {
    sessionStorage.setItem(
      "ai-chat-history",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
  console.log("Connecting...");

  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Connected", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.log("❌ Connect Error:", err.message);
  });

  socket.on("recipe-status", (data) => {
    console.log("recipe-status", data);
    setLoading(true);
    setLoadingMessage(data.message);
  });

  socket.on("recipe-complete", (data) => {
    console.log("recipe-complete", data);

    setLoading(false);
    setLoadingMessage("");

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        type: "recipe",
        recipe: data.data.recipe,
      },
      {
        role: "assistant",
        type: "cart",
        cart: data.data.cart,
      },
    ]);
  });

  socket.on("recipe-error", (data) => {
    console.log("recipe-error", data);

    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        type: "text",
        content: data.message,
      },
    ]);
  });

  return () => {
    socket.removeAllListeners();
    socket.disconnect();
  };
}, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loadingMessage]);

  const handleSend = () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        type: "text",
        content: userMessage,
      },
    ]);

    socket.emit("generate-recipe", userMessage);

    setMessage("");
  };

  const clearChat = () => {
    sessionStorage.removeItem("ai-chat-history");
    setMessages(DEFAULT_MESSAGES);
  };

  return (
    <div className="h-full flex flex-col bg-[#f3f5f4]">
      <div className="bg-[#00B140] px-5 py-4 text-white flex justify-between items-center">
        <h2 className="font-bold">Quickcart AI</h2>

        <button
          onClick={clearChat}
          className="text-sm bg-white text-green-700 px-3 py-1 rounded-full"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-4">
        {messages.map((msg, index) => {
          if (msg.type === "recipe") {
            return (
              <RecipeCard
                key={index}
                recipe={msg.recipe}
				 menuOptions={[
    {
      label: "Save Recipe",
      onClick: ()=>{
		handleSaveRecipe(msg.recipe,index)
	  },
    },]}
              />
            );
          }

          if (msg.type === "cart") {
            return (
              <CartCard
                key={index}
                cart={msg.cart}
              />
            );
          }

          return msg.role === "user" ? (
            <div
              key={index}
              className="flex justify-end"
            >
              <div className="bg-[#00B140] text-white px-4 py-3 rounded-2xl max-w-[80%]">
                {msg.content}
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex gap-2"
            >
              <Bot size={18} />

              <div className="bg-white px-4 py-3 rounded-2xl shadow max-w-[80%]">
                {msg.content}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2">
            <Bot size={18} />

            <div className="bg-white px-4 py-3 rounded-2xl shadow flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />

              <span>{loadingMessage}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 bg-transparent outline-none"
            placeholder="Ask for recipes..."
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}