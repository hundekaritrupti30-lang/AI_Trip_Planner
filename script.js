function generateTrip() {

    const destination =
        document.getElementById("destination").value.trim();

    const days =
        parseInt(document.getElementById("days").value);

    const travellers =
        parseInt(document.getElementById("travellers").value);

    const budget =
        document.getElementById("budget").value;

    const tripType =
        document.getElementById("tripType").value;

    const transport =
        document.getElementById("transport").value;

    const selected =
        document.querySelectorAll(
            '.interest-box input[type="checkbox"]:checked'
        );

    if (destination === "") {
        alert("Please enter your destination.");
        return;
    }

    if (!days || days < 1) {
        alert("Please enter valid number of days.");
        return;
    }

    if (!travellers || travellers < 1) {
        alert("Please enter number of travellers.");
        return;
    }

    let interests = [];

    selected.forEach(function(item) {
        interests.push(item.value);
    });

    if (interests.length === 0) {
        interests = ["Nature", "Culture", "Food"];
    }


    /* BUDGET */

    let dailyCost;

    if (budget === "low") {
        dailyCost = 1000;
    }
    else if (budget === "medium") {
        dailyCost = 2500;
    }
    else {
        dailyCost = 5000;
    }

    const stayCost = dailyCost * 0.35;
    const foodCost = dailyCost * 0.20;
    const activityCost = dailyCost * 0.25;
    const transportCost = dailyCost * 0.20;

    const totalBudget =
        dailyCost * days * travellers;


    /* IMAGE */

    const image =
        getDestinationImage(destination);


    /* ITINERARY */

    let itinerary = "";

    for (let i = 1; i <= days; i++) {

        const morning =
            getActivity(interests, i, "morning");

        const afternoon =
            getActivity(interests, i, "afternoon");

        const evening =
            getActivity(interests, i, "evening");

        itinerary += `

        <div class="day-card">

            <h4>📅 Day ${i}</h4>

            <p>
                🌅 <strong>Morning:</strong>
                ${morning}
            </p>

            <p>
                ☀️ <strong>Afternoon:</strong>
                ${afternoon}
            </p>

            <p>
                🌆 <strong>Evening:</strong>
                ${evening}
            </p>

        </div>

        `;
    }


    /* OUTPUT */

    const output =
        document.getElementById("tripOutput");

    output.innerHTML = `

        <div class="trip-header">

            <img
                class="trip-image"
                src="${image}"
                alt="${destination}"
            >

            <h3>✈️ ${destination} Trip</h3>

            <div class="trip-info">

                <span class="info-badge">
                    📅 ${days} Days
                </span>

                <span class="info-badge">
                    👥 ${travellers} Travellers
                </span>

                <span class="info-badge">
                    💰 ${getBudgetText(budget)}
                </span>

                <span class="info-badge">
                    ${tripType}
                </span>

                <span class="info-badge">
                    ${transport}
                </span>

            </div>

        </div>


        <h2 class="itinerary-title">
            🗺️ Day-wise Itinerary
        </h2>

        ${itinerary}


        <div class="extra-grid">

            <div class="extra-card">

                <h3>🏨 Hotel Suggestions</h3>

                <p>
                    ⭐ ${getHotelType(budget)}
                </p>

                <p>
                    Choose accommodation near major
                    tourist attractions.
                </p>

                <p>
                    Look for hotels with good reviews,
                    clean rooms and easy transport.
                </p>

            </div>


            <div class="extra-card">

                <h3>🍴 Food Guide</h3>

                <p>
                    🍛 Try local traditional dishes.
                </p>

                <p>
                    🥗 Explore popular local restaurants.
                </p>

                <p>
                    🍨 Don't forget to try local desserts.
                </p>

            </div>


            <div class="extra-card">

                <h3>🚗 Transport</h3>

                <p>
                    Selected: <strong>${transport}</strong>
                </p>

                <p>
                    🚕 Local taxi / cab can be useful
                    for sightseeing.
                </p>

                <p>
                    🚌 Public transport can help reduce
                    travel expenses.
                </p>

            </div>


            <div class="extra-card">

                <h3>💰 Budget Breakdown</h3>

                <p>
                    🏨 Stay:
                    ₹${Math.round(stayCost).toLocaleString("en-IN")}
                    / day
                </p>

                <p>
                    🍴 Food:
                    ₹${Math.round(foodCost).toLocaleString("en-IN")}
                    / day
                </p>

                <p>
                    🎯 Activities:
                    ₹${Math.round(activityCost).toLocaleString("en-IN")}
                    / day
                </p>

                <p>
                    🚗 Transport:
                    ₹${Math.round(transportCost).toLocaleString("en-IN")}
                    / day
                </p>

                <h3 class="budget-number">
                    ₹${totalBudget.toLocaleString("en-IN")}
                </h3>

                <small>
                    Approximate total budget
                </small>

            </div>


            <div class="extra-card">

                <h3>🎒 Packing Checklist</h3>

                <ul class="check-list">

                    <li>☑️ Clothes</li>
                    <li>☑️ Comfortable Shoes</li>
                    <li>☑️ ID Proof</li>
                    <li>☑️ Phone & Charger</li>
                    <li>☑️ Power Bank</li>
                    <li>☑️ Medicines if needed</li>
                    <li>☑️ Water Bottle</li>

                </ul>

            </div>


            <div class="extra-card">

                <h3>🌦️ Travel Tips</h3>

                <p>✔ Check weather before travelling.</p>
                <p>✔ Keep important documents safe.</p>
                <p>✔ Keep emergency contacts available.</p>
                <p>✔ Respect local culture.</p>
                <p>✔ Keep your belongings safe.</p>

            </div>

        </div>


        <div class="extra-card" style="margin-top:25px;">

            <h3>⭐ Recommended Activities</h3>

            <p>
                Your selected interests:
                <strong>${interests.join(", ")}</strong>
            </p>

            <p>
                Based on your preferences, explore
                sightseeing, local attractions,
                food experiences and activities
                related to your interests.
            </p>

        </div>

    `;


    document.getElementById("result").style.display =
        "block";

    document.getElementById("result")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ACTIVITY GENERATOR */

function getActivity(interests, day, time) {

    const interest =
        interests[(day - 1) % interests.length];

    const activities = {

        Adventure: {
            morning:
                "Start the day with an exciting adventure activity.",
            afternoon:
                "Explore an adventure destination and enjoy outdoor activities.",
            evening:
                "Relax and enjoy the local surroundings."
        },

        Beach: {
            morning:
                "Enjoy a peaceful morning at the beach.",
            afternoon:
                "Enjoy water activities and spend time near the sea.",
            evening:
                "Watch the sunset and enjoy the beach atmosphere."
        },

        Nature: {
            morning:
                "Visit a beautiful natural attraction.",
            afternoon:
                "Explore parks, waterfalls or scenic viewpoints.",
            evening:
                "Enjoy a relaxing nature walk."
        },

        Culture: {
            morning:
                "Visit an important historical or cultural attraction.",
            afternoon:
                "Explore local heritage and traditional places.",
            evening:
                "Experience local culture and traditions."
        },

        Food: {
            morning:
                "Enjoy a delicious local breakfast.",
            afternoon:
                "Try famous local dishes for lunch.",
            evening:
                "Explore popular local food places."
        },

        Shopping: {
            morning:
                "Explore local markets and shopping streets.",
            afternoon:
                "Shop for traditional items and souvenirs.",
            evening:
                "Visit a popular shopping area."
        }

    };

    return activities[interest][time];
}


/* BUDGET TEXT */

function getBudgetText(budget) {

    if (budget === "low") {
        return "💰 Budget";
    }

    if (budget === "medium") {
        return "💰 Medium";
    }

    return "💎 Luxury";
}


/* HOTEL */

function getHotelType(budget) {

    if (budget === "low") {
        return "Budget hotels / hostels";
    }

    if (budget === "medium") {
        return "3-Star / comfortable hotels";
    }

    return "4-Star / 5-Star luxury hotels";
}


/* DESTINATION IMAGES */

function getDestinationImage(destination) {

    const place =
        destination.toLowerCase();

    if (place.includes("goa")) {
        return "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("mumbai")) {
        return "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("manali")) {
        return "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("kerala")) {
        return "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("jaipur")) {
        return "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("delhi")) {
        return "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("paris")) {
        return "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80";
    }

    if (place.includes("dubai")) {
        return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80";
    }

    return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80";
}


/* DARK MODE */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const button =
        document.querySelector(".dark-btn");

    if (document.body.classList.contains("dark")) {
        button.innerHTML = "☀️";
    }
    else {
        button.innerHTML = "🌙";
    }
}


/* RESET */

function resetPlanner() {

    document.getElementById("destination").value = "";

    document.getElementById("days").value = 3;

    document.getElementById("travellers").value = 2;

    document.getElementById("budget").value = "medium";

    document.getElementById("tripType").selectedIndex = 0;

    document.getElementById("transport").selectedIndex = 0;

    document
        .querySelectorAll('.interest-box input')
        .forEach(function(item) {
            item.checked = false;
        });

    document.getElementById("result").style.display =
        "none";

    window.scrollTo({
        top: document.getElementById("planner").offsetTop,
        behavior: "smooth"
    });
}


/* COPY TRIP */

function copyTrip() {

    const trip =
        document.getElementById("tripOutput").innerText;

    navigator.clipboard.writeText(trip)
        .then(function() {
            alert("✅ Trip plan copied successfully!");
        })
        .catch(function() {
            alert("Please select and copy the trip manually.");
        });
}