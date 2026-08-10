import os
import json
import urllib.parse
import urllib.request

# Find telephony in pub cache via package_config.json
package_config_path = os.path.join('.dart_tool', 'package_config.json')
if not os.path.exists(package_config_path):
    print("package_config.json not found. Run flutter pub get first!")
    exit(1)

with open(package_config_path, 'r', encoding='utf-8') as f:
    config = json.load(f)

telephony_package = next((pkg for pkg in config.get('packages', []) if pkg.get('name') == 'telephony'), None)

if telephony_package:
    root_uri = telephony_package['rootUri']
    # Convert file:// URI to local path
    if root_uri.startswith('file://'):
        root_path = urllib.request.url2pathname(root_uri[7:])
    elif root_uri.startswith('file:'):
        root_path = urllib.request.url2pathname(root_uri[5:])
    else:
        # Might be a relative path
        root_path = root_uri
        
    gradle_path = os.path.join(root_path, 'android', 'build.gradle')
    
    if os.path.exists(gradle_path):
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
        print(f"Could not find build.gradle at {gradle_path}")
        exit(1)
else:
    print("Could not find telephony plugin in package_config.json!")
    exit(1)
