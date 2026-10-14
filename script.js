const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const STORE = {
  get(key, fallback = []) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      alert("Browser storage is unavailable. Please check your browser settings.");
      return false;
    }
  }
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function money(value) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

$("#year").textContent = new Date().getFullYear();

// Mobile menu
$("#menuToggle").addEventListener("click", () => {
  const open = $("#navbar").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});

$("#navbar").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => $("#navbar").classList.remove("open"));
});

// Dark mode
if (STORE.get("tripTheme", "light") === "dark") {
  document.body.classList.add("dark");
  $("#themeToggle").textContent = "☀️";
}

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  $("#themeToggle").textContent = dark ? "☀️" : "🌙";
  STORE.set("tripTheme", dark ? "dark" : "light");
});

// Packing checklist
const defaultPacking = [
  "Clothes", "Comfortable shoes", "Toiletries", "Phone charger",
  "Power bank", "Photo ID", "Tickets", "Medicines if needed",
  "Water bottle", "Travel bag", "Weather-appropriate clothing",
  "Emergency contacts"
];

let packingItems = STORE.get("tripPacking", null);
if (!Array.isArray(packingItems)) {
  packingItems = defaultPacking.map((name, index) => ({
    id: index + 1, name, checked: false
  }));
}

function renderPacking() {
  $("#packingList").innerHTML = packingItems.map(item => `
    <label class="pack-item ${item.checked ? "checked" : ""}">
      <input type="checkbox" data-pack="${item.id}" ${item.checked ? "checked" : ""}>
      <span>${escapeHTML(item.name)}</span>
    </label>
  `).join("");

  const checked = packingItems.filter(item => item.checked).length;
  const percent = packingItems.length
    ? Math.round(checked / packingItems.length * 100)
    : 0;

  $("#packingProgress").textContent =
    `${checked} of ${packingItems.length} packed (${percent}%)`;
  $("#packingBar").style.width = percent + "%";

  STORE.set("tripPacking", packingItems);
}

$("#packingList").addEventListener("change", event => {
  const input = event.target.closest("[data-pack]");
  if (!input) return;

  packingItems = packingItems.map(item =>
    item.id === Number(input.dataset.pack)
      ? { ...item, checked: input.checked }
      : item
  );

  renderPacking();
});

$("#addPackingForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("#customPacking").value.trim();
  if (!name) return;

  packingItems.push({
    id: Date.now() + Math.random(),
    name,
    checked: false
  });

  $("#customPacking").value = "";
  renderPacking();
});

$("#resetPacking").addEventListener("click", () => {
  packingItems = packingItems.map(item => ({ ...item, checked: false }));
  renderPacking();
});

renderPacking();

// Food search and filter
function filterFood() {
  const query = $("#foodSearch").value.trim().toLowerCase();
  const type = $("#foodFilter").value;

  $$(".food-card").forEach(card => {
    const matchName = card.dataset.name.toLowerCase().includes(query);
    const matchType = type === "all" || card.dataset.type === type;
    card.classList.toggle("hidden", !(matchName && matchType));
  });
}

$("#foodSearch").addEventListener("input", filterFood);
$("#foodFilter").addEventListener("change", filterFood);

let foodList = STORE.get("tripFood", []);

function renderFoodList() {
  $("#myFoodList").innerHTML = foodList.length
    ? foodList.map((item, index) => `
        <li>${escapeHTML(item)}
          <button type="button" class="text-btn" data-remove-food="${index}">Remove</button>
        </li>
      `).join("")
    : "<li>No food items added yet.</li>";

  STORE.set("tripFood", foodList);
}

$("#foodGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-food]");
  if (!button) return;

  if (!foodList.includes(button.dataset.food)) {
    foodList.push(button.dataset.food);
    renderFoodList();
    button.textContent = "✓ Added to food list";
  } else {
    alert("This item is already in your food list.");
  }
});

