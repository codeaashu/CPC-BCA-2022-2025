from django.db import models
from django.contrib.auth.models import User
from students.models import Student
from teachers.models import Teacher
from datetime import date

class LeaveApplication(models.Model):
    LEAVE_TYPES = (
        ('sick', 'Sick Leave'),
        ('casual', 'Casual Leave'),
        ('emergency', 'Emergency Leave'),
        ('personal', 'Personal Leave'),
        ('other', 'Other'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    
    # Applicant can be either student or teacher
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    admin_remarks = models.TextField(blank=True, null=True)
    applied_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='approved_leaves')  # New field for approver
    
    class Meta:
        ordering = ['-applied_date']
    
    def __str__(self):
        applicant_name = self.get_applicant_name()
        return f"{applicant_name} - {self.leave_type} ({self.start_date} to {self.end_date})"
    
    def get_applicant_name(self):
        if self.student:
            return self.student.full_name
        elif self.teacher:
            return self.teacher.full_name
        return "Unknown"
    
    def get_applicant_type(self):
        if self.student:
            return 'student'
        elif self.teacher:
            return 'teacher'
        return 'unknown'
    
    @property
    def duration_days(self):
        return (self.end_date - self.start_date).days + 1
    
    @property
    def is_pending(self):
        return self.status == 'pending'
    
    @property
    def is_approved(self):
        return self.status == 'approved'
    
    @property
    def is_rejected(self):
        return self.status == 'rejected'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        # Remove applicant validation here; enforce in the view instead
        # Ensure end_date is not before start_date
        if self.end_date < self.start_date:
            raise ValidationError('End date cannot be before start date.')
        # Ensure dates are not in the past
        if self.start_date < date.today():
            raise ValidationError('Start date cannot be in the past.') 