import React, { useState, useEffect } from 'react';
import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

function Fridge() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/recipe')
    .then(response => response.json())
    .then(data => {
      setRecipes(data);
      console.log(data);
    })
  },[]);

  const handleSelectIngredient = (ingredient) => {
    let ingredientArea = document.getElementById("ingredients");
    if (!ingredients.includes(ingredient)) 
    {
      setIngredients([...ingredients, ingredient]);
      const button = document.createElement("button");
      button.className = "select-ingredient";
      button.addEventListener("click", () => {
        console.log(ingredient);
        setIngredients(prevIngredients => {
          return prevIngredients.filter(i => i.name !== button.textContent)
        });
        button.remove(); });
      button.textContent = ingredient.name;
      ingredientArea.appendChild(button);
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
                  {category.ingredients.map((ingredient) => (
                    <button key={ingredient._id} className="select-ingredient" onClick={() => handleSelectIngredient(ingredient)}>
                      {ingredient.name}
                    </button>
                ))}
                </div>
              </div>
              ))}
        </div>
      </div>
      <DisplayComponent data={recipes} className="display-component"/>
    </div>
  )
}
export default Fridge;