import os
from dotenv import load_dotenv
from django.core.mail import send_mail
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

import google.generativeai as genai

from .models import Product, UserAccount, Order, OrderItem
from .serializers import ProductSerializer, UserAccountSerializer, OrderSerializer

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


@api_view(['GET'])
def get_products(request):
    category = request.GET.get('category')
    search = request.GET.get('search')

    products = Product.objects.all()
    if category:
        products = products.filter(category__iexact=category)
    if search:
        products = products.filter(Q(name__icontains=search) | Q(description__icontains=search))

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def recommend_products(request):
    symptom = request.data.get("symptom")
    prompt = f"""
You are a helpful assistant for an Indian medical store website.
A user reports the symptom: "{symptom}".
Suggest 1 or 2 common over-the-counter medicines available in Indian pharmacies.
Mention:
- Name of medicine
- What it is used for (in 1 line)
Be short and simple. Do not add side effects or extra notes.
Strictly respond in 2–3 lines only.
"""
    try:
        model = genai.GenerativeModel(model_name="models/gemini-pro")
        chat = model.start_chat(history=[])
        response = chat.send_message(prompt)
        return Response({"recommendation": response.text})
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def chat_assistant(request):
    question = request.data.get("question")
    prompt = f"""
You are a medicine assistant for an Indian pharmacy website.
User asks: "{question}".
Answer should be short and useful:
- If the question is about a medicine, say what it is used for.
- If it is a symptom, suggest 1 medicine and what it does.
Answer in 2–3 lines max. Avoid side effects, dosage, or long explanations.
"""
    try:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
        chat = model.start_chat(history=[])
        response = chat.send_message(prompt)
        return Response({"answer": response.text})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def register_user(request):
    serializer = UserAccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()


        try:
            send_mail(
                subject="🧾 Medicos Order Confirmation",
                message=f"""
Hello {order.full_name},

Your order has been confirmed!

Total: ₹{order.total_price}
Payment Method: {order.payment_method.upper()}

Thank you for shopping at Medicos!

– Medicos Team
""",
                from_email=f"Medicos <{os.getenv('EMAIL_HOST_USER')}>",
                recipient_list=[order.email],
                fail_silently=True,
            )
        except Exception as e:
            print("❌ Email error:", str(e))

        return Response({"message": "Order placed successfully!"}, status=201)
    else:
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    if request.method == 'PUT':
        user.full_name = request.data.get('name', user.full_name)
        user.email = request.data.get('email', user.email)
        user.phone = request.data.get('phone', user.phone)
        user.save()
        return Response({"message": "Profile updated successfully."})


    orders = Order.objects.filter(email=user.email).order_by('-created_at')
    enriched_orders = []

    for order in orders:
        enriched_items = []
        item_names = []

        for item in order.items.select_related('product'):
            product = item.product
            enriched_items.append({
                "product": {
                    "name": product.name,
                    "image": product.image.url if product.image else "",
                    "price": float(product.price),
                },
                "quantity": item.quantity,
            })
            item_names.append(product.name)


        if len(item_names) == 1:
            order_name = item_names[0]
        elif len(item_names) > 1:
            order_name = f"{item_names[0]} +{len(item_names) - 1} more"
        else:
            order_name = f"Order #{order.id}"

        enriched_orders.append({
            "id": order.id,
            "order_name": order_name,
            "created_at": order.created_at.strftime('%Y-%m-%d %H:%M'),
            "payment_method": order.payment_method,
            "total_price": float(order.total_price),
            "items": enriched_items,
        })

    return Response({
        "username": user.username,
        "name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "orders": enriched_orders
    })


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    user = authenticate(request, username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    else:
        return Response({"error": "Invalid credentials"}, status=400)
