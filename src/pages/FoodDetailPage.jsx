import { useParams, useNavigate } from "react-router-dom";

import heart from "../assets/icons/heart.svg";
import heartOutline from "../assets/icons/heart-outline.svg";


function FoodDetailPage({ foods, onToggle }) {

  const { id } = useParams();

  const navigate = useNavigate();


  // URL의 id는 문자열이라 Number로 변경
  const food = foods.find(
    (food) => food.id === Number(id)
  );


  if (!food) {
    return (
      <main className="min-h-screen bg-[#fffaf7] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-2xl font-bold mb-4">
            음식을 찾을 수 없습니다.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/favorites")}
            className="
              px-5 py-3
              bg-red-500
              text-white
              rounded-xl
            "
          >
            찜 목록으로
          </button>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12">

      <div className="max-w-2xl mx-auto">

        {/* 뒤로가기 */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            mb-6
            bg-transparent
            border-0
            text-gray-500
            hover:text-red-500
          "
        >
          ← 뒤로가기
        </button>


        <div className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-sm
        ">

          {/* 음식 이미지 */}
          <img
            src={food.image}
            alt={food.name}
            className="
              w-full
              h-[300px]
              object-cover
            "
          />


          <div className="p-7">

            {/* 이름 + 하트 */}
            <div className="flex items-center mb-4">

              <h1 className="
                text-3xl
                font-bold
                text-gray-900
              ">
                {food.name}
              </h1>


              <button
                type="button"
                onClick={() => onToggle(food.id)}
                className="
                  ml-auto
                  bg-transparent
                  border-0
                "
              >

                <img
                  src={
                    food.isLike
                      ? heart
                      : heartOutline
                  }
                  alt="찜하기"
                  className="w-8 h-8"
                />

              </button>

            </div>


            {/* 설명 */}
            <p className="
              text-gray-500
              leading-7
              mb-6
            ">
              {food.description}
            </p>


            {/* 카테고리 */}
            <div className="mb-6">

              <h3 className="font-bold mb-3">
                음식 정보
              </h3>

              <span className="
                inline-block
                px-4 py-2
                bg-red-50
                text-red-500
                rounded-full
                text-sm
              ">
                {food.category}
              </span>

            </div>


            {/* 추천 조건 */}
            <div>

              <h3 className="font-bold mb-3">
                이런 상황에 추천해요
              </h3>

              <div className="flex flex-wrap gap-2">

                {food.mood?.map((value) => (
                  <span
                    key={value}
                    className="
                      px-3 py-2
                      bg-gray-100
                      text-gray-600
                      rounded-full
                      text-sm
                    "
                  >
                    {value}
                  </span>
                ))}

                {food.situation?.map((value) => (
                  <span
                    key={value}
                    className="
                      px-3 py-2
                      bg-gray-100
                      text-gray-600
                      rounded-full
                      text-sm
                    "
                  >
                    {value}
                  </span>
                ))}

                {food.etc?.map((value) => (
                  <span
                    key={value}
                    className="
                      px-3 py-2
                      bg-gray-100
                      text-gray-600
                      rounded-full
                      text-sm
                    "
                  >
                    {value}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default FoodDetailPage;