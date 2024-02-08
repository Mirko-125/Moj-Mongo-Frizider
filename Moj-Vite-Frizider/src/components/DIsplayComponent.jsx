import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Recipes.css';

function DisplayComponents(data) 
{
    const navigate = useNavigate();

    function goToDetails(data) {
        sessionStorage.setItem('recipe', JSON.stringify(data));
        navigate(`/recipe/${data.name}`);
    }

    return (
        <>
            <div id="app" className="display">
                <h1 className="app-title">Recipes ({data.data.length} results)</h1>
                <div className="recipe-grid">
                    {data.data.map(data => (
                        <div className="recipe">
                            <img className="meal-photo" src={data.photo} alt="Meal Photo" />
                            <h2 className="meal-name">{data.name} <span className="cuisine">({data.cuisine})</span></h2>
                            <p>{data.description}</p>
                            <p>{data.cheff}</p>
                            <p><u>{data.cookingType}</u></p>
                            <p><u>{data.category}</u></p>
                            <p><strong>Budget:</strong> {data.budget}</p>
                            <h4>Ingredients</h4>
                                <ul className="foods-list"> 
                                  {data.ingredients.map(food => <li>{food}</li>)}
                                </ul>
                            <p>{data.likedBy.length}🖤</p>
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
