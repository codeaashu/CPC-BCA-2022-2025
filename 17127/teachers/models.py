from django.db import models
from django.contrib.auth.models import User

class Teacher(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    
    QUALIFICATION_CHOICES = (
        ('BSc', 'Bachelor of Science'),
        ('MSc', 'Master of Science'),
        ('PhD', 'Doctor of Philosophy'),
        ('BEd', 'Bachelor of Education'),
        ('MEd', 'Master of Education'),
        ('Other', 'Other'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teacher_id = models.CharField(max_length=20, unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    address = models.TextField()
    phone = models.CharField(max_length=15)
    qualification = models.CharField(max_length=10, choices=QUALIFICATION_CHOICES)
    specialization = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField(default=0)
    joining_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.teacher_id}"
    
    def save(self, *args, **kwargs):
        if not self.teacher_id:
            # Generate teacher ID if not provided
            last_teacher = Teacher.objects.order_by('-id').first()
            if last_teacher:
                last_id = int(last_teacher.teacher_id[3:])  # Assuming format TCH001
                self.teacher_id = f"TCH{str(last_id + 1).zfill(3)}"
            else:
                self.teacher_id = "TCH001"
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