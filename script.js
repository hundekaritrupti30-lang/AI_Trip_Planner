// AI TRIP PLANNER

const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();


// MOBILE MENU

$("menuToggle").addEventListener("click", () => {
    $("navigation").classList.toggle("open");
});

document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", () => {
        $("navigation").classList.remove("open");
    });
});


// DESTINATION SEARCH

function searchDestinations() {
    const query = $("destinationSearch").value
        .trim()
        .toLowerCase();

    let found = 0;

    document.querySelectorAll(".destination-card").forEach(card => {
        const matches = card.dataset.name.includes(query);

        card.hidden = !matches;

        if (matches) found++;
    });

    $("noResults").hidden = found !== 0;
}

$("searchButton").addEventListener("click", searchDestinations);

$("destinationSearch").addEventListener("input", searchDestinations);


// SELECT DESTINATION

document.querySelectorAll(".choose").forEach(button => {
    button.addEventListener("click", () => {
        $("tripDestination").value = button.dataset.place;

        $("planner").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// HELPER: SAFE TEXT

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// MONEY FORMAT

function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}


// TRIP PLANNER

const activities = {
    balanced: [
        "Explore a popular local attraction.",
        "Enjoy local food and visit a nearby landmark.",
        "Visit a scenic spot and explore local shops."
    ],

    adventure: [
        "Try a suitable guided outdoor activity.",
        "Explore a nature trail with a local guide.",
        "Discover an outdoor attraction and relax afterwards."
    ],

    relaxation: [
        "Enjoy a relaxed breakfast and explore nearby.",
        "Visit a peaceful garden, beach or scenic area.",
        "Spend free time at a cafe or a beautiful viewpoint."
    ],

    culture: [
        "Visit a historic landmark or museum.",
        "Explore local architecture and traditions.",
        "Discover a heritage site and local crafts."
    ],

    food: [
        "Try local breakfast and visit a market.",
        "Explore regional dishes and food streets.",
        "Visit a local market and discover popular treats."
    ]
};

const destinationActivities = {
    goa: [
        "Visit a beach in the morning.",
        "Explore a historic neighbourhood.",
        "Enjoy the sunset near the coast."
    ],

    manali: [
        "Explore Old Manali.",
        "Visit a scenic mountain viewpoint if conditions permit.",
        "Explore the local market."
    ],

    jaipur: [
        "Visit Amber Fort or another heritage site.",
        "Explore the City Palace area.",
        "Visit a traditional market."
    ],

    mumbai: [
        "Explore the Gateway of India area.",
        "Visit Marine Drive.",
        "Explore a museum or historic neighbourhood."
    ],

    kerala: [
        "Explore a backwater area with a licensed operator.",
        "Visit a nature attraction.",
        "Try regional food and explore a local market."
    ],

    agra: [
        "Visit the Taj Mahal and check ticket timings.",
        "Explore Agra Fort.",
        "Discover local crafts and food."
    ]
};

$("tripForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const destination = $("tripDestination").value.trim();
    const days = Number($("tripDays").value);
    const style = $("tripStyle").value;
    const budget = Number($("tripBudget").value);

    if (!destination || days < 1 || budget < 0) {
        alert("Please enter valid trip details.");
        return;
    }

    const specific =
        destinationActivities[destination.toLowerCase()] || [];

    const general = activities[style];

    let html = `
        <h2>✨ Your Trip to ${escapeHTML(destination)}</h2>

        <p>
            Duration: ${days} days<br>
            Budget per person: ${formatMoney(budget)}
        </p>
    `;

    for (let i = 0; i < days; i++) {
        const morning = specific.length
            ? specific[i % specific.length]
            : general[i % general.length];

        const afternoon = general[(i + 1) % general.length];

        const evening = general[(i + 2) % general.length];

        html += `
            <div class="day-plan">
                <h3>Day ${i + 1}</h3>

                <p><strong>Morning:</strong>
                    ${escapeHTML(morning)}
                </p>

                <p><strong>Afternoon:</strong>
                    ${escapeHTML(afternoon)}
                </p>

                <p><strong>Evening:</strong>
                    ${escapeHTML(evening)}
                </p>
            </div>
        `;
    }

    html += `
        <p>
            Note: This is a suggested itinerary, not an AI-generated
            live travel recommendation. Check opening hours and local
            conditions before travelling.
        </p>

        <button class="btn" id="savePlan">💾 Save Plan</button>
        <button class="btn" id="sharePlan">📤 Share Plan</button>

        <p id="planMessage" aria-live="polite"></p>
    `;

    const result = $("tripResult");

    result.innerHTML = html;
    result.hidden = false;

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    const planText =
        `AI Trip Planner\n` +
        `Destination: ${destination}\n` +
        `Days: ${days}\n` +
        `Travel style: ${style}\n` +
        `Budget per person: ${formatMoney(budget)}\n\n` +
        Array.from({ length: days }, (_, i) =>
            `Day ${i + 1}: ${
                specific.length
                    ? specific[i % specific.length]
                    : general[i % general.length]
            }`
        ).join("\n");

    // SAVE PLAN

    $("savePlan").addEventListener("click", () => {
        try {
            localStorage.setItem(
                "savedAITripPlan",
                planText
            );

            $("planMessage").textContent =
                "✅ Plan saved in this browser on this device.";
        } catch (error) {
            $("planMessage").textContent =
                "Could not save the plan in this browser.";
        }
    });

    // SHARE PLAN

    $("sharePlan").addEventListener("click", async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My AI Trip Plan",
                    text: planText
                });
            } else {
                await navigator.clipboard.writeText(planText);

                $("planMessage").textContent =
                    "✅ Plan copied. Paste it into a message to share.";
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                $("planMessage").textContent =
                    "Sharing is unavailable. Please copy the plan manually.";
            }
        }
    });
});


