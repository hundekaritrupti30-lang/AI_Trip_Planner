
const $ = (id) => document.getElementById(id);

const destinations = {
  Manali: [
    ["Hadimba Temple", "A peaceful temple surrounded by cedar trees.", "photo-1472396961693-142e6e269027", "Morning"],
    ["Mall Road", "Explore local shops, cafes and street food.", "photo-1517248135467-4c7edcad34c4", "Afternoon"],
    ["Solang Valley", "Enjoy mountain views and outdoor activities.", "photo-1464822759023-fed622ff2c3b", "Evening"],
    ["Atal Tunnel", "See the famous mountain tunnel and scenic views.", "photo-1464278533981-50106e6176b1", "Morning"],
    ["Old Manali", "Walk around the cafes and peaceful lanes.", "photo-1441974231531-c6227db76b6e", "Afternoon"],
    ["Vashisht Temple", "Visit the traditional temple area.", "photo-1500530855697-b586d89ba3ee", "Evening"],
    ["Jogini Waterfall", "Enjoy a nature walk to a beautiful waterfall.", "photo-1433086966358-54859d0ed716", "Morning"]
  ],
  Goa: [
    ["Baga Beach", "Relax by the sea and enjoy the beach atmosphere.", "photo-1507525428034-b723cf961d3e", "Morning"],
    ["Fort Aguada", "Explore the historic fort and coastal views.", "photo-1464822759023-fed622ff2c3b", "Afternoon"],
    ["Calangute Beach", "Enjoy a beach walk and local food.", "photo-1519046904884-53103b34b206", "Evening"],
    ["Old Goa Churches", "Discover historic churches and architecture.", "photo-1519608487953-e999c86e7455", "Morning"],
    ["Dudhsagar Falls", "Admire the famous waterfall and green surroundings.", "photo-1433086966358-54859d0ed716", "Afternoon"],
    ["Fontainhas", "Walk through colourful heritage streets.", "photo-1511818966892-d7d671e672a2", "Evening"],
    ["Palolem Beach", "Enjoy a relaxed coastal day.", "photo-1473116763249-2faaef81ccda", "Morning"]
  ],
  Jaipur: [
    ["Hawa Mahal", "See Jaipur's famous palace facade.", "photo-1519608487953-e999c86e7455", "Morning"],
    ["Amber Fort", "Explore the historic hilltop fort.", "photo-1464822759023-fed622ff2c3b", "Afternoon"],
    ["City Palace", "Discover royal courtyards and collections.", "photo-1511818966892-d7d671e672a2", "Evening"],
    ["Jantar Mantar", "Visit the historic astronomical instruments.", "photo-1519608487953-e999c86e7455", "Morning"],
    ["Jal Mahal", "Admire the palace surrounded by water.", "photo-1500530855697-b586d89ba3ee", "Afternoon"],
    ["Local Bazaars", "Shop for handicrafts and souvenirs.", "photo-1441986300917-64674bd600d8", "Evening"]
  ],
  Mumbai: [
    ["Gateway of India", "See the iconic waterfront monument.", "photo-1519608487953-e999c86e7455", "Morning"],
    ["Marine Drive", "Enjoy the famous coastal promenade.", "photo-1519046904884-53103b34b206", "Afternoon"],
    ["Elephanta Caves", "Explore historic rock-cut cave temples.", "photo-1472396961693-142e6e269027", "Evening"],
    ["Siddhivinayak Temple", "Visit the well-known temple.", "photo-1500530855697-b586d89ba3ee", "Morning"],
    ["Juhu Beach", "Relax and try local beach snacks.", "photo-1507525428034-b723cf961d3e", "Afternoon"],
    ["Bandra Fort", "Enjoy views along the waterfront.", "photo-1473116763249-2faaef81ccda", "Evening"]
  ],
  Pune: [
    ["Shaniwar Wada", "Discover Pune's historic fortification.", "photo-1519608487953-e999c86e7455", "Morning"],
    ["Aga Khan Palace", "Explore an important historical landmark.", "photo-1511818966892-d7d671e672a2", "Afternoon"],
    ["Sinhagad Fort", "Enjoy a hilltop visit and scenic views.", "photo-1464822759023-fed622ff2c3b", "Evening"],
    ["Dagdusheth Temple", "Visit a famous city temple.", "photo-1500530855697-b586d89ba3ee", "Morning"],
    ["Pune Okayama Garden", "Relax in a Japanese-style garden.", "photo-1441974231531-c6227db76b6e", "Afternoon"],
    ["Khadakwasla Dam", "Enjoy the lakeside scenery.", "photo-1473116763249-2faaef81ccda", "Evening"]
  ],
  Mahabaleshwar: [
    ["Arthur's Seat", "Enjoy sweeping views of the valley.", "photo-1464822759023-fed622ff2c3b", "Morning"],
    ["Venna Lake", "Relax beside the lake.", "photo-1473116763249-2faaef81ccda", "Afternoon"],
    ["Elephant's Head Point", "See a dramatic mountain viewpoint.", "photo-1500530855697-b586d89ba3ee", "Evening"],
    ["Mapro Garden", "Take a break and explore local treats.", "photo-1517248135467-4c7edcad34c4", "Morning"],
    ["Lingmala Waterfall", "Enjoy a scenic waterfall viewpoint.", "photo-1433086966358-54859d0ed716", "Afternoon"],
    ["Wilson Point", "Visit a popular hilltop viewpoint.", "photo-1472396961693-142e6e269027", "Evening"]
  ],
  Kerala: [
    ["Munnar Tea Gardens", "Walk through scenic tea-growing landscapes.", "photo-1441974231531-c6227db76e6", "Morning"],
    ["Alleppey Backwaters", "Explore peaceful waterways and village scenery.", "photo-1473116763249-2faaef81ccda", "Afternoon"],
    ["Fort Kochi", "Discover heritage streets and coastal culture.", "photo-1511818966892-d7d671e672a2", "Evening"],
    ["Eravikulam National Park", "Explore mountain scenery and nature trails.", "photo-1472396961693-142e6e269027", "Morning"],
    ["Mattancherry Palace", "Visit a historic palace and museum.", "photo-1519608487953-e999c86e7455", "Afternoon"],
    ["Kovalam Beach", "Relax along the coastline.", "photo-1507525428034-b723cf961d3e", "Evening"]
  ],
  Shimla: [
    ["The Ridge", "Enjoy open views and a central walking area.", "photo-1464822759023-fed622ff2c3b", "Morning"],
    ["Mall Road", "Explore shops, cafes and local life.", "photo-1517248135467-4c7edcad34c4", "Afternoon"],
    ["Jakhoo Temple", "Visit a hilltop temple surrounded by nature.", "photo-1472396961693-142e6e269027", "Evening"],
    ["Kufri", "Enjoy mountain scenery outside the city.", "photo-1464278533981-50106e6176b1", "Morning"],
    ["Christ Church", "See the historic church on the Ridge.", "photo-1511818966892-d7d671e672a2", "Afternoon"],
    ["Green Valley", "Admire forested hills and valley views.", "photo-1441974231531-c6227db76e6", "Evening"]
  ],
  Rishikesh: [
    ["Lakshman Jhula Area", "Explore the riverside and nearby streets.", "photo-1473116763249-2faaef81ccda", "Morning"],
    ["Triveni Ghat", "Visit a well-known riverside ghat.", "photo-1500530855697-b586d89ba3ee", "Afternoon"],
    ["Ram Jhula", "Walk around the river and temple area.", "photo-1441974231531-c6227db76e6", "Evening"],
    ["Neer Garh Waterfall", "Enjoy a nature walk to the waterfall.", "photo-1433086966358-54859d0ed716", "Morning"],
    ["Beatles Ashram", "Explore a unique historic and artistic site.", "photo-1472396961693-142e6e269027", "Afternoon"],
    ["Ganga Riverside", "Relax beside the river.", "photo-1507525428034-b723cf961d3e", "Evening"]
  ],
  Agra: [
    ["Taj Mahal", "Visit the world-famous marble monument.", "photo-1564507592333-c60657eea523", "Morning"],
    ["Agra Fort", "Explore a grand historic fort.", "photo-1519608487953-e999c86e7455", "Afternoon"],
    ["Mehtab Bagh", "Enjoy garden views towards the Taj Mahal.", "photo-1473116763249-2faaef81ccda", "Evening"],
    ["Fatehpur Sikri", "Discover a historic Mughal city.", "photo-1511818966892-d7d671e672a2", "Morning"],
    ["Itimad-ud-Daulah", "See an elegant historic tomb.", "photo-1519608487953-e999c86e7455", "Afternoon"],
    ["Local Handicraft Market", "Browse traditional crafts and souvenirs.", "photo-1441986300917-64674bd600d8", "Evening"]
  ],
  Lonavala: [
    ["Tiger's Leap", "Enjoy dramatic views of the valley.", "photo-1464822759023-fed622ff2c3b", "Morning"],
    ["Bhushi Dam", "Visit a popular local water spot.", "photo-1473116763249-2faaef81ccda", "Afternoon"],
    ["Karla Caves", "Explore ancient rock-cut caves.", "photo-1519608487953-e999c86e7455", "Evening"],
    ["Lohagad Fort", "Enjoy a historic fort and hill walk.", "photo-1472396961693-142e6e269027", "Morning"],
    ["Pawna Lake", "Relax beside a scenic lake.", "photo-1500530855697-b586d89ba3ee", "Afternoon"],
    ["Lion's Point", "See the surrounding mountain landscape.", "photo-1464278533981-50106e6176b1", "Evening"]
  ],
  Nashik: [
    ["Trimbakeshwar Temple", "Visit an important historic temple.", "photo-1500530855697-b586d89ba3ee", "Morning"],
    ["Pandavleni Caves", "Explore ancient rock-cut caves.", "photo-1519608487953-e999c86e7455", "Afternoon"],
    ["Ramkund", "Visit a well-known riverside location.", "photo-1473116763249-2faaef81ccda", "Evening"],
    ["Sula Area", "Explore scenic countryside around the region.", "photo-1441974231531-c6227db76e6", "Morning"],
    ["Anjaneri Hills", "Enjoy a nature outing with mountain views.", "photo-1464822759023-fed622ff2c3b", "Afternoon"],
    ["Gangapur Dam", "Relax by the water and enjoy the scenery.", "photo-1507525428034-b723cf961d3e", "Evening"]
  ]
};

