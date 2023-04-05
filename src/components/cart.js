import React, { useEffect, useState } from "react";

function Cart({ state, dispatch }) {
  const [total, setTotal] = useState(0);
  const { cart } = state;

  const changeQty = (id, qty) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id,
        qty,
      },
    });
  };

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        backgroundColor: "#ececec",
        padding: 10,
        width: "20%",
      }}
    >
      <b style={{ fontSize: 30, alignSelf: "center" }}>Cart</b>
      <b style={{ alignSelf: "center" }}>Subtotal: $ {total}</b>
      {cart.length > 0 ? (
        <>
          {cart.map((product) => {
            return (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  padding: 10,
                  margin: 5,
                  border: "1px solid grey",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: 70, objectFit: "cover" }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <span>{product.title}</span>
                    <b>$ {product.price}</b>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => changeQty(product.id, product.qty - 1)}
                  >
                    -
                  </button>
                  <span>{product.qty}</span>
                  <button
                    onClick={() => changeQty(product.id, product.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <span style={{ padding: "20", alignSelf: "center" }}>
          Cart is Empty
        </span>
      )}
    </div>
  );
}

export default Cart;
