from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from models import User, db
import re  # Added for email validation

auth_bp = Blueprint('auth', __name__)

# Email validation function (now included in the file)
def validate_email(email):
    """Simple email validation using regex"""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    # Validate email format
    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400
        
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401
        
    access_token = create_access_token(identity={
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'team_id': user.team_id
    })
    
    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
