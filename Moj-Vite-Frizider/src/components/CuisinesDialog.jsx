import React, { useState, useEffect } from 'react';
import '../styles/Dialog.css';
import SearchableSelect from './SearchableSelect';

function CuisinesDialog({ isOpen, onClose }) {
    const [cuisines, setCuisines] = useState([]);
    const [cuisineId, setCuisineId] = useState('');
    const [cuisineName, setCuisineName] = useState('');
    const [cuisineDescription, setCuisineDescription] = useState('');
    const [cuisineRecipes, setCuisineRecipes] = useState([]);
    const [singleCuisine, setSingleCuisine] = useState({});
    const [selectedCuisine, setSelectedCuisine] = useState({});
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const [key, setKey] = useState(0);
    const [reloadData, setReloadData] = useState(false);

    const handleReloadData = () => {
      setReloadData(prevState => !prevState);
    };

    {useEffect(() => {
      setPlaceholder("Select cuisine...")
      fetch('http://localhost:3000/cuisine')
          .then(response => response.json())
          .then(data => setCuisines(data));
    }, [reloadData]);}
    
    const handleSelect = (selectedOption) => {
        setSelectedCuisine(selectedOption);
        setCuisineId(selectedOption._id);
        setCuisineName(selectedOption.name);
        setCuisineDescription(selectedOption.description);
        setCuisineRecipes(selectedOption.recipeList);
    };

    const handleRefreshPlaceholder = () => {
        setPlaceholder('Select cuisine...');
        // Increment the key to remount the component
        setKey(prevKey => prevKey + 1);
    };

    const handleFindCuisine = () => {
        setShowAdditionalInputs(true);
        setShowUpdateButton(true);  
    };

    const handleCreateCuisine = () => {
      {
        setCuisineName("");
        setCuisineDescription("");
        setShowAdditionalInputs(true);
        setShowAddButton(true);   
      };
    };

    const AllInputsFilled = (name, description) => {
        if (name == "" || description == "")
        {
          alert("Fill all inputs!");
          return false;
        }
        else return true;
    };
    const handleUpdateCuisine = () => {
      {
        if (selectedCuisine.name == cuisineName  && selectedCuisine.description == cuisineDescription)
        {
            alert("Can't update, because informations about this cuisine are not changed!");
            return;
        }
        if (!AllInputsFilled(cuisineName, cuisineDescription))
        {
            return;
        }
        const cuisineData = {
            name: cuisineName,
            description: cuisineDescription,
        };
        const data = JSON.stringify(cuisineData);
        fetch(`http://localhost:3000/cuisine/${cuisineId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
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

    const handleAddCuisine = () => {
      {
        if (!AllInputsFilled(cuisineName, cuisineDescription))
        {
          return;
        }
        const cuisineData = {
            name: cuisineName,
            description: cuisineDescription,
        };
        const data = JSON.stringify(cuisineData);
        console.log(data);
        fetch('http://localhost:3000/cuisine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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

    const handleDeleteCuisine = () => {
      if (!AllInputsFilled(cuisineName, cuisineDescription))
        {
          return;
        }
      fetch(`http://localhost:3000/cuisine/${cuisineId}`, {
          method: 'DELETE',
          credentials: 'include',
      })
          .then(response => response.json())
          .then(data => {
              handleReloadData();
              console.log(data);
          })
          .catch(error => {
              
              console.error(error);
          });
          handleCancel();
    };
    const handleCancel = () => {
      {
        setShowAdditionalInputs(false);
        setShowUpdateButton(false);
        setShowAddButton(false);
        handleRefreshPlaceholder();
        setCuisineName("");
        setCuisineDescription("");
      };
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none'}}>
          <div className="modal-content" >
            <span className="close" onClick={() =>{onClose(); handleRefreshPlaceholder()}}>&times;</span>
            <h3>Cuisines:</h3>
            {!showAddButton &&  (!showUpdateButton) && (
            <div>
              <SearchableSelect key={key} options={cuisines} onSelect={handleSelect} placeholder={placeholder} />
            </div>
            )}
            {!showAdditionalInputs && (
              <div className='div-buttons'>
                <button className='chef-button' onClick={handleFindCuisine}>Find cuisine</button>
                <button className='chef-button' onClick={handleCreateCuisine}>Create cuisine</button>
              </div>
            )}
            {showAdditionalInputs && (
              <div className="additional-inputs">
                <input 
                  className="additional-input"
                  type="text" 
                  placeholder="name" 
                  value={cuisineName}
                  readOnly={showUpdateButton ? true : false}
                  onChange={(e) => setCuisineName(e.target.value)}
               />
                <input 
                  className="additional-input"
                  type="text" 
                  placeholder="description" 
                  value={cuisineDescription} 
                  onChange={(e) => setCuisineDescription(e.target.value)} 
                  />
                <div className='div-buttons'>
                {showUpdateButton && (
                  <button className='chef-button' onClick={handleUpdateCuisine}>Update cuisine</button>
                )}
                 {showAddButton && (
                  <button className='chef-button' onClick={handleAddCuisine}>Add cuisine</button>
                )}
                {showUpdateButton && (
                  <button className='chef-button' onClick={handleDeleteCuisine}>Delete cuisine</button>
                )}
                  <button className='chef-button' onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}
export default CuisinesDialog;