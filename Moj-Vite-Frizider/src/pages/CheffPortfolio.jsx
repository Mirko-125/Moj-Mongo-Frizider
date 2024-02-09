import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheffPortfolio.css';

function CheffPortfolio() {
    const [data, setData] = React.useState({ data: [] });


    const Cheff = JSON.parse(sessionStorage.getItem('cheff'));
    // trena napisati funkciju koja vraca cheffa po imenu, i zameniti je sa hardkodiranim Cheffom

    const HardCheff = 
    {
        name : "Mirko",
        recipes : [ "pizza", "njorke", "tursija" ]
    }

    const navigate = useNavigate();

    function goBack() 
    {
        navigate(`/recipe/${Cheff.name}`);
    }

    return (
        <>
            <div>
                <button className="details-button edge">Grant acces</button>
                <button className="details-button edge" onClick={() => goBack()}>Back</button>
            </div>
            <div className="profile">
                <h1>Cheff profile: {Cheff.cheff}</h1>
            </div>
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
        </>
    );
}

export default CheffPortfolio;