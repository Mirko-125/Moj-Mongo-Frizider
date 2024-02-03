import React, { useEffect } from 'react';

function DisplayComponents(data) {
    useEffect(() => {
        const appElement = document.getElementById("app");
        if (appElement) {
            if (Array.isArray(data)) {
                appElement.innerHTML = `
                    <h1 class="app-title">Pets (${data.length} results)</h1>
                    ${data.map(petTemplate).join("")}
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
                <p><strong>Age:</strong> ${age(data.birthYear)}</p>
                ${data.favFoods ? foods(data.favFoods) : ""}
            </div>
        `;
    }

    return (
        <>
            <div id="app"></div>
        </>
    );
}

export default DisplayComponents;