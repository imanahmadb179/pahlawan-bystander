export const gameData = [
  {
    stage: 1,
    title: "Tahap 1 Danger and Response",
    narrative: "Anda sedang berjalan-jalan di sebuah mall yang sangat ramai pada akhir pekan. Tiba-tiba, jarak dua meter di depan Anda, seorang pria paruh baya terlihat memegang dadanya, meringis kesakitan, dan ambruk ke lantai. Ia tergeletak diam tak bergerak.\n\nOrang-orang di sekelilingnya terkejut dan langkah mereka terhenti. Namun, tidak ada satu pun yang maju untuk menolong. Beberapa orang hanya saling berbisik, sementara yang lain justru mengeluarkan smartphone untuk merekam kejadian tersebut. Bystander Effect sedang terjadi, dan korban sangat membutuhkan bantuan detik ini juga.",
    options: [
      {
        text: "Memastikan area aman dari bahaya, berlutut di samping korban, menepuk kedua bahunya dengan keras sambil berteriak, \"Pak! Pak! Bisa dengar saya?\"",
        points: 0,
        explanation: "Langkah ini 100% tepat. Dalam algoritma resusitasi, D (Danger) harus selalu dikedepankan agar penolong tidak ikut menjadi korban. Selanjutnya, menilai R (Response) dengan menepuk bahu dan memanggil dengan suara lantang adalah metode standar AHA untuk menilai kesadaran secara cepat (merangsang respons nyeri dan auditori)."
      },
      {
        text: "Segera berlari mencari petugas keamanan mall atau meja informasi terdekat agar mereka bisa memanggil ambulans atau tenaga medis.",
        points: -25,
        explanation: "Secara naluri terdengar masuk akal, namun secara medis ini membuang Waktu Emas (Golden Time). Meninggalkan korban yang berpotensi henti jantung tanpa mengecek responsnya terlebih dahulu sangat merugikan. Seharusnya Anda mengecek kesadaran korban di tempat, lalu menugaskan orang lain (orang di sekitar Anda) untuk mencari bantuan keamanan, bukan Anda yang meninggalkannya."
      },
      {
        text: "Segera memberi pertolongan kepada korban dengan menepuk korban dan mengoleskan minyak angin, supaya korban sadar.",
        points: -40,
        explanation: "Ini adalah kebiasaan awam yang salah dan berbahaya. Pertama, Anda mengabaikan keamanan lingkungan (Danger). Kedua, minyak angin tidak memiliki fungsi resusitasi. Rangsangan bau yang kuat tidak akan mengembalikan detak jantung yang berhenti, dan fokus pada hal ini hanya menunda tindakan CPR yang sesungguhnya."
      }
    ]
  },
  {
    stage: 2,
    title: "Tahap 2: Call for Help",
    narrative: "",
    options: [
      {
        text: "Menunjuk satu orang secara spesifik: \"Mas yang pakai jaket merah! Tolong telepon ambulans 119 sekarang, dan mbak yang baju biru tolong ambilkan AED (Alat Kejut Jantung) di pusat informasi!\"",
        points: 0,
        explanation: "Ini adalah implementasi psikologi sosial yang sempurna untuk memecahkan *Bystander Effect. Kerumunan selalu mengalami *Diffusion of Responsibility (difusi tanggung jawab). Dengan memberikan deskripsi visual yang spesifik (jaket merah, baju biru), Anda menghancurkan anonimitas mereka dan memindahkan beban tanggung jawab sepenuhnya kepada individu tersebut. Mereka akan merasa secara moral dan sosial wajib untuk patuh."
      },
      {
        text: "Berteriak, \"Tolong! Tolong! Ada yang pingsan!\" lalu segera mulai menekan dada korban.",
        points: -25,
        explanation: "Berteriak meminta tolong secara umum tidak akan menggerakkan siapa pun di kerumunan karena setiap orang berasumsi ada orang lain yang akan menolong. Selain itu, Anda langsung melompat ke kompresi dada tanpa mengecek pernapasan atau nadi terlebih dahulu, yang berisiko menciderai tulang dada jika jantung korban sebenarnya masih berdetak."
      },
      {
        text: "Berada di samping korban sambil menunggu datangnya bantuan ambulance atau tenaga medis.",
        points: -40,
        explanation: "Anda justru ikut terkena Bystander Effect. Menjadi pasif dan hanya menunggu bantuan datang sama dengan membiarkan korban meninggal. Sel otak mulai mati dalam waktu 4-6 menit tanpa suplai darah beroksigen, sedangkan ambulans butuh waktu lebih dari itu untuk tiba. Pertolongan pertama di tempat adalah penentu utama keselamatan nyawa."
      }
    ]
  },
  {
    stage: 3,
    title: "Tahap 3: Circulation/Chest Compression",
    narrative: "",
    options: [
      {
        text: "Memeriksa pergerakan naik-turun dada korban untuk menilai pernapasan, sekaligus meraba denyut nadi karotis (nadi di samping leher) secara bersamaan. Pengecekan ini Anda lakukan dengan cepat, tidak lebih dari 10 detik.",
        points: 0,
        explanation: "Ini adalah standar emas AHA. Evaluasi pernapasan (melihat kembang kempis dada) dan evaluasi sirkulasi (meraba nadi karotis/leher) harus dilakukan secara simultan (bersamaan) untuk menghemat waktu. Batas maksimal 10 detik dirancang agar CPR tidak tertunda. Jika dalam 10 detik nadi tidak terasa (atau ragu), segera mulai CPR."
      },
      {
        text: "Mendekatkan telinga langsung ke dada korban untuk mendengarkan detak jantungnya dan meraba pergelangan tangannya selama 1 menit penuh. Anda ingin 100% yakin jantungnya berhenti sebelum melakukan tindakan Pijat Jantung",
        points: -25,
        explanation: "Menghabiskan waktu 1 menit (60 detik) penuh hanya untuk mengecek nadi adalah kesalahan prosedur. Anda kehilangan waktu yang sangat krusial. Selain itu, pada korban dengan tekanan darah sangat rendah (syok) atau henti jantung, denyut nadi radialis di pergelangan tangan sering kali tidak teraba sama sekali, membuat observasi ini menyesatkan."
      },
      {
        text: "Menganggap suara seperti mengorok (gasping) adalah tanda bahwa ia masih berusaha bernapas dengan baik. Anda melonggarkan kerah bajunya, meminta orang-orang mengipasi tubuhnya agar dapat udara segar, dan menunggu beberapa menit untuk melihat perkembangannya.",
        points: -40,
        explanation: "Suara megap-megap/mengorok (agonal gasping) bukan pernapasan yang mengalirkan oksigen. Itu adalah refleks kejang dari batang otak karena mati lemas. Menunda CPR karena tertipu oleh agonal gasping adalah penyebab tingginya angka kematian di luar rumah sakit. Mengipasi dari luar sama sekali tidak berguna karena jantung tidak memompa darah yang mengangkut oksigen tersebut."
      }
    ]
  },
  {
    stage: 4,
    title: "Tahap 4: Airway and Breathing",
    narrative: "",
    options: [
      {
        text: "Melakukan teknik Head Tilt - Chin Lift (menengadahkan dahi ke belakang dan mengangkat dagu korban) untuk membuka jalan napas, memencet hidung korban, lalu memberikan 2 kali tiupan napas (rescue breaths) dari mulut ke mulut secara normal (masing-masing 1 detik) sambil melihat apakah dadanya mengembang",
        points: 0,
        explanation: "Anatomi jalan napas manusia bisa tertutup oleh pangkal lidah yang jatuh saat tidak sadar. Manuver Head Tilt - Chin Lift (tengadah kepala - angkat dagu) berfungsi mengangkat pangkal lidah agar jalan napas terbuka lurus. Memencet hidung mencegah udara tiupan bocor keluar, dan durasi 1 detik per tiupan dengan volume normal cukup untuk mengembangkan paru-paru tanpa berisiko memasukkan udara ke lambung."
      },
      {
        text: "Menghembuskan napas kuat-kuat ke mulut korban berkali-kali dengan cepat tanpa memosisikan kepalanya terlebih dahulu, dan membiarkan hidung korban tetap tidak tertutup.",
        points: -25,
        explanation: "Tanpa Head Tilt - Chin Lift, udara yang Anda tiupkan akan menabrak pangkal lidah dan masuk ke esofagus (saluran cerna), menyebabkan perut kembung (distensi lambung) yang berisiko membuat korban muntah. Jika hidung dibiarkan terbuka, udara yang ditiup masuk ke mulut akan langsung bocor keluar melalui hidung, sehingga paru-paru tidak mendapat oksigen."
      },
      {
        text: "Menaruh tas atau bantal yang tinggi di bawah kepala korban agar posisi kepalanya naik, lalu menuangkan sedikit air atau memberikan minyak angin ke mulutnya agar tenggorokannya lega.",
        points: -40,
        explanation: "Dua kesalahan fatal dalam satu tindakan. Menaruh bantal atau tas di bawah kepala justru membuat dagu menekuk ke arah dada (fleksi leher), yang akan menutup total jalan napas. Memberikan air ke dalam mulut orang yang tidak sadar pasti akan menyebabkan air masuk ke paru-paru (aspirasi), menyebabkan korban tersedak atau mati tenggelam secara internal."
      }
    ]
  },
  {
    stage: 5,
    title: "Tahap 5: AED (Automated External Defibrillator)",
    narrative: "",
    options: [
      {
        text: "Langsung menyalakan mesin AED (tekan tombol ON/Power), menempelkan pad perekat di dada telanjang korban sesuai gambar, dan mengikuti instruksi suara mesin. Saat mesin menginstruksikan \"Analyzing\" atau \"Shock advised\", Anda berteriak \"Clear! Semua mundur!\" dan memastikan tidak ada satu pun yang menyentuh korban.",
        points: 0,
        explanation: "Langkah fundamental AED selalu \"Turn ON the machine\", biarkan mesin memandu Anda. Pad harus pada kulit kering tanpa pakaian agar arus kelistrikannya tepat sasaran ke otot jantung. Perintah \"Clear!\" (Awas/Mundur!) mengamankan penolong dan orang lain agar tidak tersetrum saat aliran listrik tegangan tinggi dilepaskan."
      },
      {
        text: "Menempelkan pad AED di atas jaket atau kemeja korban agar menghemat waktu tanpa perlu melepas bajunya, lalu Anda tetap melanjutkan kompresi dada (CPR) tanpa henti, bahkan saat mesin sedang menganalisis irama jantung atau memberikan kejutan (shock), demi memastikan aliran darah ke otak tidak pernah terputus sedetik pun.",
        points: -25,
        explanation: "Pad AED yang menempel di atas kain/baju tidak akan mampu mendeteksi irama kelistrikan jantung (EKG) dengan akurat dan kejutan listriknya akan terhambat. Melanjutkan CPR saat AED berbunyi \"Analyzing\" akan menghasilkan grafik EKG yang rancu/bergerak (motion artifact), membuat mesin salah diagnosis (bisa jadi tidak menyarankan kejutan saat seharusnya diperlukan)."
      },
      {
        text: "Menolak menggunakan AED tersebut dan menyuruh satpam menyimpannya kembali. Anda percaya pada mitos bahwa alat kejut listrik sangat berbahaya dan meyakini secara hukum alat medis bertegangan tinggi seperti itu hanya boleh dioperasikan oleh dokter atau paramedis. Anda memilih hanya melanjutkan CPR.",
        points: -40,
        explanation: "Ketakutan yang sayangnya sangat umum (technology anxiety atau ketakutan hukum/medis). Faktanya, AED dibuat 100% otomatis, portabel, dan khusus untuk awam. Alat ini tidak akan melepaskan tegangan listrik jika mendeteksi jantung dalam irama normal atau jika korban sudah meninggal total (asistol). Menolak AED sama dengan merampas satu-satunya pengobatan definitif untuk irama jantung yang bergetar (Ventricular Fibrillation)."
      }
    ]
  }
];
