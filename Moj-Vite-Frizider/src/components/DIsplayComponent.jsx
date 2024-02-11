import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Recipes.css';
import { Link } from 'react-router-dom';

function DisplayComponents(data) 
{
    const [likedBy, setLikedBy] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(data);
        
    }, [data]);

    function goToDetails(data) {
        navigate(`/recipe/${data._id}`)
    }

    function handleLike(data) {
        const updatedLikedBy = [...likedBy, data.id];
        console.log(data);
        fetch(`http://localhost:3000/recipe/${data._id}`, {
            method: 'PUT',
            credentials: 'include',
        })
        setLikedBy(updatedLikedBy);
    }

    function goToChef(chefName) {
        navigate(`/chef/${chefName}`);
    }
    
    return (
        <>
            <div id="app" className="display">
                <h1 className="app-title">Recipes ({data.data.length} results)</h1>
                <div className="recipe-grid">
                    {data.data.map(data => (
                        <div className="recipe" key={data._id}>
                            <img className="meal-photo" src={data.imageURL || 'https://cdn.britannica.com/98/235798-050-3C3BA15D/Hamburger-and-french-fries-paper-box.jpg'} alt='adfg' />
                            <h2 className="meal-name">{data.name} <span className="cuisine">{data.cuisine.name}</span></h2>
                           {/*<p>{data.description}</p>*/}
                            <a className='chef-link' onClick={() => goToChef(data.chef.name)}>{data.chef.name}</a>
                            <p><strong>Cooking type: </strong><u>{data.cookingType}</u></p>
                            <p><strong>Categories: </strong><u>{data.category.join(', ')}</u></p>
                            <p><strong>Budget:</strong> {data.budget}</p>
                            {/*<h4>Ingredients</h4>
                                <ul className="foods-list"> 
                                  {data.ingredients.map(food => <li>{food}</li>)}
                            </ul>*/}
                            <p>{data.likedBy.length}🖤</p>
                            {sessionStorage.getItem('isChef') === 'false' && <button onClick={() => handleLike(data)} className="like-button" disabled={likedBy.includes(data.id)}>Like</button>}
                            <button onClick={() => goToDetails(data)} className="details-button">Details</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default DisplayComponents;
