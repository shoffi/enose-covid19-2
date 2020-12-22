import time
import ADS1256
import sys
import RPi.GPIO as GPIO
import smbus
 
# Get I2C bus
bus = smbus.SMBus(1) 
# SHT31 address, 0x44(68)
bus.write_i2c_block_data(0x44, 0x2C, [0x06]) # b669fbc0
#print(bus)
time.sleep(0.5)
# SHT31 address, 0x44(68)
# Read data back from 0x00(00), 6 bytes
# Temp MSB, Temp LSB, Temp CRC, Humididty MSB, Humidity LSB, Humidity CRC
data = bus.read_i2c_block_data(0x44, 0x00, 6)
# Convert the data
temp = data[0] * 256 + data[1]
#print(temp)
cTemp = -45 + (175 * temp / 65535.0)
fTemp = -49 + (315 * temp / 65535.0)
humidity = 100 * (data[3] * 256 + data[4]) / 65535.0

ADC = ADS1256.ADS1256()
ADC.ADS1256_init()


def sensortgs():
    sendData = ""
    temp_sht = 0
    humi_sht = 0
    ADC_Value = ADC.ADS1256_GetAll()
    sendData += str(int(ADC_Value[0]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[1]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[2]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[3]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[4]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[5]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[6]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[7]*1023/0x7fffff))
    sendData += ";"
    sendData += str("0")
    sendData += ";"
    sendData += str(cTemp) #10
    sendData += ";"
    sendData += str(humidity) #11
    sendData += ";"
    sendData += str("null")#12
    sendData += ";"
    sendData += str("null")#13
    sendData += ";"
    sendData += str("null")#14
    sendData += ";"
    sendData += str("null")#15
    sendData += ";"
    sendData += str("null")#16
    sendData += ";"
    sendData += str("null")#17
    sendData += ";"  
    sendData += str("null")#18
    sendData += ";"
    sendData += str("null")#19
    sendData += ";"
    sendData += str("null")#20
    sendData += ";"
    sendData += str("null")#21
    sendData += ";"
    sendData += str("null")#22
    sendData += ";"
    sendData += str("null")#23
    sendData += ";"
    sendData += str("null")#24
    sendData += ";"
    sendData += str("null")#25
    sendData += ";"
    sendData += str("null")#26
    sendData += ";"
    sendData += str("null")#27
    sendData += ";"
    sendData += str("null")#28
    sendData += ";"
    sendData += str("null")#29
    sendData += ";"
    sendData += str("null")#30
    sendData += ";"
    sendData += str("null")#31
    sendData += ";"
    sendData += str("null")#32
    sendData += ";"
    sendData += str("null")#33
    sendData += ";"
    sendData += str("null")#34
    sendData += ";"
    sendData += str("null")#35
    sendData += ";"
    sendData += str("null")#36
    sendData += ";"
    sendData += str("null")#37
    sendData += ";"
    sendData += str("null")#38
    sendData += ";"
    sendData += str("null")#39
    sendData += ";"
    sendData += str("null")#40
    sendData += ";"
    sendData += str("null")#41
    sendData += ";"
    sendData += str("null")#42
    sendData += ";"
    sendData += str("null")#43
    sendData += ";"
    sendData += str("null")#44
    sendData += ";"
    sendData += str("null")#45
    sendData += ";"
    sendData += str("null")#46
    sendData += ";"
    sendData += str("null")#47
    sendData += ";"
    sendData += str("null")#48
    sendData += ";"
    sendData += str("null")#49
    sendData += ";"
    sendData += str("null")#50
    sendData += ";"
    sendData += str("null")#51
    sendData += ";"
    sendData += str("null")#52
    sendData += ";"
    sendData += str("null")#53
    sendData += ";"
    sendData += str("null")#54
    sendData += ";"
    sendData += str("null")#55
    sendData += ";"
    sendData += str("null")#56
    sendData += ";"
    sendData += str("null")#57
    sendData += ";"
    sendData += str("null")#58
    sendData += ";"    
    sendData += str("null")#59
    sendData += ";"
    print(sendData)
    sys.stdout.flush()
    
    

while True:
    sensortgs()
    time.sleep(1)
