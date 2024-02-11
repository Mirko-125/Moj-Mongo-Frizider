import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailedRecipe.css';
import DisplayComponent from "../components/DIsplayComponent"

function DetailedRecipe() {
    const [recommendations, setRecommendations] = useState([]);
    const [recipeCuisine, setRecipeCuisine] = useState('');
    const [recipeChef, setRecipeChef] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const navigate = useNavigate();

    const handleAuthorClick = () => 
    {
        console.log("Author clicked");
        //sessionStorage.setItem('cheff', JSON.stringify(Recipe));
        //navigate(`/cheffportfolio/${Recipe.cheff}`);
    }

    const goBack = () =>
    {
        sessionStorage.removeItem('recipe');
        navigate(`/fridge`);
    }

    useEffect(() => {
        fetch('http://localhost:3000/Recipe')
            .then(response => response.json())
            .then(data => setRecommendations(data));
    }, []);

    const Recipe = JSON.parse(sessionStorage.getItem('recipe'));

    useEffect(() => {
        fetch(`http://localhost:3000/cuisine/${Recipe.cuisine}`)
       .then(response => response.json())
       .then(data => {
           setRecipeCuisine(data);
       })
       .catch(error => {
           // Handle error if fetch fails
           console.error('Error fetching cuisine:', error);
       });
       fetch(`http://localhost:3000/user/byid/${Recipe.chef}`)
       .then(response => response.json())
       .then(data => {
           setRecipeChef(data);
       })
       .catch(error => {
           // Handle error if fetch fails
           console.error('Error fetching cuisine:', error);
       });
   }, []);

   useEffect(() => {
    handleFind()
        .then(ingredients => {
            setRecipeIngredients(ingredients);
            console.log(ingredients);
        })
        .catch(error => {
            console.error('Error:', error);
        });
 }, [recipeCuisine]);
    const handleFind = async () => {
        const promises = Recipe.ingredients.map(ingredientId => {
            return fetch(`http://localhost:3000/ingredient/${ingredientId}`)
                .then(response => response.json())
                .then(data => data.name)
                .catch(error => {
                    console.error('Error fetching ingredients:', error);
                    return ''; // Return empty string in case of an error
                });
        });

        return Promise.all(promises);
    };

    const goToUpdatePage = () =>
    {
        navigate(`/createRecipe/${Recipe.name}`);
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
           {Recipe.chef == sessionStorage.getItem('userId') && (
            <button className="details-button edge" onClick={() => goToUpdatePage()}>Update</button>
            )}
            <div className="main-header">
                <img src={Recipe.imageURL} alt="There was no photo for this recipe" className="thumb" />
                <div className="about">
                    <p className="title-desc">{Recipe.name} <span className="cuisine">({recipeCuisine.name})</span></p><br/>
                    <p className="tags"><strong>Cooking type: </strong><u >{Recipe.cookingType}</u></p>
                    <p className="tags"><strong>Categoties: </strong><u >{Recipe.category.join(",")}</u></p>
                    <p className="money"><strong>Budget: </strong><span className="the-green">{Recipe.budget}</span></p>
                    <h4 className="tags">Ingredients:</h4>
                            <ul> 
                                  {recipeIngredients.map(food => <li>{food}</li>)}
                            </ul>
                    <a className="author" onClick={() => handleAuthorClick()}> - by {recipeChef.name}</a>
                </div>
            </div>
            <div className="lists">
                <div className="list">
                   {/* <p className="list-title">Ingredients:</p>
                    <p className="list-items">
                        {recipeIngredients}
                    total of <span className="total">{Recipe.ingredients.length}</span> ingredients.</p>*/}
                    <p className="list-title">Preparation process:</p>
                    <div className="description-long" >
                        <p>{Recipe.description}</p><br/>
                    </div>
                </div>
                <div className="list">
                    <p className="list-title">Loved by:</p>
                    <p className="list-items">
                        {Recipe.likedBy.map(like => (
                            <span>{like}, </span>
                        ))}
                    total of <span className="total">{Recipe.likedBy.length}</span> likes.</p>
                </div>
                <div className="list">
                    <p className="list-title">Recommended by:</p> 
                    <p className="list-items">
                        <DisplayComponent data={recommendations} className="display-component"/></p> 
                </div>
            </div>
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