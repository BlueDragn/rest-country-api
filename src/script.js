// User can sort the countries based on continent.
// User can search the country by name.
// When clicked on back button it should take user to the previous page
//See all countries from the API on the homepage
//Search for a country using an input field
//Filter countries by region
//Click on a country to see more detailed information on a separate page
//Click through to the border countries on the detail page
//Toggle the color scheme between light and dark mode (optional)

// Fetch country data from the REST Countries API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countryCardsElement = document.getElementById("country-cards");

    // Loop through the array of country objects and create a card for each country
    data.forEach((country) => {
      // Create a card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      // Add an image element with the country's flag image URL
      const flagElement = document.createElement("img");
      flagElement.src = country.flags.png;
      cardElement.appendChild(flagElement);

      // Add a heading element with the country's name
      const nameElement = document.createElement("h2");
      nameElement.textContent = country.name.common;
      cardElement.appendChild(nameElement);

      // Add a paragraph element with the country's population
      const populationElement = document.createElement("p");
      populationElement.textContent = `Population: ${country.population.toLocaleString()}`;
      cardElement.appendChild(populationElement);

      // Add a paragraph element with the country's capital
      const capitalElement = document.createElement("p");
      capitalElement.textContent = `Capital: ${country.capital}`;
      cardElement.appendChild(capitalElement);

      // Add a paragraph element with the country's region
      const regionElement = document.createElement("p");
      regionElement.textContent = `Region: ${country.region}`;
      cardElement.appendChild(regionElement);

      // Add a button element to view more details about the country
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "View Details";
      detailsButton.addEventListener("click", () => {
        showCountryDetailPage(country);
      });
      cardElement.appendChild(detailsButton);

      // Add the card element to the country cards container
      countryCardsElement.appendChild(cardElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });

//Search  bar
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase(); // convert search term to lowercase for case-insensitive matching
  const countryCards = document.querySelectorAll(".card");

  countryCards.forEach((card) => {
    const nameElement = card.querySelector("h2");
    const countryName = nameElement.textContent.toLowerCase();

    if (countryName.includes(searchTerm)) {
      card.style.display = "block"; // display the card if the country name matches the search term
    } else {
      card.style.display = "none"; // hide the card if the country name does not match the search term
    }
  });
});
