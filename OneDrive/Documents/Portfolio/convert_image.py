import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Pillow library not found. Installing it now...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def process_image(input_path, output_path):
    # Ensure assets directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if not os.path.exists(input_path):
        print(f"Error: I could not find '{input_path}'.")
        print("Please save your photo directly in the Portfolio folder and name it 'input.jpg' or 'input.png', then run this again!")
        return

    print("Processing your image...")
    with Image.open(input_path) as img:
        # Strip alpha channel if converting to standard WebP easily
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # The Hero section mask has an aspect ratio of 4:5 (beautiful portrait crop)
        width, height = img.size
        target_ratio = 4.0 / 5.0
        current_ratio = width / height
        
        if current_ratio > target_ratio:
            # Crop width
            new_width = int(height * target_ratio)
            left = (width - new_width) // 2
            right = left + new_width
            img = img.crop((left, 0, right, height))
        else:
            # Crop height (mainly crop from the bottom to keep your face/upper body centered)
            new_height = int(width / target_ratio)
            img = img.crop((0, 0, width, new_height))
            
        # Resize to an optional web-friendly max size to save bandwidth
        img.thumbnail((800, 1000), Image.Resampling.LANCZOS)
            
        # Save as highly optimized WebP
        img.save(output_path, 'WEBP', quality=85)
        print(f"Success! Your image has been beautifully cropped, compressed, and saved to '{output_path}'.")
        print("Refresh your browser to see it LIVE in your portfolio!")

if __name__ == "__main__":
    # Support both jpg and png
    input_file = 'input.jpg'
    if not os.path.exists(input_file) and os.path.exists('input.png'):
        input_file = 'input.png'

    process_image(input_file, 'assets/profile.webp')
