import { useNavigate } from "react-router-dom";
import heart from "../assets/icons/heart.svg";
import heartOutline from "../assets/icons/heart-outline.svg";

function FoodCard({ food, onToggle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="
        relative
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        border border-gray-100
        cursor-pointer
        hover:shadow-md
        hover:-translate-y-1
        transition
      "
    >
      {/* 음식 사진 */}
      <div className="w-full h-[180px] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="
            w-full h-full
            object-cover
            hover:scale-105
            transition duration-300
          "
        />
      </div>

      {/* 음식 정보 */}
      <div className="flex items-center px-4 py-4">
        <p className="font-semibold text-gray-800 text-lg">
          {food.name}
        </p>

        {/* 하트 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(food.id);
          }}
          className="
            ml-auto
            bg-transparent
            border-0
            p-1
            cursor-pointer
            hover:scale-110
            transition
          "
        >
          <img
            src={food.isLike ? heart : heartOutline}
            alt="찜하기"
            className="w-7 h-7"
          />
        </button>
      </div>
    </div>
  );
}

export default FoodCard;