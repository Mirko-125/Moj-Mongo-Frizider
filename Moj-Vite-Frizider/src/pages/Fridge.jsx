import React, { useState, useEffect } from 'react';
import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

const Recipes = [
    {
      name: "Tortelini sa pecurkama",
      description: "Preukusni tortelini sa pecurkama i pavlakom",
      cheff: "Grk iz leptokarije",
      cuisine: "Greek",
      cookingType: "Kuvano",
      category: "Rucak",
      ingredients: ["Tortelini", "Pecurke", "Pavlaka"],
      likedBy: ["Me", "Myself", "I"],
      budget: "€6",
      photo: "https://boldbeanco.com/cdn/shop/articles/IMG_6361_1296x.jpg"
    },
    {
        name: "Pica",
        description: "Socna vruca pica. Kod kuće nije lako napraviti pizzu. Minimalna temperatura potrebna za pečenje pizze je 350ᵒC ili 662ᵒF, a to je glavni problem, jer kućna pećnica ne postiže dovoljno visoku temperaturu da peče dobru pizzu. Ovaj video prikazuje da se i kod kuće može ispeći savršena pizza pomoću dvostrukog pečenja.",
        cheff: "Mirko",
        cuisine: "Moja",
        cookingType: "Peceno",
        category: "Vecera",
        ingredients: ["Testo", "Pecurke", "Sunka", "Kackavalj", "Paradajz sos"],
        likedBy: ["Hana", "Jovana", "Una", "Jana"],
        budget: "€2",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg"
      },
      {
        name: "Pica",
        description: "Socna vruca pica. Kod kuće nije lako napraviti pizzu. Minimalna temperatura potrebna za pečenje pizze je 350ᵒC ili 662ᵒF, a to je glavni problem, jer kućna pećnica ne postiže dovoljno visoku temperaturu da peče dobru pizzu. Ovaj video prikazuje da se i kod kuće može ispeći savršena pizza pomoću dvostrukog pečenja.",
        cheff: "Mirko",
        cuisine: "Moja",
        cookingType: "Peceno",
        category: "Vecera",
        ingredients: ["Testo", "Pecurke", "Sunka", "Kackavalj", "Paradajz sos"],
        likedBy: ["Hana", "Jovana", "Una", "Jana"],
        budget: "€2",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg"
      }
  ];

const Ingredients = [
  {
    name: "Tortelini",
    category: "Pasta",
    budget: "€2"
  },
  {
    name: "Pecurke",
    category: "Povrce",
    budget: "€2"
  },
  {
    name: "Pavlaka",
    category: "Mlecni proizvod",
    budget: "€2"
  },
  {
    name: "Testo",
    category: "Pecivo",
    budget: "€0.5"
  },
  {
    name: "Sunka",
    category: "Meso",
    budget: "€0.5"
  },
  {
    name: "Kackavalj",
    category: "Mlecni proizvod",
    budget: "€0.5"
  },
  {
    name: "Paradajz sos",
    category: "Sos",
    budget: "€0.5"
  }
]

const Categories = [
  {
    category: "Shrooms",
    totalCount: 17,
    names: [
      "Mushrooms",
      "Mushrooms2",
      "Mushroom0",
      "Mushroom1",
      "Mushroom2",
      "Mushroom3",
      "Mushroom4",
      "Mushroom5",
      "Mushroom6",
      "Mushroom7"
    ]
  },
  {
    category: "Vegetable",
    totalCount: 15,
    names: [
      "Vegetable0",
      "Vegetable1",
      "Vegetable2",
      "Vegetable3",
      "Vegetable4",
      "Vegetable5",
      "Vegetable6",
      "Vegetable7",
      "Vegetable8",
      "Vegetable9"
    ]
  }
];

function Fridge() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  let usedIngredients = [];

  const handleSelectIngredient = (ingredient) => {
    let ingredientArea = document.getElementById("ingredients");
    if (!usedIngredients.includes(ingredient.name)) 
    {
      usedIngredients.push(ingredient.name);
      const button = document.createElement("button");
      button.className = "select-ingredient";
      button.addEventListener("click", () => {
        usedIngredients.indexOf(ingredient.name) > -1 && usedIngredients.splice(usedIngredients.indexOf(ingredient.name), 1);
        button.remove(); });
      button.textContent = ingredient.name;
      ingredientArea.appendChild(button);
    }
  }

  useEffect(() => {
    setRecipes([
      // Your hardcoded recipes here...
    ]);
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    setIngredients([
      // Your hardcoded ingredients here...
    ]);
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <div className="fridge-page">
      <div className="diy-fridge">
        <input className="searchbox" type="text" placeholder="Search..."/>
        <div className="ingredients">
          <h3 className="sub-title">Your ingredients</h3>
            <div id="ingredients" className="mini-ingredients"/>
            <div style={{ borderTop: '0.1rem solid white', marginTop: '0.5rem' }}/>
              {Categories.map((category) =>(
                <div key={category.category}>
                  <h3 className="sub-title">{category.category}</h3>
                  <div className="mini-ingredients">
                  {Ingredients.map((ingredient, index) => (
                    <button key={index} className="select-ingredient" onClick={() => handleSelectIngredient(ingredient, index)}>
                      {ingredient.name}
                    </button>
                ))}
                </div>
              </div>
              ))}
        </div>
      </div>
      <DisplayComponent data={Recipes} className="display-component"/>
    </div>
  )
}
export default Fridge;