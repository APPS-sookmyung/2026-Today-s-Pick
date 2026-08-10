import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fffaf7] flex items-center justify-center px-5">

      <div className="text-center max-w-2xl">

        {/* 작은 문구 */}
        <p className="text-red-400 font-semibold text-sm mb-3">
          TODAY'S PICK
        </p>

        {/* 메인 제목 */}
        <h1 className="text-5xl font-bold text-gray-900 mb-5">
          오늘 뭐 먹지? 🍅
        </h1>

        {/* 설명 */}
        <p className="text-gray-500 text-lg leading-8 mb-3">
          매일 반복되는 메뉴 고민,
        </p>

        <p className="text-gray-500 text-lg leading-8 mb-10">
          오늘의 기분과 상황에 딱 맞는 음식을 추천해드려요.
        </p>

        {/* 추천 시작 */}
        <Link
          to="/recommend"
          className="
            inline-block
            px-10 py-4
            bg-red-500
            text-white
            font-bold
            text-lg
            rounded-xl
            shadow-md
            hover:bg-red-600
            hover:-translate-y-1
            transition
          "
        >
          메뉴 추천받기 →
        </Link>

        {/* 간단한 특징 */}
        <div className="flex justify-center gap-8 mt-12 text-sm text-gray-400">
          <div>
            <span className="block text-2xl mb-2">😊</span>
            기분에 맞게
          </div>

          <div>
            <span className="block text-2xl mb-2">☀️</span>
            날씨에 맞게
          </div>

          <div>
            <span className="block text-2xl mb-2">🍽️</span>
            상황에 맞게
          </div>
        </div>

      </div>
    </main>
  );
}

export default HomePage;