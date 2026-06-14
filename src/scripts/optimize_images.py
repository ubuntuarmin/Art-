from PIL import Image
import os

def optimize_image(input_path, output_path, quality=85):
    """ Optimize an image file using Pillow and save it with reduced quality """
    try:
        img = Image.open(input_path)
        img.save(output_path, optimize=True, quality=quality)
        print(f"Optimized {input_path} to {output_path}")
    except Exception as e:
        print(f"Failed to optimize image {input_path}: {e}")

def process_images():
    """ Process all images in the 'images' folder and save optimized versions there """
    input_folder = './images'
    output_folder = './optimized_images'
    
    # Ensure output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)
        if os.path.isfile(file_path) and (filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png')):
            output_path = os.path.join(output_folder, filename)
            optimize_image(file_path, output_path)

if __name__ == "__main__":
    process_images()