import os
import requests
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import pytz

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Config from .env
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# DB model
class WeatherLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    wind_speed = db.Column(db.Float)
    condition = db.Column(db.String(50))
    request_time = db.Column(db.DateTime, default=lambda: datetime.now(pytz.timezone("Asia/Kolkata")))

# Routes
@app.route('/', methods=['GET', 'POST'])
def home():
    weather = None
    city_name = ''
    current_time = datetime.now(pytz.timezone("Asia/Kolkata")).strftime('%Y-%m-%d %H:%M:%S')

    if request.method == 'POST':
        city_name = request.form['city']
        api_url = f'https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={WEATHER_API_KEY}&units=metric'

        try:
            response = requests.get(api_url)
            weather = response.json()

            if weather.get("cod") == 200:
                # Log into DB
                log = WeatherLog(
                    city=city_name,
                    temperature=weather['main']['temp'],
                    humidity=weather['main']['humidity'],
                    wind_speed=weather['wind']['speed'],
                    condition=weather['weather'][0]['main']
                )
                db.session.add(log)
                db.session.commit()

        except Exception as e:
            print("Error fetching weather:", e)

    return render_template('index.html', weather=weather, city_name=city_name, current_time=current_time)

@app.route('/logs')
def view_logs():
    logs = WeatherLog.query.order_by(WeatherLog.request_time.desc()).all()
    return render_template('logs.html', logs=logs)


# Run app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
