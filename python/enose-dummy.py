import sys
import time
from random import randint
	
while 1:
	string = ""

	for i in range(2):
		string = string +str(randint(0,500)) + ";"
	
	print(string)
	sys.stdout.flush()
	time.sleep(1)
	# time.sleep(0.1)