from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import LeaveApplication
from .forms import LeaveApplicationForm, LeaveApplicationAdminForm, LeaveSearchForm
from students.models import Student
from teachers.models import Teacher

def is_admin(user):
    return user.is_authenticated and user.userprofile.is_admin

@login_required
def leave_create(request):
    if request.method == 'POST':
        form = LeaveApplicationForm(request.POST, user=request.user)
        if form.is_valid():
            leave = form.save(commit=False)
            # Set the applicant based on user type
            if request.user.userprofile.is_student:
                try:
                    leave.student = request.user.student
                except Student.DoesNotExist:
                    messages.error(request, 'Student profile not found.')
                    return redirect('core:dashboard')
            elif request.user.userprofile.is_teacher:
                try:
                    leave.teacher = request.user.teacher
                except Teacher.DoesNotExist:
                    messages.error(request, 'Teacher profile not found.')
                    return redirect('core:dashboard')
            else:
                messages.error(request, 'Invalid user type for leave application.')
                return redirect('core:dashboard')
            try:
                leave.full_clean()
                leave.save()
                messages.success(request, 'Leave application submitted successfully!')
                return redirect('leave_management:leave_list')
            except Exception as e:
                form.add_error(None, str(e))
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LeaveApplicationForm(user=request.user)
    return render(request, 'leave/leave_form.html', {'form': form, 'title': 'Apply for Leave'})

