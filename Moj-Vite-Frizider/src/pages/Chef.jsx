import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayComponent from "../components/DIsplayComponent"
import IngredientsDialog from '../components/IngradientsDialog';
import CuisinesDialog from '../components/CuisinesDialog';
import '../styles/Chef.css';
import '../styles/Fridge.css'
import { useParams } from 'react-router-dom';

function Chef() {
    const [chefId, setChefId] = useState('');
    const [chefEmail, setChefEmail] = useState('');
    const [chefRName, setChefRName] = useState('');
    const [recipes, setChefRecipes] = useState([]);
    const [singleChef, setSingleChef] = useState([]);
    const [showIngredientsDialog, setShowIngredientsDialog] = useState(false);
    const [showCuisinesDialog, setShowCuisinesDialog] = useState(false);
    const navigate = useNavigate();
    const { chefName } = useParams();
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
    navigate(`/createRecipe`);
  }

    const handleFindChef = () => {
      return fetch(`http://localhost:3000/user/getwithrecipes/${chefName}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setChefId(data._id);
            setChefEmail(data.email);
            setChefRecipes(data.recipes);
            console.log(data);
              return data;

          })
          .catch(error => {
              console.error(error);
          });
          
      };

      useEffect(() => {
          handleFindChef();
    }, [chefName]);

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
              {chefId == sessionStorage.getItem('userId') && (<div className='crud-info'>
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
              </div> )}
            </div> 
          </div> 
        <DisplayComponent data={recipes} className="display-component"/>
      </div>
    )
}
  
  export default Chef