Reservations app coded by Nicholas Yang '18 (nyang@)
Last updated: 4/20/16 23:00

-----

(Probably) Working Stuff:

URLs:
/reservations                   index (no functionality as of now)
/reservations/request           form to request a form
/reservations/confirmation      confirmation form after form submission
/reservations/view/(id)         view specific reservation

Reservation fields:
room            choices: {Elk Room, Del Vento Room, Library, Dining Hall, Taproom, Movie Room}
start_date      DateTimeField
end_date        DateTimeField
description     TextField
approved        choices: {Approved, Denied}
requestor       ForeignKey(User)


Notes: [clarifications of the above]
'approved' field changed to choices to allow for other options - ie. "To Review Again"
'approved' field default of null

-----

To-do:

URLs:
/reservations/yyyy/mm/dd        reservations from a given day

Views:
view: put all details
confirmation: put link to view just-created reservation, and put link to submit another reservation

General Authentication
* Can only access request if authenticated
* If reservation is not approved, only requestor can view

Error Checking
* Valid reservation (end DateTime after start DateTime)
* Cannot reserve over already reserved spot

General
* Improve reservation admin functionality

-----

Thoughts: [notes to self, or cross-teams]
* Entry of the DateTime field is nonintuitive - Django defaults to a TextField with entry of several 
forms such as mm/dd/yy hh:mm - can we ease entry (ie. select from a calendar like in Django admin)?

* Approver interface - separate site, or just be lazy and use admin site? 

* Allow user to edit details of reservation before approval?

* Prefer massively long lines of text in readme or manually break up lines?
