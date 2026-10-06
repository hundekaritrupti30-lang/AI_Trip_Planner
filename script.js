function generateTrip() {

    let destination =
        document.getElementById("destination").value.trim();

    let days =
        parseInt(document.getElementById("days").value);

    let budget =
        document.getElementById("budget").value;

    let travelType =
        document.getElementById("travelType").value;

    let transport =
        document.getElementById("transport").value;

    let interest =
        document.getElementById("interest").value;

    if (destination === "") {
        alert("Please enter destination!");
        return;
    }

    if (days < 1 || days > 15) {
        alert("Please select 1 to 15 days.");
        return;
    }

    let dailyPlan = "";

    for (let i = 1; i <= days; i++) {

        dailyPlan += `
        <div class="day">

            <h3>📅 Day ${i}</h3>

            <p>🌅 Morning: Explore ${destination}</p>

            <p>📍 Activity: ${interest} activities</p>

            <p>🍴 Afternoon: Try local food</p>

            <p>🌆 Evening: Sightseeing and relaxation</p>

        </div>
        `;
    }

    let dailyCost;

    if (budget === "Low") {
        dailyCost = 1500;
    }
    else if (budget === "Medium") {
        dailyCost = 3000;
    }
    else {
        dailyCost = 6000;
    }

    let total = dailyCost * days;

    document.getElementById("result").innerHTML = `

    <div class="trip-result">

        <h2>🤖 AI Trip Plan for ${destination}</h2>

        <p><b>📅 Duration:</b> ${days} Days</p>

        <p><b>💰 Budget:</b> ${budget}</p>

        <p><b>👥 Travel Type:</b> ${travelType}</p>

        <p><b>🚆 Transport:</b> ${transport}</p>

        <p><b>🎯 Interest:</b> ${interest}</p>

        <hr><br>

        <h2>🗓️ Day-by-Day Itinerary</h2>

        ${dailyPlan}

        <div class="details">

            <div class="detail">
                <h3>🏨 Hotel</h3>
                <p>${budget} budget hotel recommended.</p>
            </div>

            <div class="detail">
                <h3>🍴 Food</h3>
                <p>Try famous local dishes of ${destination}.</p>
            </div>

            <div class="detail">
                <h3>💰 Budget</h3>
                <p>Estimated Cost: ₹${total}</p>
            </div>

            <div class="detail">
                <h3>🎒 Packing</h3>
                <p>
                👕 Clothes<br>
                🔋 Charger<br>
                🧴 Personal items<br>
                🪪 ID Proof<br>
                💧 Water Bottle
                </p>
            </div>

            <div class="detail">
                <h3>🌦️ Weather Tip</h3>
                <p>Check the local weather before travelling.</p>
            </div>

            <div class="detail">
                <h3>🌱 Eco Travel</h3>
                <p>Use public transport and avoid unnecessary plastic.</p>
            </div>

            <div class="detail">
                <h3>🆘 Emergency</h3>
                <p>Keep important documents and emergency contacts.</p>
            </div>

            <div class="detail">
                <h3>❤️ Favorite</h3>
                <button onclick="saveFavorite('${destination}')">
                    Save Destination
                </button>
            </div>

            <div class="detail">
                <h3>📤 Share</h3>
                <button onclick="shareTrip()">
                    Share Trip
                </button>
            </div>

        </div>

        <br>

        <button onclick="window.print()">
            🖨️ Print / Save Trip
        </button>

    </div>
    `;
}


/* DARK MODE */

function toggleTheme() {

    document.body.classList.toggle("dark");

}


/* FAVORITE */

function saveFavorite(place) {

    localStorage.setItem("favoriteDestination", place);

    alert(place + " saved to Favorites ❤️");

}


/* SHARE */

function shareTrip() {

    if (navigator.share) {

        navigator.share({
            title: "My AI Trip Plan",
            text: "Check my AI Trip Planner!"
        });

    }
    else {

        alert("Trip sharing is not supported on this browser.");

    }

}


/* AI TRAVEL ASSISTANT */

function askAI() {

    let question =
        document.getElementById("question").value.toLowerCase();

    let answer =
        document.getElementById("answer");

    if (question === "") {

        answer.innerHTML =
            "Please ask a travel question.";

        return;
    }

    if (question.includes("food")) {

        answer.innerHTML =
            "🍴 Try local traditional food, popular restaurants and street food.";

    }

    else if (question.includes("hotel")) {

        answer.innerHTML =
            "🏨 Choose a hotel according to your budget and location.";

    }

    else if (question.includes("packing")) {

        answer.innerHTML =
            "🎒 Carry clothes, ID proof, charger, medicines, water bottle and personal items.";

    }

    else if (question.includes("weather")) {

        answer.innerHTML =
            "🌦️ Check the destination weather before starting your journey.";

    }

    else if (question.includes("place") ||
             question.includes("visit")) {

        answer.innerHTML =
            "📍 Visit famous tourist attractions, historical places and natural locations.";

    }

    else {

        answer.innerHTML =
            "🤖 AI Suggestion: Plan your trip according to your budget, available days, interests and travel type.";

    }

}


/* FEEDBACK */

function sendFeedback() {

    let feedback =
        document.getElementById("feedback").value;

    if (feedback === "") {

        alert("Please enter your feedback.");

        return;
    }

    document.getElementById("feedbackMessage").innerHTML =
        "✅ Thank you for your feedback!";

}