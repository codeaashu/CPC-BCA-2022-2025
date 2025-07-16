from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from .models import Teacher
import re

class TeacherForm(forms.ModelForm):
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
    
    # Password fields (only for new teachers)
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
        model = Teacher
        fields = [
            'first_name', 'last_name', 'email', 'username', 'password1', 'password2',
            'gender', 'date_of_birth', 'address', 'phone',
            'qualification', 'specialization', 'experience_years',
            'joining_date'
        ]
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'joining_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'address': forms.Textarea(attrs={'rows': 3, 'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'qualification': forms.Select(attrs={'class': 'form-select'}),
            'specialization': forms.TextInput(attrs={'class': 'form-control'}),
            'experience_years': forms.NumberInput(attrs={'class': 'form-control', 'min': '0', 'max': '50'}),
            'gender': forms.Select(attrs={'class': 'form-select'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            # Editing existing teacher
            self.fields['first_name'].initial = self.instance.user.first_name
            self.fields['last_name'].initial = self.instance.user.last_name
            self.fields['email'].initial = self.instance.user.email
            self.fields['username'].initial = self.instance.user.username
            self.fields['username'].widget.attrs['readonly'] = True
            # Hide password fields for existing teachers
            self.fields['password1'].widget = forms.HiddenInput()
            self.fields['password2'].widget = forms.HiddenInput()
        else:
            # New teacher - password is required
            self.fields['password1'].required = True
            self.fields['password2'].required = True
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not self.instance.pk:  # Only check for new teachers
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
    
    def clean_experience_years(self):
        experience_years = self.cleaned_data.get('experience_years')
        if experience_years is not None:
            if experience_years < 0:
                raise ValidationError('Experience years cannot be negative.')
            elif experience_years > 50:
                raise ValidationError('Experience years seem too high. Please verify.')
        return experience_years
    
    def clean_joining_date(self):
        joining_date = self.cleaned_data.get('joining_date')
        if joining_date:
            from datetime import date
            today = date.today()
            
            if joining_date > today:
                raise ValidationError('Joining date cannot be in the future.')
            
            # Check if joining date is reasonable (not too far in the past)
            years_ago = today.year - joining_date.year
            if years_ago > 30:
                raise ValidationError('Joining date seems too far in the past. Please verify.')
        
        return joining_date
    
    def save(self, commit=True):
        teacher = super().save(commit=False)
        
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
            user.userprofile.user_type = 'teacher'
            user.userprofile.save()
            teacher.user = user
        
        if commit:
            teacher.save()
        
        return teacher

class TeacherSearchForm(forms.Form):
    search = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Search by name, ID, or email', 'class': 'form-control'}))
    qualification = forms.ChoiceField(choices=[('', 'All')] + list(Teacher.QUALIFICATION_CHOICES), required=False, widget=forms.Select(attrs={'class': 'form-select'}))
    gender = forms.ChoiceField(choices=[('', 'All')] + list(Teacher.GENDER_CHOICES), required=False, widget=forms.Select(attrs={'class': 'form-select'}))
    is_active = forms.ChoiceField(choices=[('', 'All'), ('True', 'Active'), ('False', 'Inactive')], required=False, widget=forms.Select(attrs={'class': 'form-select'})) 