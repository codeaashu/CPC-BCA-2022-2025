"""
URL configuration for SplitIT project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("signup/", views.signup, name="signup"),
    path("login/", views.login, name="login"),
    path("dashboard/", views.dash, name="dashboard"),
    path("groups/", views.groups, name="groups"),
    path("aboutus/", views.aboutus, name="aboutus"),
    path("logout/", views.logout, name="logout"),
    path("profile/", views.profile, name="profile"),
    path("groups/create_group", views.create_group, name="create_group"),
    path("group/", views.group, name="group"),
    path("group/expense", views.expense, name="expense"),
    path("group/add_member", views.add_member, name="add_member"),
    path("group/delete_group", views.delete_group, name="delete_group"),
    path("reset-password/", views.reset_password, name="reset_password"),
    path("summary-details/", views.summary_details, name="summary_details"),
    path("expense_details/", views.expenses_details, name="expense_details"),
]
