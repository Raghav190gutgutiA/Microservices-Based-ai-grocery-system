const axios = require("axios");

exports.decreaseStock =
  async (
    productId,
    quantity,
    token
  ) => {

    await axios.put(
      `${process.env.INVENTORY_URL}/api/products/decrease-stock`,
      {
        productId,
        quantity,
      },
       {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
  };

  

exports.increaseStock =
  async (
    productId,
    quantity
  ) => {

    await axios.put(
      `${process.env.INVENTORY_URL}/api/products/increase-stock`,
      {
        productId,
        quantity,
      },
	   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
  };