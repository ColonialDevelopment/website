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

    # name            = models.CharField(max_length = 50)
    # netid           = models.CharField(max_length = 10)
    # pref_name       = models.CharField(max_length = 20, blank=True, verbose_name = 'Preferred Name')
    # officer_pos		= models.CharField(max_length = 30, choices = OFFICER_CHOICES, blank=True, verbose_name = 'Officer Position')
    # birthday	    = models.DateField(blank=True, null=True)
    # class_year	    = models.CharField(max_length = 10)
    # major           = models.CharField(max_length = 50)
    # dorm            = models.CharField(max_length = 30)
    # room_num        = models.CharField(max_length = 10, verbose_name = "Room Number")
    # email           = models.EmailField()
    # hometown        = models.CharField(max_length = 50)
    # bio             = models.TextField(blank=True)

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

@login_required
def index(request):
    title = "Member Page"
    template = 'members/index.html'

    context = {
            'title': title
            }

    return render(request, template, context)

    
# @login_required
# def view(request, netid):
#     try:
#         member = Member.objects.get(netid = netid)
#     except Member.DoesNotExist:
#         raise Http404("Member does not exist.")

