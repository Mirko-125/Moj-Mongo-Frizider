import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Recipes.css';
import { Link } from 'react-router-dom';

function DisplayComponents(data) 
{
    const [likedBy, setLikedBy] = useState([]);
    
    useEffect(() => {
        console.log(data);
        
    }, [data]);

    function handleLike(data) {
        const updatedLikedBy = [...likedBy, data.id];
        console.log(data);
        fetch(`http://localhost:3000/recipe/${data._id}`, {
            method: 'PUT',
            credentials: 'include',
        })
        setLikedBy(updatedLikedBy);
    }

    const goToChef = (chefName) => {
       
        return `/chef/${chefName}`;
    }
    const goToRecipe = (recipeId) => {
        return `/recipe/${recipeId}`;
    }
    
    return (
        <div id="app" className="display-component">
            <h1 className="app-title">Recipes ({data.data.length} results)</h1>
            <div className="recipe-grid">
                {data.data.map(recipe => (
                    <div className="recipe" key={recipe._id}>
                        <img className="meal-photo" src={recipe.imageURL} alt="Meal Photo" />
                        <h2 className="meal-name">{recipe.name} <span className="cuisine">({recipe.cuisine.name})</span></h2>
                        <Link to={goToChef(recipe.chef.name)} className='chef-link'>by: {recipe.chef.name}</Link>
                        <p><strong>Cooking type: </strong><u>{recipe.cookingType}</u></p>
                        <p><strong>Categories: </strong><u>{recipe.category.join(', ')}</u></p>
                        <p><strong>Budget:</strong> {recipe.budget}</p>
                        <p>{recipe.likedBy.length}🖤</p>
                        <button onClick={() => handleLike(recipe)} className="like-button" disabled={likedBy.includes(recipe._id)}>Like</button>
                        <Link to={goToRecipe(recipe._id)} className='recipe-link'><button className="details-button">Details</button></Link>
                    </div>
                ))}
            </div>
            <p className="footer">These {data.data.length} recipes were added successfully. Check back soon for updates.</p>
        </div>
    );
}
export default DisplayComponents;
