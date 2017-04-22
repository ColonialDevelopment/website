import csv

with open('./coloauth/members.csv', 'rb') as f:
	reader = csv.reader(f, delimiter=',', quotechar='"')
	USER_LIST = [row[1] for row in reader]
