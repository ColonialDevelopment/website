# website
This is a new website for Colonial which contains a members only section of the page.


#ATTN:regarding environment and python modules
You need to use virutalenv to use the virtual environment for this project

1. First you need to use pip to install virtualenv
>	$ pip install virtualenv
2. Next use virtualenv to create your environment folder, where all your installed python modules will live.
>	$ virtualenv env OR ALTERNATIVELY $ virtualenv venv
3. Next you need to go activate your virtualenv
>	$ source env/bin/activate
4. Next you need to install the requirements for the project in your env folder
> 	(env) $ pip install -r requirements.txt
5. If you ever need to install something new, add it to requirements.txt, in the following form:
> module-name >= x.x.x

This way we will all have consistent dependencies and modules and we will also have a consistent environment with what we end up using in deployment.



These are the developers:

PM:
Nicholas Yang

Frontend:
Andrew Ruchames(Lead)
Mel Shu
Jay Lee
Kathy Fan

Backend:
Bryan Zhu
Julie Zhu
