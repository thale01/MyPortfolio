import os
import django

# Set up the Django environment settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from portfolio.models import Project
from django.contrib.auth import get_user_model

def seed_database():
    print("Starting database seeding...")
    
    # 1. Clear existing projects
    print("Clearing any existing projects...")
    Project.objects.all().delete()
    
    # 2. Add custom high-fidelity projects
    projects_data = [
        {
            "title": "AS-Mart – Online Grocery Shop",
            "description": "Developed a full-stack e-commerce platform using Django with secure customer registration, order placement, shopping cart flow, responsive UI, optimized database queries, and custom admin dashboard.",
            "technologies": "Django, Python, MySQL, HTML, CSS, JavaScript",
            "github_link": "https://github.com",
            "live_link": "https://github.com",
            "order": 1
        },
        {
            "title": "Ideal Classes – E-learning Management System",
            "description": "Developed a complete e-learning platform with student management, lecture uploads, notes sharing, fee tracking, role-based authentication, and responsive design.",
            "technologies": "Django, Python, MySQL, Bootstrap",
            "github_link": "https://github.com",
            "live_link": "https://ideal-classes.onrender.com",
            "order": 2
        },
        {
            "title": "Amazon Homepage Clone",
            "description": "Built a responsive Amazon homepage clone using HTML, CSS, and JavaScript with reusable UI components, Flexbox layouts, and interactive effects.",
            "technologies": "HTML, CSS, JavaScript",
            "github_link": "https://github.com",
            "live_link": "https://github.com",
            "order": 3
        }
    ]
    
    for proj in projects_data:
        p = Project.objects.create(**proj)
        print(f"Successfully seeded project: '{p.title}'")
        
    # 3. Create default superuser for easy admin access
    User = get_user_model()
    admin_username = "admin"
    admin_email = "siddhithale01@gmail.com"
    admin_password = "admin123"
    
    if not User.objects.filter(username=admin_username).exists():
        print(f"Creating superuser '{admin_username}'...")
        User.objects.create_superuser(admin_username, admin_email, admin_password)
        print(f"Superuser '{admin_username}' created successfully!")
    else:
        print(f"Superuser '{admin_username}' already exists.")
        
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
