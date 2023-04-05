import React from "react";

function Products({ state, dispatch }) {
  const { products, cart } = state;
  return (
    <div className="products">
      {products.map((product) => {
        return (
          <div key={product.id} className="products__single">
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ height: 200, objectFit: "cover" }}
              onClick={() =>
                dispatch({
                  type: "SHOW_PRODUCT_DETAILS",
                  payload: product,
                })
              }
            />

            <div>
              <span>{product.title}</span>
              <b>$ {product.price}</b>
            </div>

            {cart.some((p) => p.id === product.id) ? (
              <button
                style={{
                  padding: 5,
                  border: 0,
                  borderRadius: 5,
                  backgroundColor: "#e53935",
                  color: "white",
                }}
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  })
                }
              >
                Remove from cart
              </button>
            ) : (
              <button
                style={{
                  padding: 5,
                  border: 0,
                  borderRadius: 5,
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      id: product.id,
                      title: product.title,
                      thumbnail: product.thumbnail,
                      qty: 1,
                      price: product.price,
                    },
                  })
                }
              >
                Add to cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Products;
