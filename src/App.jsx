import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/HomePage";
import Recommend from "./pages/RecommendPage";
import Result from "./pages/ResultPage";
import './App.css'
import foodData from "./data/foods.json"
import Favorites from "./pages/FavoritesPage"; 

export default function App() {


  // 좋아요 여부 확인 속성 추가 후 상태로 관리
  const [foods, setFoods] = useState(
    foodData.map((food)=> ({...food, isLike: false})),
  );
  //3가지 기본 추천 조건과 선호 조건을 하나의 객체 상태로 관리
  const [category, setCategory] = useState( 
    {
        mood: "",
        weather: "",
        situation:"",
        etc : []
    });

    const toggleHeart = (id) => {
      setFoods((prevFoods)=>
        prevFoods.map((food) => 
          food.id === id? {...food, isLike: !food.isLike} : food,
        ),
      );
    }


  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recommend" element={<Recommend category={category} setCategory={setCategory} />}/>
          <Route path="/recommend/result" element={<Result foods={foods} category={category} onToggle = {toggleHeart} />}/>
          <Route path="/favorites" element={<Favorites foods={foods.filter((food) => food.isLike)} onToggle={toggleHeart}/>}></Route>
      </Routes>
    </BrowserRouter>    
  );
}
