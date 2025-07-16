from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Student
from .forms import StudentForm, StudentSearchForm

def is_admin(user):
    return user.is_authenticated and user.userprofile.is_admin

@login_required
@user_passes_test(is_admin)
def student_list(request):
    students = Student.objects.select_related('user', 'course').all()
    search_form = StudentSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        course = search_form.cleaned_data.get('course')
        gender = search_form.cleaned_data.get('gender')
        is_active = search_form.cleaned_data.get('is_active')
        
        if search:
            students = students.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(student_id__icontains=search) |
                Q(user__email__icontains=search)
            )
        
        if course:
            students = students.filter(course=course)
        
        if gender:
            students = students.filter(gender=gender)
        
        if is_active:
            students = students.filter(is_active=is_active == 'True')
    
    # Pagination
    paginator = Paginator(students, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'students': page_obj,
        'search_form': search_form,
    }
    return render(request, 'students/student_list.html', context)

@login_required
@user_passes_test(is_admin)
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    return render(request, 'students/student_detail.html', {'student': student})

@login_required
@user_passes_test(is_admin)
def student_create(request):
    if request.method == 'POST':
        form = StudentForm(request.POST, request.FILES)
        if form.is_valid():
            student = form.save()
            messages.success(request, f'Student {student.full_name} created successfully!')
            return redirect('students:student_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = StudentForm()
    
    return render(request, 'students/student_form.html', {'form': form, 'title': 'Add New Student'})

@login_required
@user_passes_test(is_admin)
def student_update(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        form = StudentForm(request.POST, request.FILES, instance=student)
        if form.is_valid():
            form.save()
            messages.success(request, f'Student {student.full_name} updated successfully!')
            return redirect('students:student_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = StudentForm(instance=student)
    
    return render(request, 'students/student_form.html', {
        'form': form, 
        'student': student, 
        'title': f'Edit Student - {student.full_name}'
    })

@login_required
@user_passes_test(is_admin)
def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student_name = student.full_name
        student.delete()
        messages.success(request, f'Student {student_name} deleted successfully!')
        return redirect('students:student_list')
    
    return render(request, 'students/student_confirm_delete.html', {'student': student})

@login_required
def student_profile(request):
    try:
        student = Student.objects.get(user=request.user)
        return render(request, 'students/student_profile.html', {'student': student})
    except Student.DoesNotExist:
        messages.error(request, 'Student profile not found.')
        return redirect('core:dashboard') 