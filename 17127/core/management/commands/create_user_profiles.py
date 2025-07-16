from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import UserProfile

class Command(BaseCommand):
    help = 'Create UserProfile for existing users who do not have one'

    def handle(self, *args, **options):
        users_without_profile = []
        
        for user in User.objects.all():
            try:
                user.userprofile
            except UserProfile.DoesNotExist:
                users_without_profile.append(user)
        
        if not users_without_profile:
            self.stdout.write(
                self.style.SUCCESS('All users already have profiles!')
            )
            return
        
        self.stdout.write(f'Found {len(users_without_profile)} users without profiles.')
        
        for user in users_without_profile:
            # Determine user type based on superuser status
            user_type = 'admin' if user.is_superuser else 'student'
            UserProfile.objects.create(user=user, user_type=user_type)
            self.stdout.write(
                self.style.SUCCESS(f'Created profile for user: {user.username} ({user_type})')
            )
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(users_without_profile)} user profiles!')
        ) 