import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import heart from "../assets/icons/heart.svg"
import heartOutline from "../assets/icons/heart-outline.svg"
import "./ResultPage.css";

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
        const sortedRanking = [...newFoods].sort((a,b)=> b.score - a.score ); 
        setRanking(sortedRanking);
    },[]);

    const handleRetryClick = (id)=> {
        if(ranking.length > 0){
            const removeRanking = ranking.filter((value)=> value.id !== id );
            setRanking(removeRanking);
        }
        else{
            alert("추천 음식 리스트 부족");
        }
        }

    
    
    return(
        <main>
            <h2>오늘의 추천 메뉴는</h2>
            <h1>{ranking[0]?.name}</h1>
            <img
                src={ranking[0]?.image} alt={ranking[0]?.name} className="food-image"></img>
            
            <div className="selected-summary">
                <h3>선택한 키워드</h3>
                <p>기분 : {category.mood}</p>
                <p>날씨 : {category.weather}</p>
                <p>상황 : {category.situation }</p>
                <p>선호조건: {category.etc.length > 0? category.etc.join(",") : "선택 없음" }</p>
            </div>
            
            <div>추천 이유</div>
            <div>{ranking[0]?.description}</div>

            <button type="button" className="return" onClick={()=> handleRetryClick(ranking[0]?.id)}>다시 추천받기</button>
            <button type="button" className="heart-button" key={ranking[0]?.id} onClick={()=> onToggle(ranking[0]?.id)}>
                <img src={foods.find((food) => food.id === ranking[0]?.id)?.isLike? heart: heartOutline} alt="찜하기"></img>
            </button>
            <button>공유하기</button>

            <button>룰렛 돌리기</button>

        </main>
    );

}

export default Result;