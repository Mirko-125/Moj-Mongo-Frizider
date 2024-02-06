import React, { useState, useEffect } from 'react';
import DisplayComponent from "../components/DIsplayComponent"
import IngredientsDialog from '../components/IngradientsDialog';
import CuisinesDialog from '../components/CuisinesDialog';
import '../styles/Chef.css';
import '../styles/Fridge.css'


function Chef() {
    const [chefName, setChefName] = useState('');
    const [chefEmail, setChefEmail] = useState('');
    const [chefPassword, setChefPassword] = useState('');
    const [chefCuisines, setChefCuisines] = useState([]);
    const [recipes, setChefRecipes] = useState([]);
    const [singleChef, setSingleChef] = useState([]);
    const [showIngredientsDialog, setShowIngredientsDialog] = useState(false);
    const [showCuisinesDialog, setShowCuisinesDialog] = useState(false);

  const openIngredientsDialog = () => {
    setShowIngredientsDialog(true);
  };
  const openCuisinesDialog = () => {
    setShowCuisinesDialog(true);
  };
  
  const closeIngredientsDialog = () => {
    setShowIngredientsDialog(false);
  };
  const closeCuisinesDialog = () => {
    setShowCuisinesDialog(false);
  };

  const Chef={
    name: "Maja Majic",
    email: "mama@gmail.com",
    password: "2463468",
    recipes: [{
      name: 'Recipe 1',
      photo: 'https://posteraj.rs/cdn/shop/products/HPHIFO0034-Hrana_fotografije_losos_i_bilje_1200x630.jpg?v=1619170733',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Kineska",description:"aaaa"},
      category: "Keto",
      cookingType: "Zivo",
      budget: "Budget friendly",
      description: "aaaaaaaaaaaaa",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Slow Cooker Teriyaki Chicken',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Kineska", description:"aaaa"},
      category: "Keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "bbbbbbbb",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Recipe 3',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Kineska",description:"aaaa"},
      category: "keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "cccccccccc",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Recipe 4',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Kineska",description:"aaaa"},
      category: "keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "dddddddddd",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Recipe 5',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Srpska",description:"aaaa"},
      category: "keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "eeeeeeeeeeee",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Recipe 6',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Grcka",description:"aaaa"},
      category: "keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "ffffffffffff",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
    {
      name: 'Recipe 7',
      photo: 'https://i.pinimg.com/236x/9f/89/c3/9f89c3c9d63e3e5ef6b2650461815c52.jpg',
      chef:'neki',
      ingredients:[{name:"jabuka", category:"voce", budget: "low"},{name:"kivi", category:"voce", budget: "low"}],
      cuisine: {name:"Kineska",description:"aaaa"},
      category: "keto",
      cookingType: "zivo",
      budget: "budget friendly",
      description: "ggggggggggggg",
      likedBy: ["Hana", "Jovana", "Una", "Jana"],
    },
  ],
  };

    function compareCuisines(cuisine1, cuisine2) {
      return cuisine1.name === cuisine2.name && cuisine1.description === cuisine2.description;
    }
    
    function setUniqueCuisines(recipes) {
      const uniqueCuisines = [];
    
      recipes.forEach(recipe => {
        const cuisine = recipe.cuisine;
        
        const existingCuisine = uniqueCuisines.find(uniqueCuisine => compareCuisines(uniqueCuisine, cuisine));
    
        if (!existingCuisine) {
          uniqueCuisines.push(cuisine);
        }
      });

      setChefCuisines(uniqueCuisines);
    }
    
    const handleFindChef = () => {
      /*return fetch(`http://localhost:3000/User?userName=${chefName}`)
          .then(response => response.json())
          .then(data => {
              setSingleChef(data);
              return data;
          })
          .catch(error => {
              console.error(error);
          });*/
          setChefName(Chef.name);
          setChefEmail(Chef.email);
          setChefPassword(Chef.password);
          setChefRecipes(Chef.recipes);
          setUniqueCuisines(Chef.recipes);
      };

      useEffect(() => {
        handleFindChef();
    }, []);

    return (
      <div className='chef-page'>
         <div className="diy-fridge">
            <div className='chef-info-crud'>
              <div className='chef-info'>
                  <h2>Cheff:</h2>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgHdEXBSYLS23_gZR0pROX5tjSZy4ZxuK4w&usqp=CAU" alt="chef-image" />
                  </div>
                  Name: {chefName}<br/>
                  Email: {chefEmail}<br/>
                  Cuisines: {chefCuisines.map(cuisine => cuisine.name).join(', ')}
              </div>
              <div className='crud-info'>
                {!showIngredientsDialog && (
                  <button className='chef-button' onClick={openIngredientsDialog}>Ingredients</button>
                )}
                <div>
                  <IngredientsDialog isOpen={showIngredientsDialog} onClose={closeIngredientsDialog} />
                </div>
                {!showCuisinesDialog && (
                  <button className='chef-button' onClick={openCuisinesDialog}>Cuisines</button>
                )}
                <div>
                  <CuisinesDialog isOpen={showCuisinesDialog} onClose={closeCuisinesDialog} />
                </div>
              </div>
            </div>
          </div>
        <DisplayComponent data={recipes} className="display-component"/>
      </div>
    )
}
  
  export default Chef