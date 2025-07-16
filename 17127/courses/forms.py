from django import forms
from .models import Course, Subject
from teachers.models import Teacher

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['name', 'code', 'description', 'duration_years', 'total_semesters', 'is_active']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        }

class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subject
        fields = ['name', 'code', 'course', 'teacher', 'description', 'credits', 'semester', 'is_active']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Filter teachers to only show active ones
        self.fields['teacher'].queryset = Teacher.objects.filter(is_active=True)

class CourseSearchForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Search by name or code'}))
    is_active = forms.ChoiceField(choices=[('', 'All'), ('True', 'Active'), ('False', 'Inactive')], required=False)

class SubjectSearchForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Search by name or code'}))
    course = forms.ModelChoiceField(queryset=Course.objects.all(), required=False, empty_label="All Courses")
    teacher = forms.ModelChoiceField(queryset=Teacher.objects.all(), required=False, empty_label="All Teachers")
    semester = forms.ChoiceField(choices=[('', 'All')] + [(str(i), f'Semester {i}') for i in range(1, 9)], required=False)
    is_active = forms.ChoiceField(choices=[('', 'All'), ('True', 'Active'), ('False', 'Inactive')], required=False) 