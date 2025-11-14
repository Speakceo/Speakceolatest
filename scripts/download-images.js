#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common external images to download and optimize
const imagesToDownload = [
  // Avatar images
  {
    url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
    path: 'public/images/avatars/student-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
    path: 'public/images/avatars/student-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
    path: 'public/images/avatars/student-3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
    path: 'public/images/avatars/student-4.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
    path: 'public/images/avatars/student-5.jpg'
  },
  // Course images
  {
    url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400',
    path: 'public/images/courses/startup-fundamentals.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    path: 'public/images/courses/business-planning.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    path: 'public/images/courses/financial-management.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    path: 'public/images/courses/marketing-sales.jpg'
  },
  // Team images
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    path: 'public/images/team/ceo.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    path: 'public/images/team/cto.jpg'
  },
  // Hero images
  {
    url: 'https://i.postimg.cc/vmXKM1Y9/Chat-GPT-Image-May-19-2025-10-58-12-PM.png',
    path: 'public/images/hero/main-hero.png'
  },
  {
    url: 'https://i.postimg.cc/tR1StD70/Chat-GPT-Image-Jun-19-2025-10-21-56-PM.png',
    path: 'public/images/hero/journey-map.png'
  },
  {
    url: 'https://i.postimg.cc/kM6k6zpT/Chat-GPT-Image-Jun-6-2025-06-28-18-PM.png',
    path: 'public/images/hero/success-story.png'
  },
  {
    url: 'https://i.postimg.cc/6pwSP35P/Chat-GPT-Image-Jun-6-2025-06-18-44-PM.png',
    path: 'public/images/hero/testimonial-bg.png'
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filepath}`);
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('🚀 Starting image download and optimization...\n');
  
  let successful = 0;
  let failed = 0;
  
  for (const image of imagesToDownload) {
    try {
      await downloadImage(image.url, image.path);
      successful++;
    } catch (error) {
      console.error(`❌ Failed to download ${image.path}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n🎉 Download complete!`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n📁 Images saved to public/images/`);
}

// Run the download
downloadAllImages().catch(console.error);
