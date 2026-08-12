import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecommendPage({category,setCategory}) {


  useEffect(()=>{ // 선택된 카테고리 초기화
    setCategory({
        mood: "",
        weather: "",
        situation:"",
        etc : []
    })
  },[]);

  const navigate = useNavigate();
  
  const moods = ["행복", "우울", "스트레스", "피곤", "평범"]; // 기분
  const weathers = ["맑음", "비", "눈", "더움", "추움"]; // 날씨
  const situations = ["혼밥","친구랑", "데이트", "가족", "야식"]; // 상황
  const etc = [
    "매운 음식", "따뜻한 음식", "차가운 음식",
     "가벼운 음식", "든든한 음식", "저렴한 음식"
    ] // 선호조건


   // 선호조건 다중 선택을 위한 핸들러 함수(중복선택O)
  const handleEtcClick = (key, value) => { 
    setCategory((prev) =>({
        ...prev,
       [key] : prev[key].includes(value) 
       ? prev[key].filter((item) => item!==value) 
       : [...prev[key], value]

      }));
  };


  // 추천 조건 선택시 실행될 핸들러 함수(중복선택X)
  const handleCategoryClick = (key, value) => {
     setCategory((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
    
  };

  const handleResultClick = ()=>{ // 결과페이지 이동
    navigate('/recommend/result');
  };

  // 필수 선택 조건 확인
  const isComplete = category.mood && category.weather && category.situation;
 
  return (
  <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
    <div className="max-w-3xl mx-auto">

      {/* 제목 */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-red-400 mb-2">
          TODAY'S PICK
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          음식 추천
        </h1>

        <p className="text-gray-500">
          오늘의 기분과 상황을 알려주세요.
        </p>
      </div>


      {/* 기분 */}
      <CategoryGroup
        title="기분"
        categoryKey="mood"
        items={moods}
        selectedValue={category.mood}
        onSelect={handleCategoryClick}
      />

      {/* 날씨 */}
      <CategoryGroup
        title="날씨"
        categoryKey="weather"
        items={weathers}
        selectedValue={category.weather}
        onSelect={handleCategoryClick}
      />

      {/* 상황 */}
      <CategoryGroup
        title="상황"
        categoryKey="situation"
        items={situations}
        selectedValue={category.situation}
        onSelect={handleCategoryClick}
      />


      {/* 선호조건 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            선호조건
          </h2>

          <span className="text-xs text-gray-400">
            복수 선택 가능
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {etc.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => handleEtcClick("etc", value)}
              className={`
                py-3 px-4
                rounded-xl
                border
                text-sm font-medium
                transition
                ${
                  category.etc.includes(value)
                    ? "bg-red-500 text-white border-red-500 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:bg-red-50"
                }
              `}
            >
              {value}
            </button>
          ))}
        </div>
      </section>


      {/* 선택 결과 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-4">
          선택한 조건
        </h3>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-2 rounded-full bg-red-50 text-red-500 text-sm">
            기분 · {category.mood || "미선택"}
          </span>

          <span className="px-3 py-2 rounded-full bg-blue-50 text-blue-500 text-sm">
            날씨 · {category.weather || "미선택"}
          </span>

          <span className="px-3 py-2 rounded-full bg-yellow-50 text-yellow-600 text-sm">
            상황 · {category.situation || "미선택"}
          </span>

          {category.etc.map((option) => (
            <span
              key={option}
              className="px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm"
            >
              {option}
            </span>
          ))}
        </div>
      </section>


      {/* 추천 버튼 */}
      <button
        type="button"
        disabled={!isComplete}
        onClick={handleResultClick}
        className={`
          w-full
          py-4
          rounded-xl
          font-bold
          transition
          ${
            isComplete
              ? "bg-red-500 text-white shadow-md hover:bg-red-600 hover:-translate-y-0.5 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {isComplete ? "오늘의 메뉴 추천받기 " : "필수 조건을 선택해 주세요"}
      </button>

    </div>
  </main>
);
}


// 추천 페이지 추천 버튼 생성 컴포넌트
function CategoryGroup({
  title,
  categoryKey,
  items,
  selectedValue,
  onSelect
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">

      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {items.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => onSelect(categoryKey, value)}
            className={`
              py-3 px-3
              rounded-xl
              border
              text-sm font-medium
              transition
              ${
                selectedValue === value
                  ? "bg-red-500 text-white border-red-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:bg-red-50"
              }
            `}
          >
            {value}
          </button>
        ))}
      </div>

    </section>
  );
}
export default RecommendPage;