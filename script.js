// console.log("connected");

//Categories

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then(data => displayCategories(data?.categories));
};

const displayCategories = (categories) => {
  console.log('from display -> ', categories);

  const categoriesContainer = document.getElementById("add-categories");
  categoriesContainer.innerHTML = "";

  categories?.forEach(categorie => {
    console.log('from forEach', categorie);

    const createcatg = document.createElement("span");
    createcatg.innerHTML = `
      <span class="font-medium p-3 rounded-xl max-w-[250px] block hover:bg-[#15803d] hover:text-white">
        ${categorie.category_name} 
      </span>
    `;

    categoriesContainer.appendChild(createcatg);
  });
};

loadCategories();
