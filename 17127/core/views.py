from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Count, Q
from datetime import datetime, timedelta
from students.models import Student
from teachers.models import Teacher
from courses.models import Course, Subject
from exams.models import Exam, ExamResult
from leave_management.models import LeaveApplication
from announcements.models import Announcement

@login_required
def dashboard(request):
    try:
        user_profile = request.user.userprofile
    except:
        # Create profile if it doesn't exist
        from core.models import UserProfile
        user_type = 'admin' if request.user.is_superuser else 'student'
        user_profile = UserProfile.objects.create(user=request.user, user_type=user_type)
    
    if user_profile.is_admin:
        return admin_dashboard(request)
    elif user_profile.is_teacher:
        return teacher_dashboard(request)
    elif user_profile.is_student:
        return student_dashboard(request)
    else:
        messages.error(request, 'Invalid user type')
        return redirect('accounts:login')

def admin_dashboard(request):
    # Get statistics for admin dashboard
    total_students = Student.objects.count()
    total_teachers = Teacher.objects.count()
    total_courses = Course.objects.count()
    total_subjects = Subject.objects.count()
    
    # Recent activities
    recent_announcements = Announcement.objects.order_by('-created_at')[:5]
    recent_leaves = LeaveApplication.objects.filter(status='pending').order_by('-applied_date')[:5]
    
    context = {
        'total_students': total_students,
        'total_teachers': total_teachers,
        'total_courses': total_courses,
        'total_subjects': total_subjects,
        'recent_announcements': recent_announcements,
        'recent_leaves': recent_leaves,
    }
    
    return render(request, 'core/admin_dashboard.html', context)

def teacher_dashboard(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
    except Teacher.DoesNotExist:
        messages.error(request, 'Teacher profile not found')
        return redirect('accounts:login')
    
    # Get teacher's subjects and classes
    subjects = Subject.objects.filter(teacher=teacher)
    courses = Course.objects.filter(subject__teacher=teacher).distinct()
    
    # Recent exam results
    recent_results = ExamResult.objects.filter(
        exam__subject__teacher=teacher
    ).order_by('-created_at')[:5]
    
    # Add percentage property
    for result in recent_results:
        if result.exam.total_marks:
            result.percentage = float(result.obtained_marks) * 100 / float(result.exam.total_marks)
        else:
            result.percentage = None
    
    context = {
        'teacher': teacher,
        'subjects': subjects,
        'courses': courses,
        'recent_results': recent_results,
    }
    
    return render(request, 'core/teacher_dashboard.html', context)

def student_dashboard(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        messages.error(request, 'Student profile not found')
        return redirect('accounts:login')
    
    # Get student's course and subjects
    course = student.course
    subjects = Subject.objects.filter(course=course)
    
    # Recent exam results
    recent_results = ExamResult.objects.filter(student=student).order_by('-created_at')[:5]
    
    # Add percentage property
    for result in recent_results:
        if result.exam.total_marks:
            result.percentage = float(result.obtained_marks) * 100 / float(result.exam.total_marks)
        else:
            result.percentage = None
    
    # Recent announcements
    recent_announcements = Announcement.objects.filter(
        Q(target_audience='all') | Q(target_audience='students')
    ).order_by('-created_at')[:5]
    
    context = {
        'student': student,
        'course': course,
        'subjects': subjects,
        'recent_results': recent_results,
        'recent_announcements': recent_announcements,
    }
    
    return render(request, 'core/student_dashboard.html', context)

def home(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')
    return redirect('core:dashboard') 