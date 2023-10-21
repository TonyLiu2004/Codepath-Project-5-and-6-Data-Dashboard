import React, {useState } from "react";
import './card.css'

const Card = ({name, image, ingredients, calories, healthScore, id}) => {
    console.log(id);
    return(
        <div className = "container">
            <img className = "recipe-image" src = {image} alt = {`Image: ${image}`}/>
            <div className="recipe-details">
                <h2 className= "recipe-name">{name}</h2>
                <div className="recipe-parts">
                    <h4>Ingredients: {ingredients.map(item => item.name).join(', ')}</h4>
                    <h4>Calories: {calories}</h4>
                    <h4>Health Score: {healthScore}</h4>
                </div>
            </div>
        </div>
    );
};

export default Card;