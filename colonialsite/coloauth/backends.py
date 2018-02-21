from cas.backends import CASBackend, _verify
from usernames import USER_LIST
from django.conf import settings
from django.contrib.auth import get_user_model
from members.models import Member

from datetime import datetime
import hashlib, random
from base64 import b64encode
import requests

class RestrictedCASBackend(CASBackend):

	def authenticate(self, ticket, service):
		User = get_user_model()
		username = _verify(ticket, service)

		if not username:
			return None

		if not username in USER_LIST:
			return None

		try:
			user = User.objects.get(username__iexact=username)
		except User.DoesNotExist:
			user = User.objects.create_user(username, '')
			user.save()
		return user

