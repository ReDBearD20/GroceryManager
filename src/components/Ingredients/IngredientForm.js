import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  //single source of truth is used via passing our state to value in form

  const setTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const setAmountHandler = (event) => {
    setAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //onAddIngredient is parent callback used to pass value back to parent comp
    //passing the values of title and amount we get from user form input
    props.onAddIngredient({
      title: title,
      amount: amount,
    });
  };

  return (
    <section className="ingredient-form">
      <h1>Grocery Manager App</h1>
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={setTitleHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={setAmountHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
