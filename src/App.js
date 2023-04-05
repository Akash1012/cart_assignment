import "./App.css";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { cartReducer } from "./reducers/cartReducers";
import Product from "./components/products";
import Cart from "./components/cart";
import ErrorModal from "./ProductDetails";

function App() {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
    details: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState();

  const fetchProducts = async () => {
    const { data } = await axios.get(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );

    if (data && data.products) {
      dispatch({
        type: "ADD_PRODUCTS",
        payload: data.products,
      });
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  console.log("State", state);

  useEffect(() => {}, [state.details]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const onConfirm = () => {
    dispatch({
      type: "CLEAR_PRODUCT_DETAILS",
    });
  };
  return (
    <>
      {state.details && (
        <ErrorModal
          onConfirm={onConfirm}
          details={state.details}
          dispatch={dispatch}
        />
      )}
      <div style={{ display: "flex" }}>
        <Product state={state} dispatch={dispatch} />
        <Cart state={state} dispatch={dispatch} />
      </div>
      {state.products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                className={page == index + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(index + 1)}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
}

export default App;