const extraPlaces = [
  ["Local Food Market", "Try regional food and discover local flavours.", "photo-1504674900247-0877df9cc836", "Morning"],
  ["Nature Viewpoint", "Take photos and enjoy the natural surroundings.", "photo-1441974231531-c6227db76e6", "Afternoon"],
  ["Local Shopping Street", "Browse souvenirs and local products.", "photo-1441986300917-64674bd600d8", "Evening"]
];

let currentDestination = "Manali";
let currentDays = [];
let activeDay = 0;
let favourites = readStore("wanderwise-favourites", []);
let expenses = readStore("wanderwise-expenses", []);
let packedItems = [
  "Clothes", "Comfortable shoes", "ID proof", "Phone charger",
  "Personal medicines", "Water bottle", "Toiletries", "Travel tickets"
].map((name, index) => ({ id: index + 1, name, done: false }));

function readStore(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function saveStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The feature still works for the current page session.
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[char]));
}

function imageUrl(photoId) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;
}

function mapsUrl(place, destination = currentDestination) {
  return "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${place}, ${destination}`);
}

function makePlaceCard(place, destination, dayNumber = 0, index = 0) {
  const [name, description, photo, time] = place;
  const saved = favourites.some(item =>
    item.name === name && item.destination === destination
  );

  return `
    <article class="place-card">
      <img src="${imageUrl(photo)}" alt="${escapeHTML(name)}"
           loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80'">
      <div class="place-content">
        <button class="fav-btn" type="button"
          data-fav-name="${escapeHTML(name)}"
          data-fav-destination="${escapeHTML(destination)}"
          aria-label="Toggle favourite">${saved ? "❤️" : "♡"}</button>
        <span class="place-meta">${dayNumber ? `DAY ${dayNumber} · ` : ""}${escapeHTML(time || "Visit")}</span>
        <h3>${escapeHTML(name)}</h3>
        <p>${escapeHTML(description)}</p>
        <a class="btn" target="_blank" rel="noopener" href="${mapsUrl(name, destination)}">📍 View on Map</a>
      </div>
    </article>`;
}

