import csv

with open('./coloauth/members.csv', 'rb') as f:
	reader = csv.reader(f, delimiter=',', quotechar='"')
	header = [item.lower() for item in reader.next()]
	index = header.index('netid')
	USER_LIST = [row[index] for row in reader]
