const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets');

console.log(`Memulai proses kompresi di folder: ${dir}`);
console.log(`Menggunakan library 'sharp' (local service) untuk hasil kompresi setara layanan online tanpa batas kuota...\n`);

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

    console.log(`Menemukan ${pngFiles.length} file PNG. Sedang memproses...\n`);
    
    pngFiles.forEach(async (file) => {
        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, 'temp_' + file);
        
        try {
            const statsBefore = fs.statSync(filePath);
            
            // Kompresi PNG dengan kualitas lossy mirip dengan TinyPNG (menggunakan kuantisasi palet)
            await sharp(filePath)
                .png({ 
                    quality: 60,
                    compressionLevel: 9,
                    palette: true // Ini adalah kunci untuk kompresi signifikan seperti TinyPNG online
                })
                .toFile(tempPath);
                
            const statsAfter = fs.statSync(tempPath);
            fs.renameSync(tempPath, filePath);
            
            const beforeMB = (statsBefore.size / (1024 * 1024)).toFixed(2);
            const afterMB = (statsAfter.size / (1024 * 1024)).toFixed(2);
            const savings = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
            
            console.log(`✅ [BERHASIL] ${file}`);
            console.log(`   Ukuran: ${beforeMB}MB -> ${afterMB}MB (Berkurang ${savings}%)`);
        } catch (err) {
            console.error(`❌ [GAGAL] ${file}:`, err.message);
            // Hapus file temp jika terjadi error
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    });
});
