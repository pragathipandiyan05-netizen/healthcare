import os, re

def bump_font_sizes(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.dart'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Find all fontSize: \d+ and increment by 4
                def replace_fontsize(match):
                    size = int(match.group(1))
                    return f"fontSize: {size + 4}"

                new_content = re.sub(r'fontSize:\s*(\d+)', replace_fontsize, content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Bumped fonts significantly in {filepath}")

bump_font_sizes('lib/screens')
