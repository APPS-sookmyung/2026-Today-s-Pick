import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* 로고 */}
        <Link
          to="/"
          className="text-xl font-bold text-red-500"
        >
          오늘 뭐 먹지? 
        </Link>

        {/* 우측 메뉴 */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-red-500 transition"
          >
            홈
          </Link>

          <Link
            to="/favorites"
            className="text-sm font-medium text-gray-600 hover:text-red-500 transition"
          >
            찜 목록
          </Link>

          <Link
            to="/recommend"
            className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
          >
            추천받기
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;