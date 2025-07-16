from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import date
from .models import User, EmployeeProfile, LeaveApplication, Department

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password'
        })
    )

class EmployeeRegistrationForm(UserCreationForm):
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z\s]+$',
                message='First name can only contain letters and spaces.'
            )
        ]
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z\s]+$',
                message='Last name can only contain letters and spaces.'
            )
        ]
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control'}),
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                message='Please enter a valid email address.'
            )
        ]
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control'})
        self.fields['password1'].widget.attrs.update({'class': 'form-control'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control'})

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('This email address is already registered.')
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = 'employee'  # Automatically set to employee
        if commit:
            user.save()
        return user

class EmployeeProfileForm(forms.ModelForm):
    phone = forms.CharField(
        max_length=10,
        min_length=10,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 10-digit mobile number'
        }),
        validators=[
            RegexValidator(
                regex=r'^[6-9]\d{9}$',
                message='Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
            )
        ]
    )
    
    department = forms.ModelChoiceField(
        queryset=Department.objects.all(),
        empty_label="Select Department",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    
    dob = forms.DateField(
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'max': date.today().strftime('%Y-%m-%d')
        })
    )
    
    date_joined = forms.DateField(
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'max': date.today().strftime('%Y-%m-%d')
        })
    )
    
    salary = forms.DecimalField(
        max_digits=10,
        decimal_places=2,
        widget=forms.NumberInput(attrs={
            'class': 'form-control',
            'min': '0',
            'step': '0.01'
        })
    )

    class Meta:
        model = EmployeeProfile
        fields = ['phone', 'address', 'dob', 'department', 'position', 'date_joined', 'salary']
        widgets = {
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Enter complete address'
            }),
            'position': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter job position/title'
            }),
        }

    def clean_dob(self):
        dob = self.cleaned_data.get('dob')
        if dob and dob > date.today():
            raise forms.ValidationError('Date of birth cannot be in the future.')
        
        # Check if person is at least 18 years old
        if dob and (date.today() - dob).days < 6570:  # 18 years = 6570 days
            raise forms.ValidationError('Employee must be at least 18 years old.')
        
        return dob

    def clean_date_joined(self):
        date_joined = self.cleaned_data.get('date_joined')
        if date_joined and date_joined > date.today():
            raise forms.ValidationError('Joining date cannot be in the future.')
        return date_joined

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone and EmployeeProfile.objects.filter(phone=phone).exists():
            raise forms.ValidationError('This phone number is already registered.')
        return phone

class LeaveApplicationForm(forms.ModelForm):
    class Meta:
        model = LeaveApplication
        fields = ['start_date', 'end_date', 'reason']
        widgets = {
            'start_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date',
                'min': date.today().strftime('%Y-%m-%d')
            }),
            'end_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date',
                'min': date.today().strftime('%Y-%m-%d')
            }),
            'reason': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Please provide a detailed reason for your leave request...'
            }),
        }

    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')
        
        if start_date and end_date and start_date > end_date:
            raise forms.ValidationError("End date must be after start date.")
        
        if start_date and start_date < date.today():
            raise forms.ValidationError("Start date cannot be in the past.")
        
        return cleaned_data 