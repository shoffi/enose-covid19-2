import sys
from random import randint

string = ""
	
for i in range(59):
	string = string +str(randint(0,500)) + ";"
	
print(string)
sys.stdout.flush()