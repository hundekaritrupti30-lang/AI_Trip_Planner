const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("show"));
});

// Destination filter
const filterButtons = document.querySelectorAll(".filter");
const places = document.querySelectorAll(".place");
const searchPlace = document.getElementById("searchPlace");

let selectedCategory = "all";

function filterPlaces() {
  const query = searchPlace.value.trim().toLowerCase();

  places.forEach(place => {
    const category = place.dataset.category;
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesSearch = place.textContent.toLowerCase().includes(query);

    place.style.display =
      matchesCategory && matchesSearch ? "" : "none";
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.filter;
    filterPlaces();
  });
});

searchPlace.addEventListener("input", filterPlaces);

// Select destination from cards
document.querySelectorAll(".choose").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("destination").value = button.dataset.place;
    document.getElementById("planner").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Generate a sample trip plan
const tripForm = document.getElementById("tripForm");
const tripResult = document.getElementById("tripResult");

tripForm.addEventListener("submit", event => {
  event.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const tripType = document.getElementById("tripType").value;
  const days = Number(document.getElementById("duration").value);
  const budget = Number(document.getElementById("budget").value);
  const travelers = Number(document.getElementById("travelers").value);

  if (!destination || budget < 500 || !Number.isFinite(budget) ||
      !Number.isInteger(travelers) || travelers < 1 || travelers > 50) {
    tripResult.innerHTML =
      "<h3>Please check your trip details.</h3><p>Enter a valid destination, budget and number of travelers.</p>";
    return;
  }

  const totalBudget = budget * travelers;
  const dailyBudget = Math.round(budget / days);

  const activities = {
    Adventure: ["Explore outdoor activities", "Visit a scenic viewpoint", "Enjoy a local adventure"],
    Family: ["Visit a family-friendly attraction", "Explore local sightseeing spots", "Enjoy local food together"],
    Relaxation: ["Enjoy a peaceful morning", "Visit a relaxing scenic spot", "Spend time exploring at your own pace"],
    Nature: ["Explore natural landscapes", "Visit a park or nature spot", "Enjoy a scenic walk"],
    Culture: ["Visit a historical attraction", "Explore local culture", "Discover local markets and traditions"]
  };

  const suggestions = activities[tripType] || activities.Adventure;
  let itinerary = "";

  for (let day = 1; day <= days; day++) {
    const activity = suggestions[(day - 1) % suggestions.length];

    itinerary += `<li><strong>Day ${day}:</strong> ${activity} in ${escapeHTML(destination)}.</li>`;
  }

  tripResult.innerHTML = `
    <h3>🎉 Your Trip Plan is Ready!</h3>
    <p><strong>📍 Destination:</strong> ${escapeHTML(destination)}</p>
    <p><strong>🧭 Travel Type:</strong> ${escapeHTML(tripType)}</p>
    <p><strong>📅 Duration:</strong> ${days} day(s)</p>
    <p><strong>👥 Travelers:</strong> ${travelers}</p>
    <p><strong>💰 Estimated Budget:</strong> ₹${totalBudget.toLocaleString("en-IN")} total</p>
    <p><strong>🗓️ Suggested Itinerary:</strong></p>
    <ul>${itinerary}</ul>
    <p>Daily budget per person: approximately ₹${dailyBudget.toLocaleString("en-IN")}.</p>
    <p><em>Note: This is a sample plan, not a live AI-generated itinerary. Actual costs and attractions may vary.</em></p>
    <button type="button" class="btn" id="printTrip">Print Trip Plan</button>
  `;

  document.getElementById("printTrip").addEventListener("click", () => {
    window.print();
  });

  tripResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Keep user-entered text safe when displaying it
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// Contact form demonstration
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  document.getElementById("contactResult").textContent =
    "Thank you! Your form was validated. A backend is needed to send your message.";

  event.target.reset();
});

// Back to top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 350 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});