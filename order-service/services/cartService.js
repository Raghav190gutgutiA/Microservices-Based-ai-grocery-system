const axios = require("axios");

exports.getCart = async (
  token
) => {
  const res = await axios.get(
    `${process.env.CART_URL}/api/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

exports.clearCart = async (
  token
) => {
  await axios.post(
    `${process.env.CART_URL}/api/cart/clear`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};