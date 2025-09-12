// console.log("connected");

//Categories

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then(data => displayCategories(data?.categories));
};

const displayCategories = (categories) => {
  // console.log('from display -> ', categories);

  const categoriesContainer = document.getElementById("add-categories");
  categoriesContainer.innerHTML = "";

  categories?.forEach(categorie => {
    // console.log('from forEach', categorie);

    const createcatg = document.createElement("li");
    createcatg.innerHTML = `
      <li id="${categorie.id}" class="font-medium p-3 rounded-xl max-w-[250px] mb-1 block hover:bg-[#15803d] hover:text-white">
        ${categorie.category_name} 
      </li>
    `;

    categoriesContainer.appendChild(createcatg);

    createcatg.addEventListener("click", (e) => {

      const allLi = document.querySelectorAll("li");

      allLi.forEach(li => {
        li.classList.remove("bg - [#15803d]");
        console.log(li);

      })

      if (e.target.localName === "li") {
        // console.log(e.target);
        e.target.classList.add("bg-[#15803d]");
        e.target.classList.add("text-white");
      }
    })

  });
};

loadCategories();


//


const loadPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((res) => res.json())
    .then(data => displayPlants(data?.plants));
};

const displayPlants = (plants) => {
  // console.log('from display -> ', plants);

  const plantsContainer = document.getElementById("card-container");

  plants?.forEach(plant => {
    // console.log('from forEach', plant);

    const plantCard = document.createElement("div");


    plantCard.innerHTML = `
            <div class="max-w-[300px] rounded-2xl p-4 shadow-lg">
          <!-- card image -->
          <div>
            <img class="w-[290px]  h-[170px] rounded-xl bg-cover" src="${plant.image}" alt="">
          </div>

          <!-- title -->
          <h2 class="text-[14px] font-semibold text-[#1f2937] mb-2">${plant.name}</h2>

          <p class="text-[#1f2937] text-[12px] mb-2">${plant.description}
          </p>

          <!-- price & categories -->
          <div class="flex justify-between items-center mb-3">

            <span class="bg-[#dcfce7] rounded-full text-[#15803d] text-[14px] font-medium px-[12px] py-[4px]"> ${plant.category} </span>
            <p class="text-[14px] text-[#1f2937] font-bold">৳ <span>${plant.price}</span></p>

          </div>

          <!-- add to cart button -->

          <button
            class=" bg-[#15803d] font-medium px-5 py-2 rounded-full w-full hover:cursor-pointer text-white hover:bg-[#1cac51]">
            Add to Cart
          </button>
        </div>
    `

    plantsContainer.appendChild(plantCard);
  });

}

loadPlants();