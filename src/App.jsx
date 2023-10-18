import { useState, useEffect } from 'react'
import './App.css'
import Card from './Components/card.jsx';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [foodData, setfoodData] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);
  const [averageCalories, setAverageCalories] = useState(0);
  //cuisine picker, calories slider
  useEffect(() => {
    const fetchFoodData = async () => {
      const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=chinese&apiKey=${API_KEY}&number=10&addRecipeInformation=true&addRecipeNutrition=true` 
        );
      const json = await response.json();
      setfoodData(json);
      setFilteredResults(json);
      setTotalRecipes(json.totalResults);
      console.log(json); //log
      let healthScore = 0;
      let avgCalories=0;
      for(let i = 0;i < json.number;i++){
        healthScore+=json.results[i].healthScore;
        avgCalories+=json.results[i].nutrition.nutrients[0].amount;
      }
      setAverageHealthScore(healthScore/json.number);
      setAverageCalories((avgCalories/json.number).toFixed(2));
    };
    fetchFoodData().catch(console);  
  }, []);


  //searches
  const searchItems = async (food, ingredient) => {
    setSearchFoodInput(food);
    setSearchIngredint(ingredient);
  
    console.log("start");
    console.log(foodData);
  
    // Clone the original data to avoid mutating it directly
    const initialResults = { ...foodData };
  
    // Set the initial results
    setFilteredResults(initialResults);
  
    // Perform ingredient search if provided
    if (ingredient !== "") {
      const updatedResults = await searchIngredients(initialResults, ingredient);
      setFilteredResults(updatedResults);
    }
  
    // Perform food search if provided
    if (food !== "") {
      const updatedResults = await searchFoods(initialResults, food);
      setFilteredResults(updatedResults);
    }
  
    // Update the display with the filtered results
    setDisplay(
      initialResults &&
        Object.entries(initialResults.results).map(([dish]) => (
          <Card
            image={initialResults.results[dish].image}
            ingredients={initialResults.results[dish].nutrition.ingredients}
            name={initialResults.results[dish].title}
            calories={initialResults.results[dish].nutrition.nutrients[0].amount}
            healthScore={initialResults.results[dish].healthScore}
          />
        ))
    );
  
    console.log("TEST");
    console.log(initialResults.results);
  };
  // const searchItems = async (food, ingredient) => {
  //   setSearchFoodInput(food);
  //   setSearchIngredint(ingredient);
  //   setDisplay(foodData && Object.entries(foodData.results).map(([dish]) => 
  //       <Card image={foodData.results[dish].image} 
  //       ingredients={foodData.results[dish].nutrition.ingredients} 
  //       name={foodData.results[dish].title} 
  //       calories={foodData.results[dish].nutrition.nutrients[0].amount  } 
  //       healthScore={foodData.results[dish].healthScore}/> 
  //     )
  //   );
  //   console.log("start");
  //   console.log(foodData);
  //   console.log(filteredResults);
  //   await setFilteredResults(foodData);
  //   if(ingredient != "") {
  //      await searchIngredients(filteredResults, ingredient);
  //   }
  //   if(food != "") {
  //      await searchFoods(filteredResults, food);
  //   }
  //   console.log("TEST");
  //   console.log(filteredResults.results);
  // };

  const searchFoods = (data, searchFood) => {
    console.log("food");
    console.log(data);
  
    if (searchFood !== "") {
      const filtered = Object.fromEntries(
        Object.entries(data.results).filter(([, item]) =>
          item.title.toLowerCase().includes(searchFood.toLowerCase())
        )
      );
  
      data.results = filtered;
      console.log(data);
      console.log("food2");
    }
  };

  const searchIngredients = (data, searchIngredient) => {
    console.log("ing");
    console.log(data);
  
    if (searchIngredient !== "") {
      const filtered = Object.fromEntries(
        Object.entries(data.results).filter(([, item]) =>
          item.nutrition.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
          )
        )
      );
  
      data.results = filtered;
      console.log(data);
      console.log("ing2");
    }
  };
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchFoodInput, setSearchFoodInput] = useState("");
  const [searchIngredient, setSearchIngredint] = useState("");
  const [display, setDisplay] = useState(foodData && Object.entries(foodData.results).map(([dish]) => 
                                  <Card image={foodData.results[dish].image} 
                                  ingredients={foodData.results[dish].nutrition.ingredients} 
                                  name={foodData.results[dish].title} 
                                  calories={foodData.results[dish].nutrition.nutrients[0].amount  } 
                                  healthScore={foodData.results[dish].healthScore}/> 
                                )
                              );
  const [searched, setSearched] = useState(false);
  return (
    <div className = "the-world">
      <h1>Amazing Recipes!</h1>
      <div className = "stats-container">
        <div className= "stat-card">
          <h3>Total Number of Recipes</h3>
          <h4>{totalRecipes}</h4>
        </div>
        <div className= "stat-card">
          <h3>Average Health Score</h3>
          <h4>{averageHealthScore}</h4>
        </div>
        <div className= "stat-card">
          <h3>Average Calories:</h3>
          <h4>{averageCalories}</h4>
        </div>
      </div>
      
      <div className = "search-bars">
        <input
          type="text"
          placeholder="Foods"
          onChange={(inputString) => setSearchFoodInput(inputString.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients"
          onChange={(inputString) => setSearchIngredint(inputString.target.value)}
        />
        <button onClick={() => searchItems(searchFoodInput, searchIngredient)}></button>
      </div>
      {
        display
      }
      
    </div>
  )
}

export default App