@login_required
def leave_update(request, pk):
    leave = get_object_or_404(LeaveApplication, pk=pk)
    
    # Check if user has permission to edit this leave
    if request.user.userprofile.is_admin:
        pass  # Admin can edit any leave
    elif request.user.userprofile.is_student:
        try:
            if leave.student != request.user.student or leave.status != 'pending':
                messages.error(request, 'You can only edit your own pending leave applications.')
                return redirect('leave_management:leave_list')
        except Student.DoesNotExist:
            messages.error(request, 'Student profile not found.')
            return redirect('core:dashboard')
    elif request.user.userprofile.is_teacher:
        try:
            if leave.teacher != request.user.teacher or leave.status != 'pending':
                messages.error(request, 'You can only edit your own pending leave applications.')
                return redirect('leave_management:leave_list')
        except Teacher.DoesNotExist:
            messages.error(request, 'Teacher profile not found.')
            return redirect('core:dashboard')
    else:
        messages.error(request, 'Invalid user type.')
        return redirect('core:dashboard')
    
    if request.method == 'POST':
        form = LeaveApplicationForm(request.POST, instance=leave, user=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Leave application updated successfully!')
            return redirect('leave_management:leave_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LeaveApplicationForm(instance=leave, user=request.user)
    
    return render(request, 'leave/leave_form.html', {
        'form': form, 
        'leave_application': leave, 
        'title': f'Edit Leave Application'
    })

@login_required
def leave_reject(request, pk):
    leave = get_object_or_404(LeaveApplication, pk=pk)
    
    if request.method == 'POST':
        leave.status = 'rejected'
        leave.approved_by = request.user
        leave.save()
        messages.success(request, f'Leave application for {leave.get_applicant_name()} has been rejected.')
        return redirect('leave_management:leave_list')
    
    return render(request, 'leave_management/leave_reject.html', {'leave': leave})

@login_required
def leave_application_create(request):
    if request.method == 'POST':
        form = LeaveApplicationForm(request.POST, user=request.user)
        if form.is_valid():
            leave = form.save(commit=False)
            # Set the applicant based on user type
            if request.user.userprofile.is_student:
                try:
                    leave.student = request.user.student
                except Student.DoesNotExist:
                    messages.error(request, 'Student profile not found.')
                    return redirect('core:dashboard')
            elif request.user.userprofile.is_teacher:
                try:
                    leave.teacher = request.user.teacher
                except Teacher.DoesNotExist:
                    messages.error(request, 'Teacher profile not found.')
                    return redirect('core:dashboard')
            else:
                messages.error(request, 'Invalid user type for leave application.')
                return redirect('core:dashboard')
            try:
                leave.full_clean()
                leave.save()
                messages.success(request, 'Leave application submitted successfully!')
                return redirect('leave_management:my_leaves')
            except Exception as e:
                form.add_error(None, str(e))
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LeaveApplicationForm(user=request.user)
    return render(request, 'leave_management/leave_form.html', {'form': form, 'title': 'Apply for Leave'})

@login_required
def my_leaves(request):
    if request.user.userprofile.is_student:
        try:
            student = request.user.student
            leaves = LeaveApplication.objects.filter(student=student)
        except Student.DoesNotExist:
            messages.error(request, 'Student profile not found.')
            return redirect('core:dashboard')
    elif request.user.userprofile.is_teacher:
        try:
            teacher = request.user.teacher
            leaves = LeaveApplication.objects.filter(teacher=teacher)
        except Teacher.DoesNotExist:
            messages.error(request, 'Teacher profile not found.')
            return redirect('core:dashboard')
    else:
        messages.error(request, 'Invalid user type.')
        return redirect('core:dashboard')
    
    # Pagination
    paginator = Paginator(leaves, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'leaves': page_obj,
    }
    return render(request, 'leave_management/my_leaves.html', context)

@login_required
def leave_detail(request, pk):
    leave = get_object_or_404(LeaveApplication, pk=pk)
    
    # Check if user has permission to view this leave
    if request.user.userprofile.is_admin:
        pass  # Admin can view all leaves
    elif request.user.userprofile.is_student:
        try:
            if leave.student != request.user.student:
                messages.error(request, 'You do not have permission to view this leave application.')
                return redirect('leave_management:my_leaves')
        except Student.DoesNotExist:
            messages.error(request, 'Student profile not found.')
            return redirect('core:dashboard')
    elif request.user.userprofile.is_teacher:
        try:
            if leave.teacher != request.user.teacher:
                messages.error(request, 'You do not have permission to view this leave application.')
                return redirect('leave_management:my_leaves')
        except Teacher.DoesNotExist:
            messages.error(request, 'Teacher profile not found.')
            return redirect('core:dashboard')
    else:
        messages.error(request, 'Invalid user type.')
        return redirect('core:dashboard')
    
    return render(request, 'leave/leave_detail.html', {'leave_application': leave})

@login_required
def leave_list(request):
    leaves = LeaveApplication.objects.select_related('student', 'teacher').all()
    search_form = LeaveSearchForm(request.GET)
    
    if search_form.is_valid():
        leave_type = search_form.cleaned_data.get('leave_type')
        status = search_form.cleaned_data.get('status')
        applicant_type = search_form.cleaned_data.get('applicant_type')
        date_from = search_form.cleaned_data.get('date_from')
        date_to = search_form.cleaned_data.get('date_to')
        
        if leave_type:
            leaves = leaves.filter(leave_type=leave_type)
        
        if status:
            leaves = leaves.filter(status=status)
        
        if applicant_type:
            if applicant_type == 'student':
                leaves = leaves.filter(student__isnull=False)
            elif applicant_type == 'teacher':
                leaves = leaves.filter(teacher__isnull=False)
        
        if date_from:
            leaves = leaves.filter(start_date__gte=date_from)
        
        if date_to:
            leaves = leaves.filter(end_date__lte=date_to)
    
    # Pagination
    paginator = Paginator(leaves, 15)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'leave_applications': page_obj,
        'search_form': search_form,
    }
    return render(request, 'leave/leave_list.html', context)

@login_required
def leave_approve(request, pk):
    leave = get_object_or_404(LeaveApplication, pk=pk)
    user = request.user
    # Only admins can approve or reject leave applications
    if not user.userprofile.is_admin:
        messages.error(request, 'Only admins can approve or reject leave applications.')
        return redirect('leave_management:leave_list')
    if request.method == 'POST':
        form = LeaveApplicationAdminForm(request.POST, instance=leave)
        if form.is_valid():
            leave = form.save(commit=False)
            leave.approved_by = user
            leave.save()
            status = form.cleaned_data['status']
            if status == 'approved':
                messages.success(request, f'Leave application for {leave.get_applicant_name()} has been approved.')
            elif status == 'rejected':
                messages.success(request, f'Leave application for {leave.get_applicant_name()} has been rejected.')
            return redirect('leave_management:leave_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LeaveApplicationAdminForm(instance=leave, initial={'approved_by': user.id})
    return render(request, 'leave/leave_approve.html', {
        'form': form,
        'leave': leave
    })

@login_required
def leave_delete(request, pk):
    leave = get_object_or_404(LeaveApplication, pk=pk)
    
    # Check if user has permission to delete this leave
    if request.user.userprofile.is_admin:
        pass  # Admin can delete any leave
    elif request.user.userprofile.is_student:
        try:
            if leave.student != request.user.student or leave.status != 'pending':
                messages.error(request, 'You can only delete your own pending leave applications.')
                return redirect('leave_management:my_leaves')
        except Student.DoesNotExist:
            messages.error(request, 'Student profile not found.')
            return redirect('core:dashboard')
    elif request.user.userprofile.is_teacher:
        try:
            if leave.teacher != request.user.teacher or leave.status != 'pending':
                messages.error(request, 'You can only delete your own pending leave applications.')
                return redirect('leave_management:my_leaves')
        except Teacher.DoesNotExist:
            messages.error(request, 'Teacher profile not found.')
            return redirect('core:dashboard')
    else:
        messages.error(request, 'Invalid user type.')
        return redirect('core:dashboard')
    
    if request.method == 'POST':
        leave.delete()
        messages.success(request, 'Leave application deleted successfully!')
        return redirect('leave_management:leave_list')
    
    return render(request, 'leave/leave_confirm_delete.html', {'object': leave}) 