from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Announcement
from .forms import AnnouncementForm, AnnouncementSearchForm

def is_admin_or_teacher(user):
    return user.is_authenticated and (user.userprofile.is_admin or user.userprofile.is_teacher)

@login_required
def announcement_list(request):
    # Get announcements based on user type
    if request.user.userprofile.is_admin:
        # Admin can see all announcements
        announcements = Announcement.objects.all()
    elif request.user.userprofile.is_teacher:
        # Teachers can see announcements for teachers and all users
        announcements = Announcement.objects.filter(
            Q(target_audience='teachers') | Q(target_audience='all')
        )
    elif request.user.userprofile.is_student:
        # Students can see announcements for students and all users
        announcements = Announcement.objects.filter(
            Q(target_audience='students') | Q(target_audience='all')
        )
    else:
        announcements = Announcement.objects.none()
    
    # Filter by active status
    announcements = announcements.filter(is_active=True)
    
    search_form = AnnouncementSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        target_audience = search_form.cleaned_data.get('target_audience')
        priority = search_form.cleaned_data.get('priority')
        
        if search:
            announcements = announcements.filter(
                Q(title__icontains=search) | Q(content__icontains=search)
            )
        
        if target_audience:
            announcements = announcements.filter(target_audience=target_audience)
        
        if priority:
            announcements = announcements.filter(priority=priority)
    
    # Pagination
    paginator = Paginator(announcements, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'announcements': page_obj,
        'search_form': search_form,
    }
    return render(request, 'announcements/announcement_list.html', context)

@login_required
@user_passes_test(is_admin_or_teacher)
def announcement_create(request):
    if request.method == 'POST':
        form = AnnouncementForm(request.POST, user=request.user)
        if form.is_valid():
            announcement = form.save(commit=False)
            announcement.author = request.user
            announcement.save()
            messages.success(request, 'Announcement created successfully!')
            return redirect('announcements:announcement_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = AnnouncementForm(user=request.user)
    
    return render(request, 'announcements/announcement_form.html', {
        'form': form,
        'title': 'Create New Announcement'
    })

@login_required
@user_passes_test(is_admin_or_teacher)
def announcement_update(request, pk):
    announcement = get_object_or_404(Announcement, pk=pk)
    
    # Check if user has permission to edit this announcement
    if not request.user.userprofile.is_admin and announcement.author != request.user:
        messages.error(request, 'You do not have permission to edit this announcement.')
        return redirect('announcements:announcement_list')
    
    if request.method == 'POST':
        form = AnnouncementForm(request.POST, instance=announcement, user=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Announcement updated successfully!')
            return redirect('announcements:announcement_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = AnnouncementForm(instance=announcement, user=request.user)
    
    return render(request, 'announcements/announcement_form.html', {
        'form': form,
        'announcement': announcement,
        'title': f'Edit Announcement - {announcement.title}'
    })

@login_required
@user_passes_test(is_admin_or_teacher)
def announcement_delete(request, pk):
    announcement = get_object_or_404(Announcement, pk=pk)
    
    # Check if user has permission to delete this announcement
    if not request.user.userprofile.is_admin and announcement.author != request.user:
        messages.error(request, 'You do not have permission to delete this announcement.')
        return redirect('announcements:announcement_list')
    
    if request.method == 'POST':
        announcement_title = announcement.title
        announcement.delete()
        messages.success(request, f'Announcement "{announcement_title}" deleted successfully!')
        return redirect('announcements:announcement_list')
    
    return render(request, 'announcements/announcement_confirm_delete.html', {
        'announcement': announcement
    })

@login_required
def announcement_detail(request, pk):
    announcement = get_object_or_404(Announcement, pk=pk)
    
    # Check if user has permission to view this announcement
    if request.user.userprofile.is_admin:
        pass  # Admin can view all announcements
    elif request.user.userprofile.is_teacher:
        if announcement.target_audience not in ['teachers', 'all']:
            messages.error(request, 'You do not have permission to view this announcement.')
            return redirect('announcements:announcement_list')
    elif request.user.userprofile.is_student:
        if announcement.target_audience not in ['students', 'all']:
            messages.error(request, 'You do not have permission to view this announcement.')
            return redirect('announcements:announcement_list')
    else:
        messages.error(request, 'Invalid user type.')
        return redirect('core:dashboard')
    
    return render(request, 'announcements/announcement_detail.html', {
        'announcement': announcement
    })

@login_required
@user_passes_test(is_admin_or_teacher)
def my_announcements(request):
    announcements = Announcement.objects.filter(author=request.user)
    search_form = AnnouncementSearchForm(request.GET)
    
    if search_form.is_valid():
        search = search_form.cleaned_data.get('search')
        target_audience = search_form.cleaned_data.get('target_audience')
        priority = search_form.cleaned_data.get('priority')
        is_active = search_form.cleaned_data.get('is_active')
        
        if search:
            announcements = announcements.filter(
                Q(title__icontains=search) | Q(content__icontains=search)
            )
        
        if target_audience:
            announcements = announcements.filter(target_audience=target_audience)
        
        if priority:
            announcements = announcements.filter(priority=priority)
        
        if is_active:
            announcements = announcements.filter(is_active=is_active == 'True')
    
    # Pagination
    paginator = Paginator(announcements, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'announcements': page_obj,
        'search_form': search_form,
    }
    return render(request, 'announcements/my_announcements.html', context) 