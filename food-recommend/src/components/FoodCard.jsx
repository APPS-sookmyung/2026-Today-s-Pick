import { useNavigate } from "react-router-dom"
import heart from "../assets/icons/heart.svg"
import heartOutline from "../assets/icons/heart-outline.svg"
import "./FoodCard.css"

function FoodCard({food, onToggle}){
    
    const navigate = useNavigate();

    return(
        <div className="food-card" onClick={()=>navigate("/")}>
            <img className="food-img" src={food.image} alt={food.name}></img>
            <p className="food-name">{food.name}</p>

            <button type="button" className="heart-button" onClick={onToggle(food.id)}><img src={food.isLike? heart: heartOutline} alt="좋아요"></img></button>
        </div>
    );
}

export default FoodCard;