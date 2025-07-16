from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .models import Exam, ExamResult
from .forms import ExamForm, ExamResultForm, BulkExamResultForm
from students.models import Student
from django.core.paginator import Paginator
from django.db.models import Avg

def is_teacher(user):
    return user.is_authenticated and hasattr(user, 'userprofile') and user.userprofile.is_teacher

def is_admin(user):
    return user.is_authenticated and hasattr(user, 'userprofile') and user.userprofile.is_admin

@login_required
@user_passes_test(is_teacher)
def exam_list(request):
    exams = Exam.objects.filter(subject__teacher=request.user.teacher).order_by('-exam_date')
    return render(request, 'exams/exam_list.html', {'exams': exams})

@login_required
@user_passes_test(is_teacher)
def exam_create(request):
    if request.method == 'POST':
        form = ExamForm(request.POST)
        if form.is_valid():
            exam = form.save()
            messages.success(request, 'Exam created successfully!')
            return redirect('exams:exam_list')
    else:
        form = ExamForm()
    return render(request, 'exams/exam_form.html', {'form': form})

@login_required
@user_passes_test(is_teacher)
def exam_update(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    if request.method == 'POST':
        form = ExamForm(request.POST, instance=exam)
        if form.is_valid():
            form.save()
            messages.success(request, 'Exam updated successfully!')
            return redirect('exams:exam_list')
    else:
        form = ExamForm(instance=exam)
    return render(request, 'exams/exam_form.html', {'form': form, 'exam': exam})

@login_required
@user_passes_test(is_teacher)
def exam_delete(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    if request.method == 'POST':
        exam.delete()
        messages.success(request, 'Exam deleted successfully!')
        return redirect('exams:exam_list')
    return render(request, 'exams/exam_confirm_delete.html', {'exam': exam})

@login_required
def exam_detail(request, pk):
    exam = get_object_or_404(Exam, pk=pk)
    results = ExamResult.objects.filter(exam=exam).select_related('student')
    return render(request, 'exams/exam_detail.html', {'exam': exam, 'results': results})

@login_required
@user_passes_test(is_teacher)
def exam_result_list(request):
    results = ExamResult.objects.filter(exam__subject__teacher=request.user.teacher).select_related('exam', 'student')
    paginator = Paginator(results, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'exams/exam_result_list.html', {'results': page_obj})

@login_required
@user_passes_test(is_teacher)
def bulk_result_entry(request):
    if request.method == 'POST':
        form = BulkExamResultForm(request.POST, teacher=request.user.teacher)
        if form.is_valid():
            exam = form.cleaned_data['exam']
            students = Student.objects.filter(course=exam.subject.course, is_active=True)
            for student in students:
                obtained_marks = request.POST.get(f'marks_{student.id}')
                remarks = request.POST.get(f'remarks_{student.id}', '')
                if obtained_marks:
                    try:
                        obtained_marks_val = float(obtained_marks)
                    except (TypeError, ValueError):
                        obtained_marks_val = 0
                    result, created = ExamResult.objects.get_or_create(
                        exam=exam,
                        student=student,
                        defaults={
                            'obtained_marks': obtained_marks_val,
                            'remarks': remarks
                        }
                    )
                    if not created:
                        result.obtained_marks = obtained_marks_val
                        result.remarks = remarks
                        result.save()
            messages.success(request, f'Results entered successfully for {exam.title}')
            return redirect('exams:exam_result_list')
    else:
        form = BulkExamResultForm(teacher=request.user.teacher)
    return render(request, 'exams/bulk_result_entry.html', {'form': form})

@login_required
def student_results(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        messages.error(request, 'Student profile not found.')
        return redirect('core:dashboard')
    results = ExamResult.objects.filter(student=student).select_related('exam', 'exam__subject').order_by('-created_at')
    total_exams = results.count()
    passed_exams = results.filter(is_pass=True).count()
    total_obtained = sum([float(r.obtained_marks) for r in results])
    total_possible = sum([float(r.exam.total_marks) for r in results])
    average_percentage = (total_obtained / total_possible * 100) if total_possible else 0
    paginator = Paginator(results, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'results': page_obj,
        'student': student,
        'total_exams': total_exams,
        'passed_exams': passed_exams,
        'average_percentage': round(average_percentage, 2),
    }
    return render(request, 'exams/student_results.html', context) 