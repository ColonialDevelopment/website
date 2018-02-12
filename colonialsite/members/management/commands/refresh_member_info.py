from django.core.management.base import BaseCommand
from members.models import Member
from django.conf import settings
from coloauth.usernames import USER_LIST
from django.contrib.auth.models import User

from datetime import datetime
import hashlib, random
from base64 import b64encode
import requests

# if this stops working due to 401, check https://time.is

# todo: add options to only update for certain class years, existing members, etc
# Command to import member data from TigerBook API
class Command(BaseCommand):
    def handle(self, *args, **options):

        username = settings.TIGERBOOK_LOGIN
        password = settings.TIGERBOOK_PW

        all_members = Member.objects.all()

        # pass 1: remove no-longer-existing members
        for member in all_members:
            netid = member.netid
            if netid not in USER_LIST:
                # delete the member and user objects
                member.delete()
                user_obj = User.objects.get(username=netid)
                user_obj.delete()

        # pass 2: add Member objects for new members
        for netid in USER_LIST:
            try: 
                member = Member.objects.get(netid=netid)
                # continue

            except Member.DoesNotExist:
                # perform tigerbook request

                url = 'https://tigerbook.herokuapp.com/api/v1/undergraduates/{}'.format(netid)
                created = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
                nonce = ''.join([random.choice('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/') for i in range(32)])

                generated_digest = b64encode(hashlib.sha256(nonce + created + password).digest())
                headers = {
                'Authorization': 'WSSE profile="UsernameToken"',
                'X-WSSE': 'UsernameToken Username="%s", PasswordDigest="%s", Nonce="%s", Created="%s"' % (username, generated_digest, nonce, created)
                }
                r = requests.get(url, headers=headers).json()

                newmember = Member.objects.create(
                    name        = r['full_name'],
                    netid       = r['net_id'],
                    class_year  = r['class_year'],
                    major       = r['major_type'] + ' ' + r['major_raw'],
                    dorm        = r['dorm_building'],
                    room_num    = r['dorm_number'],
                    email       = r['email'],
                    hometown    = r['hometown'],
                )
    
        self.stdout.write('Member information updated.')
