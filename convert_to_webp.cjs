const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets');

console.log(`Memulai proses konversi ke WebP di folder: ${dir}\n`);

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Gagal membaca folder assets", err);
        return;
    }
    
    const pngFiles = files.filter(file => file.endsWith('.png'));
    if (pngFiles.length === 0) {
        console.log("Tidak ada file .png yang ditemukan.");
        return;
    }

    console.log(`Menemukan ${pngFiles.length} file PNG. Sedang mengonversi...\n`);
    
    pngFiles.forEach(async (file) => {
        const filePath = path.join(dir, file);
        const webpPath = path.join(dir, file.replace('.png', '.webp'));
        
        try {
            const statsBefore = fs.statSync(filePath);
            
            // Konversi ke WebP dengan kompresi sangat tinggi (lossy yang menjaga kualitas)
            await sharp(filePath)
                .webp({ 
                    quality: 70, // Cukup untuk web/game
                    effort: 6    // Maximum compression effort (lebih lambat tapi size terkecil)
                })
                .toFile(webpPath);
                
            const statsAfter = fs.statSync(webpPath);
            
            // Hapus file PNG lama setelah berhasil konversi
            fs.unlinkSync(filePath);
            
            const beforeMB = (statsBefore.size / (1024 * 1024)).toFixed(2);
            const afterMB = (statsAfter.size / (1024 * 1024)).toFixed(2);
            const savings = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
            
            console.log(`✅ [BERHASIL] ${file} -> ${path.basename(webpPath)}`);
            console.log(`   Ukuran: ${beforeMB}MB -> ${afterMB}MB (Berkurang ${savings}%)`);
        } catch (err) {
            console.error(`❌ [GAGAL] ${file}:`, err.message);
        }
    });
});
