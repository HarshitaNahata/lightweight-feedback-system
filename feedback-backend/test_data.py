from werkzeug.security import generate_password_hash
from app import app
from models import db, User, Team, Feedback

def create_sample_data():
    with app.app_context():
        # Create teams
        engineering = Team(name="Engineering")
        design = Team(name="Design")
        db.session.add_all([engineering, design])
        db.session.commit()  # Commit teams first

        # Create users
        manager1 = User(
            email="manager@company.com",
            password=generate_password_hash("password"),
            name="Manager User",
            role="manager",
            team_id=engineering.id
        )
        
        employee1 = User(
            email="employee1@company.com",
            password=generate_password_hash("password"),
            name="Alex Johnson",
            role="employee",
            team_id=engineering.id
        )
        
        # Commit users BEFORE creating feedback
        db.session.add_all([manager1, employee1])
        db.session.commit()  # This assigns IDs to users
        
        # Now create feedback with valid user IDs
        feedback1 = Feedback(
            employee_id=employee1.id,  # Now has real ID
            manager_id=manager1.id,    # Now has real ID
            strengths="Excellent problem-solving skills",
            areas="Could improve documentation",
            sentiment="positive"
        )
        
        db.session.add(feedback1)
        db.session.commit()  # Final commit

if __name__ == '__main__':
    create_sample_data()
