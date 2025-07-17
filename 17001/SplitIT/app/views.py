from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import Q
import json

from .models import (
    Group,
    GroupMember,
    Expense,
    ExpenseShare,
    Settle,
    Profile,
    Summary,
    SummaryDetails,
)
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db.models import Prefetch
from decimal import Decimal


# Create your views here.
def home(request):
    return render(request, "home.html")


@login_required(login_url="login")
def dash(request):
    user = request.user
    summary, created = Summary.objects.get_or_create(user=user)
    group_count = GroupMember.objects.filter(user=user).count()
    profile, created = Profile.objects.get_or_create(user=user)

    g = profile.gender
    gender = 0 if g == "M" else 1
    return render(
        request,
        "dash.html",
        {"summary": summary, "group_count": group_count, "gender": gender},
    )



def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            auth_login(request, user)
            return redirect("dashboard")
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, "login.html")

    return render(request, "login.html")


def signup(request):
    if request.method == "POST":
        fname = request.POST.get("first-name")
        lname = request.POST.get("last-name")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=email).exists():
            messages.error(request, "An account with this email already exists.")
            return render(request, "signup.html")
        new_user = User.objects.create_user(
            username=email,
            password=password,
            email=email,
            first_name=fname,
            last_name=lname,
        )
        new_user.save()
        Profile.objects.get_or_create(user=new_user)
  # <-- add this line
        messages.success(request, "Your account has been created successfully.")
        return redirect("login")


    return render(request, "signup.html")


@login_required(login_url="login")
def groups(request):
    user = request.user
    groups = GroupMember.objects.filter(user=user).select_related("group")
    return render(
        request,
        "group_list.html",
        {
            "groups": groups,
            "current_user": user,
        },
    )


@login_required(login_url="login")
def profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == "POST":
        profile.about = request.POST.get("about", profile.about)
        profile.gender = request.POST.get("gender", profile.gender)
        profile.save()
        return redirect("profile")

    context = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "about": profile.about,
        "gender": profile.gender,
    }
    return render(request, "profile.html", context)



@login_required(login_url="login")
def reset_password(request):
    if request.method == "POST":
        current_password = request.POST.get("current_password")
        new_password = request.POST.get("new_password")
        confirm_password = request.POST.get("confirm_password")

        user = request.user
        errors = []

        if not user.check_password(current_password):
            errors.append("Incorrect current password.")
        elif new_password != confirm_password:
            errors.append("New Password and Confirm Password do not match.")

        if errors:
            messages.error(request, " ".join(errors))
            return redirect("profile")
        user.set_password(new_password)
        user.save()
        messages.success(request, "Password reset successfully! Please log in again.")
        auth_logout(request)
        return redirect("login")

    return redirect("profile")


def aboutus(request):
    return render(request, "aboutus.html")


def logout(request):
    auth_logout(request)
    return redirect("login")


@login_required(login_url="login")
def create_group(request):
    if request.method == "POST":
        name = request.POST.get("group-name")
        description = request.POST.get("group-description")
        group = Group.objects.create(
            group_name=name, group_description=description, created_by=request.user
        )

        GroupMember.objects.create(user=request.user, group=group)
        return redirect("groups")


@login_required(login_url="login")
def group(request):
    user = request.user
    if request.method == "POST":
        group_id = request.POST.get("group_id")
    else:
        group_id = request.session.get("group_id")
    group = get_object_or_404(Group, group_id=group_id)
    expenses = (
        Expense.objects.filter(group_id=group_id)
        .select_related("group")
        .prefetch_related(
            Prefetch("expenseshare_set", queryset=ExpenseShare.objects.all())
        )
    )
    members = GroupMember.objects.filter(group_id=group_id).select_related("user")
    return render(
        request,
        "group.html",
        {
            "expenses": expenses,
            "current_user": user,
            "group": group,
            "members": members,
        },
    )


