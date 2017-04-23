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
			# user will have an "unusable" password
			if settings.CAS_AUTO_CREATE_USER:
				user = User.objects.create_user(username, '')
				user.save()

				makemember(username)

			else:
				user = None
		return user


def makemember(username):
	url = 'https://tigerbook.herokuapp.com/api/v1/undergraduates/' + username
	created = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
	nonce = ''.join([random.choice('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=') for i in range(32)])
	username = settings.TIGERBOOK_LOGIN
	password = settings.TIGERBOOK_PW
	generated_digest = b64encode(hashlib.sha256(nonce + created + password).digest())
	headers = {
	'Authorization': 'WSSE profile="UsernameToken"',
	'X-WSSE': 'UsernameToken Username="%s", PasswordDigest="%s", Nonce="%s", Created="%s"' % (username, generated_digest, nonce, created)
	}
	r = requests.get(url, headers=headers).json()
	print(headers)

	newmember = Member.objects.create(
		name 		= r['full_name'],
		netid 		= r['net_id'],
		class_year 	= r['class_year'],
		major 		= r['major_type'] + ' ' + r['major_raw'],
		dorm 		= r['dorm_building'],
		room_num 	= r['dorm_number'],
		email 		= r['email'],
		hometown	= r['hometown'],
		)
	newmember.save()
