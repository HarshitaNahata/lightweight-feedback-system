from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'manager' or 'employee'
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'team_id': self.team_id
        }

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.relationship('User', backref='team', lazy=True)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, nullable=False)
    manager_id = db.Column(db.Integer, nullable=False)
    strengths = db.Column(db.Text, nullable=False)
    areas = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(20), nullable=False)  # 'positive', 'neutral', 'negative'
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    acknowledged = db.Column(db.Boolean, default=False)
    anonymous = db.Column(db.Boolean, default=False)
    tags = db.Column(db.JSON)  # Store as list of strings
    
    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'manager_id': self.manager_id,
            'strengths': self.strengths,
            'areas': self.areas,
            'sentiment': self.sentiment,
            'date': self.date.isoformat(),
            'acknowledged': self.acknowledged,
            'anonymous': self.anonymous,
            'tags': self.tags or []
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    feedback_id = db.Column(db.Integer, db.ForeignKey('feedback.id'), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def to_dict(self):
        return {
            'id': self.id,
            'feedback_id': self.feedback_id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at.isoformat()
        }

class FeedbackRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(20), default='pending')  # 'pending', 'completed'
