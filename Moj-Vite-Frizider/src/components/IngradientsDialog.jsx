import React, { useState, useEffect } from 'react';
import '../styles/Dialog.css';
import SearchableSelect from './SearchableSelect';
const BASE_URL = 'http://localhost:3000';
function IngredientsDialog({ isOpen, onClose }) {
    const [ingredients, setIngredients] = useState([]);
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
    const [reloadData, setReloadData] = useState(false);

    const handleReloadData = () => {
      setReloadData(prevState => !prevState);
    };
    
     useEffect(() => {
       setPlaceholder("Select an ingredient...")
       fetch('http://localhost:3000/ingredient')
           .then(response => response.json())
         .then(data => {
           // Flatten the array of ingredients
           const allIngredients = data.reduce((acc, category) => {
             return [...acc, ...category.ingredients];
           }, []);
          setIngredients(allIngredients);
         })
         .catch(error => {
           // Handle error if fetch fails
           console.error('Error fetching ingredients:', error);
         });
     }, [reloadData]);
    

    const handleSelect = (selectedOption) => {
      setSelectedIngredient(selectedOption);
    };

    const handleRefreshPlaceholder = () => {
      setPlaceholder('Select an ingredient...');
      // Increment the key to remount the component
      setKey(prevKey => prevKey + 1);
    };

    const handleFindIngredient = () => {
      fetch(`http://localhost:3000/ingredient/${selectedIngredient._id}`)
        .then(response => response.json())
        .then(data =>{
          setIngredientName(data.name);
          setIngredientCategory(data.category);
          setIngredientBudget(data.budget);
          console.log(data)
          setShowAdditionalInputs(true);
          setShowUpdateButton(true); 
        })
        .catch(error => {
          // Handle error if fetch fails
          console.error('Error fetching ingredients:', error);
        });  
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
          category: ingredientCategory,
          budget: ingredientBudget,
        };
        const data = JSON.stringify(ingredientData);
        console.log(data);
        fetch(`http://localhost:3000/ingredient/${ingredientName}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'withCredentials': 'true'
          },
          body: data
          })
          .then(response => response.json())
          .then(data => {
              // Handle the response data if needed
              console.log(data);
              handleReloadData();
              handleCancel();
          })
          .catch(error => {
              // Handle the error if needed
              console.error(error);
          });
          
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
        fetch('http://localhost:3000/ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'withCredentials': 'true'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                handleReloadData();
                handleCancel();
                return data;
            })
            .catch(error => {
                // Handle the error if needed
                console.error(error);
            });
        
      };
    };

    const handleDeleteIngredient = () => {
      if(!AllInputsFilled(ingredientName, ingredientCategory, ingredientBudget))
        {
          return;
        }
      fetch(`http://localhost:3000/ingredient/${ingredientName}`, {
          method: 'DELETE',
          headers: {
            'withCredentials': 'true',
        },
        })
          .then(response => response.json())
          .then(data => {
              // Handle the response data if needed
              console.log(data);
              handleReloadData();
              handleCancel();
          })
          .catch(error => {
              // Handle the error if needed
              console.error(error);
          });
        
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
        {!showAddButton && (!showUpdateButton) &&(
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