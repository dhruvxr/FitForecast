import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null); // Track selected meal's ID
  const [mealDetails, setMealDetails] = useState(null); // Store details of the selected meal
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState(null); // Error state to capture any errors

  // Fetch meal ideas from TheMealDB API based on ingredient
  const fetchMealIdeas = async (ingredient) => {
    if (ingredient) {
      try {
        setLoading(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch meal ideas');
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch meal details (including ingredients) from TheMealDB API based on idMeal
  const fetchMealDetails = async (idMeal) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        setMealDetails(data.meals[0]); // Store the selected meal's details
      } else {
        setMealDetails(null);
      }
    } catch (err) {
      setError('Failed to fetch meal details');
    }
  };

  // Extract ingredients from meal details
  const getIngredients = () => {
    if (!mealDetails) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (mealDetails[ingredientKey] && mealDetails[measureKey]) {
        ingredients.push({
          ingredient: mealDetails[ingredientKey],
          measure: mealDetails[measureKey],
        });
      }
    }
    return ingredients;
  };

  // Handle selecting a meal idea and fetch its details
  const handleMealSelect = (mealId) => {
    // If the same meal is clicked again, toggle the details visibility
    if (selectedMealId === mealId) {
      setSelectedMealId(null); // Close meal details
      setMealDetails(null); // Clear previous meal details
    } else {
      setSelectedMealId(mealId); // Set selected meal ID
      fetchMealDetails(mealId); // Fetch details including ingredients
    }
  };

  useEffect(() => {
    if (ingredient) {
      fetchMealIdeas(ingredient);
    }
  }, [ingredient]);

  return (
    <div className="meal-ideas-container">
      <h2>Meal Ideas</h2>
      {loading && <p>Loading meal ideas...</p>}
      {error && <p>{error}</p>}
      <ul>
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            onClick={() => handleMealSelect(meal.idMeal)} // Toggle meal details visibility
            style={{ cursor: 'pointer', margin: '10px 0' }}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} width="50" />
            <span>{meal.strMeal}</span>

            {/* Show ingredients for the selected meal */}
            {selectedMealId === meal.idMeal && mealDetails && (
              <div className="meal-details">
                <h4>Ingredients:</h4>
                <ul>
                  {getIngredients().map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.ingredient} - {ingredient.measure}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
