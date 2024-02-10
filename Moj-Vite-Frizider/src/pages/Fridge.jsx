import React, { useState, useEffect } from 'react';
import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

function Fridge() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  let usedIngredients = [];

  const handleSelectIngredient = (ingredient) => {
    let ingredientArea = document.getElementById("ingredients");
    if (!ingredients.includes(ingredient.name)) 
    {
      usedIngredients.push(ingredient.name);
      const button = document.createElement("button");
      button.className = "select-ingredient";
      button.addEventListener("click", () => {
        usedIngredients.indexOf(ingredient.name) > -1 && usedIngredients.splice(usedIngredients.indexOf(ingredient.name), 1);
        button.remove(); });
      button.textContent = ingredient.name;
      ingredientArea.appendChild(button);
      setIngredients(usedIngredients);
      console.log(ingredients);
    }
  }

  useEffect(() => {
    const data = ingredients.flatMap(ing => ing._id);
    fetch('http://localhost:3000/recipe', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setRecipes(data);
    })
  }, [ingredients]); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    fetch('http://localhost:3000/ingredient')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCategories(data);
    })
    setIngredients([])
  }, []); 


  return (
    <div className="fridge-page">
      <div className="diy-fridge">
        <input className="searchbox" type="text" placeholder="Search..."/>
        <div className="ingredients">
          <h3 className="sub-title">Your ingredients</h3>
            <div id="ingredients" className="mini-ingredients"/>
            <div style={{ borderTop: '0.1rem solid white', marginTop: '0.5rem' }}/>
              {categories && categories.map((category) => (
                <div key={category.category}>
                  <h3 className="sub-title">{category.category}</h3>
                  <div className="mini-ingredients">
                  {category.ingredients.map((ingredient, index) => (
                    <button key={index} className="select-ingredient" onClick={() => handleSelectIngredient(ingredient, index)}>
                      {ingredient.name}
                    </button>
                ))}
                </div>
              </div>
              ))}
        </div>
      </div>
      {recipes && <DisplayComponent data={recipes} className="display-component"/>}
    </div>
  )
}
export default Fridge;