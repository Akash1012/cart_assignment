const cart = ["shoes", "pants", "kurta"];

const promise = creatOrder(cart);

promise
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    return procedToPayment(orderId);
  })
  .then(function (orderId) {
    console.log("PAYMENT IS DONE .. !", orderId);
  })
  .catch(function (error) {
    console.log(error.message);
  });

/// Producer

function creatOrder(cart) {
  const pr = new Promise(function (reslove, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    // logic for createOrder

    const orderId = 12345;
    if (orderId) {
      reslove(orderId);
    }
  });

  return pr;
}

function validateCart() {
  return true;
}

function procedToPayment(orderId) {
  return new Promise(function (reslove, reject) {
    reslove(orderId);
  });
}
