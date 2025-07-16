from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Admin Views
    path('hr/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('hr/employees/', views.employee_list, name='employee_list'),
    path('hr/employees/add/', views.add_employee, name='add_employee'),
    path('hr/employees/<int:employee_id>/edit/', views.edit_employee, name='edit_employee'),
    path('hr/employees/<int:employee_id>/delete/', views.delete_employee, name='delete_employee'),
    path('hr/employees/<int:employee_id>/change-password/', views.change_employee_password, name='change_employee_password'),
    path('hr/departments/', views.department_list, name='department_list'),
    path('hr/departments/add/', views.add_department, name='add_department'),
    path('hr/departments/<int:department_id>/edit/', views.edit_department, name='edit_department'),
    path('hr/departments/<int:department_id>/delete/', views.delete_department, name='delete_department'),
    path('hr/leaves/', views.leave_applications, name='leave_applications'),
    path('hr/leaves/<int:leave_id>/approve/', views.approve_leave, name='approve_leave'),
    path('hr/attendance/', views.attendance_logs, name='attendance_logs'),
    
    # Employee Views
    path('employee/dashboard/', views.employee_dashboard, name='employee_dashboard'),
    path('employee/check-in/', views.check_in, name='check_in'),
    path('employee/attendance-success/', views.attendance_success, name='attendance_success'),
    path('employee/apply-leave/', views.apply_leave, name='apply_leave'),
    path('employee/my-attendance/', views.my_attendance, name='my_attendance'),
    path('employee/my-leaves/', views.my_leaves, name='my_leaves'),
] 