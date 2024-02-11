import React, { useState, useEffect } from 'react';
import SearchableSelect from '../components/SearchableSelect';
import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

function Fridge() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredientsForSelect, setIngredientsForSelect] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setPlaceholder("Select an ingredient");
    fetch('http://localhost:3000/recipe')
    .then(response => response.json())
    .then(data => {
      setRecipes(data);
      console.log(data);
    })
  },[]);

  useEffect(() => {
    setPlaceholder("Select an ingredient");
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
     const ingredientsData = ingredients.flatMap(ing => ing._id);
     
     if (ingredients.length > 0) {
      console.log(ingredientsData, "asdfasdg");
      fetch('http://localhost:3000/recipe', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(ingredientsData)
      })
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
    } else {
      fetch('http://localhost:3000/recipe')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
    }
   }, [ingredients]);

  useEffect(() => {
    fetch('http://localhost:3000/ingredient')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCategories(data);
      const allIngredients = data.reduce((acc, category) => {
        return [...acc, ...category.ingredients];
      }, []);
     setIngredientsForSelect(allIngredients);
    })
  }, []);   

  const handleSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedIngredient(selectedOption);
  };
  const handleRefreshPlaceholder = () => {
    setPlaceholder('Select an ingredient...');
    // Increment the key to remount the component
    setKey(prevKey => prevKey + 1);
  };
  const handleReloadData = () => {
    handleRefreshPlaceholder();
    
    setReloadData(prevState => !prevState);
  };
  useEffect(() => {
    console.log(selectedIngredient);
     //handleSelectIngredient(selectedIngredient);
     handleReloadData();
     setSelectedIngredient("");
  }, [selectedIngredient]); 

  return (
    <div className="fridge-page">
      <div className="diy-fridge">
        <div>
          <SearchableSelect key={key} options={ingredientsForSelect} onSelect={() =>{handleSelect()}} placeholder={placeholder} />
       </div>
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