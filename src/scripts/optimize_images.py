from PIL import Image
import os
import sys

def optimize_image(input_path, output_path, quality=85):
    """Optimize an image file using Pillow and save it as WebP."""
    try:
        with Image.open(input_path) as img:
            if img.mode == 'P':
                img = img.convert('RGBA')

            base_name = os.path.splitext(output_path)[0]
            webp_output_path = base_name + '.webp'

            save_kwargs = {'format': 'WEBP', 'quality': quality}
            img.save(webp_output_path, **save_kwargs)

        print(f"Optimized {input_path} to {webp_output_path}")
        return webp_output_path
    except Exception as e:
        print(f"Failed to optimize image {input_path}: {e}", file=sys.stderr)
        return None

def process_images(input_folder='./images', output_folder='./optimized_images', quality=85):
    """Process all images in input_folder and save optimized WebP versions to output_folder."""
    if not os.path.isdir(input_folder):
        print(f"Input folder not found: {input_folder}", file=sys.stderr)
        return

    os.makedirs(output_folder, exist_ok=True)

    allowed_exts = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)
        if not os.path.isfile(file_path):
            continue

        ext = os.path.splitext(filename)[1].lower()
        if ext not in allowed_exts:
            continue

        print(f"Processing {filename} from: {file_path}")
        output_path = os.path.join(output_folder, filename)
        print(f"Output path will be: {output_path}")

        webp_path = optimize_image(file_path, output_path, quality=quality)
        if webp_path:
            # Optionally remove original file after successful conversion
            # os.remove(file_path)
            pass

if __name__ == "__main__":
    process_images()
