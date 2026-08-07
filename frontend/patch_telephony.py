import re

telephony_file = r'C:\Users\ELCOT\AppData\Local\Pub\Cache\hosted\pub.dev\telephony-0.2.0\android\build.gradle'
with open(telephony_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if kotlinOptions is already there
if 'kotlinOptions' not in content:
    # Add kotlinOptions { jvmTarget = '11' } inside android block
    # Actually, it's safer to add it at the end of the file
    content += "\n\nkotlinOptions {\n    jvmTarget = '11'\n}\n"
else:
    # It might have jvmTarget = '1.8'
    content = re.sub(r"jvmTarget\s*=\s*['\"]1\.8['\"]", "jvmTarget = '11'", content)

# Also fix the Java version to 11 to match
if 'compileOptions' not in content:
    content = re.sub(r'android\s*\{', "android {\n    compileOptions {\n        sourceCompatibility JavaVersion.VERSION_11\n        targetCompatibility JavaVersion.VERSION_11\n    }\n", content)
else:
    content = re.sub(r'VERSION_1_8', 'VERSION_11', content)

with open(telephony_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched telephony build.gradle for JVM target compatibility")
