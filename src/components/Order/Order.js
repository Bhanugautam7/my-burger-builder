import React from 'react';
import classes from './Order.module.css';
const order =(props) =>{
    const ingredients = [];
     for( let igname in props.ingredients){
         ingredients.push({
             name:  igname,
             amount: props.ingredients[igname]
            })
     }

     const ingredientOutput = ingredients.map(ig =>{
             return (
                 <span
                 style={{
                     textTransform: 'capitalize',
                     display:'inline-block',
                     padding:'8px',
                     margin: '0 10px',
                     border: '1px solid #ccc'
                 }}
                  key={ig.name}>{ig.name}({ig.amount})</span>
             );
     });

    return(
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
    );
   
};


export default order;