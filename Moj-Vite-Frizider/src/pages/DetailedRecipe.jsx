import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailedRecipe.css';
import DisplayComponent from "../components/DIsplayComponent"
import { useParams, Link } from 'react-router-dom';

function DetailedRecipe() {
    const [recommendations, setRecommendations] = useState([]);
    const [recipe, setRecipe] = useState({});
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const handleAuthorClick = (chefName) => 
    {
        return `/chef/${chefName}`;
    }

    const goBack = () =>
    {
        navigate('/fridge');
    }


    useEffect(() => {
        fetch(`http://localhost:3000/recipe/getrecommendations/${recipeId}`)
            .then(response => response.json())
            .then(data => setRecommendations(data));
        fetch(`http://localhost:3000/recipe/${recipeId}`)
            .then(response => response.json())
            .then(data => {setRecipe(data);
                console.log(data);});
    }, []);
    
    const goToUpdatePage = (recipeId) => {
        return `/updateRecipe/${recipeId}`;
    }


    const Comments = [
     {
         user: "John",
         title: "Delicious recipe!",
         text: "I tried this recipe last night and it was amazing. Highly recommended!"
     },
     {
         user: "Emily",
         title: "Great recipe!",
         text: "I made this pizza for my family and they loved it! The crust was perfectly crispy and the toppings were delicious."
     },
     {
         user: "Alex",
         title: "Yummy!",
         text: "I'm a huge pizza lover and this recipe did not disappoint. The combination of flavors was amazing. Definitely making it again!"
     },
     {
         user: "Sarah",
         title: "Impressive!",
         text: "I'm not the best cook, but this recipe was easy to follow and the result was outstanding. My friends couldn't believe I made it myself!"
     },
     {
         user: "Michael",
         title: "Delightful!",
         text: "I've tried many pizza recipes before, but this one stands out. The dough was light and fluffy, and the toppings were perfectly balanced. Highly recommended!"
     }
    ];  

    return (
        <div className="details-all">
            <button className="details-button edge" onClick={() => goBack()}>Back</button>
            {console.log(Object.keys(recipe).length === 0)}
           {Object.keys(recipe).length !== 0 && recipe.chef._id == sessionStorage.getItem('userId') && (
            <Link to={goToUpdatePage(recipe._id)} className='recipe-link'><button className="details-button edge">Update</button></Link>
            )}
            {Object.keys(recipe).length !== 0 &&(
            <div className="main-header">

                <img src={recipe.imageURL} alt="There was no photo for this recipe" className="thumb" />
                <div className="about">
                    <p className="title-desc">{recipe.name} <span className="cuisine">({recipe.cuisine.name})</span></p><br/>
                    <p className="tags"><strong>Cooking type: </strong><u >{recipe.cookingType}</u></p>
                    <p className="tags"><strong>Categoties: </strong><u >{recipe.category.join(",")}</u></p>
                    <p className="money"><strong>Budget: </strong><span className="the-green">{recipe.budget}</span></p>
                    <h4 className="tags">Ingredients:</h4>
                            <ul> 
                                  {recipe.ingredients.map(food => <li>{food.name}</li>)}
                            </ul>
                            <Link to={handleAuthorClick(recipe.chef.name)} className='author'>by: {recipe.chef.name}</Link>
                </div>
            
                </div>
            )}
            {Object.keys(recipe).length !== 0 &&(
             <div className="lists">
                <div className="list">
                    <p className="list-title">Preparation process:</p>
                    <div className="description-long" >
                        <p>{recipe.description}</p><br/>
                    </div>
                </div>
                <div className="list">
                    <p className="list-title">Loved by:</p>
                    <p className="list-items">
                        {recipe.likedBy.map(like => (
                            <span>{like}, </span>
                        ))}
                    total of <span className="total">{recipe.likedBy.length}</span> likes.</p>
                </div>
                <div className="list">
                    <p className="list-title">Recommended by:</p> 
                    <p className="list-items">
                        <DisplayComponent data={recommendations} className="display-component"/></p> 
                </div>
            </div>
            )}
            <div className="comment-section">
                <div className="comments">
                    <p className="list-title">Comments:</p>
                        <div className="post-comment">
                            <input type='text' placeholder='Comment title' className='user-title'/>
                            <textarea type='text' placeholder="Remember, be honest." className='user-comment'/>
                            <button className='user-post'>Post</button>          
                        </div>
                        {Comments.map(comment => (
                        <div className="comment">
                            <p className="comment-author">{comment.user} -  <span>{comment.title}</span></p>
                            <p className="comment-title"></p>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
       
    );
}

export default DetailedRecipe;