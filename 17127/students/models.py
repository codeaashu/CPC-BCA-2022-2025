from django.db import models
from django.contrib.auth.models import User
from courses.models import Course, Subject

class Student(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20, unique=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, blank=True, related_name='enrolled_students')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    address = models.TextField()
    phone = models.CharField(max_length=15)
    parent_name = models.CharField(max_length=100)
    parent_phone = models.CharField(max_length=15)
    emergency_contact = models.CharField(max_length=15)
    enrollment_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.student_id}"
    
    def save(self, *args, **kwargs):
        if not self.student_id:
            # Generate student ID if not provided
            last_student = Student.objects.order_by('-id').first()
            if last_student:
                last_id = int(last_student.student_id[3:])  # Assuming format STU001
                self.student_id = f"STU{str(last_id + 1).zfill(3)}"
            else:
                self.student_id = "STU001"
        super().save(*args, **kwargs)
    
    @property
    def full_name(self):
        return self.user.get_full_name()
    
    @property
    def email(self):
        return self.user.email
    
    @property
    def age(self):
        from datetime import date
        today = date.today()
        return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)) 