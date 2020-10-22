import sys
import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008

# Software SPI configuration:
CLK  = 11
MISO = 9
MOSI = 10
CS   = 8
mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

while True:
	# Read all the ADC channel values in a list.
	values = [0]*8
	string = ""
		
	for i in range(8):
		# The read_adc function will get the value of the specified channel (0-7).
		values[i] = mcp.read_adc(i)
		string = string +str(values[i]) + ";"
		
	print(string)

	# Pause for half a second.
	# time.sleep(5)
	# print("hohohohohohohohohoohho")
	sys.stdout.flush()
