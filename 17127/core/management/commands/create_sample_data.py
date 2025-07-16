from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import UserProfile
from students.models import Student
from teachers.models import Teacher
from courses.models import Course, Subject
from announcements.models import Announcement
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Create sample data for testing the Student Management System'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create sample courses
        course1, created = Course.objects.get_or_create(
            code='CS101',
            defaults={
                'name': 'Computer Science',
                'description': 'Bachelor of Computer Science',
                'duration_years': 4,
                'total_semesters': 8,
            }
        )
        
        course2, created = Course.objects.get_or_create(
            code='IT101',
            defaults={
                'name': 'Information Technology',
                'description': 'Bachelor of Information Technology',
                'duration_years': 4,
                'total_semesters': 8,
            }
        )
        
        # Create sample teachers
        teacher1_user, created = User.objects.get_or_create(
            username='teacher1',
            defaults={
                'first_name': 'John',
                'last_name': 'Smith',
                'email': 'john.smith@example.com',
            }
        )
        if created:
            teacher1_user.set_password('password123')
            teacher1_user.save()
            # Profile will be created by signal handler
        else:
            # Update existing profile if needed
            try:
                profile = teacher1_user.userprofile
                if profile.user_type != 'teacher':
                    profile.user_type = 'teacher'
                    profile.save()
            except:
                UserProfile.objects.create(user=teacher1_user, user_type='teacher')
        
        teacher1, created = Teacher.objects.get_or_create(
            user=teacher1_user,
            defaults={
                'employee_id': 'T001',
                'department': 'Computer Science',
                'qualification': 'MSc Computer Science',
                'phone': '+1234567890',
                'address': '123 Teacher Street, City',
            }
        )
        
        teacher2_user, created = User.objects.get_or_create(
            username='teacher2',
            defaults={
                'first_name': 'Jane',
                'last_name': 'Doe',
                'email': 'jane.doe@example.com',
            }
        )
        if created:
            teacher2_user.set_password('password123')
            teacher2_user.save()
            # Profile will be created by signal handler
        else:
            # Update existing profile if needed
            try:
                profile = teacher2_user.userprofile
                if profile.user_type != 'teacher':
                    profile.user_type = 'teacher'
                    profile.save()
            except:
                UserProfile.objects.create(user=teacher2_user, user_type='teacher')
        
        teacher2, created = Teacher.objects.get_or_create(
            user=teacher2_user,
            defaults={
                'employee_id': 'T002',
                'department': 'Information Technology',
                'qualification': 'MSc IT',
                'phone': '+1234567891',
                'address': '456 Teacher Avenue, City',
            }
        )
        
        # Create sample subjects
        subject1, created = Subject.objects.get_or_create(
            code='CS101-01',
            defaults={
                'name': 'Introduction to Programming',
                'course': course1,
                'teacher': teacher1,
                'description': 'Basic programming concepts',
                'credits': 3,
                'semester': 1,
            }
        )
        
        subject2, created = Subject.objects.get_or_create(
            code='CS101-02',
            defaults={
                'name': 'Data Structures',
                'course': course1,
                'teacher': teacher1,
                'description': 'Advanced data structures',
                'credits': 4,
                'semester': 2,
            }
        )
        
        subject3, created = Subject.objects.get_or_create(
            code='IT101-01',
            defaults={
                'name': 'Web Development',
                'course': course2,
                'teacher': teacher2,
                'description': 'Web development fundamentals',
                'credits': 3,
                'semester': 1,
            }
        )
        
        # Create sample students
        student1_user, created = User.objects.get_or_create(
            username='student1',
            defaults={
                'first_name': 'Alice',
                'last_name': 'Johnson',
                'email': 'alice.johnson@example.com',
            }
        )
        if created:
            student1_user.set_password('password123')
            student1_user.save()
            # Profile will be created by signal handler
        else:
            # Update existing profile if needed
            try:
                profile = student1_user.userprofile
                if profile.user_type != 'student':
                    profile.user_type = 'student'
                    profile.save()
            except:
                UserProfile.objects.create(user=student1_user, user_type='student')
        
        student1, created = Student.objects.get_or_create(
            user=student1_user,
            defaults={
                'student_id': 'S001',
                'course': course1,
                'admission_date': date.today() - timedelta(days=365),
                'phone': '+1234567892',
                'address': '789 Student Street, City',
                'date_of_birth': date(2000, 1, 15),
            }
        )
        
        student2_user, created = User.objects.get_or_create(
            username='student2',
            defaults={
                'first_name': 'Bob',
                'last_name': 'Wilson',
                'email': 'bob.wilson@example.com',
            }
        )
        if created:
            student2_user.set_password('password123')
            student2_user.save()
            # Profile will be created by signal handler
        else:
            # Update existing profile if needed
            try:
                profile = student2_user.userprofile
                if profile.user_type != 'student':
                    profile.user_type = 'student'
                    profile.save()
            except:
                UserProfile.objects.create(user=student2_user, user_type='student')
        
        student2, created = Student.objects.get_or_create(
            user=student2_user,
            defaults={
                'student_id': 'S002',
                'course': course2,
                'admission_date': date.today() - timedelta(days=300),
                'phone': '+1234567893',
                'address': '321 Student Avenue, City',
                'date_of_birth': date(2001, 3, 20),
            }
        )
        
        # Create sample announcements
        announcement1, created = Announcement.objects.get_or_create(
            title='Welcome to New Academic Year',
            defaults={
                'content': 'Welcome all students to the new academic year. Please check your schedules and attend all classes regularly.',
                'target_audience': 'all',
                'is_active': True,
            }
        )
        
        announcement2, created = Announcement.objects.get_or_create(
            title='Exam Schedule Update',
            defaults={
                'content': 'The mid-term examination schedule has been updated. Please check the notice board for details.',
                'target_audience': 'students',
                'is_active': True,
            }
        )
        
        self.stdout.write(
            self.style.SUCCESS('Sample data created successfully!')
        )
        self.stdout.write('Created:')
        self.stdout.write(f'- {Course.objects.count()} courses')
        self.stdout.write(f'- {Teacher.objects.count()} teachers')
        self.stdout.write(f'- {Subject.objects.count()} subjects')
        self.stdout.write(f'- {Student.objects.count()} students')
        self.stdout.write(f'- {Announcement.objects.count()} announcements')
        self.stdout.write('')
        self.stdout.write('Test accounts:')
        self.stdout.write('- Admin: admin (existing superuser)')
        self.stdout.write('- Teacher: teacher1 / password123')
        self.stdout.write('- Teacher: teacher2 / password123')
        self.stdout.write('- Student: student1 / password123')
        self.stdout.write('- Student: student2 / password123') 