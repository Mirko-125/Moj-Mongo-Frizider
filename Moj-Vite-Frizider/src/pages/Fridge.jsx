import DisplayComponent from "../components/DIsplayComponent"
import '../styles/Fridge.css'

const Recipe =
{
    "cheff": "Chef",
    "ingredients": [ "Ingredient" ],
    "description": "Description",
    "name": "Name",
    "imageURL": "ImageURL",
    "cuisine": "Cuisine",
    "category": "Category",
    "cookingType": "CookingType",
    "likedBy": ["LikedBy"],
    "budget": "Budget"
}

const Recipes = [
    {
      name: "Purrsloud",
      species: "Cat",
      favFoods: ["wet food", "dry food", "<strong>any</strong> food"],
      birthYear: 2016,
      photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg"
    },
    {
      name: "Barksalot",
      species: "Dog",
      birthYear: 2008,
      photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg"
    },
    {
      name: "Meowsalot",
      species: "Cat",
      favFoods: ["tuna", "catnip", "celery"],
      birthYear: 2012,
      photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg"
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
