import React, { useEffect } from 'react';
import '../styles/Recipes.css';

function DisplayComponents(data) {

    function foods(foods) {
        return `
      <h4>Ingredients</h4>
      <ul class="foods-list">
      ${foods.map(food => `<li>${food}</li>`).join("")}
      </ul>
      `;
      }
    
    useEffect(() => {
        const appElement = document.getElementById("app");
        if (appElement) {
            if (1) {
                appElement.innerHTML = `
                    <h1 class="app-title">Recipes (${data.data.length} results)</h1>
                        <div class="recipe-grid">
                            ${data.data.map(recipeTemplate).join("")}
                        </div>
                    <p class="footer">These ${data.data.length} recipes were added successfully. Check back soon for updates.</p>
                `;
            } else {
                appElement.innerHTML = `
                    <p class="error">Invalid data format.</p>
                `;
            }
        }
    }, [data]);

    function recipeTemplate(data) {
        return `
            <div class="recipe">
                <img class="meal-photo" src="${data.photo}">
                <h2 class="meal-name">${data.name} <span class="cuisine">(${data.cuisine})</span></h2>
                <p>${data.description}</p>
                <p>${data.cheff}</p>
                <p><u>${data.cookingType}</u></p>
                <p><u>${data.category}</u></p>
                <p><strong>Budget:</strong> ${data.budget}</p>
                ${data.ingredients ? foods(data.ingredients) : ""}
                <p>${data.likedBy.length}🖤<p>
            </div>
        `;
    }

    return (
        <>
            <div id="app" className="display"></div>
        </>
    );
}

export default DisplayComponents;