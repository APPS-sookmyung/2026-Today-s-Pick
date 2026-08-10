import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import heart from "../assets/icons/heart.svg"
import heartOutline from "../assets/icons/heart-outline.svg"


function Result({foods, category, onToggle}){

    const navigate = useNavigate();
    const [ranking,setRanking] = useState([]); // 추천 음식 순위 저장 객체
    
    useEffect(()=>{ // 추천 음식 랭킹순으로 정렬
        const newFoods = foods.map((food)=> { 
            let sum = 0;
            if(food["mood"].includes(category["mood"])) sum++;
            if(food["weather"].includes(category["weather"])) sum++;
            if(food["situation"].includes(category["situation"])) sum++;
            category.etc.forEach((option)=>{
                if(food.etc.includes(option)) sum+=2;
            });
            
            return{...food,
                score: sum}
        })
        const sortedRanking = [...newFoods].sort((a,b)=> b.score - a.score ).slice(0,10); // 상위 10위까지만 랭킹 저장 
        setRanking(sortedRanking); 
    },[]);

    const handleRetryClick = (id)=> { 
        navigate("/recommend");
    }

    
    
 return (
  <main className="min-h-screen bg-[#fffaf7] py-12 px-4">
    <div className="max-w-3xl mx-auto">

      {/* 메인 추천 */}
      <section className="text-center mb-10">
        <p className="text-sm font-semibold text-red-400 mb-2">
          TODAY'S PICK
        </p>

        <h2 className="text-xl text-gray-500 mb-2">
          오늘의 추천 메뉴는
        </h2>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {ranking[0]?.name}
        </h1>

        {/* 음식 이미지 */}
        <div className="relative w-[260px] h-[260px] mx-auto">
          <img
            src={ranking[0]?.image}
            alt={ranking[0]?.name}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />

          {/* 1위 하트 */}
          <button
            type="button"
            onClick={() => onToggle(ranking[0]?.id)}
            className="absolute bottom-4 right-4
                       w-11 h-11
                       flex items-center justify-center
                       bg-white rounded-full shadow-md
                       hover:scale-110 transition"
          >
            <img
              src={
                foods.find(
                  (item) => item.id === ranking[0]?.id
                )?.isLike
                  ? heart
                  : heartOutline
              }
              alt="찜하기"
              className="w-6 h-6"
            />
          </button>
        </div>
      </section>


      {/* 선택 키워드 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">
          선택한 키워드
        </h3>

        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-red-50 text-red-500 rounded-full text-sm">
            😊 {category.mood}
          </span>

          <span className="px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm">
            ☀️ {category.weather}
          </span>

          <span className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-full text-sm">
            🍽 {category.situation}
          </span>

          {category.etc.length > 0 ? (
            category.etc.map((option) => (
              <span
                key={option}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {option}
              </span>
            ))
          ) : (
            <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-sm">
              선호조건 없음
            </span>
          )}
        </div>
      </section>


      {/* 추천 이유 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold mb-3">
          💡 추천 이유
        </h3>

        <p className="text-gray-600 leading-7">
          {ranking[0]?.description}
        </p>
      </section>


      {/* 추천 순위 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">
            추천 순위
          </h3>

          <span className="text-sm text-gray-400">
            TOP 10
          </span>
        </div>

        <ul className="space-y-2">
          {ranking.slice(1).map((food, index) => (
            <li
              key={food.id}
              className="flex items-center
                         px-4 py-3
                         rounded-xl
                         hover:bg-gray-50
                         transition"
            >
              {/* 순위 */}
              <span className="w-9 font-bold text-red-400">
                {index + 2}
              </span>

              {/* 음식명 */}
              <span className="font-medium text-gray-700">
                {food.name}
              </span>

              {/* 하트 */}
              <button
                type="button"
                className="ml-auto bg-transparent border-0 p-1
                           hover:scale-110 transition"
                onClick={() => onToggle(food.id)}
              >
                <img
                  src={
                    foods.find(
                      (item) => item.id === food.id
                    )?.isLike
                      ? heart
                      : heartOutline
                  }
                  alt="찜하기"
                  className="w-6 h-6"
                />
              </button>
            </li>
          ))}
        </ul>
      </section>


      {/* 일반 버튼 */}
      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={handleRetryClick}
          className="flex-1
                     py-3
                     border border-gray-300
                     bg-white
                     rounded-xl
                     font-semibold text-gray-600
                     hover:bg-gray-50
                     transition"
        >
          다시 선택하기
        </button>

        <button
          type="button"
          className="flex-1
                     py-3
                     border border-gray-300
                     bg-white
                     rounded-xl
                     font-semibold text-gray-600
                     hover:bg-gray-50
                     transition"
        >
          공유하기
        </button>
      </div>


      {/* 룰렛 */}
      <button
        type="button"
        onClick={() =>
          navigate("/roulette", {
            state: { ranking: ranking },
          })
        }
        className="w-full
                   py-4
                   bg-red-500
                   text-white
                   font-bold
                   rounded-xl
                   shadow-md
                   hover:bg-red-600
                   hover:-translate-y-0.5
                   transition"
      >
        🎡 룰렛 돌리기
      </button>

    </div>
  </main>
);

}

export default Result;