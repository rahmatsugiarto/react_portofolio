import os
from PIL import Image

sequence_dir = '/Volumes/MacStorage/Rahmat_folder/rahmat/project/web/rahmatsugiarto/public/sequence'
output_dir = '/Volumes/MacStorage/Rahmat_folder/rahmat/project/web/rahmatsugiarto/public/sequence_compressed'
os.makedirs(output_dir, exist_ok=True)

start_frame = 1
end_frame = 240

for i in range(start_frame, end_frame + 1):
    filename = f'frame_{i:04d}.png'
    input_path = os.path.join(sequence_dir, filename)
    
    if os.path.exists(input_path):
        img = Image.open(input_path)
        # Resize if width > 1920 (optional, but good for performance)
        target_width = 1920
        if img.width > target_width:
            ratio = target_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as optimized JPEG
        output_filename = f'frame_{i:04d}.jpg'
        output_path = os.path.join(output_dir, output_filename)
        img.convert('RGB').save(output_path, 'JPEG', quality=75, optimize=True)
        print(f"Compressed {filename} to {output_filename}")
