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

function Fridge() {

  return (
    <div className="fridge-page">
      <div className="diy-fridge">
        <input className="searchbox" type="text" placeholder="Search..."/>
      </div>
      <DisplayComponent data={Recipe} className="display-component">

      </DisplayComponent>
    </div>
  )
}

export default Fridge
