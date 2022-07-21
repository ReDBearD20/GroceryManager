import React from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  // const onRemoveItemHandler = (id) => {
  //   //onRemoveItem is the parent callback used to pass value back to parent comp
  //   //props.onRemoveItem(id);
  // };
  //onClick={props.onRemoveItem.bind(this, ig.id)}
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          <li key={ig.id}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
            <button
              type="button"
              onClick={props.onRemoveItem.bind(this, ig.id)}
            >
              {" "}
              Remove{" "}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
