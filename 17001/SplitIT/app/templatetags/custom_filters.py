from django import template

register = template.Library()


@register.filter
def negate(value):
    return -value


@register.filter
def check_negative(value):
    return value < 0
