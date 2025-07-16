from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Course, Subject
from .forms import CourseForm, SubjectForm, CourseSearchForm, SubjectSearchForm

def is_admin(user):
    return user.is_authenticated and user.userprofile.is_admin

# Course Views
@login_required
@user_passes_test(is_admin)
def course_list(request):
    courses = Course.objects.all()
    search_form = CourseSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        is_active = search_form.cleaned_data.get('is_active')
        
        if search:
            courses = courses.filter(
                Q(name__icontains=search) | Q(code__icontains=search)
            )
        
        if is_active:
            courses = courses.filter(is_active=is_active == 'True')
    
    # Pagination
    paginator = Paginator(courses, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'courses': page_obj,
        'search_form': search_form,
    }
    return render(request, 'courses/course_list.html', context)

@login_required
@user_passes_test(is_admin)
def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk)
    subjects = course.subject_set.all()
    return render(request, 'courses/course_detail.html', {
        'course': course,
        'subjects': subjects
    })

@login_required
@user_passes_test(is_admin)
def course_create(request):
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            course = form.save()
            messages.success(request, f'Course {course.name} created successfully!')
            return redirect('courses:course_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = CourseForm()
    
    return render(request, 'courses/course_form.html', {'form': form, 'title': 'Add New Course'})

@login_required
@user_passes_test(is_admin)
def course_update(request, pk):
    course = get_object_or_404(Course, pk=pk)
    if request.method == 'POST':
        form = CourseForm(request.POST, instance=course)
        if form.is_valid():
            form.save()
            messages.success(request, f'Course {course.name} updated successfully!')
            return redirect('courses:course_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = CourseForm(instance=course)
    
    return render(request, 'courses/course_form.html', {
        'form': form, 
        'course': course, 
        'title': f'Edit Course - {course.name}'
    })

@login_required
@user_passes_test(is_admin)
def course_delete(request, pk):
    course = get_object_or_404(Course, pk=pk)
    if request.method == 'POST':
        course_name = course.name
        course.delete()
        messages.success(request, f'Course {course_name} deleted successfully!')
        return redirect('courses:course_list')
    
    return render(request, 'courses/course_confirm_delete.html', {'course': course})

# Subject Views
@login_required
@user_passes_test(is_admin)
def subject_list(request):
    subjects = Subject.objects.select_related('course', 'teacher').all()
    search_form = SubjectSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        course = search_form.cleaned_data.get('course')
        teacher = search_form.cleaned_data.get('teacher')
        semester = search_form.cleaned_data.get('semester')
        is_active = search_form.cleaned_data.get('is_active')
        
        if search:
            subjects = subjects.filter(
                Q(name__icontains=search) | Q(code__icontains=search)
            )
        
        if course:
            subjects = subjects.filter(course=course)
        
        if teacher:
            subjects = subjects.filter(teacher=teacher)
        
        if semester:
            subjects = subjects.filter(semester=semester)
        
        if is_active:
            subjects = subjects.filter(is_active=is_active == 'True')
    
    # Pagination
    paginator = Paginator(subjects, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'subjects': page_obj,
        'search_form': search_form,
    }
    return render(request, 'subjects/subject_list.html', context)

@login_required
@user_passes_test(is_admin)
def subject_detail(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    return render(request, 'subjects/subject_detail.html', {'subject': subject})

@login_required
@user_passes_test(is_admin)
def subject_create(request):
    if request.method == 'POST':
        form = SubjectForm(request.POST)
        if form.is_valid():
            subject = form.save()
            messages.success(request, f'Subject {subject.name} created successfully!')
            return redirect('courses:subject_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SubjectForm()
    
    return render(request, 'subjects/subject_form.html', {'form': form, 'title': 'Add New Subject'})

@login_required
@user_passes_test(is_admin)
def subject_update(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    if request.method == 'POST':
        form = SubjectForm(request.POST, instance=subject)
        if form.is_valid():
            form.save()
            messages.success(request, f'Subject {subject.name} updated successfully!')
            return redirect('courses:subject_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SubjectForm(instance=subject)
    
    return render(request, 'subjects/subject_form.html', {
        'form': form, 
        'subject': subject, 
        'title': f'Edit Subject - {subject.name}'
    })

@login_required
@user_passes_test(is_admin)
def subject_delete(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    if request.method == 'POST':
        subject_name = subject.name
        subject.delete()
        messages.success(request, f'Subject {subject_name} deleted successfully!')
        return redirect('courses:subject_list')
    
    return render(request, 'subjects/subject_confirm_delete.html', {'subject': subject}) 