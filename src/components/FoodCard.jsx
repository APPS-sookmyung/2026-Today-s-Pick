import { useNavigate } from "react-router-dom";

import heart from "../assets/icons/heart.svg";
import heartOutline from "../assets/icons/heart-outline.svg";


function FoodCard({ food, onToggle }) {

  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/foods/${food.id}`)}
      className="
        flex items-center gap-4
        bg-white
        p-3
        rounded-2xl
        border border-gray-100
        cursor-pointer
        hover:shadow-sm
        transition
      "
    >

      <img
        src={food.image}
        alt={food.name}
        className="
          w-[60px]
          h-[60px]
          object-cover
          rounded-lg
        "
      />


      <div>
        <p className="font-bold text-gray-800">
          {food.name}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {food.description}
        </p>
      </div>


      <button
        type="button"
        onClick={(e) => {

          // 카드 클릭 이벤트 막기
          e.stopPropagation();

          onToggle(food.id);
        }}
        className="
          ml-auto
          bg-transparent
          border-0
          p-2
        "
      >

        <img
          src={
            food.isLike
              ? heart
              : heartOutline
          }
          alt="찜하기"
          className="w-6 h-6"
        />

      </button>

    </div>
  );
}

export default FoodCard;