from django.db import models
from teachers.models import Teacher

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    duration_years = models.PositiveIntegerField(default=1)
    total_semesters = models.PositiveIntegerField(default=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.code})"
    
    @property
    def total_students(self):
        return self.student_set.count()
    
    @property
    def total_subjects(self):
        return self.subject_set.count()

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    credits = models.PositiveIntegerField(default=3)
    semester = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.code}) - {self.course.name}"
    
    @property
    def total_students(self):
        return self.course.student_set.count()
    
    class Meta:
        unique_together = ['course', 'code'] 