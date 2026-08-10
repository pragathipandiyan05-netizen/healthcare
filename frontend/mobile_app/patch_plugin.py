import os
import glob

# Find telephony in pub cache
pub_cache = os.path.expanduser('~/.pub-cache/hosted/pub.dev/')
telephony_paths = glob.glob(os.path.join(pub_cache, 'telephony-*/android/build.gradle'))

if telephony_paths:
    gradle_path = telephony_paths[0]
    with open(gradle_path, 'r') as f:
        content = f.read()
    
    # Fix namespace
    if 'namespace' not in content:
        content = content.replace('android {', 'android {\n    namespace "com.shounakmulay.telephony"')
    
    # Fix jvmTarget and Java versions
    if 'kotlinOptions' not in content:
        content += "\nkotlinOptions {\n    jvmTarget = '11'\n}\n"
    else:
        content = content.replace("jvmTarget = '1.8'", "jvmTarget = '11'")
        content = content.replace('jvmTarget = "1.8"', "jvmTarget = '11'")
        
    with open(gradle_path, 'w') as f:
        f.write(content)
    print("Successfully patched telephony build.gradle")
else:
    print("Could not find telephony plugin in pub cache!")
