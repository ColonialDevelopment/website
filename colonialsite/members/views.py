from django.http import HttpResponse
from django.shortcuts import render

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from members.serializers import MemberSerializer
from .models import Member, MemberForm
from django.http import HttpResponse, HttpResponseRedirect, Http404

class MemberListAll(LoginRequiredMixin, generics.ListAPIView):
	queryset = Member.objects.all()
	serializer_class = MemberSerializer

class MemberDetail(LoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Member.objects.all()
    lookup_field = 'netid'
    serializer_class = MemberSerializer

# View method to use MemberForm. Temporary way to modify user data.
# Will eventually get phased out and replaced by POST methods.
@login_required
def edit(request):
    member = Member.objects.get(netid=request.user)
    if request.method == 'POST':
        form = MemberForm(request.POST, instance = member, initial={
            "name": member.name,
            "netid": member.netid,
            "pref_name": member.pref_name,
            "officer_pos": member.officer_pos,
            "birthday": member.birthday,
            "class_year": member.class_year,
            "major": member.major,
            "dorm": member.dorm,
            "room_num": member.room_num,
            "email": member.email,
            "hometown": member.hometown,
            "bio": member.bio})
        if form.is_valid():
            edited_member = form
            edited_member.save()
            # later, make a view for this? idk
            return HttpResponseRedirect('/members/api/detail/' + member.netid)
    else:
        form = MemberForm(instance = member, initial={
            "name": member.name,
            "netid": member.netid,
            "pref_name": member.pref_name,
            "officer_pos": member.officer_pos,
            "birthday": member.birthday,
            "class_year": member.class_year,
            "major": member.major,
            "dorm": member.dorm,
            "room_num": member.room_num,
            "email": member.email,
            "hometown": member.hometown,
            "bio": member.bio})
        return render(request, "members/edit.html", {'form': form})

# Will display page with currently logged in member information.
# To be populated by frontend/react bundle?
@login_required
def index(request):
    title = "Member Page"
    template = 'members/index.html'

    context = {
            'title': title
            }

    return render(request, template, context)
