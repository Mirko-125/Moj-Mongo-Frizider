import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailedRecipe.css';

function DetailedRecipe() {
    const navigate = useNavigate();

    const handleAuthorClick = () => 
    {
        console.log("Author clicked");
        sessionStorage.setItem('cheff', JSON.stringify(Recipe));
        navigate(`/cheffportfolio/${Recipe.cheff}`);
    }

    const goBack = () =>
    {
        navigate(`/fridge`);
    }

    const Recipe = JSON.parse(sessionStorage.getItem('recipe'));

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
            <div className="main-header">
                <img src={Recipe.photo} alt="There was no photo for this recipe" className="thumb" />
                <div className="about">
                    <p className="title-desc">{Recipe.name} <span className="cuisine">({Recipe.cuisine})</span></p><br/>
                    <u className="tags">{Recipe.category}<span>,</span>{Recipe.cookingType}</u><br/>
                    <p className="description-long">{Recipe.description}</p><br/>
                    <p className="money">Total budget cost: <span className="the-green">{Recipe.budget}</span></p><br/>
                    <a className="author" onClick={() => handleAuthorClick()}> - by {Recipe.cheff}</a>
                </div>
            </div>
            <div className="lists">
                <div className="list">
                    <p className="list-title">Ingredients:</p>
                    <p className="list-items">
                        {Recipe.ingredients.map(ingredient => (
                            <span>{ingredient}, </span>
                        ))}
                    total of <span className="total">{Recipe.ingredients.length}</span> ingredients.</p>
                </div>
                <div className="list">
                    <p className="list-title">Loved by:</p>
                    <p className="list-items">
                        {Recipe.likedBy.map(like => (
                            <span>{like}, </span>
                        ))}
                    total of <span className="total">{Recipe.likedBy.length}</span> likes.</p>
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