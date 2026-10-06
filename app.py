from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate-trip", methods=["POST"])
def generate_trip():

    data = request.get_json()

    destination = data.get("destination", "Unknown")
    days = int(data.get("days", 3))
    budget = data.get("budget", "Medium")
    travel_type = data.get("travelType", "Solo")
    transport = data.get("transport", "Train")
    interest = data.get("interest", "Nature")

    if budget == "Low":
        daily_cost = 1500
    elif budget == "Medium":
        daily_cost = 3000
    else:
        daily_cost = 6000

    total_cost = daily_cost * days

    itinerary = []

    for day in range(1, days + 1):

        itinerary.append({
            "day": day,
            "morning": f"Explore famous places in {destination}",
            "afternoon": f"Enjoy local food and {interest} activities",
            "evening": f"Relax and enjoy sightseeing in {destination}"
        })

    result = {
        "destination": destination,
        "days": days,
        "budget": budget,
        "travelType": travel_type,
        "transport": transport,
        "interest": interest,
        "estimatedCost": total_cost,
        "itinerary": itinerary,

        "hotel": f"{budget} budget hotels near {destination}",

        "food": f"Try famous local food of {destination}",

        "packing": [
            "Clothes",
            "ID Proof",
            "Mobile Charger",
            "Water Bottle",
            "Personal Items"
        ],

        "tips": [
            "Check weather before travelling",
            "Keep important documents safe",
            "Carry enough water",
            "Respect local culture",
            "Keep emergency contacts"
        ]
    }

    return jsonify(result)


@app.route("/ask-ai", methods=["POST"])
def ask_ai():

    data = request.get_json()

    question = data.get("question", "").lower()

    if "food" in question:
        answer = "Try famous local dishes and traditional food."

    elif "hotel" in question:
        answer = "Choose a hotel according to your budget and location."

    elif "packing" in question:
        answer = "Carry clothes, ID proof, charger and necessary items."

    elif "weather" in question:
        answer = "Check the destination weather before travelling."

    elif "place" in question or "visit" in question:
        answer = "Visit famous tourist attractions and historical places."

    else:
        answer = "Plan your trip according to destination, budget, days and interests."

    return jsonify({
        "answer": answer
    })


if __name__ == "__main__":
    app.run(debug=True)