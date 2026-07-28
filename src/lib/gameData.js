export const gameData = [
  {
    stage: 1,
    title: "Tahap 1. Apa tindakan pertama anda?",
    narrative: "Anda sedang berjalan-jalan di sebuah mall yang sangat ramai pada akhir pekan. Tiba-tiba, jarak dua meter di depan Anda, seorang pria paruh baya terlihat memegang dadanya, meringis kesakitan, dan ambruk ke lantai. Ia tergeletak diam tak bergerak.\n\nOrang-orang di sekelilingnya terkejut dan langkah mereka terhenti. Namun, tidak ada satu pun yang maju untuk menolong. Beberapa orang hanya saling berbisik, sementara yang lain justru mengeluarkan smartphone untuk merekam kejadian tersebut. Bystander Effect sedang terjadi, dan korban sangat membutuhkan bantuan detik ini juga.\n\n*Bystander Effect adalah fenomena psikologis dimana seseorang cenderung diam atau tidak menolong orang yang sedang dalam kesulitan karena ada banyak orang lain di sekitar tempat kejadian.",
    options: [
      {
        text: "Segera mendekati korban untuk menilai kesadarannya.",
        points: -25,
        explanation: "Ini adalah langkah yang kurang tepat, karena mengabaikan prinsip 3A (Aman diri, Aman korban, Aman lingkungan).\nTindakan yang tepat untuk langkah pertama sesuai algoritma bantuan hidup dasar adalah adalah D (Danger/Bahaya), yaitu dengan memastikan prinsip 3A (Aman Diri, Aman Korban, Aman Lingkungan) sudah terpenuhi, sebelum menyentuh korban. Hal ini harus selalu dikedepankan agar penolong tidak ikut menjadi korban."
      },
      {
        text: "Memastikan area aman, kemudian mendekati korban",
        points: 0,
        explanation: "Langkah ini 100% tepat. Dalam algoritma bantuan hidup dasar, D (Danger/Bahaya) merupakan langkah pertama, yaitu dengan memastikan prinsip 3A (Aman Diri, Aman Korban, Aman Lingkungan) sudah terpenuhi, sebelum menyentuh korban. Hal ini harus selalu dikedepankan agar penolong tidak ikut menjadi korban."
      },
      {
        text: "Segera mencari petugas keamanan atau meja informasi",
        points: -40,
        explanation: "Secara naluri terdengar masuk akal, namun secara medis, tindakan ini tidak tepat karena membuang waktu untuk menyelamatkan korban.\nTindakan yang tepat untuk langkah pertama sesuai algoritma bantuan hidup dasar adalah adalah D (Danger/Bahaya), yaitu dengan memastikan prinsip 3A (Aman Diri, Aman Korban, Aman Lingkungan) sudah terpenuhi, sebelum menyentuh korban. Hal ini harus selalu dikedepankan agar penolong tidak ikut menjadi korban."
      }
    ]
  },
  {
    stage: 2,
    title: "Tahap 2. Anda sudah memastikan semua aman, apa tindakan anda selanjutnya?",
    narrative: "",
    options: [
      {
        text: "Memanggil korban dengan suara keras, sambil menepuk kedua pundak korban.",
        points: 0,
        explanation: "Langkah ini 100% tepat. Dalam algoritma bantuan hidup dasar, langkah kedua adalah menilai R (Response/Respon) dengan menepuk bahu dan memanggil dengan suara lantang untuk menilai kesadaran korban secara cepat."
      },
      {
        text: "Memanggil korban, sambil mengguncang tubuh korban.",
        points: -25,
        explanation: "Langkah ini kurang tepat karena mengguncang tubuh korban dapat menyebabkan gerakan yang tidak perlu dan berpotensi cedera.\nTindakan yang tepat untuk langkah kedua sesuai algoritma bantuan hidup dasar adalah menilai R (Response/Respon) dengan menepuk kedua bahu korban dan memanggil dengan suara lantang untuk menilai kesadaran korban secara cepat."
      },
      {
        text: "Memanggil korban, sambil memberikan minyak angin di hidung korban.",
        points: -40,
        explanation: "Langkah ini tidak tepat karena pemberian minyak angin dapat membuang waktu emas untuk menyelamatkan korban.\nTindakan yang tepat untuk langkah kedua sesuai algoritma bantuan hidup dasar adalah menilai R (Response/Respon) dengan menepuk kedua bahu korban dan memanggil dengan suara lantang untuk menilai kesadaran korban secara cepat."
      }
    ]
  },
  {
    stage: 3,
    title: "Tahap 3. Korban tidak merespon, apa tindakan anda?",
    narrative: "",
    options: [
      {
        text: "Melihat apakah dada korban naik turun secara teratur dan korban bernapas normal.",
        points: 0,
        explanation: "Langkah ini 100% tepat. Dalam algoritma bantuan hidup dasar untuk penolong awam, langkah ini termasuk dalam menilai R (Response/Respon) korban, apakah korban bernafas normal, tidak bernapas, atau hanya megap-megap (gasping)."
      },
      {
        text: "Menghitung napas korban dan meraba nadi pergelangan tangan korban selama  1 menit.",
        points: -25,
        explanation: "Langkah ini kurang tepat, karena menghitung nafas dan nadi korban dapat membuang waktu untuk menyelamatkan korban.\nTindakan yang tepat sesuai bantuan hidup dasar untuk penolong awam adalah menilai napas korban. Langkah ini termasuk dalam menilai R (Response/Respon) korban, apakah korban bernafas normal, tidak bernapas, atau hanya megap-megap (gasping)."
      },
      {
        text: "Memantau napas korban dan memposisikan korban, karena napas korban megap-megap.",
        points: -40,
        explanation: "Langkah ini kurang tepat, karena suara napas megap-megap  menunjukkan napas yang tidak normal.\nTindakan yang tepat sesuai bantuan hidup dasar untuk penolong awam adalah menilai napas korban. Langkah ini termasuk dalam menilai R (Response/Respon) korban, apakah korban bernafas normal, tidak bernapas, atau hanya megap-megap (gasping)."
      }
    ]
  },
  {
    stage: 4,
    title: "Tahap 4. Korban tidak sadar dan tidak bernapas (nafas megap-megap). Apa tindakan anda selanjutnya?",
    narrative: "",
    options: [
      {
        text: "Berada di samping korban, memeriksa napas korban, dan  menunggu bantuan medis datang.",
        points: -40,
        explanation: "Langkah ini tidak tepat karena menunggu bantuan medis datang dapat membuang waktu emas untuk menyelamatkan korban. Langkah menunggu juga merupakan bagian dari Bystander Effect.\nTindakan yang tepat untuk langkah ketiga sesuai algoritma bantuan hidup dasar adalah S (Shout for Help/Panggil Bantuan), dengan menunjuk satu orang secara spesifik: “Mas yang pakai jaket merah! Tolong telpon ambulans! dan Mbak yang memakai baju biru! Tolong ambilkan alat kejut jantung di pusat informasi!”\nTindakan menunjuk secara spesifik juga merupakan implementasi psikologi sosial untuk memecahkan Bystander Effect, karena dapat menjadikan tanggung jawab lebih jelas dan personal, sehingga kemungkinan orang tersebut bertindak lebih besar. \n*Bystander Effect: fenomena psikologis dimana seseorang cenderung diam atau tidak menolong orang yang sedang dalam kesulitan karena ada banyak orang lain di sekitar tempat kejadian."
      },
      {
        text: "Menunjuk satu orang secara spesifik: “Mas yang pakai jaket merah! Tolong telpon ambulans! dan Mbak yang memakai baju biru! Tolong ambilkan Alat kejut jantung di pusat informasi!”",
        points: 0,
        explanation: "Langkah ini 100% tepat. Dalam algoritma bantuan hidup dasar, langkah ketiga adalah menilai S (Shout for Help/Panggil Bantuan), dengan menunjuk satu orang secara spesifik: “Mas yang pakai jaket merah! Tolong telpon ambulans! dan Mbak yang memakai baju biru! Tolong ambilkan alat kejut jantung di pusat informasi!”\nTindakan menunjuk secara spesifik juga merupakan implementasi psikologi sosial untuk memecahkan Bystander Effect, karena dapat menjadikan tanggung jawab lebih jelas dan personal, sehingga kemungkinan orang tersebut bertindak lebih besar. \n*Bystander Effect: fenomena psikologis dimana seseorang cenderung diam atau tidak menolong orang yang sedang dalam kesulitan karena ada banyak orang lain di sekitar tempat kejadian."
      },
      {
        text: "Berteriak, “Tolong! Tolong! Ada yang pingsan!” lalu mulai menekan dada korban.",
        points: -25,
        explanation: "Langkah ini kurang tepat karena berteriak meminta tolong secara umum tidak akan menggerakkan siapa pun di kerumunan karena setiap orang berasumsi ada orang lain yang akan menolong (Bystander Effect). \nTindakan yang tepat untuk langkah ketiga sesuai algoritma bantuan hidup dasar adalah S (Shout for Help/Panggil Bantuan), dengan menunjuk satu orang secara spesifik: “Mas yang pakai jaket merah! Tolong telpon ambulans! dan Mbak yang memakai baju biru! Tolong ambilkan alat kejut jantung di pusat informasi!”\nTindakan menunjuk secara spesifik juga merupakan implementasi psikologi sosial untuk memecahkan Bystander Effect, karena dapat menjadikan tanggung jawab lebih jelas dan personal, sehingga kemungkinan orang tersebut bertindak lebih besar. \n*Bystander Effect: fenomena psikologis dimana seseorang cenderung diam atau tidak menolong orang yang sedang dalam kesulitan karena ada banyak orang lain di sekitar tempat kejadian."
      }
    ]
  },
  {
    stage: 5,
    title: "Tahap 5. Setelah memanggil bantuan, tindakan apa yang anda lakukan?",
    narrative: "",
    options: [
      {
        text: "Segera melakukan kompresi dada, dengan meletakkan kedua tangan sedikit di bawah tulang dada tengah. Tekan dengan kecepatan 100-120 kali/menit, kedalaman 4-5 cm.",
        points: -40,
        explanation: "Langkah sudah tepat, tetapi cara kompresi dada tidak tepat.\nTindakan kompresi dada dilakukan segera, tanpa menunggu alat kejut jantung (AED). Dalam algoritma bantuan hidup dasar untuk penolong awam, langkah keempat adalah C (Circulation/Compression/Kompresi dada), dengan melakukan kompresi dada yang tepat.\nCara kompresi dada yang tepat dilakukan dengan meletakkan tumit salah satu tangan di tengah dada korban (setengah bawah tulang dada), tangan lainnya di atas tangan pertama, dengan jari-jari saling mengunci. Lengan harus lurus saat menekan dada. Kecepatan 100-120 kai/menit, kedalaman 5-6 cm. Setelah setiap tekanan, biarkan dada kembali mengembang sepenuhnya.\n*Berikan gambar kompresi dada"
      },
      {
        text: "Segera melakukan kompresi dada, dengan meletakkan kedua tangan di tengah dada. Tekan dengan kecepatan 100-120 kali/menit, kedalaman 5-6 cm.",
        points: 0,
        explanation: "Langkah ini tepat, kompresi dada dilakukan segera, tanpa menunggu alat kejut jantung (AED). Dalam algoritma bantuan hidup dasar untuk penolong awam, langkah keempat adalah C (Circulation/Compression/Kompresi dada), dengan melakukan kompresi dada yang tepat.\nCara kompresi dada dilakukan dengan meletakkan tumit salah satu tangan di tengah dada korban (setengah bawah tulang dada), tangan lainnya di atas tangan pertama, dengan jari-jari saling mengunci. Lengan harus lurus saat menekan dada. Kecepatan 100-120 kai/menit, kedalaman 5-6 cm. Setelah setiap tekanan, biarkan dada kembali mengembang sepenuhnya.\n*Berikan gambar kompresi dada"
      },
      {
        text: "Segera melakukan kompresi dada, dengan meletakkan kedua tangan di tengah dada. Tekan dengan kecepatan 80-100 kali/menit, kedalaman 4-5 cm.",
        points: -25,
        explanation: "Langkah sudah tepat, tetapi cara kompresi dada kurang tepat.\nTindakan kompresi dada dilakukan segera, tanpa menunggu alat kejut jantung (AED). Dalam algoritma bantuan hidup dasar untuk penolong awam, langkah keempat adalah C (Circulation/Compression/Kompresi dada), dengan melakukan kompresi dada yang tepat.\nCara kompresi dada yang tepat dilakukan dengan meletakkan tumit salah satu tangan di tengah dada korban (setengah bawah tulang dada), tangan lainnya di atas tangan pertama, dengan jari-jari saling mengunci. Lengan harus lurus saat menekan dada. Kecepatan 100-120 kai/menit, kedalaman 5-6 cm. Setelah setiap tekanan, biarkan dada kembali mengembang sepenuhnya.\n*Berikan gambar kompresi dada"
      }
    ]
  },
  {
    stage: 6,
    title: "Tahap 6: Alat kejut jantung tiba di lokasi korban, apa yang anda lakukan?",
    narrative: "",
    options: [
      {
        text: "Melanjutkan kompresi dada, dan menunda menggunakan alat kejut jantung sampai petugas medis datang.",
        points: -25,
        explanation: "Langkah kurang tepat, karena menunda menggunakan alat kejut jantung, yang dapat menyebabkan tertundanya deteksi irama jantung yang memerlukan pemberian kejut jantung.\nTindakan penggunaan alat kejut jantung (AED/ Automated External Defibrillator) saat alat tersedia merupakan langkah terakhir dalam algoritma bantuan hidup dasar untuk penolong awam, dan merupakan bagian dari C (Circulation/Compression/Kompresi dada). AED dinyalakan dengan meminta bantuan orang lain, supaya kompresi dada tidak terhenti dan mengatasi Bystander Effect. Setelah AED menyala, ikuti instruksi dari AED. Jangan ada yang menyentuh korban saat AED mengeluarkan instruksi “Analyzing rhythm” dan “Shock advised. Stand clear.“ Kompresi dada tetap dilanjutkan sesuai instruksi AED, dan sampai bantuan medis datang.\n*Berikan gambar AED"
      },
      {
        text: "Menunjuk satu orang untuk segera menyalakan alat kejut jantung dan memasang ped langsung ke dada korban.",
        points: 0,
        explanation: "Langkah ini 100% tepat. Tindakan penggunaan alat kejut jantung (AED/ Automated External Defibrillator) saat alat tersedia merupakan langkah terakhir dalam algoritma bantuan hidup dasar untuk penolong awam, dan merupakan bagian dari C (Circulation/Compression/Kompresi dada). AED dinyalakan dengan meminta bantuan orang lain, supaya kompresi dada tidak terhenti dan mengatasi Bystander Effect. Setelah AED menyala, ikuti instruksi dari AED. Jangan ada yang menyentuh korban saat AED mengeluarkan instruksi “Analyzing rhythm” dan “Shock advised. Stand clear.“ Kompresi dada tetap dilanjutkan sesuai instruksi AED, dan sampai bantuan medis datang.\n*Berikan gambar AED"
      },
      {
        text: "Segera menyalakan alat kejut jantung dan memasang ped di atas pakaian korban.",
        points: -40,
        explanation: "Langkah tidak tepat, karena  tidak meminta bantuan untuk menyalakan alat kejut jantung, sehingga kompresi dada terhenti dan tidak mengatasi Bystander Effect.. Cara pemasangan ped juga kurang tepat jika diletakkan di atas pakaian korban karena alat tidak mampu mendeteksi irama listrik jantung, sehingga alat dapat memberikan instruksi yang salah.\nTindakan penggunaan alat kejut jantung (AED/ Automated External Defibrillator) saat alat tersedia merupakan langkah terakhir dalam algoritma bantuan hidup dasar untuk penolong awam, dan merupakan bagian dari C (Circulation/Compression/Kompresi dada). AED dinyalakan dengan meminta bantuan orang lain, supaya kompresi dada tidak terhenti dan mengatasi Bystander Effect. Setelah AED menyala, ikuti instruksi dari AED. Jangan ada yang menyentuh korban saat AED mengeluarkan instruksi “Analyzing rhythm” dan “Shock advised. Stand clear.“ Kompresi dada tetap dilanjutkan sesuai instruksi AED, dan sampai bantuan medis datang.\n*Berikan gambar AED"
      }
    ]
  }
];

