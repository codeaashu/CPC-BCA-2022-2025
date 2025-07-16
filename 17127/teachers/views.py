from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Teacher
from .forms import TeacherForm, TeacherSearchForm

def is_admin(user):
    return user.is_authenticated and user.userprofile.is_admin

@login_required
@user_passes_test(is_admin)
def teacher_list(request):
    teachers = Teacher.objects.select_related('user').all()
    search_form = TeacherSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        qualification = search_form.cleaned_data.get('qualification')
        gender = search_form.cleaned_data.get('gender')
        is_active = search_form.cleaned_data.get('is_active')
        
        if search:
            teachers = teachers.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(teacher_id__icontains=search) |
                Q(user__email__icontains=search)
            )
        
        if qualification:
            teachers = teachers.filter(qualification=qualification)
        
        if gender:
            teachers = teachers.filter(gender=gender)
        
        if is_active:
            teachers = teachers.filter(is_active=is_active == 'True')
    
    # Pagination
    paginator = Paginator(teachers, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'teachers': page_obj,
        'search_form': search_form,
    }
    return render(request, 'teachers/teacher_list.html', context)

@login_required
@user_passes_test(is_admin)
def teacher_detail(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    return render(request, 'teachers/teacher_detail.html', {'teacher': teacher})

@login_required
@user_passes_test(is_admin)
def teacher_create(request):
    if request.method == 'POST':
        form = TeacherForm(request.POST, request.FILES)
        if form.is_valid():
            teacher = form.save()
            messages.success(request, f'Teacher {teacher.full_name} created successfully!')
            return redirect('teachers:teacher_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = TeacherForm()
    
    return render(request, 'teachers/teacher_form.html', {'form': form, 'title': 'Add New Teacher'})

@login_required
@user_passes_test(is_admin)
def teacher_update(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    if request.method == 'POST':
        form = TeacherForm(request.POST, request.FILES, instance=teacher)
        if form.is_valid():
            form.save()
            messages.success(request, f'Teacher {teacher.full_name} updated successfully!')
            return redirect('teachers:teacher_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = TeacherForm(instance=teacher)
    
    return render(request, 'teachers/teacher_form.html', {
        'form': form, 
        'teacher': teacher, 
        'title': f'Edit Teacher - {teacher.full_name}'
    })

@login_required
@user_passes_test(is_admin)
def teacher_delete(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    if request.method == 'POST':
        teacher_name = teacher.full_name
        teacher.delete()
        messages.success(request, f'Teacher {teacher_name} deleted successfully!')
        return redirect('teachers:teacher_list')
    
    return render(request, 'teachers/teacher_confirm_delete.html', {'teacher': teacher})

@login_required
def teacher_profile(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
        return render(request, 'teachers/teacher_profile.html', {'teacher': teacher})
    except Teacher.DoesNotExist:
        messages.error(request, 'Teacher profile not found.')
        return redirect('core:dashboard') 