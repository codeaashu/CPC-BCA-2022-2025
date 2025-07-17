from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('products/', views.get_products),
    path('recommend/', views.recommend_products),
    path('chat/', views.chat_assistant),
    path('register/', views.register_user),
    path('order/', views.create_order, name='create_order'),
    path('profile/', views.user_profile, name='user_profile'),
    path('login/', obtain_auth_token, name='api_token_auth'),
]
