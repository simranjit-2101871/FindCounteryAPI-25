const apiUrl = "https://restcountries.com/v3.1/all";
const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");

async function fetchCountries() {
  try {
    const response = await fetch(apiUrl);
    const countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}




// Create the modal container
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);



function showCountryDetails(country) {
  // Fill modal with country details
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <img src="${country.flags.svg}" alt="${country.name.common} Flag">
      <h2>${country.name.common}</h2>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
    </div>
  `;

  modal.style.display = "flex"; // Show modal

  // Close modal on clicking the close button
  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.style.display = "none";
  });


}


function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country");
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} Flag">
      <div class="details">
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `;




    // Append  to the countryCard
    countryCard.addEventListener("click", () => {
      showCountryDetails(country);
    });

    countriesContainer.appendChild(countryCard);
  });
}





searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const countryCards = document.querySelectorAll(".country");
  countryCards.forEach((card) => {
    const name = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  const countryCards = document.querySelectorAll(".country");
  countryCards.forEach((card) => {
    const countryRegion = card.querySelector("p:nth-child(3)").textContent.toLowerCase();
    card.style.display = region === "" || countryRegion.includes(region.toLowerCase()) ? "block" : "none";
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

fetchCountries();