@login_required(login_url="login")
def expense(request):
    user = request.user
    group = request.POST.get("group_id")
    details = request.POST.get("expense-details")
    amount = Decimal(request.POST.get("amount-spent"))
    members = request.POST.getlist("options")
    group = get_object_or_404(Group, group_id=int(group))
    request.session["group_id"] = group.group_id

    y, created = Summary.objects.get_or_create(user=user)
    y.total_spent += amount
    y.save()

    new_expense = Expense.objects.create(
        user=user, group=group, amount=amount, description=details
    )
    share = new_expense.amount / len(members)
    flag = 0  # a flag to check if user is in the list of members
    for i in members:
        x = get_object_or_404(User, username=i)

        if x == user:
            flag += 1  # if user is in the list of members, then flag = 1
            y.on_self += share
            y.save()
        else:
            try:
                y_details = get_object_or_404(SummaryDetails, payer=x, paid_for=user)
                y_details.amount -= share
                y_details.save()
            except:
                z, created = SummaryDetails.objects.get_or_create(
                    payer=user, paid_for=x
                )
                z.amount += share
                z.save()
        ExpenseShare.objects.create(user=x, expense=new_expense, share=share)
    for i in members:
        x = get_object_or_404(User, username=i)
        summary_details = SummaryDetails.objects.filter(Q(payer=x) | Q(paid_for=x))
        s = 0
        for j in summary_details:
            if j.payer == user:
                s += j.amount
            else:
                s -= j.amount
        y, created = Summary.objects.get_or_create(user=x)
        y.owes = -s
        y.save()
    if flag == 0:
        summary_details = SummaryDetails.objects.filter(
            Q(payer=user) | Q(paid_for=user)
        )
        s = 0
        for j in summary_details:
            if j.payer == user:
                s += j.amount
            else:
                s -= j.amount
        y, created = Summary.objects.get_or_create(user=user)
        y.owes = -s
        y.save()
    return redirect("group")


@login_required(login_url="login")
def add_member(request):
    if request.method == "POST":
        new_member_username = request.POST.get("username")
        group_id = request.POST.get("group_id")
        group = get_object_or_404(Group, group_id=int(group_id))

        try:
            user = User.objects.get(username=new_member_username)
        except User.DoesNotExist:
            messages.error(
                request, f"No user exists with username: {new_member_username}"
            )
            return redirect("group")

        if GroupMember.objects.filter(user=user, group=group).exists():
            messages.error(request, "Already a member")
            return redirect("group")

        GroupMember.objects.create(user=user, group=group)
        request.session["group_id"] = group.group_id
        messages.success(request, "Member added successfully")
        return redirect("group")
    else:
        return HttpResponse("Invalid request method.", status=400)


@login_required(login_url="login")
def delete_group(request):
    if request.method == "POST":
        group_id = request.POST.get("group_id")
        group = get_object_or_404(Group, group_id=int(group_id))
        group.delete()
        return redirect("groups")
    else:
        return HttpResponse("Invalid request method.", status=400)


@login_required(login_url="login")
def summary_details(request):
    if request.method == "GET":
        user = request.user
        summary_details = SummaryDetails.objects.filter(
            Q(payer=user) | Q(paid_for=user)
        )
        owe = []
        owed = []
        for i in summary_details:
            if i.payer == user:

                if i.amount > 0:
                    obj = {"name": i.paid_for.username, "amount": i.amount}
                    owed.append(obj)
                else:
                    obj = {"name": i.paid_for.username, "amount": -i.amount}
                    owe.append(obj)
            else:
                if i.amount > 0:
                    obj = {"name": i.payer.username, "amount": i.amount}
                    owe.append(obj)
                else:
                    obj = {"name": i.payer.username, "amount": -i.amount}
                    owed.append(obj)
        summary, created = Summary.objects.get_or_create(user=user)
        return render(
            request,
            "summary_details.html",
            {"owe": owe, "owed": owed, "summary": summary},
        )


@login_required(login_url="login")
def expenses_details(request):
    if request.method == "GET":
        user = request.user
        expenses = Expense.objects.filter(user=user)
        d = {}
        for i in expenses:
            s = str(i.group.group_name)
            if s not in d:
                d[s] = i.amount
            else:
                d[s] += i.amount

        groups = []
        spendings = []
        for i in d:
            groups.append(i)
            spendings.append(int(d[i]))
        groups_json = json.dumps(groups)
        spendings_json = json.dumps(spendings)
        return render(
            request,
            "expense_details.html",
            {"groups": groups_json, "spendings": spendings_json, "expenses": expenses},
        )