function getPlaces(destination) {
  const key = Object.keys(destinations).find(
    name => name.toLowerCase() === destination.trim().toLowerCase()
  );
  return key ? destinations[key] : [
    [`${destination} Main Attraction`, `Explore popular sights in ${destination}.`, "photo-1470770841072-f978cf4d019e", "Morning"],
    [`${destination} Local Area`, `Discover local culture, food and markets in ${destination}.`, "photo-1441986300917-64674bd600d8", "Afternoon"],
    [`${destination} Scenic Spot`, `Enjoy nature and scenic views around ${destination}.`, "photo-1464822759023-fed622ff2c3b", "Evening"],
    ...extraPlaces
  ];
}

function buildItinerary(destination, days) {
  const places = getPlaces(destination);
  currentDays = [];

  for (let day = 0; day < days; day++) {
    const start = (day * 3) % places.length;
    const dailyPlaces = [];

    for (let j = 0; j < 3; j++) {
      dailyPlaces.push(places[(start + j) % places.length]);
    }

    currentDays.push(dailyPlaces);
  }

  activeDay = 0;
  renderItinerary();
}

function renderItinerary() {
  const tabs = $("dayTabs");
  const results = $("itineraryResults");

  tabs.innerHTML = currentDays.map((_, index) => `
    <button type="button" class="day-tab ${index === activeDay ? "active" : ""}"
      data-day="${index}">Day ${index + 1}</button>
  `).join("");

  const date = $("startDate").value;
  let dateLabel = "";
  if (date) {
    const d = new Date(`${date}T12:00:00`);
    d.setDate(d.getDate() + activeDay);
    dateLabel = d.toLocaleDateString(undefined, {
      day: "numeric", month: "short", year: "numeric"
    });
  }

  results.innerHTML = currentDays[activeDay].map((place, index) =>
    makePlaceCard(place, currentDestination, activeDay + 1, index)
  ).join("");

  $("tripSummary").innerHTML = `
    <h3>🌍 ${escapeHTML(currentDestination)} Trip</h3>
    <p><strong>${currentDays.length} days</strong> · Day ${activeDay + 1}
    ${dateLabel ? ` · ${dateLabel}` : ""}</p>
    <p>Three suggested places are arranged for this day. Select another day above to see its places.</p>`;
}

