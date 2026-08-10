pubspec = r'D:\Healthcare\frontend\pubspec.yaml'
with open(pubspec, 'r', encoding='utf-8') as f:
    content = f.read()

import re
content = re.sub(r'permission_handler:\s*\^.*', 'permission_handler: ^11.3.1', content)

with open(pubspec, 'w', encoding='utf-8') as f:
    f.write(content)
print("Downgraded permission_handler")