// BUDGET CALCULATOR

$("budgetForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const people = Number($("travellers").value);
    const days = Number($("budgetDays").value);
    const travel = Number($("travelCost").value);
    const hotel = Number($("hotelCost").value);
    const rooms = Number($("rooms").value);
    const food = Number($("foodCost").value);
    const activitiesCost = Number($("activityCost").value || 0);

    if (
        people < 1 || days < 1 || rooms < 1 ||
        travel < 0 || hotel < 0 || food < 0 ||
        activitiesCost < 0
    ) {
        alert("Please enter valid budget details.");
        return;
    }

    const totalTravel = travel * people;

    const totalHotel =
        hotel * rooms * Math.max(days - 1, 0);

    const totalFood =
        food * people * days;

    const totalActivities =
        activitiesCost * people;

    const total =
        totalTravel +
        totalHotel +
        totalFood +
        totalActivities;

    $("budgetTotal").textContent = formatMoney(total);

    $("budgetBreakdown").innerHTML = `
        Travel: ${formatMoney(totalTravel)}<br>
        Hotel: ${formatMoney(totalHotel)}<br>
        Food: ${formatMoney(totalFood)}<br>
        Activities: ${formatMoney(totalActivities)}<br>
        <strong>
            Approx. per person: ${formatMoney(total / people)}
        </strong>
    `;
});

// Show initial estimate

$("budgetForm").requestSubmit();


// WEATHER CHECKER
// Uses Open-Meteo geocoding and weather APIs.
// No API key is needed for this basic example.

const weatherDescriptions = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Fog 🌫️",
    51: "Light Drizzle 🌦️",
    53: "Drizzle 🌧️",
    55: "Heavy Drizzle 🌧️",
    61: "Light Rain 🌧️",
    63: "Rain 🌧️",
    65: "Heavy Rain 🌧️",
    71: "Light Snow ❄️",
    73: "Snow ❄️",
    75: "Heavy Snow ❄️",
    80: "Rain Showers 🌦️",
    81: "Rain Showers 🌧️",
    82: "Heavy Rain Showers 🌧️",
    95: "Thunderstorm ⛈️",
    96: "Thunderstorm with Hail ⛈️",
    99: "Thunderstorm with Hail ⛈️"
};

$("weatherForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const city = $("weatherCity").value.trim();

    const result = $("weatherResult");

    result.textContent = "⏳ Checking weather...";

    try {
        // Find city coordinates

        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search" +
            "?name=" + encodeURIComponent(city) +
            "&count=1&language=en&format=json"
        );

        if (!geoResponse.ok) {
            throw new Error("Could not search for this city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(
                "City not found. Check the spelling and try again."
            );
        }

        const place = geoData.results[0];

        // Fetch current weather

        const weatherURL =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + place.latitude +
            "&longitude=" + place.longitude +
            "&current=temperature_2m,relative_humidity_2m," +
            "apparent_temperature,weather_code,wind_speed_10m" +
            "&timezone=auto";

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Weather service is unavailable.");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        const description =
            weatherDescriptions[current.weather_code] ||
            "Current Weather";

        result.innerHTML = `
            <h2>
                ${Math.round(current.temperature_2m)}°C
            </h2>

            <h3>${escapeHTML(description)}</h3>

            <p>
                📍 ${escapeHTML(place.name)}
                ${place.country ? ", " + escapeHTML(place.country) : ""}
            </p>

            <p>
                🌡️ Feels like:
                ${Math.round(current.apparent_temperature)}°C
            </p>

            <p>
                💧 Humidity:
                ${current.relative_humidity_2m}%
            </p>

            <p>
                💨 Wind:
                ${Math.round(current.wind_speed_10m)} km/h
            </p>

            <p class="small-note">
                Updated: ${escapeHTML(current.time.replace("T", " "))}
            </p>
        `;

    } catch (error) {
        result.textContent =
            "⚠️ " + (error.message || "Weather could not be loaded.");
    }
});
