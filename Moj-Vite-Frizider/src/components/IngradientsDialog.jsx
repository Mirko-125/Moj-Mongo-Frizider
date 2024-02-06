import React, { useState, useEffect } from 'react';
import '../styles/Dialog.css';
import SearchableSelect from './SearchableSelect';

function IngredientsDialog({ isOpen, onClose }) {
   /*const [ingredients, setIngredients] = useState([]);*/
    const [ingredientId, setIngredientId] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientCategory, setIngredientCategory] = useState('');
    const [ingredientBudget, setIngredientBudget] = useState('');
    const [singleIngredient, setSingleIngredient] = useState({});
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const [key, setKey] = useState(0);
    
    {useEffect(() => {
      setPlaceholder("Select an ingredient...")
      /*fetch('http://localhost:3000/GetAllIngredients')
          .then(response => response.json())
          .then(data => setIngredients(data));*/
    }, []);}
    
    const ingredients = [
        {
          _id: "rggr2213",
          name: "Tortelini",
          category: "Pasta",
          budget: "€2"
        },
        {
          _id: "efe2wrwr3",
          name: "Pecurke",
          category: "Povrce",
          budget: "€2"
        },
        {
          _id: "ewrw22213",
          name: "Pavlaka",
          category: "Mlecni proizvod",
          budget: "€2"
        },
        {
          _id: "eafs213",
          name: "Testo",
          category: "Pecivo",
          budget: "€0.5"
        },
        {
          _id: "efe222213",
          name: "Sunka",
          category: "Meso",
          budget: "€0.5"
        },
        {
          _id: "edvfe13",
          name: "Kackavalj",
          category: "Mlecni proizvod",
          budget: "€0.5"
        },
        {
          _id: "efdef213",
          name: "Paradajz sos",
          category: "Sos",
          budget: "€0.5"
        }
      ];

    const handleSelect = (selectedOption) => {
      setSelectedIngredient(selectedOption);
      setIngredientId(selectedOption._id);
      setIngredientName(selectedOption.name);
      setIngredientCategory(selectedOption.category);
      setIngredientBudget(selectedOption.budget);
    };

    const handleRefreshPlaceholder = () => {
      setPlaceholder('Select an ingredient...');
      // Increment the key to remount the component
      setKey(prevKey => prevKey + 1);
    };

    const handleFindIngredient = () => {
      setShowAdditionalInputs(true);
      setShowUpdateButton(true);  
    };

    const handleCreateIngredient = () => {
      {
        setIngredientName("");
        setIngredientCategory("");
        setIngredientBudget("");
        setShowAdditionalInputs(true);
        setShowAddButton(true);   
      };
    };

    const AllInputsFilled = (name, category, budget) => {
      if(name == "" || category == "" || budget == "")
      {
        alert("Fill all inputs!");
        return false;
      }
      else return true;
    };

    const handleUpdateIngredient = () => {
      { 
        if (selectedIngredient.name == ingredientName  && 
        selectedIngredient.category == ingredientCategory && 
        selectedIngredient.budget == ingredientBudget)
        {
          alert("Can't update, because informations about this ingredient are not changed!");
          return;
        }
        if (!AllInputsFilled(ingredientName, ingredientCategory, ingredientBudget))
        {
          return;
        }
        const ingredientData = {
          _id: ingredientId,
          name: ingredientName,
          category: ingredientCategory,
          budget: ingredientBudget,
        };
        console.log(ingredientData);
        {/*fetch('http://localhost:3000/updateIngredient', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(ingredientData)
      })
          .then(response => response.json())
          .then(data => {
              // Handle the response data if needed
              console.log(data);
          })
          .catch(error => {
              // Handle the error if needed
              console.error(error);
          });*/}
          handleCancel();
      };
    };

    const handleAddIngredient = () => {
      {
        if (!AllInputsFilled(ingredientName, ingredientCategory, ingredientBudget))
        {
          return;
        }
        const ingredientData = {
            name: ingredientName,
            category: ingredientCategory,
            budget: ingredientBudget,
        };
        const data = JSON.stringify(ingredientData);
        console.log(data);
        {/*fetch('http://localhost:3000/Ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
                return data;
            })
            .catch(error => {
                // Handle the error if needed
                console.error(error);
            });*/}
        handleCancel();
      };
    };

    const handleDeleteIngredient = () => {
      if(!AllInputsFilled(ingredientName, ingredientCategory, ingredientBudget))
        {
          return;
        }
      /*fetch(`http://localhost:3000/ingName=${ingredientName}`, {
          method: 'DELETE'
      })
          .then(response => response.json())
          .then(data => {
              // Handle the response data if needed
              console.log(data);
          })
          .catch(error => {
              // Handle the error if needed
              console.error(error);
          });*/
        handleCancel();
    };

    const handleCancel = () => {
      {
        setShowAdditionalInputs(false);
        setShowUpdateButton(false);
        setShowAddButton(false);
        handleRefreshPlaceholder();
        setIngredientName("");
        setIngredientCategory("");
        setIngredientBudget("");
      };
    };

  return (
    <div style={{ display: isOpen ? 'block' : 'none'}}>
      <div className="modal-content" >
        <span className="close" onClick={() =>{onClose(); handleRefreshPlaceholder()}}>&times;</span>
        <h3>Ingredients:</h3>
        {!showAddButton&& (
        <div>
          <SearchableSelect key={key} options={ingredients} onSelect={handleSelect} placeholder={placeholder} />
        </div>
        )}
        {!showAdditionalInputs && (
          <div className='div-buttons'>
            <button className='chef-button' onClick={handleFindIngredient}>Find ingredient</button>
            <button className='chef-button' onClick={handleCreateIngredient}>Create ingredient</button>
          </div>
        )}
        {showAdditionalInputs && (
          <div className="additional-inputs">
            <input 
              className="additional-input"
              type="text" 
              placeholder="name" 
              value={ingredientName}
              readOnly={showUpdateButton ? true : false}
              onChange={(e) => setIngredientName(e.target.value)}
           />
            <input 
              className="additional-input"
              type="text" 
              placeholder="category" 
              value={ingredientCategory} 
              onChange={(e) => setIngredientCategory(e.target.value)} 
              />
            <input
              className="additional-input"
              type="text" 
              placeholder="budget" 
              value={ingredientBudget} 
              onChange={(e) => setIngredientBudget(e.target.value)}
            />
            <div className='div-buttons'>
            {showUpdateButton && (
              <button className='chef-button' onClick={handleUpdateIngredient}>Update ingredient</button>
            )}
             {showAddButton && (
              <button className='chef-button' onClick={handleAddIngredient}>Add ingredient</button>
            )}
             {showUpdateButton && (
              <button className='chef-button' onClick={handleDeleteIngredient}>Delete ingredient</button>
            )}
              <button className='chef-button' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IngredientsDialog;