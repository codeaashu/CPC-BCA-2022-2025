from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='employee')
    # You can add more fields if needed

class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    dob = models.DateField(null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    position = models.CharField(max_length=100, blank=True)
    date_joined = models.DateField(default=timezone.now)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # Add more fields as needed

    def __str__(self):
        return self.user.get_full_name() or self.user.username

class Attendance(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'employee'})
    date = models.DateField(default=timezone.now)
    check_in_time = models.TimeField(default=timezone.now)

    class Meta:
        unique_together = ('employee', 'date')

    def __str__(self):
        return f"{self.employee.username} - {self.date}"

class LeaveApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    employee = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'employee'})
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    applied_on = models.DateTimeField(auto_now_add=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_leaves', limit_choices_to={'user_type': 'admin'})
    reviewed_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.employee.username} - {self.start_date} to {self.end_date}"
