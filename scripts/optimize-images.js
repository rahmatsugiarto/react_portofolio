import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const SEQUENCE_DIR = path.resolve('public/sequence');
const PROJECTS_DIR = path.resolve('public/projects');
const OG_IMAGE_PATH = path.resolve('public/og-image.png');

async function optimizeSequence() {
    console.log('Optimizing sequence frames...');
    try {
        const files = await fs.readdir(SEQUENCE_DIR);
        const jpgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));
        
        console.log(`Found ${jpgFiles.length} JPG frames in ${SEQUENCE_DIR}. Converting to WebP...`);
        
        let count = 0;
        for (const file of jpgFiles) {
            const inputPath = path.join(SEQUENCE_DIR, file);
            const baseName = path.basename(file, path.extname(file));
            const outputPath = path.join(SEQUENCE_DIR, `${baseName}.webp`);
            
            // Convert to webp with quality 75 (optimal quality/size trade-off for canvas sequences)
            await sharp(inputPath)
                .webp({ quality: 75 })
                .toFile(outputPath);
            
            // Delete original jpg
            await fs.unlink(inputPath);
            count++;
            
            if (count % 20 === 0) {
                console.log(`Processed ${count}/${jpgFiles.length} frames...`);
            }
        }
        console.log('Sequence frames optimized successfully!');
    } catch (err) {
        console.error('Error optimizing sequence frames:', err);
    }
}

async function optimizeProjects() {
    console.log('Optimizing project images...');
    try {
        const files = await fs.readdir(PROJECTS_DIR);
        const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'));
        
        console.log(`Found ${pngFiles.length} images in ${PROJECTS_DIR}. Converting to WebP...`);
        
        for (const file of pngFiles) {
            const inputPath = path.join(PROJECTS_DIR, file);
            const baseName = path.basename(file, path.extname(file));
            const outputPath = path.join(PROJECTS_DIR, `${baseName}.webp`);
            
            // Convert to webp with quality 80
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            // Delete original image
            await fs.unlink(inputPath);
            console.log(`Converted: ${file} -> ${baseName}.webp`);
        }
        console.log('Project images optimized successfully!');
    } catch (err) {
        console.error('Error optimizing project images:', err);
    }
}

async function optimizeOgImage() {
    console.log('Optimizing OG image...');
    try {
        const tempPath = `${OG_IMAGE_PATH}.temp`;
        
        // Compress the PNG image directly to maintain extension compatibility for social platform crawlers
        await sharp(OG_IMAGE_PATH)
            .png({ compressionLevel: 9, quality: 85 })
            .toFile(tempPath);
        
        // Replace original with compressed version
        await fs.unlink(OG_IMAGE_PATH);
        await fs.rename(tempPath, OG_IMAGE_PATH);
        
        console.log('OG image compressed successfully!');
    } catch (err) {
        console.error('Error optimizing OG image:', err);
    }
}

async function main() {
    console.time('Optimization Completed In');
    await optimizeSequence();
    await optimizeProjects();
    await optimizeOgImage();
    console.timeEnd('Optimization Completed In');
}

main();
