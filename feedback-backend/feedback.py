from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Feedback, Comment, FeedbackRequest, db, User  # Added User import

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedbacks', methods=['POST'])
@jwt_required()
def create_feedback():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Only managers can submit feedback
    if current_user['role'] != 'manager':
        return jsonify({"error": "Unauthorized"}), 403
    
    # Verify employee is in manager's team
    employee = User.query.get(data['employee_id'])
    if not employee or employee.team_id != current_user['team_id']:
        return jsonify({"error": "Invalid employee or not in your team"}), 400
        
    feedback = Feedback(
        employee_id=data['employee_id'],
        manager_id=current_user['id'],
        strengths=data['strengths'],
        areas=data['areas'],
        sentiment=data['sentiment'],
        anonymous=data.get('anonymous', False),
        tags=data.get('tags', [])
    )
    
    db.session.add(feedback)
    db.session.commit()
    return jsonify(feedback.to_dict()), 201

@feedback_bp.route('/feedbacks', methods=['GET'])
@jwt_required()
def get_feedbacks():
    current_user = get_jwt_identity()
    
    if current_user['role'] == 'manager':
        # Get feedback for all employees in manager's team
        team_employees = User.query.filter_by(
            team_id=current_user['team_id'],
            role='employee'
        ).all()
        
        employee_ids = [e.id for e in team_employees]
        feedbacks = Feedback.query.filter(
            Feedback.employee_id.in_(employee_ids)
        ).all()
    else:
        # Employee gets only their feedback
        feedbacks = Feedback.query.filter_by(
            employee_id=current_user['id']
        ).all()
        
    return jsonify([f.to_dict() for f in feedbacks]), 200

@feedback_bp.route('/feedbacks/<int:feedback_id>/acknowledge', methods=['PUT'])
@jwt_required()
def acknowledge_feedback(feedback_id):
    current_user = get_jwt_identity()
    feedback = Feedback.query.get_or_404(feedback_id)
    
    if feedback.employee_id != current_user['id']:
        return jsonify({"error": "Unauthorized"}), 403
        
    feedback.acknowledged = True
    db.session.commit()
    return jsonify(feedback.to_dict()), 200

@feedback_bp.route('/feedbacks/<int:feedback_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(feedback_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Verify feedback exists
    feedback = Feedback.query.get_or_404(feedback_id)
    
    comment = Comment(
        feedback_id=feedback_id,
        user_id=current_user['id'],
        content=data['content']
    )
    
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@feedback_bp.route('/feedback-requests', methods=['POST'])
@jwt_required()
def create_feedback_request():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Only employees can request feedback
    if current_user['role'] != 'employee':
        return jsonify({"error": "Unauthorized"}), 403
    
    # Verify recipient exists
    recipient = User.query.get(data['recipient_id'])
    if not recipient or recipient.role != 'manager':
        return jsonify({"error": "Invalid recipient"}), 400
        
    request = FeedbackRequest(
        requester_id=current_user['id'],
        recipient_id=data['recipient_id'],
        message=data['message']
    )
    
    db.session.add(request)
    db.session.commit()
    return jsonify({
        "id": request.id,
        "message": "Feedback request sent"
    }), 201
