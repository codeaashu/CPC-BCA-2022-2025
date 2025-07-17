#!/usr/bin/env python3
"""
Setup script for Student Management System
This script helps with initial project configuration and setup.
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version {sys.version.split()[0]} is compatible")
    return True

def check_mysql_connection():
    """Check MySQL connection"""
    try:
        import mysql.connector
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Hari@123",
            database="student_management_system"
        )
        connection.close()
        print("✅ MySQL connection successful")
        return True
    except Exception as e:
        print(f"❌ MySQL connection failed: {e}")
        print("Please ensure MySQL is running and the database 'student_management_system' exists")
        return False

def create_database():
    """Create MySQL database if it doesn't exist"""
    try:
        import mysql.connector
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Hari@123"
        )
        cursor = connection.cursor()
        
        # Create database
        cursor.execute("CREATE DATABASE IF NOT EXISTS student_management_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        print("✅ Database created successfully")
        
        cursor.close()
        connection.close()
        return True
    except Exception as e:
        print(f"❌ Database creation failed: {e}")
        return False

def main():
    """Main setup function"""
    print("🎓 Student Management System Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Check if we're in the right directory
    if not Path("manage.py").exists():
        print("❌ Please run this script from the project root directory")
        sys.exit(1)
    
    # Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing dependencies"):
        print("❌ Failed to install dependencies")
        sys.exit(1)
    
    # Create database
    if not create_database():
        print("❌ Failed to create database")
        sys.exit(1)
    
    # Check MySQL connection
    if not check_mysql_connection():
        print("❌ Failed to connect to MySQL")
        sys.exit(1)
    
    # Run migrations
    if not run_command("python manage.py makemigrations", "Creating migrations"):
        print("❌ Failed to create migrations")
        sys.exit(1)
    
    if not run_command("python manage.py migrate", "Running migrations"):
        print("❌ Failed to run migrations")
        sys.exit(1)
    
    # Create media directories
    media_dirs = ["media", "media/student_photos", "media/teacher_photos", "media/profile_pics"]
    for dir_path in media_dirs:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
    print("✅ Media directories created")
    
    print("\n🎉 Setup completed successfully!")
    print("\nNext steps:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Run the development server: python manage.py runserver")
    print("3. Open http://127.0.0.1:8000 in your browser")
    print("\nHappy coding! 🚀")

if __name__ == "__main__":
    main() 