const axios = require('axios');

const mushrooms = [];
for (i=0;i<15;i++) {

}

async function postData() {
    for (i = 0; i < 15; i++) {
        try {
            const mushroom = {
                name: 'Mushroom' + i,
                category: "Shrooms",
                budget: "Cheap"
            }
            const vegetable = {
                name: 'Vegetable' + i,
                category: "Vegetable",
                budget: "Medium"
            }
            const response = await axios.post('http://localhost:3000/Ingredient', mushroom);
            console.log(`Posted: ${response.data}`);
        } catch (error) {
            console.error(`Error posting mushroom: ${error.message}`);
        }
    }
}

postData();
