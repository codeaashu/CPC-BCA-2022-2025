from django import forms
from .models import Announcement

class AnnouncementForm(forms.ModelForm):
    class Meta:
        model = Announcement
        fields = ['title', 'content', 'target_audience', 'priority', 'is_active']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 5}),
        }
    
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        
        # Filter target audience based on user type
        if user and hasattr(user, 'userprofile'):
            if user.userprofile.is_student:
                # Students can only post to students or all
                self.fields['target_audience'].choices = [
                    ('students', 'Students Only'),
                    ('all', 'All Users'),
                ]
            elif user.userprofile.is_teacher:
                # Teachers can post to students, teachers, or all
                self.fields['target_audience'].choices = [
                    ('students', 'Students Only'),
                    ('teachers', 'Teachers Only'),
                    ('all', 'All Users'),
                ]
            # Admin can post to all audiences

class AnnouncementSearchForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Search by title or content'}))
    target_audience = forms.ChoiceField(
        choices=[('', 'All')] + list(Announcement.TARGET_AUDIENCE_CHOICES),
        required=False
    )
    priority = forms.ChoiceField(
        choices=[('', 'All')] + list(Announcement.PRIORITY_CHOICES),
        required=False
    )
    is_active = forms.ChoiceField(
        choices=[('', 'All'), ('True', 'Active'), ('False', 'Inactive')],
        required=False
    ) 