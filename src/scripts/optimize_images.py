from PIL import Image
import os

def optimize_image(input_path, output_path, quality=85):
    """ Optimize an image file using Pillow and save it as WebP """
    try:
        img = Image.open(input_path)
        # Change extension to .webp
        base_name = os.path.splitext(output_path)[0]
        webp_output_path = base_name + '.webp'
        # Save as WebP
        img.save(webp_output_path, 'WEBP', optimize=True, quality=quality)
        print(f"Optimized {input_path} to {webp_output_path}")
        return webp_output_path
    except Exception as e:
        print(f"Failed to optimize image {input_path}: {e}")
        return None

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
            webp_path = optimize_image(file_path, output_path)
            # If optimization successful, we could optionally remove original here
            # but we'll handle that after moving

if __name__ == "__main__":
    process_images()