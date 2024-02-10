import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayComponent from "../components/DIsplayComponent"
import IngredientsDialog from '../components/IngradientsDialog';
import CuisinesDialog from '../components/CuisinesDialog';
import '../styles/Chef.css';
import '../styles/Fridge.css'


function Chef() {
    const [chefId, setChefId] = useState('');
    const [chefName, setChefName] = useState('');
    const [chefEmail, setChefEmail] = useState('');
    const [chefCuisines, setChefCuisines] = useState([]);
    const [recipes, setChefRecipes] = useState([]);
    const [singleChef, setSingleChef] = useState([]);
    const [showIngredientsDialog, setShowIngredientsDialog] = useState(false);
    const [showCuisinesDialog, setShowCuisinesDialog] = useState(false);
    const navigate = useNavigate();

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
  
  const handleCreateRecipe = () => {
    navigate(`/createRecipe?chefName=${chefName}`);
  }

    const handleFindChef = () => {
      return fetch(`http://localhost:3000/user/getwithrecipes/Gordon Ramsay`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setChefId(data._id);
            setChefName(data.name);
            setChefEmail(data.email);
            setChefRecipes(data.recipes);
            setUniqueCuisines(data.recipes);
              return data;
          })
          .catch(error => {
              console.error(error);
          });
          
      };

      useEffect(() => {
        handleFindChef();
    }, []);

    return (
      <div className='chef-page'>
         <div className="diy-fridge">
            <div className='chef-info-crud'>
              <div className='chef-info'>
                  <h2>Chef:</h2>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgHdEXBSYLS23_gZR0pROX5tjSZy4ZxuK4w&usqp=CAU" alt="chef-image" />
                  </div>
                  Name: {chefName}<br/>
                  Email: {chefEmail}<br/>
              </div>
              <div className='crud-info'>
                {!showIngredientsDialog && (
                  <button className='chef-button tall' onClick={openIngredientsDialog}>Ingredients</button>
                )}
                <div>
                  <IngredientsDialog isOpen={showIngredientsDialog} onClose={closeIngredientsDialog} />
                </div>
                {!showCuisinesDialog && (
                  <button className='chef-button tall' onClick={openCuisinesDialog}>Cuisines</button>
                )}
                <div>
                  <CuisinesDialog isOpen={showCuisinesDialog} onClose={closeCuisinesDialog} />
                </div>
                <button className='chef-button tall' onClick={() => handleCreateRecipe()}>Create new recipe</button>    
              </div>
            </div>
          </div>
        <DisplayComponent data={recipes} className="display-component"/>
      </div>
    )
}
  
  export default Chef