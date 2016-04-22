Reservations app coded by Nicholas Yang '18 (nyang@)
Last updated: 4/22/16 9:00 am

Updates:

** /confirmation changed to /confirmation/(id) [see top-level notes]
User authentication prepped - full access control requires working /login page
Confirmation page contains link to newly created reservation
Request form checks that end DateTime is after start DateTime
Month/Day views now contain clickable links
Index updated to have links to this month and today

-----

Archived updates:

** pytz has been installed  - time zone support
** added field submit_date
** changed field name "approved" to "approval" and choices updated 
Information on /view/(id) improved
Admin site functionality improved
Monthly and Daily list views created

-----

Known issues:

* Admin search by user returns errors - probably bad field to search by; currently suppressed in code

-----

Notes:

* I created the /confirmation/(id) pages in order to pass the newly created reservation to
the page. This workaround seems inelegant but I was unable to find a way to pass the reservation
through HttpResponseRedirect.

-----

(Probably) Working Stuff:

URLs:
/reservations           index

/request                form to request a form
/confirmation/(id)      confirmation page after form submission
/view/(id)              view specific reservation
/(year)/(month)         view reservations in a given year/month combination
/(year)/(month)/(day)   view reservations in a given year/month/day combination


Reservation fields:
room            choices: {Elk Room, Del Vento Room, Library, Dining Hall, Taproom, Movie Room}
start_date      DateTimeField
end_date        DateTimeField
description     TextField
approval        choices: {Submitted, Approved, Denied} [defaults to 'Submitted' upon submission]
requestor       ForeignKey(User)
submit_date     DateTimeField

-----

To-do:

General
* View page "description" field doesn't support paragraphs
* For dates without reservations - put some generic text?

-----

Thoughts: [notes to self, or cross-teams]
* Entry of the DateTime field is nonintuitive - Django defaults to a TextField with entry of several 
forms such as mm/dd/yy hh:mm - can we ease entry (ie. select from a calendar like in Django admin)?

* Approver interface - separate site, or just be lazy and use admin site? 

* Allow user to edit details of reservation before approval?

* Prefer massively long lines of text in readme or manually break up lines?

* What does .instance do?????
