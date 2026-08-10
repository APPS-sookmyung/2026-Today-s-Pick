import FoodCard from "../components/FoodCard";

function FavoritesPage({ foods, onToggle }) {
  const favoriteFoods = foods.filter((food) => food.isLike);

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12">
      <div className="max-w-3xl mx-auto">

        {/* 제목 */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            내가 찜한 메뉴
          </h1>

          <p className="text-gray-400">
            저장한 메뉴 {favoriteFoods.length}개
          </p>
        </div>

        {favoriteFoods.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-5xl mb-5">♡</p>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              아직 찜한 메뉴가 없어요
            </h2>

            <p className="text-gray-400 text-sm">
              추천 결과에서 마음에 드는 메뉴를 저장해보세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favoriteFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default FavoritesPage;