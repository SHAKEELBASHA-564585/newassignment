async function fetchDataFromAPI() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    );
    const data = await response.json();

    const productContainer = document.getElementById("product-container");
    productContainer.className = "main-con";

    for (const product of data.data) {
      const productBadge = document.createElement("p");
      productBadge.textContent = product.product_badge;
      productBadge.className = "badge";

      const productImage = document.createElement("img");
      productImage.src = product.product_image;
      productImage.className = "product-image";

      const productDiv = document.createElement("div");
      productDiv.className = "product-container";
      productDiv.appendChild(productBadge);
      productDiv.appendChild(productImage);
      document.body.appendChild(productDiv);

      const itemContainer = document.createElement("div");
      itemContainer.className = "basha";
      const productTitle = document.createElement("h2");
      productTitle.className="text"
      productTitle.textContent = product.product_title;
      itemContainer.appendChild(productTitle);

      const variantsList = document.createElement("ul");
      variantsList.className = "inner-list";
      for (const variant of product.product_variants) {
        const variantItem = document.createElement("li");
        variantItem.className = "white";
        variantItem.textContent = variant[Object.keys(variant)[0]];
        variantsList.appendChild(variantItem);
      }
      itemContainer.appendChild(variantsList);
      productDiv.appendChild(itemContainer);
      productContainer.appendChild(productDiv);
    }

    const searchInput = document.querySelector(".input");

    searchInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const searchTerm = searchInput.value.toLowerCase();
        highlightProducts(searchTerm);
      }
    });
    const menuButtonGrid = document.querySelector(".menu1");
    menuButtonGrid.addEventListener("click", function () {
      productContainer.classList.remove("main-con");
      productContainer.classList.add("grid-view");
    });

    // Event listener for flexbox button
    const menuButtonFlex = document.querySelector(".menu");
    menuButtonFlex.addEventListener("click", function () {
      productContainer.classList.remove("grid-view");
      productContainer.classList.add("main-con");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function highlightProducts(searchTerm) {
  const productItems = document.querySelectorAll(".inner-list .white");

  productItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    const isMatchingItem = itemText.includes(searchTerm);

    if (isMatchingItem) {
      item.classList.add("highlight");
    } else {
      item.classList.remove("highlight");
    }
  });
}

fetchDataFromAPI();
