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

      // Add an event listener to the card element to show the country detail page
      cardElement.addEventListener("click", () => {
        showCountryDetailPage(country);
      });

      // Add the card element to the country cards container
      countryCardsElement.appendChild(cardElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });
//Sorting
const continentSelect = document.getElementById("continent-select");
continentSelect.addEventListener("change", (event) => {
  const selectedContinent = event.target.value;
  const countryCards = document.querySelectorAll(".card");
  
  countryCards.forEach((card) => {
    const regionElement = card.querySelector("p:nth-of-type(3)");
    const countryRegion = regionElement.textContent.substring(8); // get the text after "Region: "
    
    if (selectedContinent === "" || selectedContinent === countryRegion) {
      card.style.display = "block"; // display the card if the continent matches the selected option, or if no option is selected
    } else {
      card.style.display = "none"; // hide the card if the continent does not match the selected option
    }
  });
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

//show country details
function showCountryDetailPage(country) {
  // Hide the country cards container
  document.getElementById("country-cards").style.display = "none";

  // Show the country detail container
  const countryDetailElement = document.getElementById("country-detail");
  countryDetailElement.style.display = "block";

  // Set the country name in the detail container
  const nameElement = countryDetailElement.querySelector("h2");
  nameElement.textContent = country.name.common;

  // Create a dl element to hold the country details
  const detailsListElement = document.createElement("dl");
  countryDetailElement.appendChild(detailsListElement);

  // Add the native name to the details list
  addDetailToCountryPage(detailsListElement, "Native Name", country.name.native.common);

  // Add the population to the details list
  addDetailToCountryPage(detailsListElement, "Population", country.population.toLocaleString());

  // Add the region to the details list
  addDetailToCountryPage(detailsListElement, "Region", country.region);

  // Add the subregion to the details list
  addDetailToCountryPage(detailsListElement, "Sub Region", country.subregion);

  // Add the capital to the details list
  addDetailToCountryPage(detailsListElement, "Capital", country.capital[0]);

  // Add the top level domain to the details list
  addDetailToCountryPage(detailsListElement, "Top Level Domain", country.tld[0]);

  // Add the currencies to the details list
  const currencies = Object.values(country.currencies).map((currency) => currency.name).join(", ");
  addDetailToCountryPage(detailsListElement, "Currencies", currencies);

  // Add the languages to the details list
  const languages = Object.values(country.languages).map((language) => language.name).join(", ");
  addDetailToCountryPage(detailsListElement, "Languages", languages);

  // Add the border countries to the details list
  const borders = country.borders;
  if (borders.length > 0) {
    const borderCountries = [];
    borders.forEach((border) => {
      const borderCountry = getCountryByAlpha3Code(border);
      if (borderCountry) {
        borderCountries.push(borderCountry.name.common);
      }
    });
    if (borderCountries.length > 0) {
      addDetailToCountryPage(detailsListElement, "Border Countries", borderCountries.join(", "));
    }
  }

  // Add a back button to the detail container
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.addEventListener("click", () => {
    // Hide the country detail container
    countryDetailElement.style.display = "none";

    // Show the country cards container
    document.getElementById("country-cards").style.display = "flex";
  });
  countryDetailElement.appendChild(backButton);
}

function addDetailToCountryPage(detailsListElement, label, value) {
  const dtElement = document.createElement("dt");
  dtElement.textContent = label;
  detailsListElement.appendChild(dtElement);

  const ddElement = document.createElement("dd");
  ddElement.textContent = value;
  detailsListElement.appendChild(ddElement);
}

function getCountryByAlpha3Code(alpha3Code) {
  return allCountries.find((country) => country.alpha3Code === alpha3Code);
}

