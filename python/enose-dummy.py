import sys
from random import randint

string = ""
	
for i in range(8):
	string = string +str(randint(0,500)) + ";"
	
print(string)
sys.stdout.flush()