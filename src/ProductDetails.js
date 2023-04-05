import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalRender = (props) => {
  const { title, description, images, rating, price } = props;
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <img
          src={images[0]}
          style={{
            width: "200px",
          }}
        />
        <div>
          <p>
            <b>Price:</b> {price}
          </p>
          <p>
            <b>Rating:</b> {rating}
          </p>
        </div>
      </div>
      <div className={classes.content}>
        <h4>Description:</h4>
        <p>{description}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  const { title, description, images, price, rating } = props.details;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalRender
          title={title}
          description={description}
          images={images}
          price={price}
          rating={rating}
          //   title={props.title}
          //   message={props.message}
          //   onConfirm={props.onConfirm}
        />,
        document.getElementById("renderModal")
      )}
    </>
  );
};

export default ErrorModal;
