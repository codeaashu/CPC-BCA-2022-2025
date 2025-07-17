from django.db import models
from django.contrib.auth.models import User
from teachers.models import Teacher

class Announcement(models.Model):
    TARGET_AUDIENCE_CHOICES = (
        ('all', 'All Users'),
        ('students', 'Students Only'),
        ('teachers', 'Teachers Only'),
        ('admin', 'Admin Only'),
    )
    
    PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    )
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    target_audience = models.CharField(max_length=10, choices=TARGET_AUDIENCE_CHOICES, default='all')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.author.get_full_name()}"
    
    @property
    def author_name(self):
        return self.author.get_full_name()
    
    @property
    def author_type(self):
        if hasattr(self.author, 'userprofile'):
            return self.author.userprofile.user_type
        return 'unknown'
    
    @property
    def is_urgent(self):
        return self.priority == 'urgent'
    
    @property
    def is_high_priority(self):
        return self.priority in ['high', 'urgent']
    
    def get_priority_color(self):
        priority_colors = {
            'low': 'success',
            'medium': 'info',
            'high': 'warning',
            'urgent': 'danger',
        }
        return priority_colors.get(self.priority, 'info')
    
    def get_target_audience_display_name(self):
        audience_names = {
            'all': 'All Users',
            'students': 'Students Only',
            'teachers': 'Teachers Only',
            'admin': 'Admin Only',
        }
        return audience_names.get(self.target_audience, self.target_audience) 