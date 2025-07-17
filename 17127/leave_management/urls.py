from django.urls import path
from . import views

app_name = 'leave_management'

urlpatterns = [
    path('', views.leave_list, name='leave_list'),
    path('my-leaves/', views.my_leaves, name='my_leaves'),
    path('apply/', views.leave_application_create, name='leave_application_create'),
    path('create/', views.leave_create, name='leave_create'),
    path('<int:pk>/', views.leave_detail, name='leave_detail'),
    path('<int:pk>/edit/', views.leave_update, name='leave_update'),
    path('<int:pk>/approve/', views.leave_approve, name='leave_approve'),
    path('<int:pk>/reject/', views.leave_reject, name='leave_reject'),
    path('<int:pk>/delete/', views.leave_delete, name='leave_delete'),
] 