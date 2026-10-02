const destinations = {

    goa: {

        name: "Goa",

        image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",

        places: [
            "Baga Beach",
            "Calangute Beach",
            "Fort Aguada",
            "Panjim",
            "Basilica of Bom Jesus",
            "Candolim Beach"
        ],

        food:
        "Goan Fish Curry, Pav Bhaji, Bebinca and local seafood.",

        hotel:
        "Budget: Beachside guesthouse | Medium: 3-star hotel | High: Premium beach resort",

        transport:
        "Rent a scooter or use local taxis and buses.",

        tips:
        "Carry sunscreen, stay hydrated and keep some cash for local places."

    },


    mumbai: {

        name: "Mumbai",

        image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=85",

        places: [
            "Gateway of India",
            "Marine Drive",
            "Elephanta Caves",
            "Colaba",
            "Juhu Beach",
            "Siddhivinayak Temple"
        ],

        food:
        "Vada Pav, Pav Bhaji, Misal Pav, Bhel Puri and local street food.",

        hotel:
        "Budget: Hostel | Medium: City hotel | High: Premium hotel",

        transport:
        "Use local trains, metro, buses and taxis.",

        tips:
        "Avoid peak traffic hours and keep your belongings safe."

    },


    manali: {

        name: "Manali",

        image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85",

        places: [
            "Solang Valley",
            "Rohtang Pass",
            "Hadimba Temple",
            "Mall Road",
            "Old Manali",
            "Vashisht Hot Springs"
        ],

        food:
        "Momos, Thukpa, Siddu and traditional Himachali food.",

        hotel:
        "Budget: Homestay | Medium: Mountain hotel | High: Luxury resort",

        transport:
        "Use local taxis, buses or rental vehicles.",

        tips:
        "Carry warm clothes and check weather conditions before travelling."

    },


    jaipur: {

        name: "Jaipur",

        image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85",

        places: [
            "Amber Fort",
            "Hawa Mahal",
            "City Palace",
            "Jantar Mantar",
            "Nahargarh Fort",
            "Jal Mahal"
        ],

        food:
        "Dal Baati Churma, Ghewar, Kachori and Rajasthani Thali.",

        hotel:
        "Budget: Hostel | Medium: Heritage hotel | High: Luxury palace hotel",

        transport:
        "Use auto-rickshaws, taxis, buses or rental vehicles.",

        tips:
        "Carry water, wear comfortable shoes and protect yourself from the sun."

    },


    delhi: {

        name: "Delhi",

        image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85",

        places: [
            "India Gate",
            "Red Fort",
            "Qutub Minar",
            "Lotus Temple",
            "Humayun's Tomb",
            "Chandni Chowk"
        ],

        food:
        "Chole Bhature, Paratha, Chaat, Kebabs and Delhi street food.",

        hotel:
        "Budget: Hostel | Medium: City hotel | High: Premium hotel",

        transport:
        "Delhi Metro is a convenient option along with taxis and buses.",

        tips:
        "Use the metro for major attractions and avoid heavy traffic hours."

    }

};


function selectDestination(place) {

    document.getElementById("destination").value = place;

    document.getElementById("planner").scrollIntoView({
        behavior: "smooth"
    });

}


function generateTrip() {

    const destination =
        document.getElementById("destination").value;

    const days =
        parseInt(document.getElementById("days").value);

    const budget =
        document.getElementById("budget").value;

    const travelType =
        document.getElementById("travelType").value;

    const interest =
        document.getElementById("interest").value;


    if (days < 1 || days > 7) {

        alert("Please select between 1 and 7 days.");

        return;

    }


    const trip = destinations[destination];


    let itineraryHTML = "";


    for (let i = 1; i <= days; i++) {

        const place1 =
            trip.places[(i - 1) % trip.places.length];

        const place2 =
            trip.places[i % trip.places.length];

        const place3 =
            trip.places[(i + 1) % trip.places.length];


        itineraryHTML += `

            <div class="day-card">

                <h3>📅 Day ${i}</h3>

                <p>
                    🌅 Start your day with
                    <strong>${place1}</strong>.
                </p>

                <p>
                    📍 Explore
                    <strong>${place2}</strong>
                    and enjoy ${interest.toLowerCase()} activities.
                </p>

                <p>
                    🌆 Evening visit to
                    <strong>${place3}</strong>.
                </p>

            </div>

        `;

    }


    const resultHTML = `

        <div class="trip-result">

            <div
                class="trip-cover"
                style="background-image:
                linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.5)),
                url('${trip.image}')"
            >

                <div>

                    <h2>
                        ✨ ${trip.name} Trip
                    </h2>

                    <p>
                        Your personalized travel plan
                    </p>

                </div>

            </div>


            <div class="trip-info">


                <div class="info-row">

                    <div class="info-box">
                        📍 ${trip.name}
                    </div>

                    <div class="info-box">
                        📅 ${days} Days
                    </div>

                    <div class="info-box">
                        💰 ${budget} Budget
                    </div>

                    <div class="info-box">
                        👥 ${travelType}
                    </div>

                    <div class="info-box">
                        🎯 ${interest}
                    </div>

                </div>


                <h2>
                    🗓️ Suggested Itinerary
                </h2>

                <br>


                <div class="itinerary">

                    ${itineraryHTML}

                </div>


                <div class="extra-grid">


                    <div class="extra-card">

                        <h3>🏨 Hotel</h3>

                        <p>
                            ${trip.hotel}
                        </p>

                    </div>


                    <div class="extra-card">

                        <h3>🍴 Food</h3>

                        <p>
                            ${trip.food}
                        </p>

                    </div>


                    <div class="extra-card">

                        <h3>🚗 Transport</h3>

                        <p>
                            ${trip.transport}
                        </p>

                    </div>


                    <div class="extra-card">

                        <h3>💡 Travel Tips</h3>

                        <p>
                            ${trip.tips}
                        </p>

                    </div>


                    <div class="extra-card">

                        <h3>📸 Photography</h3>

                        <p>
                            Visit popular viewpoints and
                            capture memorable photos.
                        </p>

                    </div>


                    <div class="extra-card">

                        <h3>🎒 Packing</h3>

                        <p>
                            Carry comfortable clothes,
                            shoes, ID and essential items.
                        </p>

                    </div>

                </div>


                <div class="trip-buttons">

                    <button
                        class="print-btn"
                        onclick="window.print()"
                    >
                        🖨️ Print Trip
                    </button>


                    <button
                        class="reset-btn"
                        onclick="newTrip()"
                    >
                        🔄 Plan New Trip
                    </button>

                </div>


            </div>

        </div>

    `;


    const result =
        document.getElementById("result");


    result.innerHTML = resultHTML;


    const resultSection =
        document.getElementById("resultSection");


    resultSection.style.display = "block";


    resultSection.scrollIntoView({
        behavior: "smooth"
    });

}


function newTrip() {

    document.getElementById("result").innerHTML = "";

    document.getElementById("resultSection").style.display = "none";

    document.getElementById("planner").scrollIntoView({
        behavior: "smooth"
    });

}