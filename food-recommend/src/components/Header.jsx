import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="navbar">
            <div className="nav-container">
                    <Link to="/" className="logo-text">
                        오늘 뭐 먹지?
                    </Link>
                
            </div>

            {/* 우측 버튼 */}
            <div className="fav-page-btn">
                <Link to="/" className="home-link">홈</Link>
                <Link to="/favorites" className="favor-link">찜 목록</Link>
                <Link to="/recommend" className="recomm-link">추천받기</Link>
            </div>
                
        </header>
    );
}

export default Header;