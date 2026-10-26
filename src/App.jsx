import { useState, useEffect } from "react";
import foodData from "./data/foods.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/HomePage";
import Recommend from "./pages/RecommendPage";
import Result from "./pages/ResultPage";
import './App.css'
import Favorites from "./pages/FavoritesPage"; 
import Roulette from "./pages/RoulettePage";
import FoodDetailPage from "./pages/FoodDetailPage";

export default function App() {

  // 저장되어 있는 찜 id 가져오기
const [foods, setFoods] = useState(() => {
  const saved = localStorage.getItem("favoriteFoods");

  const savedLikes = saved
    ? JSON.parse(saved)
    : [];

  return foodData.map((food) => ({
    ...food,
    isLike: savedLikes.includes(food.id)
  }));
});

  //3가지 기본 추천 조건과 선호 조건을 하나의 객체 상태로 관리
  const [category, setCategory] = useState( 
    {
        mood: "",
        weather: "",
        situation:"",
        etc : []
    });

    // foods의 찜 상태가 변경될 때마다 localStorage 저장
  useEffect(() => {

    const likedFoods = foods
      .filter((food) => food.isLike)
      .map((food) => food.id);

    localStorage.setItem(
      "favoriteFoods",
      JSON.stringify(likedFoods)
    );

  }, [foods]);


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
          <Route 
          path="/recommend" 
          element={<Recommend category={category} setCategory={setCategory} />}
          />
          <Route 
          path="/recommend/result" 
          element={<Result foods={foods} category={category} onToggle = {toggleHeart} />}
          />
          <Route 
          path="/favorites" 
          element={<Favorites foods={foods.filter((food) => food.isLike)} onToggle={toggleHeart}/>}
          />
          <Route
          path="/roulette"
          element={<Roulette />} 
          />
      
          <Route
          path="/foods/:id"
          element={ <FoodDetailPage foods={foods} onToggle={toggleHeart}/>}
          />

      </Routes>
    </BrowserRouter>    
  );
}