$("#myFoodList").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-food]");
  if (!button) return;
  foodList.splice(Number(button.dataset.removeFood), 1);
  renderFoodList();
});

renderFoodList();

// My Trips
let trips = STORE.get("tripSavedTrips", []);
if (!Array.isArray(trips)) trips = [];

function renderTrips() {
  $("#tripList").innerHTML = trips.length
    ? trips.map(trip => `
      <article class="trip-card">
        <span class="pill">✈️ Saved Trip</span>
        <h3>📍 ${escapeHTML(trip.destination)}</h3>
        <p>📅 ${escapeHTML(trip.date)}</p>
        <p>🗓️ ${trip.days} day(s) · 👥 ${trip.people} traveller(s)</p>
        <p>🎒 ${escapeHTML(trip.style)}</p>
        <p>💰 Budget: ${money(trip.budget)}</p>
        <button class="btn small" data-print-trip="${trip.id}">Print / PDF</button>
        <button class="danger-btn" data-delete-trip="${trip.id}">Delete</button>
      </article>
    `).join("")
    : '<div class="panel"><p>No saved trips yet. Create your first trip above!</p></div>';

  STORE.set("tripSavedTrips", trips);
}

$("#tripForm").addEventListener("submit", event => {
  event.preventDefault();

  const destination = $("#tripDestination").value.trim();
  const date = $("#tripDate").value;
  const days = Number($("#tripDays").value);
  const people = Number($("#tripPeople").value);
  const budget = Number($("#tripBudget").value);

  if (!destination || !date || days < 1 || people < 1 || budget < 1) {
    alert("Please enter valid trip details.");
    return;
  }

  trips.unshift({
    id: Date.now(),
    destination,
    date,
    days,
    people,
    budget,
    style: $("#tripStyle").value
  });

  if (!STORE.set("tripSavedTrips", trips)) {
    trips.shift();
    return;
  }

  $("#tripForm").reset();
  $("#tripDays").value = 3;
  $("#tripPeople").value = 2;
  $("#tripBudget").value = 10000;
  renderTrips();
});

