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
      <li id="${categorie.id}" class="font-medium list-none p-3 rounded-xl max-w-[250px] mb-1 block  hover:bg-[#15803d] hover:text-white">
        ${categorie.category_name} 
      </li>
    `;

    categoriesContainer.appendChild(createcatg);

    // add marker on category_name

    createcatg.addEventListener("click", (e) => {

      const allLi = document.querySelectorAll("li");

      allLi.forEach(li => {
        li.classList.remove("bg-[#15803d]");
        li.classList.remove("text-white");

        console.log(li);

      })

      if (e.target.localName === "li") {
        // console.log(e.target.id);
        e.target.classList.add("bg-[#15803d]");
        e.target.classList.add("text-white");
        loadPlantsByCategories(e.target.id);
      }
    })

  });
};

loadCategories();



// Load ALL plants

const loadPlants = () => {

  const url = "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((res) => res.json())
    .then(data => displayPlants(data?.plants))
    .catch(err => onsole.log(err));
};

const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("card-container");

  plantsContainer.innerHTML = "";

  plants?.forEach(plant => {
    const plantCard = document.createElement("div");

    plantCard.innerHTML = `
      <div class="max-w-[300px] rounded-2xl p-4 shadow-lg">
        <!-- card image -->
        <div>
          <img class="w-[290px] h-[170px] rounded-xl bg-cover mb-2" src="${plant.image}" alt="">
        </div>

        <!-- title -->
        <h2 onclick="openPlantModal('${plant.id}')" class="text-[14px] font-semibold text-[#1f2937] mb-2">${plant.name}</h2>
        <p class="text-[#1f2937] text-[12px] mb-2">${plant.description}</p>

        <!-- price & categories -->
        <div class="flex justify-between items-center mb-3">
          <span class="bg-[#dcfce7] rounded-full text-[#15803d] text-[14px] font-medium px-[12px] py-[4px]">${plant.category}</span>
          <p class="text-[14px] text-[#1f2937] font-bold">৳ <span>${plant.price}</span></p>
        </div>

        <!-- add to cart button -->
        <button class="bg-[#15803d] font-medium px-5 py-2 rounded-full w-full hover:cursor-pointer text-white hover:bg-[#1cac51]" onclick="addToCart('${plant.id}', '${plant.name}', ${plant.price})">
          Add to Cart
        </button>
      </div>
    `;

    plantsContainer.appendChild(plantCard);
  });
};


// Load plants by category

const loadPlantsByCategories = (cateId) => {

  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${cateId}`)
    .then(res => res.json())
    .then(data => {
      displayPlants(data?.plants);
      hideSpinner();
    })
    .catch(err => {
      console.log(err);
      hideSpinner();
    });
};

loadPlants();


// add to cart plants

let cart = [];
let total = 0;

const addToCart = (id, name, price) => {
  const cartItem = { id, name, price };
  cart.push(cartItem);
  total += price;
  updateCart();
};

const removeFromCart = (id, price) => {
  cart = cart.filter(item => item.id !== id);
  total -= price;
  updateCart();
};

const updateCart = () => {
  const cartContainer = document.getElementById("add-plant-cart");
  const totalSpan = document.querySelector("#carts-area span.font-bold");

  cartContainer.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "mb-3");

    div.innerHTML = `
      <div>
        <p>${item.name}</p>
        <p class="text-[14px] text-[#1f2937] font-bold mt-1">৳ <span>${item.price}</span></p>
      </div>
      <button class="text-red-500 font-bold hover:text-red-700"
        onclick="removeFromCart('${item.id}', ${item.price})">
        ❌
      </button>
    `;

    cartContainer.appendChild(div);
  });

  totalSpan.textContent = total;
};


//loading Spinner function

const showSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
};

const hideSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("hidden");
  spinner.classList.remove("flex");
};


