from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.utils import timezone
from django.db.models import Count, Q, Sum
from datetime import date, datetime, timedelta
from .models import User, EmployeeProfile, Attendance, LeaveApplication, Department
from .forms import CustomLoginForm, EmployeeRegistrationForm, EmployeeProfileForm, LeaveApplicationForm

def is_admin(user):
    return user.is_authenticated and user.user_type == 'admin'

def is_employee(user):
    return user.is_authenticated and user.user_type == 'employee'

def login_view(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'admin':
            return redirect('admin_dashboard')
        else:
            return redirect('employee_dashboard')
    
    if request.method == 'POST':
        form = CustomLoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                if user.user_type == 'admin':
                    return redirect('admin_dashboard')
                else:
                    return redirect('employee_dashboard')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = CustomLoginForm()
    
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    today = date.today()
    
    # Dashboard statistics
    total_employees = User.objects.filter(user_type='employee').count()
    today_attendance = Attendance.objects.filter(date=today).count()
    staff_on_leave = LeaveApplication.objects.filter(
        status='approved',
        start_date__lte=today,
        end_date__gte=today
    ).count()
    
    # Calculate total salary
    total_salary = EmployeeProfile.objects.aggregate(total=Sum('salary'))['total'] or 0
    
    # Today's birthdays
    today_birthdays = EmployeeProfile.objects.filter(
        dob__month=today.month,
        dob__day=today.day
    )
    
    # Recent leave applications
    recent_leaves = LeaveApplication.objects.filter(status='pending').order_by('-applied_on')[:5]
    
    # Recent attendance
    recent_attendance = Attendance.objects.filter(date=today).order_by('-check_in_time')[:10]
    
    context = {
        'total_employees': total_employees,
        'today_attendance': today_attendance,
        'staff_on_leave': staff_on_leave,
        'total_salary': total_salary,
        'today_birthdays': today_birthdays,
        'recent_leaves': recent_leaves,
        'recent_attendance': recent_attendance,
    }
    
    return render(request, 'admin_dashboard.html', context)

@login_required
@user_passes_test(is_employee)
def employee_dashboard(request):
    today = date.today()
    
    # Check if already checked in today
    today_attendance = Attendance.objects.filter(
        employee=request.user,
        date=today
    ).first()
    
    # Employee's leave applications
    my_leaves = LeaveApplication.objects.filter(employee=request.user).order_by('-applied_on')[:5]
    
    # Recent attendance records
    recent_attendance = Attendance.objects.filter(employee=request.user).order_by('-date')[:10]
    
    context = {
        'today_attendance': today_attendance,
        'my_leaves': my_leaves,
        'recent_attendance': recent_attendance,
    }
    
    return render(request, 'employee_dashboard.html', context)

@login_required
@user_passes_test(is_employee)
def check_in(request):
    today = date.today()
    
    # Check if already checked in today
    if Attendance.objects.filter(employee=request.user, date=today).exists():
        messages.warning(request, 'You have already checked in today!')
        return redirect('employee_dashboard')
    
    # Create attendance record
    Attendance.objects.create(
        employee=request.user,
        date=today,
        check_in_time=timezone.now().time()
    )
    
    messages.success(request, 'Check-in successful!')
    return redirect('attendance_success')

@login_required
@user_passes_test(is_employee)
def attendance_success(request):
    return render(request, 'attendance_success.html')

@login_required
@user_passes_test(is_employee)
def apply_leave(request):
    if request.method == 'POST':
        form = LeaveApplicationForm(request.POST)
        if form.is_valid():
            leave = form.save(commit=False)
            leave.employee = request.user
            leave.save()
            messages.success(request, 'Leave application submitted successfully!')
            return redirect('employee_dashboard')
    else:
        form = LeaveApplicationForm()
    
    return render(request, 'apply_leave.html', {'form': form})

@login_required
@user_passes_test(is_admin)
def employee_list(request):
    employees = User.objects.filter(user_type='employee').select_related('profile')
    return render(request, 'employee_list.html', {'employees': employees})

@login_required
@user_passes_test(is_admin)
def add_employee(request):
    if request.method == 'POST':
        user_form = EmployeeRegistrationForm(request.POST)
        profile_form = EmployeeProfileForm(request.POST)
        
        if user_form.is_valid() and profile_form.is_valid():
            try:
                # Save user (user_type is automatically set to 'employee' in the form)
                user = user_form.save()
                
                # Save profile
                profile = profile_form.save(commit=False)
                profile.user = user
                profile.save()
                
                messages.success(request, f'Employee "{user.get_full_name()}" added successfully!')
                return redirect('employee_list')
            except Exception as e:
                messages.error(request, f'Error adding employee: {str(e)}')
        else:
            # Show form errors
            if user_form.errors:
                for field, errors in user_form.errors.items():
                    for error in errors:
                        messages.error(request, f'User form error - {field}: {error}')
            
            if profile_form.errors:
                for field, errors in profile_form.errors.items():
                    for error in errors:
                        messages.error(request, f'Profile form error - {field}: {error}')
    else:
        user_form = EmployeeRegistrationForm()
        profile_form = EmployeeProfileForm()
    
    return render(request, 'add_employee.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })

@login_required
@user_passes_test(is_admin)
def edit_employee(request, employee_id):
    employee = get_object_or_404(User, id=employee_id, user_type='employee')
    profile, created = EmployeeProfile.objects.get_or_create(user=employee)
    
    if request.method == 'POST':
        user_form = EmployeeRegistrationForm(request.POST, instance=employee)
        profile_form = EmployeeProfileForm(request.POST, instance=profile)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Employee updated successfully!')
            return redirect('employee_list')
    else:
        user_form = EmployeeRegistrationForm(instance=employee)
        profile_form = EmployeeProfileForm(instance=profile)
    
    return render(request, 'edit_employee.html', {
        'user_form': user_form,
        'profile_form': profile_form,
        'employee': employee
    })

@login_required
@user_passes_test(is_admin)
def delete_employee(request, employee_id):
    employee = get_object_or_404(User, id=employee_id, user_type='employee')
    if request.method == 'POST':
        employee.delete()
        messages.success(request, 'Employee deleted successfully!')
        return redirect('employee_list')
    
    return render(request, 'delete_employee.html', {'employee': employee})

@login_required
@user_passes_test(is_admin)
def leave_applications(request):
    leaves = LeaveApplication.objects.all().order_by('-applied_on')
    return render(request, 'leave_applications.html', {'leaves': leaves})

@login_required
@user_passes_test(is_admin)
def approve_leave(request, leave_id):
    leave = get_object_or_404(LeaveApplication, id=leave_id)
    if request.method == 'POST':
        action = request.POST.get('action')
        if action in ['approve', 'reject']:
            leave.status = 'approved' if action == 'approve' else 'rejected'
            leave.reviewed_by = request.user
            leave.reviewed_on = timezone.now()
            leave.save()
            
            status_text = 'approved' if action == 'approve' else 'rejected'
            messages.success(request, f'Leave application {status_text}!')
            return redirect('leave_applications')
    
    return render(request, 'approve_leave.html', {'leave': leave})

@login_required
@user_passes_test(is_admin)
def attendance_logs(request):
    date_filter = request.GET.get('date')
    if date_filter:
        try:
            filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
            attendance = Attendance.objects.filter(date=filter_date).order_by('-check_in_time')
        except ValueError:
            attendance = Attendance.objects.all().order_by('-date', '-check_in_time')
    else:
        attendance = Attendance.objects.all().order_by('-date', '-check_in_time')
    
    return render(request, 'attendance_logs.html', {'attendance': attendance})

@login_required
@user_passes_test(is_employee)
def my_attendance(request):
    attendance = Attendance.objects.filter(employee=request.user).order_by('-date')
    return render(request, 'my_attendance.html', {'attendance': attendance})

@login_required
@user_passes_test(is_employee)
def my_leaves(request):
    leaves = LeaveApplication.objects.filter(employee=request.user).order_by('-applied_on')
    return render(request, 'my_leaves.html', {'leaves': leaves})

@login_required
@user_passes_test(is_admin)
def change_employee_password(request, employee_id):
    employee = get_object_or_404(User, id=employee_id, user_type='employee')
    
    if request.method == 'POST':
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')
        
        if not new_password:
            messages.error(request, 'New password is required.')
        elif len(new_password) < 8:
            messages.error(request, 'Password must be at least 8 characters long.')
        elif new_password != confirm_password:
            messages.error(request, 'Passwords do not match.')
        else:
            employee.set_password(new_password)
            employee.save()
            messages.success(request, f'Password for {employee.get_full_name()} has been updated successfully!')
            return redirect('employee_list')
    
    return render(request, 'change_password.html', {'employee': employee})

@login_required
@user_passes_test(is_admin)
def department_list(request):
    departments = Department.objects.all()
    return render(request, 'department_list.html', {'departments': departments})

@login_required
@user_passes_test(is_admin)
def add_department(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        
        if not name:
            messages.error(request, 'Department name is required.')
        elif Department.objects.filter(name=name).exists():
            messages.error(request, 'A department with this name already exists.')
        else:
            Department.objects.create(name=name, description=description)
            messages.success(request, f'Department "{name}" has been added successfully!')
            return redirect('department_list')
    
    return render(request, 'add_department.html')

@login_required
@user_passes_test(is_admin)
def edit_department(request, department_id):
    department = get_object_or_404(Department, id=department_id)
    
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        
        if not name:
            messages.error(request, 'Department name is required.')
        elif Department.objects.filter(name=name).exclude(id=department_id).exists():
            messages.error(request, 'A department with this name already exists.')
        else:
            department.name = name
            department.description = description
            department.save()
            messages.success(request, f'Department "{name}" has been updated successfully!')
            return redirect('department_list')
    
    return render(request, 'edit_department.html', {'department': department})

@login_required
@user_passes_test(is_admin)
def delete_department(request, department_id):
    department = get_object_or_404(Department, id=department_id)
    
    # Check if any employees are assigned to this department
    employee_count = EmployeeProfile.objects.filter(department=department).count()
    
    if employee_count > 0:
        messages.error(request, f'Cannot delete department "{department.name}" because {employee_count} employee(s) are assigned to it.')
        return redirect('department_list')
    
    if request.method == 'POST':
        department.delete()
        messages.success(request, f'Department "{department.name}" has been deleted successfully!')
        return redirect('department_list')
    
    return render(request, 'delete_department.html', {'department': department})
