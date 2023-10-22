import React, { Component, useEffect, useState } from "react";

const Chart = (data) => {
    useEffect(() => {
        if (data.data !== null) {
            console.log("Chart data");
            console.log(data);
            console.log("Chart data2");
            const ingredientCounts = {};
            data.data.results.forEach((item) => {
                item.nutrition.ingredients.forEach((ingredient) => {
                    ingredientCounts[ingredient.name] = (ingredientCounts[ingredient.name] || 0) + 1;
                });
            });
            console.log(ingredientCounts);
            console.log("end chart");
        }
    }, [data]);


    return (
        <>
        <p>Chart</p>
        </>
    )
};

export default Chart;