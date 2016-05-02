Events app coded by Cathy Chen '18 (cc27@) and Nicholas Yang '18 (nyang@)
Last updated: 5/2/16 4:00 pm


(Probably) Working Stuff:
URLs:
/events			index (calendar view, event RSVPs)

/create			event creation form
/view/(id)		view specific reservation and RSVP/cancel

/view/(id)/rsvp		RSVPs to given event (link redirects to /view/(id))
/view/(id)/cancel	cancels from given event (link redirects to /view/(id))



Event Fields:

title		CharField
start_date	DateTimeField
end_date	DateTimeField
description	TextField
location	CharField
status		choices: {Closed, Open, Hidden (default)}
members		ManyToManyField


-----

Notes:

Index calendar is located at colonial.club.calendar@gmail.com; PW is same as 'general' user (see #general)
