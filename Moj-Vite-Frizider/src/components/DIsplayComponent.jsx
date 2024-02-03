import React, { useEffect } from 'react';
import '../styles/Recipes.css';

function DisplayComponents(data) {
    function foods(foods) {
        return `
      <h4>Favorite Foods</h4>
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
                    <h1 class="app-title">Pets (${data.length} results)</h1>
                    ${data.data.map(petTemplate).join("")}
                    <p class="footer">These ${data.length} pets were added recently. Check back soon for updates.</p>
                `;
            } else {
                appElement.innerHTML = `
                    <p class="error">Invalid data format.</p>
                `;
            }
        }
    }, [data]);

    function petTemplate(data) {
        return `
            <div class="animal">
                <img class="pet-photo" src="${data.photo}">
                <h2 class="pet-name">${data.name} <span class="species">(${data.species})</span></h2>
                <p><strong>Age:</strong> ${data.birthYear}</p>
                ${data.favFoods ? foods(data.favFoods) : ""}
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