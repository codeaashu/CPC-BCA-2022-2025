

from django.contrib import admin
from .models import Product, UserAccount, Order

admin.site.register(Product)
admin.site.register(UserAccount)
admin.site.register(Order)
