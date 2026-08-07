import re

telephony_file = r'C:\Users\ELCOT\AppData\Local\Pub\Cache\hosted\pub.dev\telephony-0.2.0\android\build.gradle'
with open(telephony_file, 'r', encoding='utf-8') as f:
    content = f.read()

if 'jvmTarget' not in content:
    content += "\nandroid { kotlinOptions { jvmTarget = '11' } }\n"
    with open(telephony_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed telephony jvmTarget")
