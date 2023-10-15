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
  const searchFoods = searchFood => {
    setSearchFoodInput(searchFood);
    if(searchFood != ""){
      const filtered = Object.entries(foodData.results).filter((item)=>
        Object.values(item[1].title)
        .join("")
        .toLowerCase()
        .includes(searchFood.toLowerCase())
      )
      setFilteredResults(filtered);
    }
  }

  const searchIngredients = searchIngredient => {
    //let ingredients = searchIngredient.split(',').map(item => item.trim());
    setSearchFoodInput(searchIngredient);
    if(searchIngredient != ""){
      const filtered = Object.entries(foodData.results).filter((item)=>
        item[1].nutrition.ingredients  
        .some((ingredient) =>
          ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
        )
      )
      setFilteredResults(filtered);
    }
  }

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchFoodInput, setSearchFoodInput] = useState("");
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
          onChange={(inputString) => searchFoods(inputString.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients"
          onChange={(inputString) => searchIngredients(inputString.target.value)}
        />
      </div>
{/* testing cards
      <Card image = "https://spoonacular.com/recipeImages/646425-312x231.jpg" ingredients = {["cookie","bum"]} name = "Fried rice" calories = "10" healthScore={100}/>
      <Card image = "https://spoonacular.com/recipeImages/663169-312x231.jpg" ingredients = {["cookie","bum"]} name = "Random Salad" calories = "10" healthScore={100}/>
      <Card image = "https://spoonacular.com/recipeImages/638642-312x231.jpg" ingredients = {["cookie","bum"]} name = "Bum Salad" calories = "10" healthScore={100}/>
      <Card image = "https://spoonacular.com/recipeImages/660231-312x231.jpg" ingredients = {["cookie","bum"]} name = "Veggie Fried Rice" calories = "10" healthScore={100}/> */}

      {searchFoodInput.length > 0 ? 
      filteredResults.map(([dish]) =>
       <Card image={foodData.results[dish].image} 
             ingredients={foodData.results[dish].nutrition.ingredients} 
             name={foodData.results[dish].title} 
             calories={foodData.results[dish].nutrition.nutrients[0].amount} 
             healthScore={foodData.results[dish].healthScore}/> 
        )
        : foodData && Object.entries(foodData.results).map(([dish]) =>
        <Card image={foodData.results[dish].image} 
              ingredients={foodData.results[dish].nutrition.ingredients} 
              name={foodData.results[dish].title} 
              calories={foodData.results[dish].nutrition.nutrients[0].amount} 
              healthScore={foodData.results[dish].healthScore}/>
        )
      }


      {/* {foodData && Object.entries(foodData.results).map(([dish]) =>
       <Card image={foodData.results[dish].image} 
             ingredients={foodData.results[dish].nutrition.ingredients} 
             name={foodData.results[dish].title} 
             calories={foodData.results[dish].nutrition.nutrients[0].amount} 
             healthScore={foodData.results[dish].healthScore}/>
      )} */}
    </div>
  )
}

export default App
