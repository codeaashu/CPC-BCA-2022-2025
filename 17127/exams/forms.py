from django import forms
from .models import Exam, ExamResult
from students.models import Student

class ExamForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['title', 'subject', 'exam_type', 'exam_date', 'total_marks', 'passing_marks', 'description', 'is_active']
        widgets = {
            'exam_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 2}),
        }

class ExamResultForm(forms.ModelForm):
    class Meta:
        model = ExamResult
        fields = ['student', 'obtained_marks', 'remarks']
        widgets = {
            'remarks': forms.Textarea(attrs={'rows': 2}),
        }

class BulkExamResultForm(forms.Form):
    exam = forms.ModelChoiceField(queryset=Exam.objects.filter(is_active=True), empty_label="Select Exam")
    
    def __init__(self, *args, **kwargs):
        teacher = kwargs.pop('teacher', None)
        super().__init__(*args, **kwargs)
        if teacher:
            self.fields['exam'].queryset = Exam.objects.filter(subject__teacher=teacher, is_active=True) 