function generateTrip(event) {
  event.preventDefault();

  const destination = $("destinationInput").value.trim();
  const days = Number($("daysInput").value);
  const travellers = Number($("travellersInput").value);
  const budget = Number($("budgetInput").value);

  if (!destination || days < 1 || days > 7 || travellers < 1 || budget < 0) {
    alert("Please enter valid trip details.");
    return;
  }

  currentDestination = destination;
  $("budgetPeople").value = travellers;
  $("budgetDays").value = days;
  $("weatherCity").value = destination;
  $("hotelCity").value = destination;
  $("mapSearch").value = destination;

  buildItinerary(destination, days);
  calculateBudget();
  document.querySelector("#itinerary").scrollIntoView({ behavior: "smooth" });
}

function renderGallery(query = "") {
  const gallery = $("destinationGallery");
  const names = Object.keys(destinations);
  const filtered = names.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  gallery.innerHTML = filtered.length ? filtered.map(name => {
    const place = destinations[name][0];
    return `
      <article class="destination-card">
        <img src="${imageUrl(place[2])}" alt="${escapeHTML(name)}" loading="lazy">
        <div class="place-content">
          <h3>${escapeHTML(name)}</h3>
          <p>${escapeHTML(place[1])}</p>
          <button class="btn choose-destination" type="button"
            data-destination="${escapeHTML(name)}">Explore Places</button>
          <a class="btn btn-light" target="_blank" rel="noopener"
            href="${mapsUrl(name, name)}">Open Map</a>
        </div>
      </article>`;
  }).join("") : `<div class="empty-state">No matching destination found. Try another name.</div>`;
}

function renderFavourites() {
  const container = $("favouriteList");
  if (!favourites.length) {
    container.innerHTML = `<div class="empty-state">❤️ No favourites yet. Press ♡ on a place to save it here.</div>`;
    return;
  }

  container.innerHTML = favourites.map(item => `
    <article class="destination-card">
      <img src="${imageUrl(item.photo)}" alt="${escapeHTML(item.name)}" loading="lazy">
      <div class="place-content">
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.destination)}</p>
        <a class="btn" target="_blank" rel="noopener"
          href="${mapsUrl(item.name, item.destination)}">View Map</a>
        <button class="btn btn-light remove-fav" type="button"
          data-fav-name="${escapeHTML(item.name)}"
          data-fav-destination="${escapeHTML(item.destination)}">Remove</button>
      </div>
    </article>`).join("");
}

