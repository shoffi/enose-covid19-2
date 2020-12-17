import time
import ADS1256
import RPi.GPIO as GPIO

ADC = ADS1256.ADS1256()
ADC.ADS1256_init()
sendData = ""

temp_sht = 0
humi_sht = 0

while True:
    ADC_Value = ADC.ADS1256_GetAll()
    sendData += str(ADC_Value[0]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[1]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[2]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[3]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[4]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[5]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[6]*1023/0x7fffff)
    sendData += ";"
    sendData += str(ADC_Value[7]*1023/0x7fffff)
    sendData += ";"
    sendData += str("0")
    sendData += ";"
    sendData += str(temp_sht) #10
    sendData += ";"
    sendData += str(humi_sht) #11
    sendData += ";"
    sendData += str("0")#12
    sendData += ";"
    sendData += str("0")#13
    sendData += ";"
    sendData += str("0")#14
    sendData += ";"
    sendData += str("0")#15
    sendData += ";"
    sendData += str("0")#16
    sendData += ";"
    sendData += str("0")#17
    sendData += ";"  
    sendData += str("0")#18
    sendData += ";"
    sendData += str("0")#19
    sendData += ";"
    sendData += str("0")#20
    sendData += ";"
    sendData += str("0")#21
    sendData += ";"
    sendData += str("0")#22
    sendData += ";"
    sendData += str("0")#23
    sendData += ";"
    sendData += str("0")#24
    sendData += ";"
    sendData += str("0")#25
    sendData += ";"
    sendData += str("0")#26
    sendData += ";"
    sendData += str("0")#27
    sendData += ";"
    sendData += str("0")#28
    sendData += ";"
    sendData += str("0")#29
    sendData += ";"
    sendData += str("0")#30
    sendData += ";"
    sendData += str("0")#31
    sendData += ";"
    sendData += str("0")#32
    sendData += ";"
    sendData += str("0")#33
    sendData += ";"
    sendData += str("0")#34
    sendData += ";"
    sendData += str("0")#35
    sendData += ";"
    sendData += str("0")#36
    sendData += ";"
    sendData += str("0")#37
    sendData += ";"
    sendData += str("0")#38
    sendData += ";"
    sendData += str("0")#39
    sendData += ";"
    sendData += str("0")#40
    sendData += ";"
    sendData += str("0")#41
    sendData += ";"
    sendData += str("0")#42
    sendData += ";"
    sendData += str("0")#43
    sendData += ";"
    sendData += str("0")#44
    sendData += ";"
    sendData += str("0")#45
    sendData += ";"
    sendData += str("0")#46
    sendData += ";"
    sendData += str("0")#47
    sendData += ";"
    sendData += str("0")#48
    sendData += ";"
    sendData += str("0")#49
    sendData += ";"
    sendData += str("0")#50
    sendData += ";"
    sendData += str("0")#51
    sendData += ";"
    sendData += str("0")#52
    sendData += ";"
    sendData += str("0")#53
    sendData += ";"
    sendData += str("0")#54
    sendData += ";"
    sendData += str("0")#55
    sendData += ";"
    sendData += str("0")#56
    sendData += ";"
    sendData += str("0")#57
    sendData += ";"
    sendData += str("0")#58
    sendData += ";"    
    sendData += str("0")#59
    sendData += ";"




    print(sendData)
    time.sleep(1)