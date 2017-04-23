from django.core.management.base import BaseCommand
from members.models import Member
from django.conf import settings

from datetime import datetime
import hashlib, random
from base64 import b64encode
import requests

# if this stops working due to 401, check https://time.is

# todo: add options to only update for certain class years, existing members, etc
class Command(BaseCommand):
	def handle(self, *args, **options):

		username = settings.TIGERBOOK_LOGIN
		password = settings.TIGERBOOK_PW

		all_members = Member.objects.all()

		for member in all_members:
			netid = member.netid

			url = 'https://tigerbook.herokuapp.com/api/v1/undergraduates/' + netid
			created = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
			nonce = ''.join([random.choice('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=') for i in range(32)])

			generated_digest = b64encode(hashlib.sha256(nonce + created + password).digest())
			headers = {
			'Authorization': 'WSSE profile="UsernameToken"',
			'X-WSSE': 'UsernameToken Username="%s", PasswordDigest="%s", Nonce="%s", Created="%s"' % (username, generated_digest, nonce, created)
			}
			r = requests.get(url, headers=headers).json()

			member.class_year 	= r['class_year']
			member.major 		= r['major_type'] + ' ' + r['major_raw']
			member.dorm 		= r['dorm_building']
			member.room_num 	= r['dorm_number']
			member.email 		= r['email']
			member.hometown		= r['hometown']

			member.save()

		self.stdout.write('Member information updated.')