function toggleFavourite(name, destination) {
  const exists = favourites.some(item =>
    item.name === name && item.destination === destination
  );

  if (exists) {
    favourites = favourites.filter(item =>
      !(item.name === name && item.destination === destination)
    );
  } else {
    const allPlaces = Object.values(destinations).flat();
    const place = allPlaces.find(item => item[0] === name) ||
      extraPlaces.find(item => item[0] === name);
    favourites.push({
      name,
      destination,
      photo: place ? place[2] : "photo-1470770841072-f978cf4d019e"
    });
  }

  saveStore("wanderwise-favourites", favourites);
  renderItinerary();
  renderGallery($("placeSearch").value);
  renderFavourites();
}

function calculateBudget() {
  const people = Math.max(1, Number($("budgetPeople").value) || 1);
  const days = Math.max(1, Number($("budgetDays").value) || 1);
  const hotel = Math.max(0, Number($("hotelCost").value) || 0);
  const food = Math.max(0, Number($("foodCost").value) || 0);
  const transport = Math.max(0, Number($("transportCost").value) || 0);
  const activities = Math.max(0, Number($("activityCost").value) || 0);

  const hotelTotal = hotel * Math.max(0, days - 1);
  const foodTotal = food * people * days;
  const total = hotelTotal + foodTotal + transport + activities;

  $("budgetResult").innerHTML = `
    <div><span>Estimated Total</span><br>
    <strong>₹${total.toLocaleString("en-IN")}</strong>
    <p>Hotel: ₹${hotelTotal.toLocaleString("en-IN")} · Food: ₹${foodTotal.toLocaleString("en-IN")}
    <br>Transport: ₹${transport.toLocaleString("en-IN")} · Activities: ₹${activities.toLocaleString("en-IN")}</p>
    <small>Estimate only. Actual prices may differ.</small></div>`;
}

function renderExpenses() {
  $("expenseTotal").innerHTML = `
    <span>Total Expenses</span>
    <strong>₹${expenses.reduce((sum, item) => sum + item.amount, 0).toLocaleString("en-IN")}</strong>`;

  $("expenseList").innerHTML = expenses.length ? expenses.map(item => `
    <div class="expense-item">
      <div><strong>${escapeHTML(item.name)}</strong><br>
      <small>${escapeHTML(item.category)}</small></div>
      <strong>₹${item.amount.toLocaleString("en-IN")}</strong>
      <button class="delete-btn" data-expense-id="${item.id}" type="button">Delete</button>
    </div>`).join("") : `<div class="empty-state">No expenses added yet.</div>`;
}

function renderPacking() {
  const packed = packedItems.filter(item => item.done).length;
  $("packingProgress").textContent = `${packed} of ${packedItems.length} packed`;
  document.querySelector(".packing-progress").style.setProperty(
    "--progress", `${packedItems.length ? packed / packedItems.length * 100 : 0}%`
  );

  $("packingList").innerHTML = packedItems.map(item => `
    <label class="check-item ${item.done ? "done" : ""}">
      <input type="checkbox" data-pack-id="${item.id}" ${item.done ? "checked" : ""}>
      <span>${escapeHTML(item.name)}</span>
    </label>`).join("");
}

function openSearch(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openMapSearch() {
  const query = $("mapSearch").value.trim() || currentDestination;
  openSearch("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query));
}

function openWeather() {
  const city = $("weatherCity").value.trim() || currentDestination;
  openSearch("https://www.google.com/search?q=" + encodeURIComponent(city + " weather forecast"));
}

function openHotels() {
  const city = $("hotelCity").value.trim() || currentDestination;
  openSearch("https://www.google.com/search?q=" + encodeURIComponent("hotels in " + city));
}

function openTransport(mode) {
  const from = $("transportFrom").value.trim();
  const to = $("transportTo").value.trim() || currentDestination;

  if (!to) {
    alert("Please enter a destination.");
    return;
  }

  const query = mode === "car"
    ? `${from} to ${to} driving directions`
    : `${mode} from ${from} to ${to}`;

  if (mode === "car") {
    openSearch("https://www.google.com/maps/dir/" +
      encodeURIComponent(from) + "/" + encodeURIComponent(to));
  } else {
    openSearch("https://www.google.com/search?q=" + encodeURIComponent(query));
  }
}

function downloadItinerary() {
  if (!currentDays.length) {
    alert("Please generate your trip first.");
    return;
  }

  let text = `WanderWise Trip Itinerary\nDestination: ${currentDestination}\n\n`;

  currentDays.forEach((day, index) => {
    text += `DAY ${index + 1}\n`;
    day.forEach((place, i) => {
      text += `${i + 1}. ${place[0]} - ${place[3]}\n${place[1]}\n`;
      text += `Map: ${mapsUrl(place[0], currentDestination)}\n\n`;
    });
  });

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "WanderWise-Itinerary.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function changeLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-en][data-mr][data-hi]").forEach(element => {
    element.textContent = element.dataset[language];
  });
}

// Language selector
$("languageSelect").addEventListener("change", event => {
  changeLanguage(event.target.value);
});

// Dark mode
$("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  $("darkToggle").textContent = isDark ? "☀️" : "🌙";
  saveStore("wanderwise-dark", isDark);
});

