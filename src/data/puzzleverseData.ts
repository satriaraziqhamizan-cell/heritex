import { PuzzleWorld, StudentProgressEntry, CultureAssignment } from '../types/puzzleverse';

export const JAMBI_PUZZLE_WORLDS: PuzzleWorld[] = [
  {
    id: 'world-1-warisan',
    worldNumber: 1,
    name: 'WORLD 1: WARISAN',
    subName: 'Arsitektur, Situs Suci & Pusaka Luhur',
    themeColor: 'from-[#8B4513] to-[#C85A32]',
    accentColor: '#C85A32',
    iconName: 'Landmark',
    description: 'Jelajahi keagungan peradaban kuno Jambi dari kemegahan Rumah Kajang Lako, Candi Muaro Jambi, hingga Keris Siginjai.',
    requiredXpToUnlock: 0, // Unlocked by default
    levels: [
      {
        id: 'lvl-kajang-lako',
        worldId: 'world-1-warisan',
        levelNumber: 1,
        title: 'Rumah Tuo Kajang Lako',
        culturalCategory: 'Arsitektur Tradisional',
        regency: 'Kabupaten Merangin / Muaro Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=600&auto=format&fit=crop&q=80',
        type: 'visual',
        difficulty: 'mudah',
        xpReward: 50,
        culturalQuote: 'Bumbungan Gajah Mabuk menengadah ke langit, lambang kerendahan hati manusia di hadapan Sang Khalik.',
        visualConfig: {
          imageSrc: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=600&auto=format&fit=crop&q=80',
          gridSize: 3
        },
        learningMaterial: {
          origin: 'Rantau Panjang, Merangin & Daerah Aliran Sungai Batanghari, Jambi',
          historicalContext: 'Rumah Kajang Lako merupakan rumah panggung tradisional khas suku Batin Jambi yang dibangun sejak abad ke-14 tanpa menggunakan paku logam, melainkan pasak kayu pohon ulin dan ikatan rotan.',
          philosophicalMeaning: 'Bentuk atap melengkung menyerupai perahu terbalik ("Gajah Mabuk") melambangkan penghormatan terhadap nenek moyang pelaut Melayu. Struktur tiang bersegi 8 mencerminkan 8 penjuru mata angin dan persatuan komunitas.',
          culturalFunction: 'Berfungsi sebagai tempat tinggal keluarga besar sekaligus ruang musyawarah adat mufakat. Ruang Balairung depan dikhususkan untuk tamu terhormat dan upacara adat.',
          officialReference: 'SK Penetapan WBTb Kemendikbudristek No. 201300010 & Arsip BPK Wilayah V Jambi',
          keyTakeaway: 'Kajang Lako mengajarkan arsitektur vernakular ramah gempa, keseimbangan ekologis, dan adab menyambut tamu secara terhormat.'
        },
        challengeQuiz: {
          question: 'Mengapa atap Rumah Kajang Lako didesain melengkung menyerupai bentuk perahu ("Gajah Mabuk")?',
          options: [
            { id: 'opt-1', text: 'Sebagai penghormatan filosofis terhadap asal-usul nenek moyang Melayu pelaut yang hidup di tepian sungai Batanghari', isCorrect: true },
            { id: 'opt-2', text: 'Agar rumah mudah dipindahkan saat air sungai Batanghari meluap banjir', isCorrect: false },
            { id: 'opt-3', text: 'Hanya untuk membedakan status sosial pemilik rumah dengan bangsawan Belanda', isCorrect: false },
            { id: 'opt-4', text: 'Sebagai perangkap angin agar ruangan di dalam terasa lebih dingin', isCorrect: false }
          ],
          explanation: 'Bentuk atap perahu melengkung melambangkan filosofi bahari dan penghormatan terhadap Sungai Batanghari sebagai urat nadi peradaban masyarakat Jambi.',
          philosophicalNote: 'Arsitektur bukan sekadar estetika tempat tinggal, melainkan doa dan rekaman filosofi hidup leluhur.'
        },
        kantiAdvice: {
          hint: 'Perhatikan bagian atap bertingkat dan tebar layar segitiga. Letakkan potongan dengan langit biru di baris paling atas terlebih dahulu.',
          whyItMatters: 'Memahami Rumah Kajang Lako membangkitkan kebanggaan pada kearifan arsitektur lokal yang tahan gempa dan harmonis dengan alam tropis.',
          interactivePrompt: 'Bagaimana Rumah Kajang Lako mencerminkan prinsip keberlanjutan arsitektur masa kini?'
        },
        mosaicPiece: {
          gridIndex: 0,
          label: 'Keping 01: Atap Kajang Lako',
          pieceTitle: 'Harmoni Arsitektur Vernakular'
        }
      },
      {
        id: 'lvl-candi-muaro-jambi',
        worldId: 'world-1-warisan',
        levelNumber: 2,
        title: 'Kompleks Percandian Muaro Jambi',
        culturalCategory: 'Situs Cagar Budaya Nasional',
        regency: 'Kabupaten Muaro Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=80',
        type: 'historical',
        difficulty: 'sedang',
        xpReward: 75,
        culturalQuote: 'Pusat universitas dan peradaban Buddhis tertua abad ke-7 hingga ke-13 di tepian sungai suci Batanghari.',
        historicalConfig: {
          events: [
            {
              id: 'hist-1',
              title: 'Pusat Kajian Bhiksu I-Tsing',
              periodText: 'Abad ke-7 Masehi (Tahun 671 M)',
              description: 'Pendeta I-Tsing singgah di Kerajaan Melayu (Suvarnadvipa) selama 6 bulan untuk belajar tata bahasa Sanskerta sebelum melanjutkan studi ke Nalanda India.',
              correctRank: 1
            },
            {
              id: 'hist-2',
              title: 'Pembangunan Menapo & Candi Gumpung',
              periodText: 'Abad ke-9 – 11 Masehi',
              description: 'Puncak kejayaan kerajaan Melayu Jambi, dibangun lebih dari 110 struktur candi bata merah (menapo) sebagai pusat pendidikan spiritual terbesar Asia Tenggara.',
              correctRank: 2
            },
            {
              id: 'hist-3',
              title: 'Kunjungan Guru Agung Atisha Dipankara',
              periodText: 'Abad ke-11 Masehi (1011 – 1023 M)',
              description: 'Atisha menuntut ilmu spiritual selama 12 tahun kepada Guru Suvarnadvipa Dharmakirti di Muaro Jambi sebelum menyebarkan ajaran luhur ke Tibet.',
              correctRank: 3
            },
            {
              id: 'hist-4',
              title: 'Kawasan Cagar Budaya Nasional & Warisan Dunia UNESCO',
              periodText: 'Masa Kontemporer (2013 - Sekarang)',
              description: 'Kawasan seluas 3.988 hektar ditetapkan sebagai Kawasan Cagar Budaya Nasional (KCBN) dan masuk daftar tentatif Warisan Dunia UNESCO.',
              correctRank: 4
            }
          ]
        },
        learningMaterial: {
          origin: 'Desa Muaro Jambi, Kecamatan Maro Sebo, Kabupaten Muaro Jambi',
          historicalContext: 'Membentang sepanjang 7,5 kilometer di tepi Sungai Batanghari, Kompleks Percandian Muaro Jambi adalah kompleks percandian bata merah terluas di Asia Tenggara (3.988 hektare).',
          philosophicalMeaning: 'Candi Muaro Jambi membuktikan bahwa Nusantara pernah menjadi episentrum pertukaran ilmu pengetahuan kosmopolitan internasional yang menjunjung tinggi toleransi dan pencarian kebajikan.',
          culturalFunction: 'Bukan sekadar tempat peribadatan ritual, situs ini merupakan kampus universitas asrama kuno tempat para pelajar dari Cina, India, dan Nusantara menuntut ilmu.',
          officialReference: 'Keputusan Mendikbud No. 259/M/2013 tentang Penetapan KCBN Muaro Jambi',
          keyTakeaway: 'Muaro Jambi mengajarkan kita bahwa tanah Jambi adalah tanah pelajar dan mercusuar pendidikan global masa lampau.'
        },
        challengeQuiz: {
          question: 'Peran historis terbesar Candi Muaro Jambi pada abad ke-7 hingga 13 bagi Asia adalah sebagai...',
          options: [
            { id: 'opt-1', text: 'Kampus pendidikan filsafat dan spiritual internasional tempat bertemunya cendekiawan dari berbagai penjuru dunia', isCorrect: true },
            { id: 'opt-2', text: 'Benteng pertahanan militer laut terdepan untuk menghalau kapal perompak', isCorrect: false },
            { id: 'opt-3', text: 'Gudang penyimpanan monopoli rempah-rempah lada dan cengkih', isCorrect: false },
            { id: 'opt-4', text: 'Tempat pengasingan bangsawan istana yang berselisih paham', isCorrect: false }
          ],
          explanation: 'Biksu I-Tsing dan Atisha Dipankara mencatat Muaro Jambi sebagai kampus kosmopolitan di mana ratusan guru dan murid mendalami ilmu filsafat dan bahasa.',
          philosophicalNote: 'Semangat belajar tanpa henti adalah esensi jati diri peradaban Melayu Jambi.'
        },
        kantiAdvice: {
          hint: 'Mulailah dengan catatan tertua perjalanan Bhiksu I-Tsing pada abad ke-7, lalu pembangunan candi, kedatangan Atisha, dan pengakuan cagar budaya modern.',
          whyItMatters: 'Sejarah ini mengingatkan generasi muda Jambi bahwa kita adalah pewaris pusat peradaban intelektual dunia.',
          interactivePrompt: 'Bagaimana kita dapat mengembalikan gairah literasi Muaro Jambi ke generasi muda saat ini?'
        },
        mosaicPiece: {
          gridIndex: 1,
          label: 'Keping 02: Candi Gumpung Muaro Jambi',
          pieceTitle: 'Pusat Keilmuan Peradaban Kuno'
        }
      },
      {
        id: 'lvl-keris-siginjai',
        worldId: 'world-1-warisan',
        levelNumber: 3,
        title: 'Keris Siginjai Pusaka Kesultanan',
        culturalCategory: 'Senjata & Pusaka Tradisional',
        regency: 'Kota Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'sedang',
        xpReward: 60,
        culturalQuote: 'Bukan sekadar bilah penikam, Keris Siginjai adalah lambang mandat daulat kepemimpinan yang adil dan beradab.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-1',
              symbolName: 'Luk Sembilan (9 Lekukan Bilah)',
              symbolSnippet: 'Bilah berlekuk 9 dengan pamor wos wutah',
              meaningText: 'Melambangkan 9 anak sungai Batanghari ("Sembilan Lurah") dan kesempurnaan hikmah kebijaksanaan seorang pemimpin.'
            },
            {
              id: 'pair-2',
              symbolName: 'Hulu Burung Garuda Berlapis Emas',
              symbolSnippet: 'Gagang keris berbentuk kepala burung bermahkota',
              meaningText: 'Melambangkan ketajaman pandangan batin, martabat mulia, dan kewaspadaan dalam menegakkan kebenaran rakyat.'
            },
            {
              id: 'pair-3',
              symbolName: 'Penyisip Gandik Bunga Melati Emas',
              symbolSnippet: 'Hiasan emas berpermata intan di pangkal keris',
              meaningText: 'Melambangkan keharuman budi pekerti raja yang harus melayani masyarakat dengan ketulusan hati.'
            },
            {
              id: 'pair-4',
              symbolName: 'Sarung Kayu Cendana Berbalut Emas',
              symbolSnippet: 'Warangka pelindung bilah berbahan kayu wangi',
              meaningText: 'Kekuasaan harus dibungkus dengan kesabaran dan kelembutan tutur kata agar tidak melukai sesama.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Istana Kesultanan Jambi, Tanah Pilih Pusako Betuah (Koleksi Masterpiece Museum Nasional / Museum Siginjai)',
          historicalContext: 'Keris Siginjai pertama kali dimiliki oleh Orang Kayo Hitam, raja Melayu Jambi yang masyhur pada abad ke-15. Keris ini menjadi regalia pusaka wajib dalam penobatan Sultan Jambi hingga masa perjuangan Sultan Thaha Syaifuddin.',
          philosophicalMeaning: 'Siginjai diambil dari kata "ginjai" yang berarti menyisipkan keris di pinggang tanpa dihunus secara sembarangan, mencerminkan bahwa seorang ksatria sejati mendahulukan diplomasi di atas pertumpahan darah.',
          culturalFunction: 'Tanda sah kedaulatan seorang pemimpin Melayu Jambi. Tanpa Keris Siginjai, seorang raja tidak dapat ditabalkan secara adat.',
          officialReference: 'SK Kemendikbudristek No. 201700492 (Warisan Budaya Takbenda Nasional Indonesia)',
          keyTakeaway: 'Kekuasaan sejati bukanlah dominasi senjata, melainkan kepemimpinan berwibawa yang mengayomi rakyat.'
        },
        challengeQuiz: {
          question: 'Apa makna filosofis utama dari tradisi menyelipkan Keris Siginjai di pinggang tanpa dihunus ("berpijak pada ginjai")?',
          options: [
            { id: 'opt-1', text: 'Menunjukkan bahwa senjata hanyalah simbol daulat; seorang pemimpin harus mengutamakan musyawarah dan kesantunan', isCorrect: true },
            { id: 'opt-2', text: 'Karena keris tersebut terbuat dari emas murni sehingga rapuh jika dipakai bertempur', isCorrect: false },
            { id: 'opt-3', text: 'Supaya keris tidak terlihat oleh utusan musuh', isCorrect: false },
            { id: 'opt-4', text: 'Aturan protokoler yang dibuat oleh kolonial Belanda', isCorrect: false }
          ],
          explanation: 'Dalam etika Melayu, menghunus keris adalah langkah darurat terakhir. Keris yang terselip rapi menandakan kewibawaan batin dan kendali diri.',
          philosophicalNote: 'Kekuatan terbesar terletak pada pengendalian diri di puncak kekuasaan.'
        },
        kantiAdvice: {
          hint: 'Perhatikan lekukan 9 yang melambangkan 9 lurah Batanghari, dan sarung cendana yang melambangkan kelembutan membungkus ketajaman.',
          whyItMatters: 'Keris Siginjai adalah identitas lambang resmi Provinsi Jambi, sarat dengan nilai-nilai luhur kepemimpinan Pancasila.',
          interactivePrompt: 'Bagaimana nilai integritas Keris Siginjai dapat diterapkan oleh generasi muda dalam memimpin organisasi?'
        },
        mosaicPiece: {
          gridIndex: 2,
          label: 'Keping 03: Keris Pusaka Siginjai',
          pieceTitle: 'Kedaulatan & Integritas Kepemimpinan'
        }
      },
      {
        id: 'lvl-makam-orang-kayo-hitam',
        worldId: 'world-1-warisan',
        levelNumber: 4,
        title: 'Makam Rang Kayo Hitam & Keramat Berhalo',
        culturalCategory: 'Situs Sejarah & Makam Kuno',
        regency: 'Kabupaten Tanjung Jabung Timur',
        thumbnail: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=600&auto=format&fit=crop&q=80',
        type: 'language',
        difficulty: 'menantang',
        xpReward: 80,
        culturalQuote: 'Pemberani yang tak gentar membayar upeti pada penjajah, penegak kedaulatan tanah Melayu Jambi.',
        languageConfig: {
          rawPhrase: 'Titian teras bertangga batu, cermin nan tidak kabur, pelita nan tidak padam',
          words: ['Titian', 'teras', 'bertangga', 'batu,', 'cermin', 'nan', 'tidak', 'kabur,', 'pelita', 'nan', 'tidak', 'padam'],
          correctOrder: ['Titian', 'teras', 'bertangga', 'batu,', 'cermin', 'nan', 'tidak', 'kabur,', 'pelita', 'nan', 'tidak', 'padam'],
          culturalMeaningQuestion: 'Apa makna seloko adat "Titian teras bertangga batu, cermin nan tidak kabur, pelita nan tidak padam" dalam kepemimpinan Melayu Jambi?',
          culturalMeaningOptions: [
            { id: 'opt-1', text: 'Hukum dan adat berdiri tegak tanpa tebang pilih, jernih dalam keadilan, dan selalu memberi petunjuk kebenaran bagi rakyat', isCorrect: true },
            { id: 'opt-2', text: 'Mendirikan jembatan batu agar perdagangan perahu di sungai Batanghari lancar', isCorrect: false },
            { id: 'opt-3', text: 'Mewajibkan penerangan lentera di setiap pintu gerbang istana kesultanan', isCorrect: false },
            { id: 'opt-4', text: 'Setiap pejabat harus memiliki cermin kaca antik dari saudagar Tiongkok', isCorrect: false }
          ]
        },
        learningMaterial: {
          origin: 'Kelurahan Simpang, Tanjung Jabung Timur, Jambi',
          historicalContext: 'Makam Rang Kayo Hitam dan istrinya Putri Mayang Mangurai merupakan situs cagar budaya yang dikeramatkan. Rang Kayo Hitam adalah peletak fondasi kemerdekaan Kesultanan Melayu Jambi yang menolak tunduk kepada hegemoni asing.',
          philosophicalMeaning: 'Keteguhan pendirian memegang amanah kedaulatan rakyat tanpa gentar terhadap intimidasi.',
          culturalFunction: 'Situs ziarah spiritual, cagar budaya pengingat sejarah perjuangan patriotik bangsa.',
          officialReference: 'Balai Pelestarian Kebudayaan (BPK) Wilayah V Jambi',
          keyTakeaway: 'Seorang pemimpin dinilai dari keberaniannya membela harkat bangsanya.'
        },
        challengeQuiz: {
          question: 'Nilai keteladanan terbesar dari perjuangan Rang Kayo Hitam bagi pelajar saat ini adalah...',
          options: [
            { id: 'opt-1', text: 'Kemandirian dan keberanian menjaga harga diri serta kedaulatan bangsa dari penindasan', isCorrect: true },
            { id: 'opt-2', text: 'Kemampuan mengumpulkan upeti sebanyak mungkin dari pedagang asing', isCorrect: false },
            { id: 'opt-3', text: 'Menutup diri sepenuhnya dari pergaulan dunia internasional', isCorrect: false },
            { id: 'opt-4', text: 'Menyerahkan urusan keamanan kepada kerajaan tetangga', isCorrect: false }
          ],
          explanation: 'Rang Kayo Hitam menghentikan pengiriman upeti dan menuntut perlakuan setara yang terhormat antar bangsa merdeka.',
          philosophicalNote: 'Kemandirian bangsa berakar dari keberanian generasi mudanya.'
        },
        kantiAdvice: {
          hint: 'Susun kata mulai dari "Titian", "teras", "bertangga", "batu"... ungkapan ini mengacu pada hukum adat yang kokoh laksana batu karang.',
          whyItMatters: 'Seloko ini adalah landasan etika hukum adat Melayu Jambi yang menjunjung tinggi keadilan sejati.',
          interactivePrompt: 'Bagaimana seloko adat ini relevan dengan penegakan hukum modern di Indonesia?'
        },
        mosaicPiece: {
          gridIndex: 3,
          label: 'Keping 04: Karisma Rang Kayo Hitam',
          pieceTitle: 'Keteguhan Membela Kedaulatan'
        }
      }
    ]
  },
  {
    id: 'world-2-suara',
    worldNumber: 2,
    name: 'WORLD 2: SUARA JAMBI',
    subName: 'Tari Tradisi, Seloko Adat & Musik Laras Alam',
    themeColor: 'from-[#1E7773] to-[#0D3B3A]',
    accentColor: '#1E7773',
    iconName: 'Music',
    description: 'Dengarkan gema seloko para tetua, hentakan ritmis Kelintang Kayu, dan rajutan harmoni Tari Selampit Delapan.',
    requiredXpToUnlock: 150,
    levels: [
      {
        id: 'lvl-tari-selampit',
        worldId: 'world-2-suara',
        levelNumber: 1,
        title: 'Tari Selampit Delapan',
        culturalCategory: 'Seni Tari Tradisional',
        regency: 'Kota Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80',
        type: 'visual',
        difficulty: 'mudah',
        xpReward: 50,
        culturalQuote: 'Delapan helai selampit beraneka warna dirajut bersama, mencerminkan persatuan dalam kebhinekaan.',
        visualConfig: {
          imageSrc: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80',
          gridSize: 3
        },
        learningMaterial: {
          origin: 'Kota Jambi, diciptakan oleh seniman M. Tarip pada dekade 1930-an',
          historicalContext: 'Tari pergaulan muda-mudi yang dibawakan oleh 8 orang penari (4 pasang) memegang selampit (kain selendang) berwarna-warni yang digantungkan pada satu poros tengah.',
          philosophicalMeaning: 'Saat menari, selendang-selendang teranyam menjadi satu lilitan indah, kemudian diurai kembali tanpa ada simpul yang kusut. Ini melambangkan kemampuan masyarakat menyelesaikan perselisihan dengan kepala dingin.',
          culturalFunction: 'Tarian penyambutan tamu kehormatan dan pesta panen raya.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201500207',
          keyTakeaway: 'Perbedaan latar belakang bukanlah penghalang untuk merajut persatuan bangsa yang kokoh.'
        },
        challengeQuiz: {
          question: 'Pesan moral terpenting saat selendang selampit delapan berhasil dianyam lalu diurai kembali tanpa kusut adalah...',
          options: [
            { id: 'opt-1', text: 'Setiap permasalahan sosial dalam masyarakat dapat diselesaikan secara musyawarah dan mufakat tanpa meninggalkan dendam', isCorrect: true },
            { id: 'opt-2', text: 'Penari harus memiliki kekuatan fisik prima untuk menarik tiang kayu', isCorrect: false },
            { id: 'opt-3', text: 'Kain selendang sutra tidak boleh menyentuh tanah agar tidak kotor', isCorrect: false },
            { id: 'opt-4', text: 'Setiap warna selendang melambangkan tingkatan upeti kepada raja', isCorrect: false }
          ],
          explanation: 'Gerak menganyam dan mengurai selendang adalah metafora resolusi konflik komunal Melayu: "Kusut diselesaikan, keruh dijernihkan".',
          philosophicalNote: 'Persatuan sejati lahir dari kerelaan mendengarkan irama gerak sesama.'
        },
        kantiAdvice: {
          hint: 'Fokuskan pada posisi poros gantungan selampit di bagian tengah atas, lalu cocokkan warna-warni selendang yang melingkar.',
          whyItMatters: 'Tarian ini adalah ikon diplomasi kebudayaan Jambi yang diakui secara nasional.',
          interactivePrompt: 'Bagaimana filosofi mengurai selampit dapat membantu kita menyelesaikan perbedaan pendapat di era digital?'
        },
        mosaicPiece: {
          gridIndex: 4,
          label: 'Keping 05: Harmoni Selampit Delapan',
          pieceTitle: 'Persatuan dalam Anyaman Kebhinekaan'
        }
      },
      {
        id: 'lvl-seloko-adat-jambi',
        worldId: 'world-2-suara',
        levelNumber: 2,
        title: 'Seloko Adat Melayu Jambi',
        culturalCategory: 'Sastra Lisan & Tradisi',
        regency: 'Provinsi Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
        type: 'language',
        difficulty: 'sedang',
        xpReward: 65,
        culturalQuote: 'Adat bersendi syarak, syarak bersendi Kitabullah.',
        languageConfig: {
          rawPhrase: 'Adat bersendi syarak, syarak bersendi Kitabullah, syarak mengato adat memakai',
          words: ['Adat', 'bersendi', 'syarak,', 'syarak', 'bersendi', 'Kitabullah,', 'syarak', 'mengato', 'adat', 'memakai'],
          correctOrder: ['Adat', 'bersendi', 'syarak,', 'syarak', 'bersendi', 'Kitabullah,', 'syarak', 'mengato', 'adat', 'memakai'],
          culturalMeaningQuestion: 'Bagaimana prinsip "Adat bersendi syarak, syarak bersendi Kitabullah" diterapkan dalam kehidupan sehari-hari masyarakat Jambi?',
          culturalMeaningOptions: [
            { id: 'opt-1', text: 'Segala norma tradisi dan hukum adat harus senantiasa selaras dan tidak boleh bertentangan dengan ajaran wahyu Ilahi serta etika moral luhur', isCorrect: true },
            { id: 'opt-2', text: 'Adat tradisi kedudukannya lebih tinggi daripada aturan agama', isCorrect: false },
            { id: 'opt-3', text: 'Hanya tetua adat yang berhak membaca kitab suci', isCorrect: false },
            { id: 'opt-4', text: 'Aturan hukum negara digantikan sepenuhnya oleh kebiasaan masa lalu', isCorrect: false }
          ]
        },
        learningMaterial: {
          origin: 'Warisan Lisan Melayu Jambi dari generasi ke generasi',
          historicalContext: 'Seloko adalah ungkapan puitis khas Melayu Jambi berbentuk pepatah petitih yang dijadikan pedoman perilaku hukum adat, sopan santun bermasyarakat, dan tata kelola lingkungan.',
          philosophicalMeaning: 'Mengajarkan harmoni vertikal (manusia dengan Tuhan) dan harmoni horizontal (manusia dengan sesama manusia dan alam semesta).',
          culturalFunction: 'Media resolusi konflik adat, nasehat pernikahan, penobatan gelar, dan pendidikan karakter anak-anak Melayu.',
          officialReference: 'Lembaga Adat Melayu (LAM) Jambi & SK WBTb Indonesia',
          keyTakeaway: 'Kearifan lokal Jambi mengajarkan bahwa modernitas tidak boleh mengikis fondasi spiritualitas dan adab kesantunan.'
        },
        challengeQuiz: {
          question: 'Seloko "Kusut diselesaikan, keruh dijernihkan, silang dipatutkan" mengajarkan kita tentang...',
          options: [
            { id: 'opt-1', text: 'Penyelesaian sengketa melalui jalur musyawarah kekeluargaan dengan mengutamakan perdamaian batin', isCorrect: true },
            { id: 'opt-2', text: 'Cara mencuci kain batik di sungai Batanghari agar warnanya jernih', isCorrect: false },
            { id: 'opt-3', text: 'Menghukum pihak yang bersalah dengan denda beras sebanyak-banyaknya', isCorrect: false },
            { id: 'opt-4', text: 'Membiarkan masalah selesai dengan sendirinya seiring berjalannya waktu', isCorrect: false }
          ],
          explanation: 'Seloko ini adalah asas hukum adat Jambi yang mendahulukan restoratif justice (keadilan pemulihan hubungan) daripada permusuhan.',
          philosophicalNote: 'Kata-kata bijak para tetua adalah lentera yang menuntun arah peradaban.'
        },
        kantiAdvice: {
          hint: 'Mulailah dengan susunan kata fondasi: "Adat" -> "bersendi" -> "syarak,"... perhatikan koma dan pengulangan kata syarak.',
          whyItMatters: 'Seloko adat adalah warisan linguistik luhur yang melatih kecerdasan emosional dan etika komunikasi.',
          interactivePrompt: 'Bagaimana seloko adat Jambi dapat diterapkan untuk mencegah ujaran kebencian di media sosial?'
        },
        mosaicPiece: {
          gridIndex: 5,
          label: 'Keping 06: Mutiara Seloko Adat',
          pieceTitle: 'Adab dan Kehalusan Budi Melayu'
        }
      },
      {
        id: 'lvl-kelintang-kayu',
        worldId: 'world-2-suara',
        levelNumber: 3,
        title: 'Alat Musik Kelintang Kayu',
        culturalCategory: 'Musik Tradisional',
        regency: 'Kabupaten Batanghari & Merangin',
        thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'sedang',
        xpReward: 60,
        culturalQuote: 'Nada pentatonis bilah kayu lempung mengiringi lantunan doa panen dan tari syukur.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-k1',
              symbolName: 'Bilah Kayu Mahang & Lempung',
              symbolSnippet: 'Kayu hutan pilihan berbobot ringan namun bergema nyaring',
              meaningText: 'Simbol pemanfaatan hasil hutan secara lestari tanpa merusak pohon induk pelindung bumi.'
            },
            {
              id: 'pair-k2',
              symbolName: 'Susunan Bilah Nada Pentatonik',
              symbolSnippet: 'Rentang 5 nada dasar Melayu Jambi',
              meaningText: 'Mewakili 5 rukun harmoni kehidupan: Ketuhanan, Kekerabatan, Kejujuran, Gotong Royong, dan Keadilan.'
            },
            {
              id: 'pair-k3',
              symbolName: 'Tabuh Pemukul Berlilit Karet Alami',
              symbolSnippet: 'Stik pemukul yang menghasilkan denting empuk',
              meaningText: 'Nasihat teguran harus disampaikan secara halus dan bijaksana agar tidak mematahkan semangat sesama.'
            },
            {
              id: 'pair-k4',
              symbolName: 'Alas Kotak Resonansi Labu Kayu',
              symbolSnippet: 'Rongga bawah sebagai penguat bunyi',
              meaningText: 'Hati yang lapang dan ikhlas akan memancarkan resonansi kebaikan ke seluruh lingkungan sekitarnya.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Komunitas Melayu Jambi pedalaman sepanjang aliran Sungai Tembesi dan Batanghari',
          historicalContext: 'Kelintang Kayu dimainkan sejak berabad-abad silam oleh para petani ketika menjaga ladang padi dari hama, kemudian berkembang menjadi pengiring ritmis pada upacara gawai desa dan tari selampit.',
          philosophicalMeaning: 'Suara denting kayu yang bersahaja mengingatkan manusia pada kesederhanaan dan keterikatan tak terpisahkan dengan rimba tropis Jambi.',
          culturalFunction: 'Instrumen melodis dalam ansambel musik Melayu Jambi bersama gendang redap dan gong.',
          officialReference: 'SK Penetapan WBTb Kemendikbudristek No. 201600329',
          keyTakeaway: 'Kelintang Kayu mengajarkan kepekaan akustik lingkungan dan penghargaan terhadap kearifan rimba.'
        },
        challengeQuiz: {
          question: 'Alasan utama leluhur Jambi memilih kayu pohon mahang atau lempung untuk bilah Kelintang Kayu adalah...',
          options: [
            { id: 'opt-1', text: 'Memiliki serat elastis dengan rongga pori yang mampu menghasilkan resonansi nada akustik yang hangat dan merdu', isCorrect: true },
            { id: 'opt-2', text: 'Karena kayu tersebut tidak disukai rayap dan sangat berat', isCorrect: false },
            { id: 'opt-3', text: 'Hanya karena kayu tersebut paling murah di pasar pekan', isCorrect: false },
            { id: 'opt-4', text: 'Diwajibkan oleh mandor perkebunan kolonial', isCorrect: false }
          ],
          explanation: 'Kearifan organologi tradisional Jambi mengenali karakteristik getaran kayu mahang sehingga menghasilkan timbre nada khas Melayu.',
          philosophicalNote: 'Keahlian leluhur membaca sifat alam adalah sains organik yang tak ternilai.'
        },
        kantiAdvice: {
          hint: 'Cocokkan bilah kayu dengan kelestarian hutan, dan tabuh karet pemukul dengan kehalusan cara menasihati sesama.',
          whyItMatters: 'Alat musik ini terancam punah karena berkurangnya pengrajin yang menguasai tuning laras pentatonik kayu mahang.',
          interactivePrompt: 'Bagaimana instrumen akustik tradisional dapat dipadukan dengan produksi musik digital modern?'
        },
        mosaicPiece: {
          gridIndex: 6,
          label: 'Keping 07: Denting Kelintang Kayu',
          pieceTitle: 'Resonansi Harmoni Alam Rimba'
        }
      },
      {
        id: 'lvl-pantun-batanghari',
        worldId: 'world-2-suara',
        levelNumber: 4,
        title: 'Pantun Bersambut Melayu Batanghari',
        culturalCategory: 'Sastra Lisan & Tradisi',
        regency: 'Kabupaten Batanghari',
        thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        type: 'language',
        difficulty: 'sedang',
        xpReward: 60,
        culturalQuote: 'Dari Jambi ke Muara Sabak, singgah sebentar di Pulau Berhala.',
        languageConfig: {
          rawPhrase: 'Batanghari aeknyo tenang, sungguhpun tenang deras ke tepi',
          words: ['Batanghari', 'aeknyo', 'tenang,', 'sungguhpun', 'tenang', 'deras', 'ke', 'tepi'],
          correctOrder: ['Batanghari', 'aeknyo', 'tenang,', 'sungguhpun', 'tenang', 'deras', 'ke', 'tepi'],
          culturalMeaningQuestion: 'Apa makna filosofis dari bait lirik legendaris lagu/pantun Jambi "Batanghari aeknyo tenang, sungguhpun tenang deras ke tepi"?',
          culturalMeaningOptions: [
            { id: 'opt-1', text: 'Karakter masyarakat Melayu yang tampak tenang dan santun di luar, namun memiliki keteguhan prinsip batin dan tekad yang luar biasa', isCorrect: true },
            { id: 'opt-2', text: 'Peringatan bahwa mandi di sungai Batanghari sangat berbahaya saat musim hujan', isCorrect: false },
            { id: 'opt-3', text: 'Perahu dayung sebaiknya tidak berlayar ke tepi sungai', isCorrect: false },
            { id: 'opt-4', text: 'Kecepatan aliran air sungai telah diukur secara hidrologis', isCorrect: false }
          ]
        },
        learningMaterial: {
          origin: 'Tepian Sungai Batanghari, Seberang Kota Jambi',
          historicalContext: 'Sungai Batanghari adalah sungai terpanjang di Pulau Sumatra (sekitar 800 km). Sepanjang aliran sungai ini mengalir ribuan bait pantun yang merekam interaksi sosial perahu dagang.',
          philosophicalMeaning: 'Kesantunan bukan berarti kelemahan. Ketenangan sikap adalah wadah dari ketajaman berpikir dan ketabahan menghadapi cobaan hidup.',
          culturalFunction: 'Tradisi berpantun saat meminang (antar sirih), upacara adat, serta hiburan rakyat.',
          officialReference: 'Inventarisasi Karya Budaya BPK Wilayah V',
          keyTakeaway: 'Bahasa Melayu Jambi mengajarkan seni berkomunikasi santun, diplomatis, dan penuh kiasan mendalam.'
        },
        challengeQuiz: {
          question: 'Tradisi "Pantun Bersambut" dalam prosesi peminangan adat Jambi berfungsi sebagai...',
          options: [
            { id: 'opt-1', text: 'Ujian kecerdasan akal budi, kesiapan mental, dan adab diplomasi kedua belah pihak keluarga secara terhormat', isCorrect: true },
            { id: 'opt-2', text: 'Debat sengit untuk menentukan besaran mahar uang tunai', isCorrect: false },
            { id: 'opt-3', text: 'Syarat formalitas sebelum menandatangani dokumen notaris', isCorrect: false },
            { id: 'opt-4', text: 'Pertunjukan teater komedi semata tanpa kaitan adat', isCorrect: false }
          ],
          explanation: 'Berbalas pantun menguji kelihaian berbahasa santun dan kearifan para juru bicara adat kedua keluarga pengantin.',
          philosophicalNote: 'Kata-kata yang elok mempererat silaturahmi yang renggang.'
        },
        kantiAdvice: {
          hint: 'Ingat lirik lagu daerah Batanghari: "Batanghari aeknyo tenang..." kata berikutnya adalah "sungguhpun tenang deras ke tepi".',
          whyItMatters: 'Pantun telah diakui oleh UNESCO sebagai Warisan Budaya Takbenda Dunia dari Indonesia dan Malaysia.',
          interactivePrompt: 'Buatlah satu bait pantun nasehat untuk mengajak teman-teman sebaya melestarikan warisan Jambi!'
        },
        mosaicPiece: {
          gridIndex: 7,
          label: 'Keping 08: Pantun Aliran Batanghari',
          pieceTitle: 'Kedalaman Jiwa Sastra Melayu'
        }
      }
    ]
  },
  {
    id: 'world-3-rasa',
    worldNumber: 3,
    name: 'WORLD 3: RASA JAMBI',
    subName: 'Kearifan Gastronomi & Hasil Bumi Nusantara',
    themeColor: 'from-[#C85A32] to-[#D97706]',
    accentColor: '#D97706',
    iconName: 'Utensils',
    description: 'Rasakan kelezatan olahan fermentasi Tempoyak Patin, kelembutan Gulai Tepek Ikan, dan aroma Kopi Arabika Kayu Aro Kerinci.',
    requiredXpToUnlock: 300,
    levels: [
      {
        id: 'lvl-tempoyak-patin',
        worldId: 'world-3-rasa',
        levelNumber: 1,
        title: 'Gulai Tempoyak Ikan Patin',
        culturalCategory: 'Kuliner Tradisional WBTb',
        regency: 'Kabupaten Batanghari / Kota Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        type: 'visual',
        difficulty: 'mudah',
        xpReward: 50,
        culturalQuote: 'Fermentasi buah durian melahirkan cita rasa asam gurih autentik Melayu Batanghari.',
        visualConfig: {
          imageSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
          gridSize: 3
        },
        learningMaterial: {
          origin: 'Daerah Aliran Sungai Batanghari, Jambi',
          historicalContext: 'Tempoyak adalah produk fermentasi daging buah durian masak dengan sedikit garam yang didiamkan dalam bejana tanah liat tertutup selama 3 hingga 7 hari. Tradisi ini lahir dari kearifan mengawetkan panen durian yang melimpah di hutan Jambi.',
          philosophicalMeaning: 'Simbol kemampuan masyarakat mengolah sesuatu yang berlebih menjadi berkah berkelanjutan tanpa membuang makanan (zero food waste).',
          culturalFunction: 'Sajian kehormatan pada makan beserang (makan bersama duduk bersila beralas daun) dan pesta adat.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201400115',
          keyTakeaway: 'Bioteknologi fermentasi tradisional mencerminkan kecerdasan leluhur dalam kedaulatan pangan lokal.'
        },
        challengeQuiz: {
          question: 'Nilai ekologis dan filosofis terbesar dari tradisi pembuatan tempoyak durian oleh masyarakat Jambi adalah...',
          options: [
            { id: 'opt-1', text: 'Kearifan pengawetan pangan alami (zero waste) saat musim panen durian melimpah agar dapat dinikmati sepanjang tahun', isCorrect: true },
            { id: 'opt-2', text: 'Menghindari bau menyengat durian segar di dalam rumah panggung', isCorrect: false },
            { id: 'opt-3', text: 'Durian fermentasi hanya disajikan sebagai obat racun serangga', isCorrect: false },
            { id: 'opt-4', text: 'Hasil tiruan dari resep makanan cepat saji Eropa abad ke-19', isCorrect: false }
          ],
          explanation: 'Masyarakat Melayu Jambi mengembangkan teknik pengawetan asam laktat alami sehingga durian hutan tidak terbuang sia-sia.',
          philosophicalNote: 'Menghargai hasil bumi adalah wujud rasa syukur paling nyata.'
        },
        kantiAdvice: {
          hint: 'Perhatikan kuah kuning kental kunyit berpadu potongan ikan patin segar dan irisan cabai merah. Susun mangkuk saji dari tepi ke tengah.',
          whyItMatters: 'Tempoyak Jambi adalah identitas gastronomi khas yang kaya probiotik alami warisan nenek moyang.',
          interactivePrompt: 'Bagaimana kuliner tempoyak dapat dikemas secara higienis agar mendunia laksana kimchi Korea?'
        },
        mosaicPiece: {
          gridIndex: 8,
          label: 'Keping 09: Cita Rasa Tempoyak',
          pieceTitle: 'Kedaulatan Pangan & Bioteknologi Lokal'
        }
      },
      {
        id: 'lvl-gulai-tepek-ikan',
        worldId: 'world-3-rasa',
        levelNumber: 2,
        title: 'Gulai Tepek Ikan Kesultanan',
        culturalCategory: 'Kuliner Tradisional WBTb',
        regency: 'Kota Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
        type: 'historical',
        difficulty: 'sedang',
        xpReward: 65,
        culturalQuote: 'Adonan ikan gabus ditumbuk dan ditepek tipis, dimasak dalam kuah kari santan asam belimbing wuluh.',
        historicalConfig: {
          events: [
            {
              id: 'tepek-1',
              title: 'Kuliner Istana Kesultanan Melayu Jambi',
              periodText: 'Abad ke-16 – 18 Masehi',
              description: 'Gulai Tepek Ikan diciptakan khusus sebagai hidangan jamuan kehormatan istana bagi para raja, menteri adat, dan utusan kesultanan sahabat.',
              correctRank: 1
            },
            {
              id: 'tepek-2',
              title: 'Tradisi Jamuan "Makan Beradat"',
              periodText: 'Abad ke-19 Masehi',
              description: 'Masuk ke dalam tata cara jamuan resmi pernikahan Melayu Jambi dalam wadah pinggan piring keramik kuno dengan susunan lauk adat wajib.',
              correctRank: 2
            },
            {
              id: 'tepek-3',
              title: 'Penyebaran ke Seluruh Tepian Seberang Kota',
              periodText: 'Pertengahan Abad ke-20',
              description: 'Resep rahasia istana mulai dibagikan dan dipraktikkan secara turun-temurun oleh para ibu rumah tangga di kampung-kampung Seberang Kota Jambi.',
              correctRank: 3
            },
            {
              id: 'tepek-4',
              title: 'Penetapan Warisan Budaya Takbenda Indonesia',
              periodText: 'Tahun 2017 – Sekarang',
              description: 'Ditetapkan secara resmi oleh Kemendikbudristek sebagai WBTb Nasional kategori Kemahiran dan Kerajinan Tradisional/Kuliner.',
              correctRank: 4
            }
          ]
        },
        learningMaterial: {
          origin: 'Kampung Seberang Kota Jambi (Sekoja)',
          historicalContext: 'Kata "tepek" berasal dari bahasa Melayu Jambi yang berarti memipihkan adonan dengan telapak tangan. Bahan dasarnya adalah daging ikan gabus atau tenggiri yang diaduk dengan tepung sagu, direbus, lalu dipotong jajar genjang.',
          philosophicalMeaning: 'Mengajarkan ketelatenan dan kesabaran; kelezatan sejati menuntut proses pengolahan yang cermat dan penuh cinta kasih.',
          culturalFunction: 'Hidangan sakral pada upacara perkawinan adat Jambi dan perayaan Idul Fitri.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201700493',
          keyTakeaway: 'Tepek Ikan membuktikan tingginya peradaban kuliner istana Melayu Jambi.'
        },
        challengeQuiz: {
          question: 'Mengapa adonan daging ikan dan sagu pada hidangan ini disebut dengan istilah "Tepek"?',
          options: [
            { id: 'opt-1', text: 'Karena adonannya dipipihkan secara tradisional menggunakan ketukan telapak tangan hingga pipih sebelum direbus', isCorrect: true },
            { id: 'opt-2', text: 'Karena dimasak di atas daun tepek yang tumbuh di hutan', isCorrect: false },
            { id: 'opt-3', text: 'Merupakan nama salah seorang juru masak istana kesultanan', isCorrect: false },
            { id: 'opt-4', text: 'Karena menggunakan wajan besi tempa khas Tiongkok', isCorrect: false }
          ],
          explanation: 'Secara etimologi bahasa daerah Jambi, "ditepek-tepek" artinya ditepuk dan dipipihkan dengan telapak tangan.',
          philosophicalNote: 'Ketelitian tangan pengolah adalah rahasia rasa yang tak dapat digantikan mesin.'
        },
        kantiAdvice: {
          hint: 'Mulai dari era istana abad ke-16, pergeseran ke tradisi makan beradat, meluasnya ke Seberang Kota, hingga penetapan WBTb nasional.',
          whyItMatters: 'Gulai Tepek Ikan kini menjadi menu diplomasi kuliner resmi Pemprov Jambi untuk tamu-tamu kenegaraan.',
          interactivePrompt: 'Bagaimana gastronomi lokal dapat menjadi motor penggerak ekonomi kreatif pariwisata daerah?'
        },
        mosaicPiece: {
          gridIndex: 9,
          label: 'Keping 10: Gulai Tepek Ikan',
          pieceTitle: 'Kehalusan Gastronomi Istana'
        }
      },
      {
        id: 'lvl-kopi-kerinci',
        worldId: 'world-3-rasa',
        levelNumber: 3,
        title: 'Kopi Arabika Kayu Aro Kerinci',
        culturalCategory: 'Hasil Bumi & Budaya Agraris',
        regency: 'Kabupaten Kerinci & Kota Sungai Penuh',
        thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'sedang',
        xpReward: 60,
        culturalQuote: 'Tumbuh subur di lereng Gunung Kerinci, disiram abu vulkanik tanah sakti berjuluk Sekepal Tanah dari Surga.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-c1',
              symbolName: 'Ketinggian 1.400–1.700 mdpl',
              symbolSnippet: 'Kebun kopi lereng vulkanik tertinggi Sumatra',
              meaningText: 'Pematangan lambat menghasilkan profil rasa fruity rempah yang kompleks dan asam sitrat menyegarkan.'
            },
            {
              id: 'pair-c2',
              symbolName: 'Tradisi Kopi Kawa Daun',
              symbolSnippet: 'Menyeduh daun kopi kering di tabung bambu',
              meaningText: 'Simbol perlawanan kultural rakyat terhadap tanam paksa kolonial dengan tetap menikmati sari tanaman kopi.'
            },
            {
              id: 'pair-c3',
              symbolName: 'Petik Merah Selektif Petani Koerintji',
              symbolSnippet: 'Hanya memetik buah kopi yang matang sempurna',
              meaningText: 'Nilai kejujuran, disiplin kerja, dan komitmen mutu dalam memuliakan rezeki dari alam semesta.'
            },
            {
              id: 'pair-c4',
              symbolName: 'Sertifikasi Indikasi Geografis (IG)',
              symbolSnippet: 'Pengakuan hak kekayaan intelektual komunal',
              meaningText: 'Perlindungan hukum atas keunikan plasma nutfah dan hak kedaulatan petani lokal di pasar global.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Kayu Aro, Gunung Tujuh, Lembah Kerinci, Jambi',
          historicalContext: 'Lembah Kerinci dikenal sebagai "Sekepal Tanah dari Surga". Tanah vulkanis Andosol di sekitar Gunung Kerinci (3.805 mdpl) menghasilkan kopi Arabika Specialty dengan sertifikasi Indikasi Geografis yang diekspor ke Eropa dan Amerika.',
          philosophicalMeaning: 'Hubungan timbal balik antara manusia dengan gunung keramat; memuliakan tanah dan hutan maka tanah akan memberi berkah kemakmuran.',
          culturalFunction: 'Minuman adat dalam kenduri sko (kenduri pusaka adat suku Kerinci) dan perekat tali silaturahmi.',
          officialReference: 'Sertifikat Indikasi Geografis Kemenkumham RI No. ID G 000000055',
          keyTakeaway: 'Kopi Kerinci membuktikan bahwa komoditas lokal Jambi berkelas dunia ketika dikelola dengan integritas dan kelestarian ekologis.'
        },
        challengeQuiz: {
          question: 'Tradisi meminum seduhan daun kopi panggang ("Kopi Kawa Daun") di dataran tinggi Kerinci lahir dari latar belakang...',
          options: [
            { id: 'opt-1', text: 'Resistensi rakyat di masa penjajahan Belanda ketika biji kopi disita untuk ekspor, sehingga rakyat menyeduh daun kopi sebagai gantinya', isCorrect: true },
            { id: 'opt-2', text: 'Karena petani kuno tidak tahu cara menumbuk biji kopi', isCorrect: false },
            { id: 'opt-3', text: 'Perintah langsung dari Sultan Jambi untuk menghemat biji kopi', isCorrect: false },
            { id: 'opt-4', text: 'Resep obat tradisional untuk mengobati penyakit demam malaria saja', isCorrect: false }
          ],
          explanation: 'Kawa daun adalah saksi sejarah daya juang masyarakat perdesaan yang cerdas mencari alternatif di tengah tekanan sistem tanam paksa.',
          philosophicalNote: 'Kreativitas di tengah himpitan hidup melahirkan tradisi budaya yang tak terlupakan.'
        },
        kantiAdvice: {
          hint: 'Hubungkan petik merah dengan nilai kejujuran petani, dan kawa daun dengan simbol daya juang rakyat menghadapi tanam paksa.',
          whyItMatters: 'Kopi Arabika Kerinci memenangkan predikat Kopi Spesialti Terbaik Indonesia di berbagai festival internasional.',
          interactivePrompt: 'Bagaimana peran anak muda sebagai barista dan agropreneur dalam mengangkat pamor kopi daerah?'
        },
        mosaicPiece: {
          gridIndex: 10,
          label: 'Keping 11: Aroma Kopi Sakti Kerinci',
          pieceTitle: 'Kesuburan Tanah dan Martabat Petani'
        }
      },
      {
        id: 'lvl-dodol-kentang-gandus',
        worldId: 'world-3-rasa',
        levelNumber: 4,
        title: 'Kudapan Tradisional Dodol Kentang & Kue Gandus',
        culturalCategory: 'Kudapan Tradisional',
        regency: 'Kabupaten Kerinci & Kota Jambi',
        thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'mudah',
        xpReward: 50,
        culturalQuote: 'Gotong royong mengaduk dodol berjam-jam mengajarkan ketahanan mental dan persaudaraan.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-d1',
              symbolName: 'Kawah Besi Besar Dodol Komunal',
              symbolSnippet: 'Wadah memasak dodol berukuran raksasa',
              meaningText: 'Simbol ruang persaudaraan di mana seluruh warga kampung bergantian mengayuh dayung pengaduk.'
            },
            {
              id: 'pair-d2',
              symbolName: 'Bahan Kentang Granola Kerinci',
              symbolSnippet: 'Hasil bumi umbi dataran tinggi dingin',
              meaningText: 'Kreativitas memanfaatkan potensi lokal menjadi penganan khas bernilai ekonomis tinggi.'
            },
            {
              id: 'pair-d3',
              symbolName: 'Topping Abon Ikan & Bawang Goreng Gandus',
              symbolSnippet: 'Taburan gurih di atas kue tepung beras putih',
              meaningText: 'Keseimbangan rasa hidup: ada manis, ada gurih asin, mencerminkan liku-liku perjalanan manusia.'
            },
            {
              id: 'pair-d4',
              symbolName: 'Daun Pisang Pembungkus Alami',
              symbolSnippet: 'Kemasan tradisional ramah lingkungan',
              meaningText: 'Keharuman alami yang mengajarkan manusia untuk tidak meninggalkan jejak sampah anorganik bagi bumi.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Kerinci (Dodol Kentang) dan Jambi Kota Seberang (Kue Gandus)',
          historicalContext: 'Dodol kentang merupakan hasil diversifikasi cerdas petani Kerinci sejak tahun 1990-an memanfaatkan limpahan panen kentang. Sementara Kue Gandus berbahan tepung beras dan santan dengan taburan ebi dan cabai adalah takjil adat para bangsawan Melayu.',
          philosophicalMeaning: 'Mengajarkan nilai gotong royong dan ketelatenan komunal (mengaduk dodol membutuhkan waktu 4 hingga 6 jam tanpa henti).',
          culturalFunction: 'Oleh-oleh khas kebanggaan daerah dan hidangan wajib kenduri tasyakuran.',
          officialReference: 'Dinas Kebudayaan dan Pariwisata Provinsi Jambi',
          keyTakeaway: 'Pangan lokal mengikat keakraban sosial antar generasi.'
        },
        challengeQuiz: {
          question: 'Nilai karakter utama yang dipelajari saat masyarakat bergotong royong mengaduk dodol di kawah besar adalah...',
          options: [
            { id: 'opt-1', text: 'Ketahanan mental, kesabaran, dan solidaritas sosial saling bantu antar warga', isCorrect: true },
            { id: 'opt-2', text: 'Persaingan siapa yang paling kuat mengayuh sendok kayu', isCorrect: false },
            { id: 'opt-3', text: 'Memasak cepat dengan mencampurkan bahan kimia pengental', isCorrect: false },
            { id: 'opt-4', text: 'Menghindari pekerjaan lain di rumah', isCorrect: false }
          ],
          explanation: 'Membuat dodol adalah aktivitas sosial yang memupuk kerukunan warga desa sembari bersilaturahmi.',
          philosophicalNote: 'Pekerjaan berat menjadi ringan saat dipikul bersama dalam kehangatan gotong royong.'
        },
        kantiAdvice: {
          hint: 'Perhatikan kawah besar yang melambangkan kebersamaan, dan daun pisang pembungkus yang melambangkan etika ramah lingkungan.',
          whyItMatters: 'Dodol kentang Kerinci berhasil menembus pasar ritel nasional berkat ketekunan UMKM lokal.',
          interactivePrompt: 'Bagaimana kita dapat mengurangi ketergantungan pada makanan cepat saji dengan mencintai camilan lokal?'
        },
        mosaicPiece: {
          gridIndex: 11,
          label: 'Keping 12: Manisnya Dodol & Gandus',
          pieceTitle: 'Gotong Royong dan Kehangatan Silaturahmi'
        }
      }
    ]
  },
  {
    id: 'world-4-karya',
    worldNumber: 4,
    name: 'WORLD 4: KARYA & MOTIF',
    subName: 'Batik Tulis, Tenun Songket & Kriya Luhur',
    themeColor: 'from-[#B45309] to-[#78350F]',
    accentColor: '#B45309',
    iconName: 'Palette',
    description: 'Selami kedalaman filosofi goresan canting Batik Jambi, kilau benang emas Songket Melayu, dan anyaman daun rumbai.',
    requiredXpToUnlock: 500,
    levels: [
      {
        id: 'lvl-batik-durian-pecah',
        worldId: 'world-4-karya',
        levelNumber: 1,
        title: 'Batik Jambi Motif Durian Pecah',
        culturalCategory: 'Kriya & Tekstil WBTb',
        regency: 'Kota Jambi (Kawasan Olak Kemang)',
        thumbnail: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'sedang',
        xpReward: 65,
        culturalQuote: 'Kulit berduri tajam di luar, namun menyimpan daging manis harum dan biji kokoh di dalamnya.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-b1',
              symbolName: 'Buah Durian yang Terbelah Dua',
              symbolSnippet: 'Dua belahan kulit durian yang merekah simetris',
              meaningText: 'Keterbukaan hati seorang manusia yang lapang dada menerima nasehat dan kritik demi kebaikan bersama.'
            },
            {
              id: 'pair-b2',
              symbolName: 'Biji Durian Kokoh di Dalam (Kesang)',
              symbolSnippet: 'Bagian tengah biji yang bulat padat',
              meaningText: 'Keteguhan iman dan pondasi akidah yang tak tergoyahkan oleh godaan duniawi.'
            },
            {
              id: 'pair-b3',
              symbolName: 'Daging Buah Berwarna Kuning Emas',
              symbolSnippet: 'Tekstur lembut yang manis dan beraroma wangi',
              meaningText: 'Kehalusan tutur kata dan budi pekerti mulia yang mendatangkan kemanfaatan bagi siapa saja yang bergaul dengannya.'
            },
            {
              id: 'pair-b4',
              symbolName: 'Duri-Duri Tajam di Kulit Luar',
              symbolSnippet: 'Susunan duri runcing pelindung buah',
              meaningText: 'Prinsip ketegasan diri dan benteng pertahanan moral agar tidak mudah disusupi pengaruh buruk.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Kampung Tenun & Batik Danau Teluk, Seberang Kota Jambi',
          historicalContext: 'Motif Durian Pecah merupakan motif batik tertua dan paling prestisius dalam tradisi membatik Melayu Jambi. Dahulu hanya boleh dikenakan oleh keluarga sultan dan pembesar adat.',
          philosophicalMeaning: 'Mengajarkan filosofi kepribadian Melayu sejati: tampak tegas dan berprinsip kokoh di luar, namun berhati lembut, dermawan, serta manis budi pekertinya di dalam.',
          culturalFunction: 'Kain sarung dan selendang pada upacara adat kebesaran, pernikahan, dan seragam resmi kebanggaan Jambi.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201300011 (Batik Jambi)',
          keyTakeaway: 'Keindahan motif batik tradisional bukan sekadar lukisan kain, melainkan kitab tuntunan moral kehidupan.'
        },
        challengeQuiz: {
          question: 'Pesan filosofis utama dari motif Batik Jambi "Durian Pecah" bagi pembentukan karakter pribadi adalah...',
          options: [
            { id: 'opt-1', text: 'Menjadi pribadi yang beriman teguh, berprinsip tegas menjaga integritas, namun senantiasa bertutur kata manis dan berhati lapang', isCorrect: true },
            { id: 'opt-2', text: 'Menunjukkan bahwa pemilik kain adalah pedagang buah durian terkaya di Jambi', isCorrect: false },
            { id: 'opt-3', text: 'Peringatan agar berhati-hati saat berjalan di bawah pohon durian yang lebat', isCorrect: false },
            { id: 'opt-4', text: 'Larangan memakai busana batik berwarna selain kuning durian', isCorrect: false }
          ],
          explanation: 'Motif Durian Pecah mengajarkan harmoni antara keteguhan prinsip moral dengan kelembutan etika kesopanan.',
          philosophicalNote: 'Batik adalah rajutan doa leluhur yang diabadikan dalam malam dan lilin canting.'
        },
        kantiAdvice: {
          hint: 'Ingat kiasan buah durian: duri tajam = benteng moral tegas; daging manis = kehalusan budi pekerti; biji kokoh = keteguhan iman.',
          whyItMatters: 'Motif ini adalah mahakarya seni rupa Nusantara yang memiliki nilai estetika tinggi dan telah didaftarkan hak kekayaan intelektualnya.',
          interactivePrompt: 'Bagaimana perancang busana muda dapat mengaplikasikan motif Durian Pecah ke fesyen streetwear kekinian?'
        },
        mosaicPiece: {
          gridIndex: 12,
          label: 'Keping 13: Kemuliaan Durian Pecah',
          pieceTitle: 'Integritas Batin dan Kelembutan Budi'
        }
      },
      {
        id: 'lvl-motif-batanghari-kapal',
        worldId: 'world-4-karya',
        levelNumber: 2,
        title: 'Motif Batanghari & Kapal Sanggat',
        culturalCategory: 'Kriya & Tekstil WBTb',
        regency: 'Kota Jambi & Tanjung Jabung Barat',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        type: 'visual',
        difficulty: 'sedang',
        xpReward: 60,
        culturalQuote: 'Air beriak tanda tak dalam, kapal sanggat mengajarkan kehati-hatian mengarungi samudra kehidupan.',
        visualConfig: {
          imageSrc: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
          gridSize: 3
        },
        learningMaterial: {
          origin: 'Muara Tembesi, Batanghari hingga Muara Sabak, Jambi',
          historicalContext: 'Motif Batanghari menggambarkan kelokan air sungai yang tenang, sedangkan motif Kapal Sanggat menggambarkan perahu layar yang kandas karena air surut. Keduanya adalah motif klasik ciptaan pembatik pesisir sungai Batanghari.',
          philosophicalMeaning: 'Mengajarkan hukum kehati-hatian dalam bertindak; setiap perbuatan harus diperhitungkan dengan cermat agar perahu kehidupan tidak kandas menabrak karang nafsu.',
          culturalFunction: 'Bahan busana kehormatan para datuk adat dan permaisuri.',
          officialReference: 'Inventarisasi Motif Khas Dekranasda Provinsi Jambi',
          keyTakeaway: 'Alam lingkungan sungai menjadi guru terbaik yang menginspirasi corak seni visual Melayu.'
        },
        challengeQuiz: {
          question: 'Filosofi dari motif "Kapal Sanggat" (kapal kandas) dalam falsafah hidup orang Melayu Jambi adalah...',
          options: [
            { id: 'opt-1', text: 'Pengingat agar manusia senantiasa berhati-hati, cermat memperhitungkan masa depan, dan tidak sombong mengarungi kehidupan', isCorrect: true },
            { id: 'opt-2', text: 'Larangan menggunakan perahu layar saat air sungai Batanghari pasang', isCorrect: false },
            { id: 'opt-3', text: 'Cerita rakyat tentang saudagar kaya yang menjadi perompak', isCorrect: false },
            { id: 'opt-4', text: 'Desain teknis perkapalan untuk perairan dangkal', isCorrect: false }
          ],
          explanation: 'Sanggat bermakna kandas karena salah memperkirakan pasang surut air sungai; metafora bagi orang yang tergesa-gesa tanpa perhitungan.',
          philosophicalNote: 'Kecermatan menuntun keselamatan langkah di masa depan.'
        },
        kantiAdvice: {
          hint: 'Perhatikan lekukan sulur air mengalir di bagian bawah dan siluet perahu layar tradisional di bagian tengah motif.',
          whyItMatters: 'Motif maritim-sungai ini adalah bukti sejarah bahwa masyarakat Jambi adalah pelaut ulung yang akrab dengan navigasi air.',
          interactivePrompt: 'Bagaimana sungai Batanghari saat ini dapat dipulihkan agar keindahannya terus menginspirasi seni lokal?'
        },
        mosaicPiece: {
          gridIndex: 13,
          label: 'Keping 14: Sulur Sungai Batanghari',
          pieceTitle: 'Kearifan Arus dan Kehati-hatian Hidup'
        }
      },
      {
        id: 'lvl-kriya-anyaman-rumbai',
        worldId: 'world-4-karya',
        levelNumber: 3,
        title: 'Kriya Anyaman Daun Rumbai & Pandan',
        culturalCategory: 'Kerajinan Tradisional WBTb',
        regency: 'Kabupaten Muaro Jambi & Tanjung Jabung Timur',
        thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
        type: 'visual',
        difficulty: 'mudah',
        xpReward: 50,
        culturalQuote: 'Jalinan daun rawa gambut membuktikan harmoni manusia dengan ekosistem lahan basah.',
        visualConfig: {
          imageSrc: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
          gridSize: 3
        },
        learningMaterial: {
          origin: 'Kawasan Ekosistem Lahan Basah dan Hutan Rawa Gambut Tanjung Jabung Timur & Muaro Jambi',
          historicalContext: 'Tumbuhan rumbai (sejenis rumput rawa berdaun panjang kuat) dipanen secara lestari, dijemur, diwarnai menggunakan getah kayu sepang alami, lalu dianyam menjadi tikar sembahyang, tas ambung, dan bakul beras.',
          philosophicalMeaning: 'Melambangkan kelenturan menghadapi perubahan zaman tanpa kehilangan kekuatan jati diri, serta komitmen menjaga rimba rawa gambut dari kebakaran.',
          culturalFunction: 'Perlengkapan rumah tangga sehari-hari dan mahar pelengkap dalam upacara adat.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201900845',
          keyTakeaway: 'Anyaman rumbai adalah circular economy ramah lingkungan yang dipraktikkan turun-temurun oleh perempuan Melayu Jambi.'
        },
        challengeQuiz: {
          question: 'Mengapa kerajinan anyaman daun rumbai di Jambi bernilai tinggi bagi pelestarian ekologi modern?',
          options: [
            { id: 'opt-1', text: 'Karena 100% biodegradable berbahan tumbuhan rawa alami dan mendorong pelestarian hutan gambut dari alih fungsi lahan', isCorrect: true },
            { id: 'opt-2', text: 'Karena diimpor dari bahan sintetis luar negeri', isCorrect: false },
            { id: 'opt-3', text: 'Karena hanya boleh dianyam menggunakan mesin bertenaga listrik', isCorrect: false },
            { id: 'opt-4', text: 'Dibuat untuk menggantikan perabot logam anti karat', isCorrect: false }
          ],
          explanation: 'Pemanfaatan daun rumbai menjaga ekosistem gambut tetap basah dan terjaga karena masyarakat merasakan langsung manfaat ekonominya.',
          philosophicalNote: 'Menjaga hutan berarti menjaga keberlangsungan karya seni dan napas kehidupan kita.'
        },
        kantiAdvice: {
          hint: 'Perhatikan pola geometris zig-zag anyaman tikar. Susun potongan dengan gradasi warna teratur dari sudut luar.',
          whyItMatters: 'Anyaman rumbai adalah solusi pengganti kantong plastik sekali pakai yang estetik dan sarat nilai budaya.',
          interactivePrompt: 'Bagaimana anyaman rumbai dapat dipasarkan ke pameran desain interior internasional?'
        },
        mosaicPiece: {
          gridIndex: 14,
          label: 'Keping 15: Rajutan Daun Rumbai',
          pieceTitle: 'Keberlanjutan Alam dan Ekologi Gambut'
        }
      },
      {
        id: 'lvl-songket-benang-emas',
        worldId: 'world-4-karya',
        levelNumber: 4,
        title: 'Songket Melayu Jambi Benang Emas',
        culturalCategory: 'Kriya & Tekstil Pusaka',
        regency: 'Kota Jambi & Kabupaten Batanghari',
        thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
        type: 'meaning',
        difficulty: 'menantang',
        xpReward: 80,
        culturalQuote: 'Pucuk Rebung di pangkal kain, bertunas luhur memancarkan cahaya adab kesopanan.',
        meaningConfig: {
          pairs: [
            {
              id: 'pair-s1',
              symbolName: 'Motif Pucuk Rebung Berderet',
              symbolSnippet: 'Pola segitiga tunas bambu muda yang runcing ke atas',
              meaningText: 'Semasa muda berguna bagi masyarakat (seperti rebung enak dimakan), setelah tua kokoh menjadi pelindung (bambu yang kuat).'
            },
            {
              id: 'pair-s2',
              symbolName: 'Kilau Benang Emas Makau Asli',
              symbolSnippet: 'Tenunan benang pakan sutra bersepuh emas',
              meaningText: 'Kemurnian niat dan keluhuran derajat budi pekerti yang tidak mudah pudar tergerus waktu.'
            },
            {
              id: 'pair-s3',
              symbolName: 'Motif Bunga Melati di Badan Kain',
              symbolSnippet: 'Bunga empat helai semerbak wangi',
              meaningText: 'Keharuman nama baik keluarga yang harus senantiasa dijaga melalui tutur kata yang sopan dan santun.'
            },
            {
              id: 'pair-s4',
              symbolName: 'Kepala Kain (Tumpal) di Bagian Belakang',
              symbolSnippet: 'Bagian kain yang paling kaya ornamen hiasan',
              meaningText: 'Rasa malu dan kehormatan diri adalah mahkota terindah bagi pemuda dan pemudi Melayu.'
            }
          ]
        },
        learningMaterial: {
          origin: 'Kawasan Kampung Seberang Kota Jambi dan Muara Tembesi',
          historicalContext: 'Seni menenun songket di Jambi telah berkembang sejak zaman Kerajaan Melayu Kuno abad ke-12 yang dipengaruhi jalur sutra maritim perniagaan internasional dengan Tiongkok dan India.',
          philosophicalMeaning: 'Kain songket adalah representasi mahkota peradaban tekstil Melayu. Motif Pucuk Rebung mengajarkan bahwa manusia harus terus bertumbuh memberikan manfaat bagi lingkungannya di setiap fase usia.',
          culturalFunction: 'Busana pengantin adat kebesaran, penobatan gelar adat, dan warisan pusaka keluarga.',
          officialReference: 'SK WBTb Kemendikbudristek No. 201800612',
          keyTakeaway: 'Songket adalah puncak kesabaran penenun tradisional yang menyulam doa dan martabat bangsa.'
        },
        challengeQuiz: {
          question: 'Falsafah hidup apa yang terkandung dalam motif "Pucuk Rebung" pada kain songket Melayu Jambi?',
          options: [
            { id: 'opt-1', text: 'Ketika muda memberikan kemanfaatan (seperti rebung), dan ketika tua menjadi penyangga pelindung masyarakat (seperti bambu yang kokoh)', isCorrect: true },
            { id: 'opt-2', text: 'Larangan menebang pohon bambu di dekat sungai', isCorrect: false },
            { id: 'opt-3', text: 'Tanda bahwa penenun adalah keturunan petani sayuran', isCorrect: false },
            { id: 'opt-4', text: 'Hanya sebagai pengisi ruang kosong di ujung kain', isCorrect: false }
          ],
          explanation: 'Sebagaimana pepatah Melayu: "Kecil bernama rebung, besar bernama betung; kecil dikandung ibu, besar berguna bagi kampung".',
          philosophicalNote: 'Generasi muda yang beradab adalah masa depan peradaban yang gemilang.'
        },
        kantiAdvice: {
          hint: 'Perhatikan motif segitiga Pucuk Rebung yang melambangkan pertumbuhan generasi muda yang berguna bagi sesama.',
          whyItMatters: 'Songket Jambi memiliki kekhasan warna alam dari kayu secang dan kulit jengkol yang kini diminati pasar internasional.',
          interactivePrompt: 'Bagaimana kita dapat melestarikan profesi penenun songket agar tidak hilang ditelan zaman?'
        },
        mosaicPiece: {
          gridIndex: 15,
          label: 'Keping 16: Kilau Emas Songket Melayu',
          pieceTitle: 'Puncak Adab dan Kejayaan Peradaban'
        }
      }
    ]
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgressEntry[] = [
  {
    id: 'std-1',
    studentName: 'Satria Raziq Pratama',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    schoolClass: 'Kelas XI-A (SMA Negeri 1 Kota Jambi)',
    completedPuzzlesCount: 14,
    totalPuzzles: 16,
    averageScore: 94,
    timeSpentMinutes: 185,
    lastActive: '10 Menit Lalu',
    status: 'active'
  },
  {
    id: 'std-2',
    studentName: 'Nasywa Putri Aulia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    schoolClass: 'Kelas XI-A (SMA Negeri 1 Kota Jambi)',
    completedPuzzlesCount: 16,
    totalPuzzles: 16,
    averageScore: 98,
    timeSpentMinutes: 210,
    lastActive: '1 Jam Lalu',
    status: 'completed_assignment'
  },
  {
    id: 'std-3',
    studentName: 'Muhammad Fadhil Ramadhan',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    schoolClass: 'Kelas XI-B (SMA Negeri 1 Kota Jambi)',
    completedPuzzlesCount: 8,
    totalPuzzles: 16,
    averageScore: 78,
    timeSpentMinutes: 95,
    lastActive: 'Kemarin',
    status: 'active'
  },
  {
    id: 'std-4',
    studentName: 'Cut Keisha Meutia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    schoolClass: 'Kelas XI-B (SMA Negeri 1 Kota Jambi)',
    completedPuzzlesCount: 4,
    totalPuzzles: 16,
    averageScore: 65,
    timeSpentMinutes: 45,
    lastActive: '3 Hari Lalu',
    status: 'needs_guidance'
  },
  {
    id: 'std-5',
    studentName: 'Bagas Aditya Pratama',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    schoolClass: 'Kelas XI-A (SMA Negeri 1 Kota Jambi)',
    completedPuzzlesCount: 12,
    totalPuzzles: 16,
    averageScore: 89,
    timeSpentMinutes: 140,
    lastActive: '2 Jam Lalu',
    status: 'active'
  }
];

