import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRecipe.css';
import SearchableSelect from '../components/SearchableSelect';

const cookingTypes=["Sous Vide", "Poaching", "Simmering", "Steaming", "Boiling", "Baking", "Grilling", "Roasting", 
    "Sauteing", "Frying", "Broiling", "Braising", "Stewing", "Glossary",];

function CreateRecipe(){
    const [recipeName, setRecipeName] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeCuisine, setRecipeCuisine] = useState('');
    const [recipeCategories, setRecipeCategories] = useState('');
    const [recipeCookingType, setRecipeCookingType] = useState('');
    const [recipeBudget, setRecipeBudget] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [placeholder, setPlaceholder] = useState("");
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [key, setKey] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chefName = searchParams.get('chefname');

    useEffect(() => {
      setPlaceholder("Select an ingredient...")
      fetch('http://localhost:3000/ingredient')
          .then(response => response.json())
        .then(data => {
          // Flatten the array of ingredients
          const allIngredients = data.reduce((acc, category) => {
            return [...acc, ...category.ingredients];
          }, []);
          setAllIngredients(allIngredients);
        })
        .catch(error => {
          // Handle error if fetch fails
          console.error('Error fetching ingredients:', error);
        });
        fetch('http://localhost:3000/cuisine')
        .then(response => response.json())
        .then(data => setAllCuisines(data));
    }, []);

    const handleRefreshPlaceholder = () => {
        setPlaceholder('Select an ingredient...');
        // Increment the key to remount the component
        setKey(prevKey => prevKey + 1);
      };
   
    
    const handleSelect = (selectedOption) => {
        setSelectedIngredient(selectedOption);
    };

    useEffect(() => {
      console.log(recipeIngredients);
    }, [recipeIngredients]);

     var AllInputsFilled = () => {
        if ( recipeName == "" || recipeDescription == "" || recipeBudget == "" || recipeIngredients.length  == 0 || recipeCategories  == "" )
        {  
          alert("Fill all inputs!");
          return false;
        }
        return true;
      };

    const handleAddIngredient = () => {
        handleRefreshPlaceholder();
        if (Object.keys(selectedIngredient).length === 0)
        {
          return;
        }
        let ingredientArea = document.getElementById("chosen-ingredients");
        if (!recipeIngredients.some(item => item._id === selectedIngredient._id))
        {
            setRecipeIngredients([...recipeIngredients, selectedIngredient]);;
            const button = document.createElement("button");
            button.className = "select-ingredient";
            button.addEventListener("click", () => {
                setRecipeIngredients(prevIngredients => {
                  return prevIngredients.filter(ingredient => ingredient.name !== button.textContent);
              });
              button.remove(); });
            button.textContent = selectedIngredient.name;
            ingredientArea.appendChild(button);
        }
    };

    const handleAddRecipe = () => {
      
      if(!AllInputsFilled())
      {
        return;
      }

      let listIds=[];
      recipeIngredients.forEach(ing=>{
        listIds=[...listIds,ing._id];})
      const categoriesList = recipeCategories.split(',').map(item => item.trim());
      const recipeData = {
        name: recipeName,
        imageURL: recipeImage ? recipeImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhlL5GueEHuV1mUPSf2M-gd4vt6aRqnsNQ1g&usqp=CAU",
        description: recipeDescription,
        category: categoriesList,
        cookingType: recipeCookingType ? recipeCookingType : cookingTypes[0],
        budget: recipeBudget,
        ingredientIds: listIds,
        cuisineId: recipeCuisine ? recipeCuisine : allCuisines[0]._id,  
    };
    const data = JSON.stringify(recipeData);
    console.log(data);
    fetch('http://localhost:3000/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            // Handle the error if needed
            console.error(error);
        });
        navigate(`/chef`)
  };
  
    return(
        <div className='recipe-page'>
            <div></div>
            <div className='recipe-info'>
            <h1>Create new recipe:</h1>
            <input
              className='createRecipe-input' 
              type="text" 
              placeholder="Recipe name" 
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <input 
              className='createRecipe-input'
              type="text" 
              placeholder="Categories" 
              onChange={(e) => setRecipeCategories(e.target.value)}
            />
             <input
              className='createRecipe-input' 
              type="text" 
              placeholder="Recipe budget" 
              onChange={(e) => setRecipeBudget(e.target.value)}
            />
            <input 
              className='createRecipe-input'
              type="text" 
              placeholder="ImageURL" 
              onChange={(e) => setRecipeImage(e.target.value)}
            />
            <label className='label-choose' >Choose a cooking type:</label>
            <select 
              className='createRecipe-input'
              value={recipeCookingType}
              onChange={(e) => setRecipeCookingType(e.target.value)}
            >
                {cookingTypes.map(cookingType => (
                    <option key={cookingType}>{cookingType}</option>
                ))}
            </select>
            <label className='label-choose' >Choose a cuisine:</label>
            <select 
              className='createRecipe-input'
              value={recipeCuisine}
              onChange={(e) => setRecipeCuisine(e.target.value)}
            >
                {allCuisines.map(cuisine => (
                    <option key={cuisine._id} value={cuisine._id}>{cuisine.name}</option>
                ))}
            </select>
            
            <div>
                <h3>Add recipe ingredients:</h3>
                <div className='selectandbutton'>
                    <SearchableSelect key={key} options={allIngredients} onSelect={handleSelect} placeholder={placeholder} />
                    <button onClick={() => handleAddIngredient()} >Add</button>
                </div>
                <h3>Chosen ingredients:</h3>
                <div id='chosen-ingredients'>
                </div>
            </div>
                <h3>Describe making process:</h3>
                <textarea name="description" id="1" cols="30" rows="20" onChange={(e) => setRecipeDescription(e.target.value)}></textarea>
                <button className='chef-button tall add-recipe'onClick={() => handleAddRecipe()} >Add Recipe</button>
        </div>
        <div></div>
        </div>
    )
}

export default CreateRecipe