// Trip generation
$("tripForm").addEventListener("submit", generateTrip);

// Day-wise tabs
$("dayTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-day]");
  if (!button) return;
  activeDay = Number(button.dataset.day);
  renderItinerary();
});

// Favourite buttons work in itinerary and gallery
document.addEventListener("click", event => {
  const favButton = event.target.closest("[data-fav-name]");
  if (favButton) {
    toggleFavourite(favButton.dataset.favName, favButton.dataset.favDestination);
    return;
  }

  const chooseButton = event.target.closest(".choose-destination");
  if (chooseButton) {
    $("destinationInput").value = chooseButton.dataset.destination;
    $("planner").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const removeButton = event.target.closest(".remove-fav");
  if (removeButton) {
    toggleFavourite(removeButton.dataset.favName, removeButton.dataset.favDestination);
    return;
  }

  const deleteButton = event.target.closest("[data-expense-id]");
  if (deleteButton) {
    expenses = expenses.filter(item => item.id !== Number(deleteButton.dataset.expenseId));
    saveStore("wanderwise-expenses", expenses);
    renderExpenses();
  }
});

// Destination search
$("placeSearch").addEventListener("input", event => renderGallery(event.target.value));

// Map, weather, hotels
$("mapBtn").addEventListener("click", openMapSearch);
$("weatherBtn").addEventListener("click", openWeather);
$("hotelBtn").addEventListener("click", openHotels);

// Transport
document.querySelectorAll(".transport-btn").forEach(button => {
  button.addEventListener("click", () => openTransport(button.dataset.mode));
});

// Budget calculator
$("calculateBudget").addEventListener("click", calculateBudget);

// Expense tracker
$("expenseForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("expenseName").value.trim();
  const amount = Number($("expenseAmount").value);

  if (!name || !Number.isFinite(amount) || amount <= 0) {
    alert("Enter an expense name and a valid amount.");
    return;
  }

  expenses.push({
    id: Date.now(),
    name,
    amount,
    category: $("expenseCategory").value
  });

  saveStore("wanderwise-expenses", expenses);
  $("expenseForm").reset();
  renderExpenses();
});

// Packing checklist
$("packingList").addEventListener("change", event => {
  const input = event.target.closest("[data-pack-id]");
  if (!input) return;

  const item = packedItems.find(item => item.id === Number(input.dataset.packId));
  if (item) item.done = input.checked;
  renderPacking();
});

$("packingForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("customPacking").value.trim();
  if (!name) return;

  packedItems.push({ id: Date.now(), name, done: false });
  $("customPacking").value = "";
  renderPacking();
});

$("resetPacking").addEventListener("click", () => {
  packedItems.forEach(item => item.done = false);
  renderPacking();
});

// Itinerary download and printing
$("downloadBtn").addEventListener("click", downloadItinerary);
$("printBtn").addEventListener("click", () => window.print());

// Back-to-top button
window.addEventListener("scroll", () => {
  $("topBtn").style.display = window.scrollY > 400 ? "block" : "none";
});
$("topBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial setup
(function init() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  $("startDate").value = localDate;
  $("transportTo").value = currentDestination;
  $("weatherCity").value = currentDestination;
  $("hotelCity").value = currentDestination;

  if (readStore("wanderwise-dark", false)) {
    document.body.classList.add("dark");
    $("darkToggle").textContent = "☀️";
  }

  renderGallery();
  renderFavourites();
  renderExpenses();
  renderPacking();
  calculateBudget();
})();
