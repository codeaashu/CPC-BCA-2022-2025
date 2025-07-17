from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    about = models.CharField(max_length=200, default="")
    gender = models.CharField(max_length=10, default="")

    def __str__(self):
        return self.user.username


class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=255)
    group_description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.group_name} (ID: {self.group_id})"


class GroupMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "group")

    def __str__(self):
        return f"{self.user.username} - {self.group.group_name}"


class Expense(models.Model):
    expense_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Expense {self.expense_id} by {self.user.username} in {self.group.group_name} - ${self.amount}"


class ExpenseShare(models.Model):
    share_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)
    share = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Share {self.share_id} by {self.user.username} for Expense {self.expense.expense_id} - ${self.share}"


class Settle(models.Model):
    expense = models.OneToOneField(
        ExpenseShare, on_delete=models.CASCADE, primary_key=True
    )
    settled = models.BooleanField(default=False)

    def __str__(self):
        return f"Settle for Expense {self.expense.expense_id} - Settled: {self.settled}"


class SummaryDetails(models.Model):
    payer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="payer", verbose_name="Payer"
    )
    paid_for = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="paid_for", verbose_name="Paid For"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.BooleanField(default=False)

    class Meta:
        unique_together = ("payer", "paid_for")

    def __str__(self):
        return f"{self.payer.username} paid ${self.amount:.2f} for {self.paid_for.username}"


class Summary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    owes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    on_self = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.user.username} owes ${self.owes}"
