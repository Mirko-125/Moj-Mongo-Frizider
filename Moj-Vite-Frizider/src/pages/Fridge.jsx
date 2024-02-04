import React, { useState, useEffect, useSyncExternalStore } from 'react';
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
        description: "Socna vruca pica",
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

function Fridge() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

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
      </div>
      <DisplayComponent data={Recipes} className="display-component"/>
    </div>
  )
}

export default Fridge
