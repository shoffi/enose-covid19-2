from gpiozero import LED

pompa = LED(17)
pompa.off()
print("pompa off")

# catatan .off() buat matikan, .toggle() buat toggle, .blink() buat kedip
