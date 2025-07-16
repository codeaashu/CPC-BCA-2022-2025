from flask import Flask, request
from flask_restful import Api, Resource
import requests
import os

app = Flask(__name__)
api = Api(app)

OPENWEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

class Weather(Resource):
    def get(self):
        city = request.args.get("city")
        if not city:
            return {"error": "City not provided"}, 400

        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url)

        if response.status_code != 200:
            return {"error": "City not found or API error"}, 400

        data = response.json()
        result = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind": data["wind"]["speed"]
        }
        return result, 200

api.add_resource(Weather, '/weather')

if __name__ == '__main__':
    app.run(port=5001, debug=True)