$("#tripList").addEventListener("click", event => {
  const removeButton = event.target.closest("[data-delete-trip]");
  const printButton = event.target.closest("[data-print-trip]");

  if (removeButton) {
    const id = Number(removeButton.dataset.deleteTrip);
    const previous = trips;
    trips = trips.filter(trip => trip.id !== id);

    if (!STORE.set("tripSavedTrips", trips)) {
      trips = previous;
      return;
    }
    renderTrips();
  }

  if (printButton) {
    const trip = trips.find(item => item.id === Number(printButton.dataset.printTrip));
    if (!trip) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Allow pop-ups in your browser to print the trip.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>Trip Plan</title>
      <style>body{font-family:Arial;padding:30px;line-height:1.8}</style>
      </head><body>
      <h1>AI Trip Planner</h1>
      <h2>${escapeHTML(trip.destination)}</h2>
      <p>Date: ${escapeHTML(trip.date)}</p>
      <p>Days: ${trip.days}</p><p>Travellers: ${trip.people}</p>
      <p>Style: ${escapeHTML(trip.style)}</p>
      <h3>Budget: ${money(trip.budget)}</h3>
      <p>Saved trip summary generated by AI Trip Planner.</p>
      <script>window.onload=()=>window.print();<\/script>
      </body></html>
    `);
    printWindow.document.close();
  }
});

renderTrips();

// Hotels can be added to My Trips
$$("[data-hotel]").forEach(button => {
  button.addEventListener("click", () => {
    const hotel = button.dataset.hotel;
    const existing = trips.find(t => t.destination === hotel);

    if (existing) {
      alert("This stay idea is already saved in My Trips.");
      return;
    }

    trips.unshift({
      id: Date.now(),
      destination: hotel,
      date: new Date().toISOString().slice(0, 10),
      days: 1,
      people: 1,
      budget: 0,
      style: "Accommodation idea"
    });

    if (!STORE.set("tripSavedTrips", trips)) {
      trips.shift();
      return;
    }

    renderTrips();
    button.textContent = "✓ Added";
    $("#mytrips").scrollIntoView({ behavior: "smooth" });
  });
});

// Gallery lightbox
$$(".gallery-photo").forEach(button => {
  button.addEventListener("click", () => {
    $("#largeGalleryImage").src = button.dataset.image;
    $("#galleryModal").classList.remove("hidden");
    $("#closeGallery").focus();
  });
});

function closeGallery() {
  $("#galleryModal").classList.add("hidden");
  $("#largeGalleryImage").src = "";
}

$("#closeGallery").addEventListener("click", closeGallery);

$("#galleryModal").addEventListener("click", event => {
  if (event.target === $("#galleryModal")) closeGallery();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeGallery();
});

// Budget calculator
$("#budgetForm").addEventListener("submit", event => {
  event.preventDefault();

  const people = Number($("#budgetPeople").value);
  const days = Number($("#budgetDays").value);
  const transport = Number($("#transportCost").value);
  const hotel = Number($("#hotelCost").value);
  const rooms = Number($("#roomCount").value);
  const food = Number($("#foodCost").value);
  const activities = Number($("#activityCost").value);
  const extras = Number($("#extraCost").value);

  const values = [people, days, transport, hotel, rooms, food, activities, extras];

  if (values.some(v => !Number.isFinite(v) || v < 0) ||
      people < 1 || days < 1 || rooms < 1) {
    alert("Please enter valid, non-negative costs and positive people, days and rooms.");
    return;
  }

  const transportTotal = transport * people;
  const hotelTotal = hotel * rooms * days;
  const foodTotal = food * people * days;
  const activityTotal = activities * people;
  const grandTotal = transportTotal + hotelTotal + foodTotal + activityTotal + extras;

  $("#budgetResult").innerHTML = `
    <h3>💰 Your Estimated Trip Budget</h3>
    <div class="result-line"><span>Transport</span><strong>${money(transportTotal)}</strong></div>
    <div class="result-line"><span>Accommodation</span><strong>${money(hotelTotal)}</strong></div>
    <div class="result-line"><span>Food</span><strong>${money(foodTotal)}</strong></div>
    <div class="result-line"><span>Activities</span><strong>${money(activityTotal)}</strong></div>
    <div class="result-line"><span>Other expenses</span><strong>${money(extras)}</strong></div>
    <div class="result-line total-line"><span>Total</span><strong>${money(grandTotal)}</strong></div>
    <p class="note">Approximate cost per traveller: ${money(grandTotal / people)}. Actual prices may differ.</p>
  `;

  $("#budgetResult").classList.remove("hidden");
});


// Reviews and star ratings
let selectedRating = 5;
let reviews = STORE.get("tripReviews", []);
if (!Array.isArray(reviews)) reviews = [];

function updateStars() {
  $$("#starRating button").forEach(button => {
    const selected = Number(button.dataset.rating) <= selectedRating;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(Number(button.dataset.rating) === selectedRating));
  });
}

$("#starRating").addEventListener("click", event => {
  const button = event.target.closest("[data-rating]");
  if (!button) return;
  selectedRating = Number(button.dataset.rating);
  updateStars();
});

function renderReviews() {
  $("#reviewList").innerHTML = reviews.length
    ? reviews.map(review => `
      <article class="review-card">
        <h3>${escapeHTML(review.name)}</h3>
        <div class="stars" aria-label="${review.rating} out of 5 stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
        <p>${escapeHTML(review.message)}</p>
        <small>${escapeHTML(review.date)}</small>
      </article>
    `).join("")
    : '<div class="panel"><p>No reviews yet. You can add the first review!</p></div>';

  STORE.set("tripReviews", reviews);
}

$("#reviewForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#reviewName").value.trim();
  const message = $("#reviewMessage").value.trim();

  if (!name || !message) return;

  reviews.unshift({
    id: Date.now(),
    name,
    rating: selectedRating,
    message,
    date: new Date().toLocaleDateString()
  });

  if (!STORE.set("tripReviews", reviews)) {
    reviews.shift();
    return;
  }

  $("#reviewForm").reset();
  selectedRating = 5;
  updateStars();
  renderReviews();
});

updateStars();
renderReviews();

// Live weather search via Open-Meteo (no API key normally required)
const weatherCodes = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Depositing rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Dense drizzle", "🌧️"],
  61: ["Light rain", "🌦️"],
  63: ["Moderate rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  71: ["Light snowfall", "🌨️"],
  73: ["Moderate snowfall", "❄️"],
  75: ["Heavy snowfall", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Moderate rain showers", "🌧️"],
  82: ["Heavy rain showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Severe thunderstorm with hail", "⛈️"]
};

$("#weatherForm").addEventListener("submit", async event => {
  event.preventDefault();

  const city = $("#weatherCity").value.trim();
  const result = $("#weatherResult");

  result.classList.remove("hidden");
  result.textContent = "Loading weather information...";

  try {
    const geoURL = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geoURL.search = new URLSearchParams({
      name: city, count: "1", language: "en", format: "json"
    });

    const geoResponse = await fetch(geoURL);
    if (!geoResponse.ok) throw new Error("Could not search for this city.");

    const geo = await geoResponse.json();
    const place = geo.results && geo.results[0];

    if (!place) throw new Error("City not found. Try a different city name.");

    const weatherURL = new URL("https://api.open-meteo.com/v1/forecast");
    weatherURL.search = new URLSearchParams({
      latitude: place.latitude,
      longitude: place.longitude,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      timezone: "auto"
    });

    const weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok) throw new Error("Weather service is unavailable.");

    const weather = await weatherResponse.json();
    const current = weather.current;
    const code = weatherCodes[current.weather_code] || ["Weather conditions unavailable", "🌍"];

    result.innerHTML = `
      <div class="weather-icon">${code[1]}</div>
      <h3>${escapeHTML(place.name)}${place.country ? ", " + escapeHTML(place.country) : ""}</h3>
      <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
      <p>${escapeHTML(code[0])}</p>
      <div class="result-line"><span>Feels like</span><strong>${current.apparent_temperature}°C</strong></div>
      <div class="result-line"><span>Humidity</span><strong>${current.relative_humidity_2m}%</strong></div>
      <div class="result-line"><span>Wind speed</span><strong>${current.wind_speed_10m} km/h</strong></div>
      <p class="note">Current weather · ${escapeHTML(current.time.replace("T", " "))} · Local time</p>
      <p class="note">Source: Open-Meteo. Weather conditions can change.</p>
    `;
  } catch (error) {
    result.textContent = error.message ||
      "Unable to load weather. Check your internet connection and try again.";
  }
});

// Flight, train and bus route search
$("#routeForm").addEventListener("submit", event => {
  event.preventDefault();

  const from = $("#routeFrom").value.trim();
  const to = $("#routeTo").value.trim();

  if (!from || !to) return;

  const query = `travel from ${from} to ${to}`;
  const url = "https://www.google.com/maps/dir/" +
    encodeURIComponent(from) + "/" + encodeURIComponent(to);

  window.open(url, "_blank", "noopener,noreferrer");
});

// Demo contact form
$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#contactName").value.trim();
  $("#contactStatus").textContent =
    `Thank you, ${name}! The form is validated, but messages are not sent to a server in this demo.`;

  $("#contactForm").reset();
});

// Back-to-top button
window.addEventListener("scroll", () => {
  $("#backToTop").classList.toggle("show", window.scrollY > 350);
});

$("#backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
