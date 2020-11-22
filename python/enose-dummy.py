import sys
import time
from random import randint

string = ""
	
while 1:
	for i in range(59):
		string = string +str(randint(0,500)) + ";"
	
	print(string)
	sys.stdout.flush()
	time.sleep(0.1)