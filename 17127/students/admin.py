from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'student_id', 'course', 'is_active')
    list_filter = ('course', 'is_active')
    search_fields = ('user__first_name', 'user__last_name', 'student_id')
    filter_horizontal = ('subjects',) 