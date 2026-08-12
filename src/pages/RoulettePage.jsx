import { Wheel } from "react-custom-roulette-r19"// 룰렛 import
import { useState } from 'react';
import { useLocation } from "react-router-dom";

function Roulette(){
    const location = useLocation();

    const ranking = location.state?.ranking || [];
      // 추천 기반 / 직접 입력 모드
    const [mode, setMode] = useState("recommend");

      // 직접 입력용
     const [input, setInput] = useState("");
    const [manualFoods, setManualFoods] = useState([]);

    const [mustSpin, setMustSpin] = useState(false); //룰렛 회전 애니메이션 시작
    const [prizeNumber, setPrizeNumber] = useState(0); // 당첨 인덱스

     // 추천 순위에서 상위 6개
    const [recommendData,setRecommendData] = useState(
        ranking
        .slice(0, 6)
        .map((food) => ({
        option: food.name
        }))
    );

    // 직접 입력한 음식
    const manualData = manualFoods.map((food) => ({
        option: food
    }));

     // 현재 모드에 따라 Wheel에 넣을 데이터 결정
    const data = mode === "recommend"? recommendData: manualData;

    const handleAddFood = () => {
        if (input.trim() === "") return;

        setManualFoods((prev) => [
            ...prev,
            input.trim()
        ]);

        setInput("");
    };

    //룰렛 애니메이션 실행 함수
    const handleSpinClick = () => {
        if (mustSpin) return;
        if (data.length < 2) {
            alert("메뉴를 2개 이상 추가해 주세요!");
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);

        setPrizeNumber(randomIndex);
        setMustSpin(true);
    };

    //룰렛 애니메이션이 멈출 때 실행되는 함수
    const handleStopSpinning = () => {
        setMustSpin(false);

        alert(`${data[prizeNumber].option}을(를) 추천합니다!`);
    };

    // 직접입력 삭제 함수
    const handleDeleteManual = (target) => { 
        setManualFoods((prev) =>
        prev.filter((food) => food !== target)
        );
    };
    // 추천 음식 삭제함수
    const handleDeleteRecommend = (target) => {
    setRecommendData((prev) =>
        prev.filter((food) => food.option !== target)
    );
    };

   return (
  <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
    <div className="max-w-3xl mx-auto">

      {/* 제목 */}
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-red-400 mb-2">
          RANDOM PICK
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          메뉴 룰렛 
        </h1>

        <p className="text-gray-500">
          고민되는 메뉴를 룰렛으로 골라보세요.
        </p>
      </div>


      {/* 모드 선택 */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setMode("recommend")}
          className={`
            flex-1 py-3 rounded-lg font-semibold transition
            ${
              mode === "recommend"
                ? "bg-white text-red-500 shadow-sm"
                : "bg-transparent text-gray-400"
            }
          `}
        >
          추천 메뉴
        </button>

        <button
          type="button"
          onClick={() => setMode("manual")}
          className={`
            flex-1 py-3 rounded-lg font-semibold transition
            ${
              mode === "manual"
                ? "bg-white text-red-500 shadow-sm"
                : "bg-transparent text-gray-400"
            }
          `}
        >
          직접 입력
        </button>
      </div>


      {/* 추천 메뉴 모드 */}
      {mode === "recommend" && (
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              추천 결과에서 선택
            </h3>

            <span className="text-sm text-gray-400">
              {recommendData.length}개
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recommendData.map((food) => (
              <div
                key={food.option}
                className="flex items-center gap-2
                           bg-red-50 text-red-500
                           px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">
                  {food.option}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteRecommend(food.option)
                  }
                  className="bg-transparent border-0 p-0
                             text-red-300 hover:text-red-600
                             text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {recommendData.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              남아있는 추천 메뉴가 없어요.
            </p>
          )}
        </section>
      )}


      {/* 직접 입력 모드 */}
      {mode === "manual" && (
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            메뉴 직접 입력
          </h3>

          {/* 입력창 */}
          <div className="flex gap-2 mb-5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 떡볶이"
              className="flex-1
                         px-4 py-3
                         border border-gray-200
                         rounded-xl
                         outline-none
                         focus:border-red-400
                         focus:ring-2 focus:ring-red-100"
            />

            <button
              type="button"
              onClick={handleAddFood}
              className="px-5 py-3
                         bg-red-500 text-white
                         rounded-xl font-semibold
                         hover:bg-red-600
                         transition"
            >
              추가
            </button>
          </div>


          {/* 직접 입력 메뉴 목록 */}
          <div className="flex flex-wrap gap-2">
            {manualFoods.map((food) => (
              <div
                key={food}
                className="flex items-center gap-2
                           bg-gray-100 text-gray-600
                           px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">
                  {food}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteManual(food)}
                  className="bg-transparent border-0 p-0
                             text-gray-400 hover:text-red-500
                             text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {manualFoods.length === 0 && (
            <p className="text-center text-gray-400 py-5">
              룰렛에 넣을 메뉴를 추가해 주세요.
            </p>
          )}
        </section>
      )}


      {/* 룰렛 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="text-center mb-5">
          <h3 className="text-lg font-bold text-gray-800">
            오늘 뭐 먹지?
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            최소 2개의 메뉴가 필요해요.
          </p>
        </div>

        {data.length > 0 ? (
          <div className="flex justify-center overflow-hidden py-4">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={handleStopSpinning}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-gray-300">
              메뉴를 추가하면 룰렛이 나타나요 
            </p>
          </div>
        )}
      </section>


      {/* 돌리기 버튼 */}
      <button
        type="button"
        onClick={handleSpinClick}
        disabled={data.length < 2 || mustSpin}
        className={`
          w-full py-4 rounded-xl
          font-bold text-lg
          transition
          ${
            data.length >= 2 && !mustSpin
              ? "bg-red-500 text-white shadow-md hover:bg-red-600 hover:-translate-y-0.5 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {mustSpin ? "돌아가는 중... " : "룰렛 돌리기 "}
      </button>

    </div>
  </main>
);
}
export default Roulette; 