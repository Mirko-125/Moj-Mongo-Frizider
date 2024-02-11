import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Recipes.css';

function DisplayComponents(data) 
{
    const navigate = useNavigate();
    const [likedBy, setLikedBy] = useState([]);

    function goToDetails(data) {
        sessionStorage.setItem('recipe', JSON.stringify(data));
        navigate(`/recipe/${data.name}`);
    }
    useEffect(() => {
        console.log(data);
        
    }, []);
    function handleLike(data) {
        const updatedLikedBy = [...likedBy, data.id];
        console.log(data);
        fetch(`http://localhost:3000/recipe/${data._id}`, {
            method: 'PUT',
            credentials: 'include',
        })
        setLikedBy(updatedLikedBy);
    }

    const goToChef = () => {
        navigate('/chef/');  
    }

    async function handleCuisineName(cuisineId) {
        try {
            const response = await fetch(`http://localhost:3000/cuisine/${cuisineId}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error fetching cuisine name:', error);
            return ''; // Return an empty string in case of an error
        }
    }


    function CuisineNameLoader({ cuisineId }) {
        const [cuisineName, setCuisineName] = useState('');
    
        useEffect(() => {
            handleCuisineName(cuisineId)
                .then(name => {
                    setCuisineName(name);
                });
        }, [cuisineId]);
    
        return (
            <span className="cuisine">({cuisineName})</span>
        );
    }

    async function handleChefName(chefId) {
        try {
            const response = await fetch(`http://localhost:3000/user/byid/${chefId}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error fetching chef name:', error);
            return ''; // Return an empty string in case of an error
        }
    }
    
    function ChefNameLoader({ chefId }) {
        const [chefName, setChefName] = useState('');
    
        useEffect(() => {
            handleChefName(chefId)
                .then(name => {
                    setChefName(name);
                });
        }, [chefId]);
    
        return (
            <span className="chef">by: {chefName}</span>
        );
    }
    
    return (
        <>
            <div id="app" className="display">
                <h1 className="app-title">Recipes ({data.data.length} results)</h1>
                <div className="recipe-grid">
                    {data.data.map(data => (
                        <div className="recipe">
                            <img className="meal-photo" src={data.imageURL} alt="Meal Photo" />
                            <h2 className="meal-name">{data.name} <span className="cuisine"><CuisineNameLoader cuisineId={data.cuisine} /></span></h2>
                           {/*<p>{data.description}</p>*/}
                            <a className='chef-link'onClick={goToChef}><ChefNameLoader chefId={data.chef} /></a>
                            <p><strong>Cooking type: </strong><u>{data.cookingType}</u></p>
                            <p><strong>Categories: </strong><u>{data.category.join(', ')}</u></p>
                            <p><strong>Budget:</strong> {data.budget}</p>
                            {/*<h4>Ingredients</h4>
                                <ul className="foods-list"> 
                                  {data.ingredients.map(food => <li>{food}</li>)}
                            </ul>*/}
                            <p>{data.likedBy.length}🖤</p>
                            <button onClick={() => handleLike(data)} className="like-button" disabled={likedBy.includes(data.id)}>Like</button>  
                            <button onClick={() => goToDetails(data)} className="details-button">Details</button>
                        </div>
                    ))}
                </div>
                <p className="footer">These {data.data.length} recipes were added successfully. Check back soon for updates.</p>
            </div>
        </>
    );
}
export default DisplayComponents;
