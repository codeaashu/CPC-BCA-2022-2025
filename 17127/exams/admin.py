from django.contrib import admin
from .models import Exam, ExamResult

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'exam_type', 'exam_date', 'total_marks', 'passing_marks', 'is_active')
    list_filter = ('subject', 'exam_type', 'is_active')
    search_fields = ('title', 'subject__name')

@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ('exam', 'student', 'obtained_marks', 'grade', 'is_pass', 'created_at')
    list_filter = ('exam', 'grade', 'is_pass')
    search_fields = ('student__user__first_name', 'student__user__last_name', 'exam__title') 