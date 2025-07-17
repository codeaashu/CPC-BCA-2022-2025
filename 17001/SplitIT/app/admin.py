from django.contrib import admin
from .models import (
    Group,
    GroupMember,
    Expense,
    ExpenseShare,
    Settle,
    Profile,
    SummaryDetails,
    Summary,
)

admin.site.register(Profile)
admin.site.register(Group)
admin.site.register(GroupMember)
admin.site.register(Expense)
admin.site.register(ExpenseShare)
admin.site.register(Settle)
admin.site.register(SummaryDetails)
admin.site.register(Summary)
