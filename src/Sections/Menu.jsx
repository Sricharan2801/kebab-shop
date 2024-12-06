import { useEffect } from 'react';
import CategoryCard from '../Components/CategoryCard';
import { menuCategories } from '../utils';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    menuCategories.forEach(item => {
      const img = new Image();
      img.src = item.url;
    });
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/all-categories?id=${id}`); // Navigate with category id as a query parameter
  };

  return (
    <section id="menu" className="relative w-[100vw]">
      <h1 className="page-title text-center pt-4 mb-5 ">
        Menu Items
      </h1>

      <div className="ml-[2%] w-[8rem] flex justify-around items-center">
        <div className="w-1 h-10 bg-orange-500"></div>
        <h2 className="text-lg font-mono font-semibold text-orange-600">Categories</h2>
      </div>

      <div className="w-[96%] ml-[2%] flex flex-wrap justify-center gap-5">
        {menuCategories.map(item => (
          <CategoryCard
            key={item.id}
            name={item.name}
            url={item.url}
            onClick={() => handleCategoryClick(item.id)} // Pass category id to handler
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;
