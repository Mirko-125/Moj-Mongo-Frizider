import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

const Recipes = [
    {
      name: "Tortelini sa pecurkama",
      description: "Preukusni tortelini sa pecurkama i pavlakom",
      cheff: "Grk iz leptokarije",
      cuisine: "Greek",
      cookingType: "Kuvano",
      category: "Rucak",
      ingredients: ["Tortelini", "Pecurke", "Pavlaka"],
      likedBy: ["Me", "Myself", "I"],
      budget: "€6",
      photo: "https://boldbeanco.com/cdn/shop/articles/IMG_6361_1296x.jpg"
    },
    {
        name: "Pica",
        description: "Socna vruca pica",
        cheff: "Mirko",
        cuisine: "Moja",
        cookingType: "Peceno",
        category: "Vecera",
        ingredients: ["Testo", "Pecurke", "Sunka", "Kackavalj", "Paradajz sos"],
        likedBy: ["Hana", "Jovana", "Una", "Jana"],
        budget: "€2",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg"
      }
  ];

function Fridge() {

  return (
    <div className="fridge-page">
      <div className="diy-fridge">
        <input className="searchbox" type="text" placeholder="Search..."/>
      </div>
      <DisplayComponent data={Recipes} className="display-component"/>
    </div>
  )
}

export default Fridge
