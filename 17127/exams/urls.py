from django.urls import path
from . import views

app_name = 'exams'

urlpatterns = [
    # Exam URLs
    path('', views.exam_list, name='exam_list'),
    path('create/', views.exam_create, name='exam_create'),
    path('<int:pk>/', views.exam_detail, name='exam_detail'),
    path('<int:pk>/edit/', views.exam_update, name='exam_update'),
    path('<int:pk>/delete/', views.exam_delete, name='exam_delete'),

    # Result URLs
    path('results/', views.exam_result_list, name='exam_result_list'),
    path('results/bulk/', views.bulk_result_entry, name='bulk_result_entry'),
    path('student/results/', views.student_results, name='student_results'),
] 