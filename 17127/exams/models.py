from django.db import models
from courses.models import Subject
from students.models import Student

class Exam(models.Model):
    EXAM_TYPE_CHOICES = [
        ('written', 'Written'),
        ('oral', 'Oral'),
        ('practical', 'Practical'),
        ('assignment', 'Assignment'),
    ]
    title = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES)
    exam_date = models.DateField()
    total_marks = models.PositiveIntegerField()
    passing_marks = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.subject.name}"

class ExamResult(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    obtained_marks = models.DecimalField(max_digits=6, decimal_places=2)
    remarks = models.TextField(blank=True, null=True)
    grade = models.CharField(max_length=2, blank=True)  # Can be auto or manual
    is_pass = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['exam', 'student']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student.full_name} - {self.exam.title} - {self.obtained_marks}"

    def save(self, *args, **kwargs):
        # Auto-calculate pass/fail and grade
        if self.obtained_marks is not None and self.exam:
            self.is_pass = self.obtained_marks >= self.exam.passing_marks
            percent = (float(self.obtained_marks) / float(self.exam.total_marks)) * 100 if self.exam.total_marks else 0
            if percent >= 90:
                self.grade = 'A+'
            elif percent >= 80:
                self.grade = 'A'
            elif percent >= 70:
                self.grade = 'B+'
            elif percent >= 60:
                self.grade = 'B'
            elif percent >= 50:
                self.grade = 'C+'
            elif percent >= 40:
                self.grade = 'C'
            else:
                self.grade = 'F'
        super().save(*args, **kwargs) 