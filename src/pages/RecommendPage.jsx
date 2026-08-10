import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendPage.css";

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
    <main className="recommend-page">
    
      <h1>음식 추천</h1>
      <p>추천 조건을 선택해 주세요.</p>

      <CategoryGroup title ="기분" categoryKey="mood" items={moods} 
      selectedValue={category.mood} onSelect={handleCategoryClick} />
      
      
      <CategoryGroup title ="날씨" categoryKey="weather" items={weathers} 
      selectedValue={category.weather} onSelect={handleCategoryClick} />

      
      <CategoryGroup title ="상황" categoryKey="situation" items={situations} 
      selectedValue={category.situation} onSelect={handleCategoryClick} />
      

      <section className="category-section">
        <h2>선호조건</h2>
        <p className="category-description">복수 선택 가능</p>

        <div className="category-grid">
          {etc.map((value) => (
            <button 
              type="button" key={value} 
              className={`category-button ${category.etc.includes(value)? "selected" : ""}`} 
              onClick={()=> handleEtcClick("etc",value)}>{value}
            </button>
          ))}
      </div>
      </section>

      
      <div className="selected-summary">
        <p>기분 : {category.mood || "미선택"}</p>
        <p>날씨 : {category.weather || "미선택"}</p>
        <p>상황 : {category.situation || "미선택"}</p>
        <p>
          선호조건: {category.etc.length > 0? category.etc.join(",") : "선택 없음" }
        </p>
      </div>

      <button type="button" className="recommend-submit" disabled={!isComplete} onClick={()=> handleResultClick()}>
        추천받기
      </button>
    </main>

    
  );
}


// 추천 페이지 추천 버튼 생성 컴포넌트
function CategoryGroup({title, categoryKey, items,selectedValue,onSelect}){ //카테고리 그룹화
  return (
    <section className = "category-section">
      <h2>{title}</h2>
      
      <div className="category-grid">
        {items.map((value) => (
          <button type="button" key={value} className={`category-button ${selectedValue === value ? "selected" : ""}`} 
          onClick={() => onSelect(categoryKey,value)}>{value}</button>
        ))}

      </div>
    </section>
  );
}

export default RecommendPage;