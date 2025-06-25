from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from models import db
from auth import auth_bp  # Changed from relative to absolute import
from feedback import feedback_bp  # Changed from relative to absolute import

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///feedback.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'super-secret-key')

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(feedback_bp, url_prefix='/api')

@app.route('/')
def home():
    return jsonify({"status": "Feedback System API"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(host='0.0.0.0', port=5000, debug=True)
