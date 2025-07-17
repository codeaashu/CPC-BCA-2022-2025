from django.db import models
from django.contrib.auth.models import AbstractUser


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Medicine', 'Medicine'),
        ('Babycare', 'Baby Care'),
        ('SkinCare', 'Skin Care'),
        ('Ayurveda', 'Ayurveda'),
        ('HairCare', 'Hair Care'),
        ('Vitamins', 'Vitamins'),
    ]

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    originalPrice = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Medicine')
    image = models.ImageField(upload_to='products/')
    description = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    tag = models.CharField(max_length=50, blank=True, null=True)
    discount = models.CharField(max_length=50, blank=True, null=True)
    emoji = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name


class UserAccount(AbstractUser):
    full_name = models.CharField(max_length=100, default='Guest User')
    phone = models.CharField(max_length=15, default='0000000000')

    def __str__(self):
        return self.username


class Order(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField()
    payment_method = models.CharField(max_length=20)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.full_name} on {self.created_at.strftime('%Y-%m-%d')}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"
