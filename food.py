from food_api.models import Food

from datetime import datetime
from user_api.models import User, Profile
user = User.objects.filter(username='ayman@gmail.com')[0]
profile = Profile.objects.filter(user= user)[0]

Food(name="Chapthi", total_calories=12, fat= 1, protien= 1, carbs=10, category='S', date_eaten=datetime(2024, 2, 27), user=profile)
