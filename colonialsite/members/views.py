from django.http import HttpResponse

from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics
from members.serializers import MemberSerializer
from .models import Member

class MemberListAll(LoginRequiredMixin, generics.ListAPIView):
	queryset = Member.objects.all()
	serializer_class = MemberSerializer

class MemberDetail(LoginRequiredMixin, generics.RetrieveAPIView):
	queryset = Member.objects.all()
	lookup_field = 'netid'
	serializer_class = MemberSerializer
