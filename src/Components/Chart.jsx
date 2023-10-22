import React, { Component, useEffect, useState, PureComponent } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (data) => {
    const [counts, setCounts] = useState({});
    useEffect(() => {
        if (data.data) {
            const ingredientCounts = {};
            if(Array.isArray(data.data.results)){
                data.data.results.forEach((item) => {
                    item.nutrition.ingredients.forEach((ingredient) => {
                        ingredientCounts[ingredient.name] = (ingredientCounts[ingredient.name] || 0) + 1;
                    });
                });
            }else{
                Object.entries(data.data.results).map(([, item]) =>
                    item.nutrition.ingredients.forEach((ingredient) => {
                        ingredientCounts[ingredient.name] = (ingredientCounts[ingredient.name] || 0) + 1;
                    })
                )
            }

            const dataForRecharts = Object.keys(ingredientCounts).map((ingredient) => ({
                name: ingredient,
                pv: ingredientCounts[ingredient],
              }));
            dataForRecharts.sort((a, b) => a.pv - b.pv);
            setCounts(dataForRecharts);
        }
    }, [data]);

    const [graph, setGraph] = useState( 
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={counts}
            width={500}
            height={300}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
    </ResponsiveContainer>); 

    useEffect(() => {
        setGraph(
            <BarChart data={counts}
                width={500}
                height={300}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        );
    },[counts]);

    return (
        <>
        {graph}        
        </>
    )
};

export default Chart;