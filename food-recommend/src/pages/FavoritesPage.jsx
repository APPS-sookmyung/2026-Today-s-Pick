import FoodCard from "../components/FoodCard"

function FavoritesPage({foods, onToggle}){


    return(
        <div>
        <h1>즐겨찾기</h1>

        {foods.length === 0? (
            <p>좋아요를 누른 음식이 없습니다.</p>
        ):(
             <div>
                { foods.map((food) => 
                    <FoodCard food={food} onToggle={onToggle}/>)}
            </div>
        )}
           
        </div>
    );
}

export default FavoritesPage;