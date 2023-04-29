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

  //function for country details
  function showCountryDetailPage(country) {
    // Hide the country cards container, search input, and filters
    document.getElementById("country-cards").style.display = "none";
    document.getElementById("search-input").style.display = "none";
    document.getElementById("filter").style.display = "none";
    document.getElementById("continent-select").style.display = "none";
  
    // Show the country detail container
    const countryDetailElement = document.getElementById("country-details-page");
    countryDetailElement.style.display = "block";
  
    // Add an image element with the country's flag image URL
    const imageContainer = document.getElementById("image-container");
    const flagElementSingle = document.createElement("img");
    flagElementSingle.src = country.flags.png;
    imageContainer.appendChild(flagElementSingle);
  
    // Set the country name in the detail container
    const nameElement = countryDetailElement.querySelector("h2");
    nameElement.textContent = country.name.common;
  
    // Add the country details to the details list
    const detailsListElement = document.getElementById("details-list");
    addDetailToCountryPage(detailsListElement, "Native Name", country.name.native.common);
    addDetailToCountryPage(detailsListElement, "Population", country.population.toLocaleString());
    addDetailToCountryPage(detailsListElement, "Region", country.region);
    addDetailToCountryPage(detailsListElement, "Sub Region", country.subregion);
    addDetailToCountryPage(detailsListElement, "Capital", country.capital);
    addDetailToCountryPage(detailsListElement, "Top Level Domain", country.tld[0]);
    addDetailToCountryPage(detailsListElement, "Currencies", Object.values(country.currencies).join(", "));
    addDetailToCountryPage(detailsListElement, "Languages", Object.values(country.languages).join(", "));
  
    // Add the border countries to the border countries list
    const borderCountriesElement = document.querySelector(".border-countries");
    for (const borderCountryCode of country.borders) {
      const borderCountry = findCountryByCode(borderCountryCode);
      if (borderCountry) {
        const borderCountryElement = document.createElement("li");
        const borderCountryLink = document.createElement("a");
        borderCountryLink.href = "#";
        borderCountryLink.textContent = borderCountry.name.common;
        borderCountryLink.addEventListener("click", () => showCountryDetailPage(borderCountry));
        borderCountryElement.appendChild(borderCountryLink);
        borderCountriesElement.appendChild(borderCountryElement);
      }
    }
  
    // Add the back button click event listener
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => showCountryCardsPage());
  }
  
  function addDetailToCountryPage(detailsListElement, detailLabel, detailValue) {
    // Create a new list item element
    const detailItem = document.createElement("li");
  
    // Add the label to the detail item
    const detailLabelElement = document.createElement("span");
    detailLabelElement.textContent = detailLabel + ": ";
    detailItem.appendChild(detailLabelElement);
  
    // Add the value to the detail item
    const detailValueElement = document.createElement("span");
    detailValueElement.textContent = detailValue;
    detailItem.appendChild(detailValueElement);
  
    // Add the detail item to the details list
    detailsListElement.appendChild(detailItem);
  }


//Sorting country by region
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

// //show country details
// function showCountryDetailPage(country) {
//   // Hide the country cards container,search input,
//   document.getElementById("country-cards").style.display = "none";
//   document.getElementById("search-input").style.display = "none";
//   document.getElementById("filter").style.display = "none";
//   document.getElementById("continent-select").style.display = "none";

//   // Show the country detail container
//   const countryDetailElement = document.getElementById("country-details-page");
//   countryDetailElement.style.display = "block";

//   // Add an image element with the country's flag image URL
//   const imageContainer = document.getElementById("image-container");
//   const flagElementSingle = document.createElement("img");
//   flagElementSingle.src = country.flags.png;
//   imageContainer.appendChild(flagElementSingle);

//   // Set the country name in the detail container
//   const nameElement = countryDetailElement.querySelector("h2");
//   nameElement.textContent = country.name.common;

// }
