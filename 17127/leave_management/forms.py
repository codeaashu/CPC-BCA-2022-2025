from django import forms
from .models import LeaveApplication
from students.models import Student
from teachers.models import Teacher

class LeaveApplicationForm(forms.ModelForm):
    class Meta:
        model = LeaveApplication
        fields = ['leave_type', 'start_date', 'end_date', 'reason']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
            'reason': forms.Textarea(attrs={'rows': 4}),
        }
    
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        
        # Set initial dates
        from datetime import date, timedelta
        today = date.today()
        self.fields['start_date'].initial = today
        self.fields['end_date'].initial = today
    
    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')
        
        if start_date and end_date:
            if end_date < start_date:
                raise forms.ValidationError('End date cannot be before start date.')
            
            from datetime import date
            if start_date < date.today():
                raise forms.ValidationError('Start date cannot be in the past.')
        
        return cleaned_data

class LeaveApplicationAdminForm(forms.ModelForm):
    class Meta:
        model = LeaveApplication
        fields = ['status', 'admin_remarks', 'approved_by']
        widgets = {
            'admin_remarks': forms.Textarea(attrs={'rows': 3}),
            'approved_by': forms.HiddenInput(),
        }

class LeaveSearchForm(forms.Form):
    leave_type = forms.ChoiceField(
        choices=[('', 'All')] + list(LeaveApplication.LEAVE_TYPES),
        required=False
    )
    status = forms.ChoiceField(
        choices=[('', 'All')] + list(LeaveApplication.STATUS_CHOICES),
        required=False
    )
    applicant_type = forms.ChoiceField(
        choices=[('', 'All'), ('student', 'Student'), ('teacher', 'Teacher')],
        required=False
    )
    date_from = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        required=False
    )
    date_to = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        required=False
    ) 