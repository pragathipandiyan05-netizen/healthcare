from rembg import remove
from PIL import Image
import sys

def remove_background(input_path, output_path):
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        remove_background(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python remove_bg_rembg.py <input> <output>")
