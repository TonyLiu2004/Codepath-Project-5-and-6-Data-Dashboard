import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DishDetail.css'
import { Link } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const DishDetail = () =>{
    let params = useParams();
    const [dishData, setDishData] = useState(null);
    useEffect(() => {
        const fetchDishData = async () => {
          const response = await fetch(
              `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}` 
            );
          const json = await response.json();
          setDishData(json);
          console.log(json); //log
        };
        fetchDishData().catch(console);  
      }, []);   
    console.log(dishData);

    // Function to recursively process HTML nodes and create a React component
    const processHTMLNode = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
        const children = Array.from(node.childNodes).map(processHTMLNode);
        if (node.tagName.toLowerCase() === 'a') {
            const href = node.getAttribute('href');
            return <Link to={href}>{children}</Link>;
        }
        return React.createElement(node.tagName.toLowerCase(), {}, ...children);
        } else if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
        }
        return null; // Ignore other node types
    };
    
    const renderHTML = (htmlString) => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmlString;
        return processHTMLNode(tempContainer);
    };

    useEffect(() => {
        if (dishData) {
            console.log(dishData.analyzedInstructions[0].steps);
            setSteps(dishData.analyzedInstructions[0].steps);
        }
    }, [dishData]);
    const [steps, setSteps] = useState([]);
    return (
        <div>
         {
            (dishData !== null) ? (
                <div>
                    <h1>{dishData.title}</h1>
                    <div className = "main-container">
                        <div className = "left-side">
                            <img src = {dishData.image} alt = {dishData.title}></img>
                            <h2>Ingredients: </h2>
                            {
                                dishData.extendedIngredients.map((item, index) => (
                                    <h3>
                                    {index + 1}) {item.original}
                                    </h3>
                                ))
                            }
                        </div>
                        <div className = "right-side">
                            <div>
                                {renderHTML(dishData.summary)}
                            </div>
                            <h2>Steps</h2>
                            {
                                steps.map((item, index) => (
                                    <h3>
                                    {index + 1}) {item.step}
                                    </h3>
                                ))
                            }
                        </div>
                    </div> 
                </div>
            )//end
            : null
         }
        </div>
    )
}

export default DishDetail;