import { Link } from "react-router-dom"

function HomePage() {
  return (
    <main>
      <Link to="/recommend">추천받기 시작</Link>
    </main>
  );
}

export default HomePage;