from django.contrib import admin
from .models import Subject

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'course', 'teacher', 'semester', 'is_active', 'total_students')
    list_filter = ('course', 'teacher', 'semester', 'is_active')
    search_fields = ('name', 'code') 