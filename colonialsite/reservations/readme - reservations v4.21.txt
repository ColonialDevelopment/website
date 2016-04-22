Reservations app coded by Nicholas Yang '18 (nyang@)
Last updated: 4/21/16 12:30 pm

Updates:
** pytz has been installed  - time zone support
** added field submit_date
** changed field name "approved" to "approval" and choices updated 
Information on /view/(id) improved
Admin site functionality improved
Monthly and Daily list views created

-----

Newly discovered/introduced issues:

* Admin search by user returns errors - probably bad field to search by
* Day/month views give next _with reservations_ rather than just next.

-----

(Probably) Working Stuff:

URLs:
/reservations           index (no functionality as of now)

/request                form to request a form
/confirmation           confirmation page after form submission
/view/(id)              view specific reservation
/(year)/(month)         view reservations in a given year/month combination
/(year)/(month)/(day)   view reservations in a given year/month/day combination


Reservation fields:
room            choices: {Elk Room, Del Vento Room, Library, Dining Hall, Taproom, Movie Room}
start_date      DateTimeField
end_date        DateTimeField
description     TextField
approval        choices: {Submitted, Approved, Denied}
requestor       ForeignKey(User)
submit_date     DateTimeField


Notes: [clarifications of the above]
'approval' field defaults to 'Submitted' upon submission

-----

To-do:

Views:
confirmation: put link to view just-created reservation
month view: put month at top, make previous month/next month clickable, make reservations clickable
day view: make previous day/next day clickable, make reservations clickable

General Authentication
* Can only access request if authenticated
* If reservation is not approved, only requestor can view (and it shouldn't be seen on month/day views)

Error Checking
* Valid reservation (end DateTime after start DateTime)
* Cannot reserve over already reserved spot

General
* View page "description" field doesn't support paragraphs
* For dates without reservations - make page exist and put some generic text

-----

Thoughts: [notes to self, or cross-teams]
* Entry of the DateTime field is nonintuitive - Django defaults to a TextField with entry of several 
forms such as mm/dd/yy hh:mm - can we ease entry (ie. select from a calendar like in Django admin)?

* Approver interface - separate site, or just be lazy and use admin site? 

* Allow user to edit details of reservation before approval?

* Prefer massively long lines of text in readme or manually break up lines?

* What does .instance do?????