export const INITIAL_CULTURE_ASSIGNMENTS: CultureAssignment[] = [
  {
    id: 'asg-1',
    title: 'Penjelajahan World 1: Arsitektur & Sejarah Muaro Jambi',
    assignedWorldId: 'world-1-warisan',
    targetLevelCount: 4,
    minimumScorePercent: 80,
    dueDate: '15 September 2026',
    description: 'Selesaikan seluruh 4 puzzle World 1. Pelajari filosofi Rumah Kajang Lako, kronologi Candi Muaro Jambi, dan buat catatan pemahaman kuis.',
    targetGrade: 'Kelas XI SMA / Sederajat',
    status: 'active'
  },
  {
    id: 'asg-2',
    title: 'Penugasan Sastra & Seloko Adat Melayu Jambi (World 2)',
    assignedWorldId: 'world-2-suara',
    targetLevelCount: 4,
    minimumScorePercent: 85,
    dueDate: '22 September 2026',
    description: 'Susun keping seloko adat Jambi dan pahami keterkaitan prinsip Adat bersendi syarak dengan etika komunikasi generasi muda.',
    targetGrade: 'Kelas XI SMA / Sederajat',
    status: 'active'
  },
  {
    id: 'asg-3',
    title: 'Tantangan Mahakarya Batik & Songket Jambi (World 4)',
    assignedWorldId: 'world-4-karya',
    targetLevelCount: 4,
    minimumScorePercent: 90,
    dueDate: '30 September 2026',
    description: 'Pelajari motif Durian Pecah, Pucuk Rebung, dan kriya anyaman rumbai sebagai fondasi materi penulisan essay budaya Jambi.',
    targetGrade: 'Kelas XI SMA / Sederajat',
    status: 'draft'
  }
];
