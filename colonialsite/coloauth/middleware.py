# http://stackoverflow.com/questions/3214589/django-how-can-i-apply-the-login-required-decorator-to-my-entire-site-excludin
# http://stackoverflow.com/questions/2254311/what-is-the-opposite-of-login-required-decorator-for-django-views?rq=1

from django.http import HttpResponseRedirect
from django.conf import settings
from re import compile
from django.contrib.auth import REDIRECT_FIELD_NAME

EXEMPT_URLS = [compile(settings.LOGIN_URL.lstrip('/'))]
if hasattr(settings, 'LOGIN_EXEMPT_URLS'):
    EXEMPT_URLS += [compile(expr) for expr in settings.LOGIN_EXEMPT_URLS]

def staff_login(function):
    """Decorator for views that should redirect to staff login."""
    function.is_staff_view = True
    return function

def is_staff_login(function):
    try:                                    # cache is found
        return function.is_staff_view
    except AttributeError:                  # cache is not found
        return False

def redirect_to_login(login_url, target):
        return HttpResponseRedirect('%s?%s=%s' %(login_url, REDIRECT_FIELD_NAME,\
                                                target))


class LoginRequiredMiddleware(object):

    def process_response(self, request, response):
        """Force 404 responses to authenticate"""
        if response.status_code == 404:
            if request.user and request.user.is_authenticated():
                return response
            return redirect_to_login(settings.LOGIN_URL, request.get_full_path())
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        """Force all views to authenticate"""
        if request.user.is_authenticated():
            return None

        path = request.path_info.lstrip('/')
        if any(m.match(path) for m in EXEMPT_URLS):
            return None

        if not is_staff_login(view_func):
            return redirect_to_login(settings.LOGIN_URL, request.get_full_path())

        return redirect_to_login(settings.STAFF_LOGIN_URL, request.get_full_path())
