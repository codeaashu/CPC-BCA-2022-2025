from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from .models import Student
from courses.models import Course
import re

class StudentForm(forms.ModelForm):
    # User fields
    first_name = forms.CharField(
        max_length=30, 
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    last_name = forms.CharField(
        max_length=30, 
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'form-control'})
    )
    username = forms.CharField(
        max_length=150, 
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    
    # Password fields (only for new students)
    password1 = forms.CharField(
        label='Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        required=False,
        help_text='Password must be at least 8 characters long and contain letters and numbers.'
    )
    password2 = forms.CharField(
        label='Confirm Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        required=False,
        help_text='Enter the same password as above.'
    )
    
    class Meta:
        model = Student
        fields = [
            'first_name', 'last_name', 'email', 'username', 'password1', 'password2',
            'course', 'gender', 'date_of_birth', 'address', 'phone',
            'parent_name', 'parent_phone', 'emergency_contact', 'is_active'
        ]
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'address': forms.Textarea(attrs={'rows': 3, 'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'parent_name': forms.TextInput(attrs={'class': 'form-control'}),
            'parent_phone': forms.TextInput(attrs={'class': 'form-control'}),
            'emergency_contact': forms.TextInput(attrs={'class': 'form-control'}),
            'course': forms.Select(attrs={'class': 'form-select'}),
            'gender': forms.Select(attrs={'class': 'form-select'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            # Editing existing student
            self.fields['first_name'].initial = self.instance.user.first_name
            self.fields['last_name'].initial = self.instance.user.last_name
            self.fields['email'].initial = self.instance.user.email
            self.fields['username'].initial = self.instance.user.username
            self.fields['username'].widget.attrs['readonly'] = True
            # Hide password fields for existing students
            self.fields['password1'].widget = forms.HiddenInput()
            self.fields['password2'].widget = forms.HiddenInput()
        else:
            # New student - password is required
            self.fields['password1'].required = True
            self.fields['password2'].required = True
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not self.instance.pk:  # Only check for new students
            if User.objects.filter(username=username).exists():
                raise ValidationError('A user with this username already exists.')
        return username
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if '@' not in email:
            raise ValidationError('Email must contain @ symbol.')
        if not self.instance.pk:
            if User.objects.filter(email=email).exists():
                raise ValidationError('A user with this email already exists.')
        return email
    
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone:
            phone_clean = re.sub(r'\D', '', phone)
            if not re.match(r'^[6-9]\d{9}$', phone_clean):
                raise ValidationError('Phone number must be 10 digits and start with 6, 7, 8, or 9.')
            return phone_clean
        return phone
    
    def clean_parent_phone(self):
        parent_phone = self.cleaned_data.get('parent_phone')
        if parent_phone:
            # Remove all non-digit characters
            parent_phone_clean = re.sub(r'\D', '', parent_phone)
            if len(parent_phone_clean) < 10:
                raise ValidationError('Parent phone number must be at least 10 digits.')
            # Format phone number
            return parent_phone_clean
        return parent_phone
    
    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        
        if password1 and password2:
            if password1 != password2:
                raise ValidationError('Passwords do not match.')
            
            # Validate password strength
            try:
                validate_password(password1)
            except ValidationError as e:
                raise ValidationError(e.messages[0])
            
            # Additional custom validation
            if len(password1) < 8:
                raise ValidationError('Password must be at least 8 characters long.')
            
            if not re.search(r'[A-Za-z]', password1):
                raise ValidationError('Password must contain at least one letter.')
            
            if not re.search(r'\d', password1):
                raise ValidationError('Password must contain at least one number.')
        
        return password2
    
    def clean_date_of_birth(self):
        dob = self.cleaned_data.get('date_of_birth')
        from datetime import date
        if dob and dob > date.today():
            raise ValidationError('Date of birth cannot be in the future.')
        return dob
    
    def save(self, commit=True):
        student = super().save(commit=False)
        
        if self.instance.pk:
            # Update existing user
            user = self.instance.user
            user.first_name = self.cleaned_data['first_name']
            user.last_name = self.cleaned_data['last_name']
            user.email = self.cleaned_data['email']
            user.save()
        else:
            # Create new user with provided password
            password = self.cleaned_data.get('password1', 'changeme123')
            user = User.objects.create_user(
                username=self.cleaned_data['username'],
                email=self.cleaned_data['email'],
                first_name=self.cleaned_data['first_name'],
                last_name=self.cleaned_data['last_name'],
                password=password
            )
            user.userprofile.user_type = 'student'
            user.userprofile.save()
            student.user = user
        
        if commit:
            student.save()
        
        return student

class StudentSearchForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Search by name, ID, or email', 'class': 'form-control'}))
    course = forms.ModelChoiceField(queryset=Course.objects.all(), required=False, empty_label="All Courses", widget=forms.Select(attrs={'class': 'form-select'}))
    gender = forms.ChoiceField(choices=[('', 'All')] + list(Student.GENDER_CHOICES), required=False, widget=forms.Select(attrs={'class': 'form-select'}))
    is_active = forms.ChoiceField(choices=[('', 'All'), ('True', 'Active'), ('False', 'Inactive')], required=False, widget=forms.Select(attrs={'class': 'form-select'})) 