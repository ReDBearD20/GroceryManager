import React, { useCallback } from "react";
import { useState } from "react/cjs/react.development";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //we use below to render the already stored data in our firebase db after every app refresh
  //as we already do this in search component
  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-57172-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);
  //as in js functions are recreated every render cycle therefore this function is created again and again
  //and its pass to search component as new function everytime and useEffect will render the component again
  //therefore when search is loaded again so do the parent component therefore infinite loop to avoid this
  //we use useCallback to cache the function we know will not change therefore dependency in useeffect will not change

  const onLoadIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const onAddIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://react-hooks-57172-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        Headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngre) => [
          ...prevIngre,
          {
            id: responseData.name,
            ...ingredient,
          },
        ]);
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  };

  const onRemoveItemHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-57172-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        setUserIngredients((prevIngre) =>
          prevIngre.filter((ingredient) => ingredient.id !== ingredientId)
        );
      })
      .catch((error) => {
        setError("Something went wrong");
      });
    // setUserIngredients((prevIngre) =>
    //   prevIngre.filter((ingredient) => ingredient.id !== ingredientId)
    // );
  };
  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={onAddIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={onRemoveItemHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
