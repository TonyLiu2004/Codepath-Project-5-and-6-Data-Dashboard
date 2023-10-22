import { useState, useEffect } from 'react'
import './App.css'
import Card from './Components/card.jsx';
import Chart from './Components/Chart.jsx';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [foodData, setfoodData] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);
  const [averageCalories, setAverageCalories] = useState(0);
  const [cuisine, setCuisine] = useState("chinese");
  const [filteredResults, setFilteredResults] = useState(null);

  useEffect(() => {
    const fetchFoodData = async () => {
      const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${API_KEY}&number=100&addRecipeInformation=true&addRecipeNutrition=true` 
        );
      const json = await response.json();
      setfoodData(json);
      setFilteredResults(json);
      setTotalRecipes(json.totalResults);
      console.log(json); //log
      let healthScore = 0;
      let avgCalories=0;
      let num = 0;
      if(json.number < json.totalResults) num = json.number;
      else num = json.totalResults
      for(let i = 0;i < num;i++){
        healthScore+=json.results[i].healthScore;
        avgCalories+=json.results[i].nutrition.nutrients[0].amount;
      }
      setAverageHealthScore((healthScore/json.totalResults).toFixed(2));
      setAverageCalories((avgCalories/json.totalResults).toFixed(2));
    };
    fetchFoodData().catch(console);  
  }, [cuisine]);


  //searches
  const searchItems = async (food, ingredient, slider) => {
    setSearchFoodInput(food);
    setSearchIngredint(ingredient);
  
    let updatedResults  = { ...foodData };
    setFilteredResults(updatedResults);
  
    if (ingredient !== "") {
      searchIngredients(updatedResults, ingredient);
      setFilteredResults(updatedResults);
    }
  
    if (food !== "") {
      searchFoods(updatedResults, food);
      setFilteredResults(updatedResults);
    }
  
    if(slider != 0){
      searchCalories(updatedResults, slider);
      setFilteredResults(updatedResults);
    } 

  };

  const searchFoods = (data, searchFood) => {
    console.log("food");
    console.log(data);
    setSearched(true);
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
    setSearched(true);
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

  const searchCalories = (data, calories) => {
    console.log("calories");
    setSearched(true);
    if(calories != 0){
      const filtered = Object.fromEntries(
        Object.entries(data.results).filter(([, item]) =>
          item.nutrition.nutrients[0].amount < calories
        )
      );
      console.log(filtered);
      data.results = filtered;
    }
  }

  const handleCuisineChange = (event) => {
    setSearchFoodInput("");
    setSearchIngredint("");
    setSliderValue(0);
    setCuisine(event.target.value);
    setSearched(false);
  };
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
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if(filteredResults != null){
      console.log("FILTER: ");
      console.log(filteredResults);
      setDisplay(
        filteredResults &&
          Object.entries(filteredResults.results).map(([dish]) => (
            <Card
              image={filteredResults.results[dish].image}
              ingredients={filteredResults.results[dish].nutrition.ingredients}
              name={filteredResults.results[dish].title}
              calories={filteredResults.results[dish].nutrition.nutrients[0].amount}
              healthScore={filteredResults.results[dish].healthScore}
              id = {filteredResults.results[dish].id}
            />
          ))
      );
    }
  }, [filteredResults]);
  return (
    <div className = "the-world">
      { searched ? 
      <Chart data = {filteredResults}></Chart>
      : <Chart data = {foodData}></Chart>
      }
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
        <div className = "cuisine-picker">
          <label>Cuisine: </label>
          <select id="foodSelect" name="food" value={cuisine} onChange = {handleCuisineChange}>
            <option value="african">African</option>
            <option value="asian">Asian</option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="cajun">Cajun</option>
            <option value="caribbean">Caribbean</option>
            <option value="chinese">Chinese</option>
            <option value="european">European</option>
            <option value="french">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Jewish">Jewish</option>
            <option value="Korean">Korean</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="Nordic">Nordic</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>
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
        <div className = "sliderClass">
          <label>Calories: {sliderValue}</label>
          <input 
            type="range" 
            name="calories-slider" 
            min="0.0" 
            max="1000.0" 
            step="10"
            onChange={(slide) => setSliderValue(parseFloat(slide.target.value))}
          />
        </div>
        <button onClick={() => searchItems(searchFoodInput, searchIngredient, sliderValue)}>Search</button>
      </div>
      { searched ? 
          display
        : foodData && Object.entries(foodData.results).map(([dish]) => 
            <Card image={foodData.results[dish].image} 
            ingredients={foodData.results[dish].nutrition.ingredients} 
            name={foodData.results[dish].title} 
            calories={foodData.results[dish].nutrition.nutrients[0].amount  } 
            healthScore={foodData.results[dish].healthScore}
            id = {foodData.results[dish].id}/> 
          )
      }
      
    </div>
  )
}

export default App