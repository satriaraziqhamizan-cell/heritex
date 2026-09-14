import { CulturalObject, LivingMapPoint, Badge, WorldRegion, LeaderboardEntry, CrowdsourceReport } from '../types';
import { INDONESIA_CULTURAL_OBJECTS, INDONESIA_LIVING_MAP_POINTS } from './indonesiaCulturalData';

export const INITIAL_WORLDS: WorldRegion[] = [
  {
    id: 'world-jambi',
    name: 'Dunia Jambi (Lembah Batanghari)',
    province: 'Provinsi Jambi',
    description: 'Pusat peradaban maritim Melayu kuno di lembah Sungai Batanghari hingga dataran tinggi Bukit Barisan & Gunung Kerinci. Pilot perintis HERITEX.',
    isUnlocked: true,
    requiredXpOrProgress: 0,
    objectCount: 12,
    previewImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'world-sumatra',
    name: 'Dunia Sumatra Raya',
    province: 'Kepulauan Andalas / Sumatra',
    description: 'Jejaring rempah dan jalur peradaban Swarnadwipa dari Minangkabau, Danau Toba, Sriwijaya Palembang, hingga Kesultanan Aceh.',
    isUnlocked: false,
    requiredXpOrProgress: 500,
    objectCount: 18,
    previewImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'world-nusantara',
    name: 'Semesta Budaya Nusantara (Seluruh Indonesia)',
    province: 'Seluruh Wilayah 38 Provinsi Indonesia',
    description: 'Peta hidup dan ekosistem pengetahuan kebudayaan terintegrasi dari Sabang sampai Merauke.',
    isUnlocked: false,
    requiredXpOrProgress: 1500,
    objectCount: 64,
    previewImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_CULTURAL_OBJECTS: CulturalObject[] = [
  {
    id: 'obj-candi-muaro-jambi',
    name: 'Kawasan Percandian Muaro Jambi',
    localName: 'Candi Muaro Jambi (Menapo)',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-jambi',
    regency: 'Kabupaten Muaro Jambi',
    latitude: -1.4789,
    longitude: 103.6683,
    mapX: 68,
    mapY: 42,
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kompleks percandian bata merah terluas di Asia Tenggara (3.981 hektare) yang menjadi pusat pendidikan filsafat Buddha internasional era Kerajaan Melayu Kuno & Sriwijaya.',
    fullDescription: 'Kawasan Cagar Budaya Nasional Percandian Muaro Jambi membentang sepanjang 7,5 kilometer di tepian Sungai Batanghari. Dibangun antara abad ke-7 hingga ke-14 Masehi, kawasan ini menyimpan lebih dari 80 struktur candi (menapo) berbahan batu bata merah tanah liat bakar tanpa semen perekat, menggunakan teknik gosok basah dan kancingan lempung aluvial. Dahulu berfungsi sebagai universitas kuno dunia yang dikunjungi biksu penjelajah I-Tsing dan sarjana Buddhis agung Atisha Dipankara Srijnana.',
    philosophicalMeaning: 'Melambangkan harmoni antara spiritualitas transendental, adaptasi arsitektur terhadap ekosistem lahan basah rawa riparian, serta keterbukaan diplomasi peradaban Melayu kuno terhadap ilmu pengetahuan dunia.',
    historicalEra: 'Abad ke-7 – 14 Masehi (Kerajaan Melayu Kuno & Sriwijaya)',
    threatLevel: 'at_risk',
    threatReason: 'Aktivitas penimbunan (stockpiling) batubara dan lalu lintas tongkang berbobot besar di Sungai Batanghari memicu abrasi bantaran dan debu polusi pada struktur bata purba.',
    references: [
      {
        id: 'ref-mj-1',
        title: 'Penetapan Kawasan Cagar Budaya Muaro Jambi Peringkat Nasional',
        institution: 'Kemendikbudristek RI / Kepmendikbud No. 259/M/2013',
        year: 2013,
        urlOrDocId: 'SK-MENDIKBUD-259-2013',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-mj-2',
        title: 'Katalog Percandian Muaro Jambi dan Jalur Pelayaran Maritim Kuno',
        institution: 'Balai Pelestarian Kebudayaan (BPK) Wilayah V Jambi',
        year: 2022,
        urlOrDocId: 'BPK-V-MJ-2022-09',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Kompleks Muaro Jambi memiliki luas mencapai 3.981 hektare, menjadikannya situs percandian bata terluas di Asia Tenggara.',
      'Struktur percandian dibangun menggunakan batu bata merah bakar lokal yang disusun tanpa adukan semen modern melainkan teknik presisi gosok basah.',
      'Tercatat dalam prasasti dan kronik Tiongkok era Dinasti Tang sebagai tempat singgah pendeta I-Tsing untuk memperdalam tata bahasa Sanskerta.',
      'Situs ini bukan candi Hindu era Majapahit melainkan vihara dan pusat studi Mahayana-Vajrayana Buddhis terkemuka di Suvarnadvipa.'
    ],
    claimTests: [
      {
        id: 'claim-mj-1',
        statement: 'Candi Muaro Jambi didirikan pada masa Kerajaan Majapahit abad ke-16 menggunakan bongkahan batu andesit gunung berapi.',
        isTrue: false,
        distractorType: 'false_attribution',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru dan bertentangan dengan fakta sejarah. Candi Muaro Jambi dibangun pada abad ke-7 hingga 14 M (era Melayu kuno & Sriwijaya), dan material utamanya adalah batu bata merah lempung bakar lokal, bukan batu andesit gunung.',
        sourceReferenceId: 'ref-mj-1'
      },
      {
        id: 'claim-mj-2',
        statement: 'Kawasan Muaro Jambi berfungsi sebagai pusat pendidikan dan vihara internasional yang pernah disinggahi sarjana agung Atisha Dipankara selama 12 tahun.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih dan terverifikasi dalam arsip sejarah. Atisha Dipankara berguru kepada guru agung Suvarnadvipa Dharmakirti di kawasan ini sebelum menyebarkan ajaran ke Tibet.',
        sourceReferenceId: 'ref-mj-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-rumah-kajang-lako',
    name: 'Rumah Adat Tuho Kajang Lako',
    localName: 'Rumah Tuo Batin Kajang Lako',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-jambi',
    regency: 'Kabupaten Merangin & Sarolangun',
    latitude: -2.3012,
    longitude: 102.6511,
    mapX: 36,
    mapY: 64,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Rumah panggung tradisional Melayu Batin dengan atap berbentuk perahu melengkung (kajang lako), dirancang dengan kearifan lokal tahan gempa melalui sistem pasak kayu tanpa paku.',
    fullDescription: 'Rumah Kajang Lako adalah adikarya arsitektur vernakular suku Melayu Batin di Rantau Panjang. Ciri utamanya terletak pada atap yang menyerupai perahu terbalik dengan pucuk melentik (potong jerambah). Seluruh konstruksi bertumpu pada tiang tuo berbahan kayu ulin/bulian dengan sambungan lubang dan pasak kayu (knock-down) tanpa paku besi, menjadikannya sangat fleksibel dalam meredam getaran seismik gempa sesar Semangko Bukit Barisan.',
    philosophicalMeaning: 'Pembagian ruang terdiri dari Pelamban (ruang tamu bawah), Gaho (dapur dan ruang keluarga), Masinding (musyawarah adat kaum laki-laki), dan Baheo (ruang perlindungan anak gadis), mencerminkan adab musyawarah, kesucian marwah keluarga, dan penghormatan kepada tamu.',
    historicalEra: 'Abad ke-14 Masehi (Adat Melayu Batin Rantau Panjang)',
    threatLevel: 'critical',
    threatReason: 'Banyak unit rumah tua yang mengalami pelapukan karena kelangkaan kayu bulian tua dan tekanan generasi muda yang mengubah hunian menjadi bangunan tembok semen.',
    references: [
      {
        id: 'ref-kl-1',
        title: 'Inventarisasi Karya Budaya Rumah Adat Kajang Lako Jambi',
        institution: 'Direktorat Warisan dan Diplomasi Budaya Kemendikbud',
        year: 2014,
        urlOrDocId: 'WBTB-REG-201400110',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-kl-2',
        title: 'Kajian Rekayasa Tahan Gempa Arsitektur Tradisional Rantau Panjang',
        institution: 'Museum Siginjai Jambi & BPK Wilayah V',
        year: 2021,
        urlOrDocId: 'MS-JMB-RKL-2021',
        type: 'Journal'
      }
    ],
    curatedFacts: [
      'Struktur panggung Rumah Kajang Lako dibangun tanpa menggunakan paku besi satu pun, melainkan mengandalkan pasak kayu ulin.',
      'Atap berdesain "potong jerambah" menyerupai perahu terbalik untuk memudahkan aliran curahan air hujan lebat tropis dataran tinggi.',
      'Tiang-tiang utama tidak ditanam ke tanah mati, melainkan diletakkan di atas umpak batu sungai agar fleksibel saat pergeseran gempa bumi.',
      'Kawasan perkampungan Rumah Tuo Rantau Panjang telah dihuni secara turun-temurun sejak ratusan tahun lalu dengan aturan hukum adat desa.'
    ],
    claimTests: [
      {
        id: 'claim-kl-1',
        statement: 'Konstruksi Rumah Kajang Lako menggunakan semen cor beton bertulang pada tiang penyangga utamanya.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Rumah Kajang Lako murni menggunakan sistem arsitektur kayu bulian/ulin dengan sambungan pasak tradisional di atas umpak batu alam tanpa semen cor beton.',
        sourceReferenceId: 'ref-kl-2'
      },
      {
        id: 'claim-kl-2',
        statement: 'Sistem sambungan pasak kayu pada Rumah Kajang Lako berfungsi sebagai peredam getaran alami saat gempa sesar bukit barisan melanda.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini terverifikasi secara ilmiah dan arsitektural. Sambungan lentur pasak kayu memungkinkan rangka rumah bergoyang tanpa retak atau patah runtuh saat terjadi gempa.',
        sourceReferenceId: 'ref-kl-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-senandung-jolo',
    name: 'Sastra Lisan Senandung Jolo',
    localName: 'Senandung Jolo Dusun Tanjung Pasir',
    category: 'Sastra Lisan & Tradisi',
    worldId: 'world-jambi',
    regency: 'Kabupaten Muaro Jambi',
    latitude: -1.5302,
    longitude: 103.6215,
    mapX: 62,
    mapY: 52,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tradisi sastra lisan berpantun spontan diiringi ketukan alat musik kelentung kayu nangka, dilantunkan saat menugal padi atau upacara adat Melayu.',
    fullDescription: 'Senandung Jolo adalah tradisi vokal lisan masyarakat Melayu di Dusun Tanjung Pasir, Muaro Jambi. Pelantun menembangkan pantun-pantun nasihat kehidupan, kearifan pertanian pasang surut, dan ungkapan asmara santun dengan melodi khas yang diiringi ketukan ritmis alat musik kelentung (batang kayu nangka atau mahang berongga) serta rebana siam. Tradisi ini terancam punah karena maestro pelestari yang tersisa berusia sangat lanjut.',
    philosophicalMeaning: 'Mengajarkan nilai gotong royong ("pelarik pelantak") dalam berladang, kesantunan bertutur kata melalui metafora alam, serta ikatan batin antargenerasi masyarakat bantaran Sungai Batanghari.',
    historicalEra: 'Abad ke-16 Masehi (Tradisi Komunal Melayu Riparian)',
    threatLevel: 'critical',
    threatReason: 'Maestro utama yang menguasai seluruh perbendaharaan pantun kuno dan pukulan kelentung kini berusia lanjut (di atas 80 tahun) dan regenerasi pemuda lokal sangat minim.',
    references: [
      {
        id: 'ref-sj-1',
        title: 'Penetapan Warisan Budaya Takbenda Indonesia: Senandung Jolo',
        institution: 'Kemendikbudristek RI / No. Registrasi 201400109',
        year: 2014,
        urlOrDocId: 'WBTb-201400109',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-sj-2',
        title: 'Dokumentasi Vitalitas Tradisi Lisan Kelentung Jambi',
        institution: 'Taman Budaya Jambi & Asosiasi Tradisi Lisan (ATL)',
        year: 2023,
        urlOrDocId: 'TBJ-ATL-SJ-2023',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Alat musik kelentung pengiring Senandung Jolo dibuat dari empat bilah kayu pohon nangka atau mahang yang dipahat berongga untuk menghasilkan nada berbeda.',
      'Pantun yang dilantunkan dibuat secara spontan mengikuti suasana sawah atau hajatan adat perkawinan.',
      'Telah ditetapkan sebagai Warisan Budaya Takbenda (WBTb) Indonesia pada domain Tradisi dan Ekspresi Lisan tahun 2014.',
      'Seni ini merekam kosakata Melayu Jambi kuno yang sudah jarang terdengar dalam percakapan sehari-hari.'
    ],
    claimTests: [
      {
        id: 'claim-sj-1',
        statement: 'Instrumen utama pengiring Senandung Jolo adalah gitar listrik dan drum modern impor dari Eropa.',
        isTrue: false,
        distractorType: 'exaggeration',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini jelas keliru. Senandung Jolo murni diiringi alat musik tradisional kelentung kayu lokal dan rebana khas Jambi.',
        sourceReferenceId: 'ref-sj-1'
      },
      {
        id: 'claim-sj-2',
        statement: 'Senandung Jolo berstatus sangat kritis (threatened) karena maestro pelestari tersisa sangat sedikit dan membutuhkan program regenerasi terstruktur.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih sesuai data Kemendikbudristek dan Taman Budaya Jambi yang menempatkan tradisi ini dalam daftar prioritas pelindungan mendesak.',
        sourceReferenceId: 'ref-sj-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-aksara-incung',
    name: 'Naskah Kuno Aksara Incung Kerinci',
    localName: 'Surat Incung (Tanduk Kerbau & Bambu)',
    category: 'Naskah & Aksara Kuno',
    worldId: 'world-jambi',
    regency: 'Kabupaten Kerinci & Kota Sungai Penuh',
    latitude: -2.0531,
    longitude: 101.4011,
    mapX: 20,
    mapY: 76,
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Aksara asli pribumi Kerinci turunan rumpun Pasca-Pallawa yang digoreskan pada tanduk kerbau, ruas bambu, dan kulit kayu untuk merekam hukum adat serta silsilah leluhur.',
    fullDescription: 'Aksara Incung adalah satu-satunya aksara kuno asli masyarakat dataran tinggi Kerinci (Suku Kerinci). Kata "Incung" dalam bahasa Kerinci berarti terpancung, condong, atau miring. Aksara ini digores menggunakan pisau rani pada media tanduk kerbau purba, ruas gelondong bambu, dan kulit kayu alim. Naskah-naskah Incung berumur ratusan tahun ini disimpan rapat dalam peti pusaka (larik rumah gedang) oleh para tetua adat Depati dan Ninik Mamak.',
    philosophicalMeaning: 'Mencerminkan identitas literasi leluhur nusantara yang mandiri, kearifan hukum adat ("adat bersendi syarak, syarak bersendi kitabullah"), dan keteguhan menjaga sumpah amanah pusaka nenek moyang.',
    historicalEra: 'Abad ke-13 – 18 Masehi (Kerajaan Melayu Hulu & Alam Kerinci)',
    threatLevel: 'critical',
    threatReason: 'Hanya segelintir filolog dan tetua adat sepuh yang masih mampu membaca aksara ini, serta naskah tanduk kerbau pusaka rentan terhadap kelembapan tropis dan jamur.',
    references: [
      {
        id: 'ref-ai-1',
        title: 'Penetapan Aksara Incung sebagai Warisan Budaya Takbenda Indonesia',
        institution: 'Kemendikbud RI / SK No. 201400107',
        year: 2014,
        urlOrDocId: 'WBTb-201400107',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-ai-2',
        title: 'Katalog Naskah Tanduk Kerbau Aksara Incung Alam Kerinci',
        institution: 'Museum Siginjai Jambi & BPK Wilayah V',
        year: 2020,
        urlOrDocId: 'MS-JMB-INCUNG-2020',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Nama "Incung" berarti miring atau bergaris condong, mencerminkan goresan grafis aksara yang khas bersudut lancip.',
      'Media naskah Incung yang paling sakral adalah tanduk kerbau yang diukir dengan pisau tajam lalu diisi jelaga hitam.',
      'Isi naskah meliputi mantra tolak bala, batas ulayat adat Depati, doa perlindungan, dan silsilah garis keturunan marga Kerinci.',
      'Suku Kerinci telah memiliki tradisi aksara tulis sendiri jauh sebelum masa kolonial Belanda tiba di pulau Sumatra.'
    ],
    claimTests: [
      {
        id: 'claim-ai-1',
        statement: 'Aksara Incung diciptakan oleh misionaris Belanda pada awal abad ke-20 untuk menggantikan huruf Latin.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini salah total. Aksara Incung adalah aksara pribumi Kerinci turunan aksara Sumatra Kuno yang telah ada sejak abad ke-13 M jauh sebelum bangsa Eropa datang.',
        sourceReferenceId: 'ref-ai-1'
      },
      {
        id: 'claim-ai-2',
        statement: 'Aksara Incung digoreskan pada media organik tradisional seperti tanduk kerbau, ruas bambu, dan kulit kayu alim.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih dan terbukti pada artefak-artefak pusaka yang tersimpan di Museum Siginjai dan rumah gedang Kerinci.',
        sourceReferenceId: 'ref-ai-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-tari-selampit-delapan',
    name: 'Tari Selampit Delapan',
    localName: 'Tari Tradisional Selampit Delapan',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-jambi',
    regency: 'Kota Jambi',
    latitude: -1.6101,
    longitude: 103.6131,
    mapX: 58,
    mapY: 46,
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tari tradisional Jambi yang ditarikan oleh delapan orang penari dengan menganyam dan mengurai kembali delapan lembar selendang sutra warna-warni secara teratur.',
    fullDescription: 'Tari Selampit Delapan adalah tarian pergaulan tradisional yang melambangkan kebersamaan masyarakat Jambi. Diciptakan pertama kali oleh seniman tari M. Tarip pada tahun 1930-an dan diperkenalkan secara luas ke panggung nasional. Delapan penari (empat pasang muda-mudi) memegang ujung selendang beragam warna yang terikat pada tiang tengah, bergerak selaras menganyam selendang menjadi satu ikatan rapi, kemudian mengurainya kembali tanpa kusut sedikit pun.',
    philosophicalMeaning: 'Mengajarkan nilai persatuan, kerja sama tanpa cela, dan kepiawaian dalam menyelesaikan persoalan kehidupan: serumit apa pun simpul masalah, jika diuraikan bersama dengan kepala dingin dan hati selaras akan kembali tertata rapi.',
    historicalEra: 'Tahun 1930-an (Karya Maestro M. Tarip)',
    threatLevel: 'active',
    threatReason: 'Tarian ini masih aktif diajarkan di sanggar-sanggar seni tari sekolah di Kota Jambi dan sering ditampilkan dalam upacara penyambutan tamu agung.',
    references: [
      {
        id: 'ref-sd-1',
        title: 'Penetapan Warisan Budaya Takbenda: Tari Selampit Delapan Jambi',
        institution: 'Kemendikbud RI / SK No. 201500207',
        year: 2015,
        urlOrDocId: 'WBTb-201500207',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-sd-2',
        title: 'Ensiklopedi Kesenian Tradisional Melayu Jambi',
        institution: 'Dinas Kebudayaan dan Pariwisata Provinsi Jambi',
        year: 2018,
        urlOrDocId: 'DISBUDPAR-JMB-TSD-2018',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Ditarikan persis oleh 8 orang penari yang melambangkan 8 arah mata angin dan kebersamaan komunal.',
      'Kunci keindahan tarian terletak pada teknik menganyam 8 selendang sutra warna-warni tanpa terjadi kekusutan tali.',
      'Iringan musik tarian menggunakan alat musik akordeon, biola, gendang Melayu, dan gong.',
      'Tarian ini telah terdaftar resmi sebagai Warisan Budaya Takbenda (WBTb) Indonesia sejak tahun 2015.'
    ],
    claimTests: [
      {
        id: 'claim-sd-1',
        statement: 'Tari Selampit Delapan diciptakan oleh seniman M. Tarip pada era 1930-an dengan ciri khas anyaman 8 selendang warna.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini tepat dan terverifikasi dalam arsip Dinas Kebudayaan Provinsi Jambi dan data WBTb Kemendikbud.',
        sourceReferenceId: 'ref-sd-1'
      },
      {
        id: 'claim-sd-2',
        statement: 'Tarian ini ditarikan sendirian oleh satu orang penari tunggal tanpa melibatkan selendang maupun musik.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini bertentangan secara esensial. Sesuai namanya "Delapan", tarian ini wajib ditarikan oleh 8 orang dengan 8 helai selendang beranyam.',
        sourceReferenceId: 'ref-sd-2'
      }
    ],
    discovered: true,
    verified: true, // Initially verified in profile demo
  },
  {
    id: 'obj-batik-jambi',
    name: 'Batik Tradisional Jambi (Motif Batanghari)',
    localName: 'Batik Jambi Alami Seberang Kota',
    category: 'Kriya & Tekstil',
    worldId: 'world-jambi',
    regency: 'Kota Jambi (Kawasan Seberang)',
    latitude: -1.5912,
    longitude: 103.6088,
    mapX: 55,
    mapY: 48,
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kain batik khas Melayu Jambi dengan motif legendaris Batanghari, Kapal Sanggat, dan Kuau Berhias yang diwarnai bahan alami ramah lingkungan kayu jernang dan sepang.',
    fullDescription: 'Batik Jambi telah berkembang sejak era Kesultanan Melayu Jambi pada abad ke-17. Sentra utamanya berpusat di perkampungan Seberang Kota Jambi (Olakkemas, Mudung Laut, Danau Teluk). Ciri utamanya adalah pewarnaan alam yang hangat dan anggun menggunakan getah jernang (merah), kayu sepang (oranye-kuning), kulit kayu tingi (cokelat), dan daun nila (biru). Motifnya sarat simbol flora, fauna riparian, dan filosofi sungai besar Batanghari.',
    philosophicalMeaning: 'Motif "Batanghari" melambangkan jalan kehidupan manusia yang berkelok namun senantiasa mengalir memberi manfaat dan kesuburan bagi siapa pun di sekitarnya.',
    historicalEra: 'Abad ke-17 Masehi (Era Kesultanan Melayu Jambi)',
    threatLevel: 'active',
    threatReason: 'Pewarna sintetis kimia murah mulai menggeser teknik pewarna alami tumbuhan hutan yang membutuhkan proses perendaman berhari-hari.',
    references: [
      {
        id: 'ref-bj-1',
        title: 'Motif dan Filosofi Batik Jambi',
        institution: 'Dewan Kerajinan Nasional Daerah (Dekranasda) Jambi',
        year: 2019,
        urlOrDocId: 'DEKRANASDA-BJ-2019',
        type: 'Museum_Archive'
      },
      {
        id: 'ref-bj-2',
        title: 'Penetapan Warisan Budaya Takbenda Indonesia: Batik Jambi',
        institution: 'Kemendikbudristek RI',
        year: 2013,
        urlOrDocId: 'WBTb-201300015',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Kawasan Seberang Kota Jambi merupakan sentra tertua pembatikan tradisional Melayu Jambi.',
      'Getah jernang alami (Daemonorops draco) hutan Jambi menghasilkan warna merah darah pekat bernilai tinggi.',
      'Motif populer lainnya meliputi Tampuk Manggis, Durian Pecah, Kapal Sanggat, dan Kaco Piring.',
      'Batik Jambi kuno cenderung memiliki bidang motif terpisah-pisah (titik fokus) tidak saling menyambung rapat seperti batik pesisir Jawa.'
    ],
    claimTests: [
      {
        id: 'claim-bj-1',
        statement: 'Pewarnaan tradisional Batik Jambi tempo dulu memanfaatkan bahan alami hutan seperti getah jernang dan kayu sepang.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih. Para perajin sepuh Seberang Kota Jambi mempertahankan resep pewarnaan botani alami khas hutan Sumatra.',
        sourceReferenceId: 'ref-bj-1'
      },
      {
        id: 'claim-bj-2',
        statement: 'Motif utama Batik Jambi melambangkan menara pencakar langit modern era industrialisasi abad ke-21.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Motif Batik Jambi berakar dari filosofi alam riparian, kearifan Melayu, dan flora fauna lokal Batanghari.',
        sourceReferenceId: 'ref-bj-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-keris-siginjai',
    name: 'Pusaka Keris Siginjai Jambi',
    localName: 'Keris Diraja Kesultanan Jambi',
    category: 'Senjata & Pusaka',
    worldId: 'world-jambi',
    regency: 'Kota Jambi (Koleksi Museum Siginjai)',
    latitude: -1.6033,
    longitude: 103.5822,
    mapX: 52,
    mapY: 44,
    thumbnail: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Senjata pusaka lambang kedaulatan Sultan Thaha Syaifuddin dan Raja-Raja Jambi, bertahtakan emas, berlian, dan berlapis pamor besi meteorit sakral.',
    fullDescription: 'Keris Siginjai adalah pusaka kebesaran Kesultanan Jambi yang dipegang turun-temurun sejak era Orang Kayo Hitam (abad ke-15 M) hingga masa pahlawan nasional Sultan Thaha Syaifuddin yang gigih melawan penjajahan Belanda. Bilah keris berluk 9 berlapis pamor lipatan besi meteorit, bersarung emas murni (pendok emas bertatah intan berlian), serta gagang kayu kemuning berukiran khas Melayu. Keris ini menjadi simbol pemegang mandat tertinggi kedaulatan rakyat Jambi.',
    philosophicalMeaning: 'Melambangkan keadilan penegakan hukum adat, kewibawaan kepemimpinan yang berintegritas, dan keberanian membela tanah air dari segala bentuk penindasan.',
    historicalEra: 'Abad ke-15 – 19 Masehi (Kesultanan Melayu Jambi)',
    threatLevel: 'active',
    threatReason: 'Terawat aman dalam ruang penyimpanan konservasi iklim terkendali di Museum Negeri Siginjai Jambi, namun replika historisnya perlu terus disosialisasikan kepada generasi muda.',
    references: [
      {
        id: 'ref-ks-1',
        title: 'Monografi Keris Siginjai Lambang Kemegahan Jambi',
        institution: 'Museum Negeri Jambi Siginjai',
        year: 2017,
        urlOrDocId: 'MUSEUM-SIGINJAI-KS-2017',
        type: 'Museum_Archive'
      },
      {
        id: 'ref-ks-2',
        title: 'Penetapan Benda Cagar Budaya Peringkat Nasional: Keris Siginjai',
        institution: 'Kemendikbudristek RI / Ditjen Kebudayaan',
        year: 2018,
        urlOrDocId: 'SK-BCB-NASIONAL-KS-2018',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Bilah Keris Siginjai memiliki 9 lekukan (luk sembilan) dengan pamor beras wutah dan tumpuk melati.',
      'Hulu (gagang) keris terbuat dari kayu kemuning dengan ukiran motif flora bunga tanjung berlapis lempeng emas.',
      'Merupakan mahkota simbol kedaulatan tertinggi: seseorang tidak dapat dinobatkan sebagai Sultan Jambi bila tidak menyandang Keris Siginjai.',
      'Kini disimpan dan dipamerkan sebagai mahakarya cagar budaya utama di Museum Negeri Siginjai Jambi.'
    ],
    claimTests: [
      {
        id: 'claim-ks-1',
        statement: 'Keris Siginjai adalah pusaka dinasti raja-raja Kesultanan Jambi yang menjadi syarat sah penobatan Sultan Jambi tempo dulu.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini tepat dan terverifikasi dalam catatan adat Melayu Jambi dan katalog cagar budaya Museum Siginjai.',
        sourceReferenceId: 'ref-ks-1'
      },
      {
        id: 'claim-ks-2',
        statement: 'Keris Siginjai baru diproduksi secara massal dari pabrik aluminium di luar negeri pada tahun 2010.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Keris Siginjai adalah artefak tempa besi tua bersejarah dari abad ke-15 Masehi era Rangkayo Hitam.',
        sourceReferenceId: 'ref-ks-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-tempoyak-patin',
    name: 'Kuliner Tradisional Tempoyak Patin Batanghari',
    localName: 'Gulai Tempoyak Ikan Patin Sungai',
    category: 'Kuliner Tradisional',
    worldId: 'world-jambi',
    regency: 'Kabupaten Batanghari',
    latitude: -1.7212,
    longitude: 103.2512,
    mapX: 48,
    mapY: 54,
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Adikarya kuliner khas Jambi berbahan dasar fermentasi daging buah durian yang dimasak bersama ikan patin segar dari Sungai Batanghari dengan bumbu kunyit dan cabai.',
    fullDescription: 'Tempoyak adalah kuliner fermentasi durian tertua dalam tradisi Melayu Sumatra yang tercatat dalam manuskrip Hikayat Abdullah. Di Jambi, tempoyak dimasak menjadi gulai kental berkuah kuning tanpa santan, memadukan rasa asam fermentasi alami durian dengan manis gurihnya ikan patin sungai segar liar. Hidangan ini disajikan dalam tradisi makan bejambang (makan bersama duduk bersila beralas daun pisang) pada upacara kenduri adat.',
    philosophicalMeaning: 'Mencerminkan kearifan bioteknologi pangan leluhur dalam mengawetkan surplus hasil panen durian hutan agar bertahan berbulan-bulan, serta simbol kesederhanaan dan kehangatan persaudaraan warga riparian.',
    historicalEra: 'Abad ke-14 Masehi (Tradisi Melayu Suvarnadvipa)',
    threatLevel: 'active',
    threatReason: 'Kuliner ini sangat lestari dan populer di masyarakat, namun kelestarian ikan patin liar sungai terancam oleh pencemaran air Batanghari.',
    references: [
      {
        id: 'ref-tp-1',
        title: 'Penetapan Warisan Budaya Takbenda: Tempoyak Jambi',
        institution: 'Kemendikbud RI / SK No. 201900854',
        year: 2019,
        urlOrDocId: 'WBTb-201900854',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-tp-2',
        title: 'Kearifan Lokal Pengolahan Pangan Fermentasi Tradisional Melayu Jambi',
        institution: 'Universitas Jambi (Fakultas Pertanian & Peternakan)',
        year: 2022,
        urlOrDocId: 'UNJA-PANGAN-TP-2022',
        type: 'Journal'
      }
    ],
    curatedFacts: [
      'Tempoyak dibuat dari daging durian masak pohon yang difermentasi dengan garam dapur dalam wadah tertutup selama 3 hingga 7 hari.',
      'Gulai tempoyak khas Jambi asli tidak menggunakan santan kelapa, melainkan mengandalkan kekentalan lumat durian fermentasi.',
      'Ikan patin sungai Batanghari dipilih karena memiliki tekstur daging lembut dan lemak gurih yang meresap rasa asam pedas kuah.',
      'Telah diakui resmi sebagai Warisan Budaya Takbenda (WBTb) Indonesia pada tahun 2019.'
    ],
    claimTests: [
      {
        id: 'claim-tp-1',
        statement: 'Gulai Tempoyak khas Jambi dibuat dengan bahan utama fermentasi durian lokal dan ikan sungai Batanghari.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini benar dan sesuai dengan resep leluhur Melayu Jambi yang telah terdaftar di WBTb Nasional.',
        sourceReferenceId: 'ref-tp-1'
      },
      {
        id: 'claim-tp-2',
        statement: 'Tempoyak adalah masakan keju olahan susu sapi impor yang baru diperkenalkan ke Jambi pada tahun 2020.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Tempoyak adalah bioteknologi pangan fermentasi buah durian tradisional yang telah berumur ratusan tahun.',
        sourceReferenceId: 'ref-tp-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-bantai-adat',
    name: 'Upacara Adat Bantai Adat Merangin',
    localName: 'Tradisi Bantai Adat Rantau Panjang',
    category: 'Ritual & Adat Istiadat',
    worldId: 'world-jambi',
    regency: 'Kabupaten Merangin',
    latitude: -2.2514,
    longitude: 102.3211,
    mapX: 32,
    mapY: 60,
    thumbnail: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tradisi pemotongan kerbau komunal dan kenduri massal oleh warga adat Batin sehari menjelang bulan suci Ramadhan untuk mempererat tali silaturahmi.',
    fullDescription: 'Bantai Adat adalah upacara komunal sakral masyarakat adat Melayu Batin di Tabir, Merangin. Kata "Bantai" merujuk pada pemotongan ternak kerbau atau sapi secara gotong royong di tanah lapang desa. Puluhan hingga ratusan ekor kerbau yang dibeli bersama disembelih, kemudian dagingnya dibagi merata ke seluruh rumah tangga warga tanpa terkecuali, dipungkasi dengan doa sedekah bumi bersama para alim ulama dan tetua adat.',
    philosophicalMeaning: 'Melambangkan keadilan sosial, kegembiraan komunal menyambut bulan ibadah, pembersihan hati dari rasa dengki antarwarga, serta penghormatan pada hukum kesepakatan adat Melayu.',
    historicalEra: 'Abad ke-16 Masehi (Hukum Adat Melayu Batin Tabir)',
    threatLevel: 'active',
    threatReason: 'Masih terselenggara rutin setiap tahun dengan animo masyarakat ribuan orang, namun membutuhkan penguatan tata kelola higienitas dan dokumentasi arsip digital.',
    references: [
      {
        id: 'ref-ba-1',
        title: 'Penetapan Warisan Budaya Takbenda Indonesia: Bantai Adat Merangin',
        institution: 'Kemendikbudristek RI / SK No. 201700465',
        year: 2017,
        urlOrDocId: 'WBTb-201700465',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-ba-2',
        title: 'Etnografi Tradisi Sedekah Bantai Adat Suku Batin',
        institution: 'Lembaga Adat Melayu (LAM) Kabupaten Merangin',
        year: 2021,
        urlOrDocId: 'LAM-MRG-BA-2021',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Upacara ini dilaksanakan secara serentak setahun sekali, tepat sehari sebelum umat muslim memasuki bulan suci Ramadhan.',
      'Hewan kurban kerbau wajib diperiksa kesehatannya oleh tetua adat dan dokter hewan setempat sebelum disembelih secara syar’i.',
      'Daging dibagikan merata kepada seluruh penduduk desa termasuk anak yatim dan kaum duafa.',
      'Menjadi ajang kepulangan para perantau adat Batin dari berbagai kota untuk bersimpuh memohon maaf kepada orang tua.'
    ],
    claimTests: [
      {
        id: 'claim-ba-1',
        statement: 'Tradisi Bantai Adat Merangin diselenggarakan rutin oleh masyarakat adat menyambut Ramadhan sebagai wujud silaturahmi dan sedekah komunal.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini benar dan sesuai dengan ketetapan WBTb Nasional Kemendikbud No. 201700465.',
        sourceReferenceId: 'ref-ba-1'
      },
      {
        id: 'claim-ba-2',
        statement: 'Bantai Adat adalah pertandingan adu fisik kekerasan antarkelompok pemuda suku Merangin.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini sangat keliru. Kata "Bantai" dalam dialek lokal merujuk pada menyembelih ternak untuk sedekah gotong royong, bukan kekerasan.',
        sourceReferenceId: 'ref-ba-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-krinok-bungo',
    name: 'Musik Tradisional Krinok & Gambus Jambi',
    localName: 'Kesenian Vokal Ratap Krinok Rantau Pandan',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-jambi',
    regency: 'Kabupaten Bungo',
    latitude: -1.5412,
    longitude: 101.9812,
    mapX: 28,
    mapY: 52,
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kesenian vokal vokal Melayu kuno bernada tinggi meliuk-liuk yang dilantunkan para peladang di bukit, diiringi petikan dawai gambus dan ketukan rebana.',
    fullDescription: 'Krinok adalah seni vokal tradisional khas Rantau Pandan, Kabupaten Bungo. Pada mulanya, Krinok dilantunkan oleh kaum muda saat berladang atau mencari kayu di hutan Bukit Barisan sebagai pelampiasan rasa rindu, ratap nestapa, atau penghibur kesunyian malam. Dalam perkembangannya, vokal nada tinggi dengan teknik cengkok meliuk khas (melisma) ini dipadukan dengan petikan dawai alat musik gambus labu dan kelintung.',
    philosophicalMeaning: 'Melambangkan kepekaan batin manusia terhadap gemerisik alam belantara, ketabahan menghadapi cobaan hidup di perantauan ladang, dan sarana munajat kesantunan Melayu.',
    historicalEra: 'Abad ke-15 Masehi (Pra-Islam hingga Era Kesultanan)',
    threatLevel: 'critical',
    threatReason: 'Hanya tersisa sedikit penembang Krinok senior yang mampu mencapai rentang nada vokal cengkok tinggi asli tanpa fals.',
    references: [
      {
        id: 'ref-kr-1',
        title: 'Penetapan Warisan Budaya Takbenda: Kesenian Krinok Jambi',
        institution: 'Kemendikbudristek RI / SK No. 201700466',
        year: 2017,
        urlOrDocId: 'WBTb-201700466',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-kr-2',
        title: 'Studi Akustik dan Struktur Vokal Melisma Krinok Melayu Hulu',
        institution: 'Institut Seni Budaya Indonesia & Taman Budaya Jambi',
        year: 2022,
        urlOrDocId: 'ISBI-KRINOK-2022',
        type: 'Journal'
      }
    ],
    curatedFacts: [
      'Vokal Krinok mengandalkan teknik melisma vokal falsetto dengan vibrasi rapat yang sangat sulit ditiru penyanyi modern biasa.',
      'Lirik Krinok berbentuk pantun empat baris bersajak a-b-a-b bertema nasihat cinta dan ketuhanan.',
      'Alat musik pengiringnya adalah gambus berdawai 6 atau 7 yang dibuat dari kayu nangka utuh berukir kepala burung.',
      'Telah ditetapkan sebagai Warisan Budaya Takbenda (WBTb) Indonesia pada tahun 2017.'
    ],
    claimTests: [
      {
        id: 'claim-kr-1',
        statement: 'Krinok adalah seni vokal tradisional asal Rantau Pandan Bungo dengan teknik cengkok meliuk tinggi khas.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih sesuai data resmi WBTb Indonesia dan kajian etnomusikologi.',
        sourceReferenceId: 'ref-kr-1'
      },
      {
        id: 'claim-kr-2',
        statement: 'Krinok dimainkan menggunakan alat musik synthesizer digital keyboard yang diciptakan di Jepang.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Krinok adalah vokal akustik alami tradisional yang berpasangan dengan gambus kayu buatan tangan.',
        sourceReferenceId: 'ref-kr-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-anyaman-purun',
    name: 'Kriya Ramah Lingkungan Anyaman Purun',
    localName: 'Anyaman Rumput Purun Lahan Gambut',
    category: 'Kriya & Tekstil',
    worldId: 'world-jambi',
    regency: 'Kabupaten Tanjung Jabung Timur & Barat',
    latitude: -1.2511,
    longitude: 103.8812,
    mapX: 82,
    mapY: 34,
    thumbnail: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kearifan lokal kriya ramah lingkungan berbahan rumput purun lahan gambut basah yang diolah menjadi tikar, bakul, dan tas bernilai ekonomi lestari.',
    fullDescription: 'Masyarakat pesisir Tanjung Jabung Timur secara turun-temurun memanfaatkan rumput purun (Eleocharis dulcis) yang tumbuh subur di ekosistem rawa gambut. Batang rumput dipotong, dijemur, ditumbuk pipih dengan kayu penumbuk, lalu diwarnai dengan pewarna alami sebelum dianyam menjadi tikar salat, tas jinjing, dan wadah hasil panen. Tradisi ini terbukti menjaga rawa gambut dari kebakaran karena masyarakat menjaga kebasahan rawa agar purun tetap tumbuh.',
    philosophicalMeaning: 'Mencerminkan etika ekologis manusia nusantara: hidup berdampingan harmonis dengan rawa tanpa mengeringkan atau membakar lahan, melainkan memanen anugerah alam secara lestari.',
    historicalEra: 'Abad ke-17 Masehi (Kearifan Riparian Pesisir Timur Sumatra)',
    threatLevel: 'at_risk',
    threatReason: 'Konversi lahan rawa gambut menjadi perkebunan monokultur sawit dan kanal pengering berisiko memusnahkan habitat liar rumput purun.',
    references: [
      {
        id: 'ref-ap-1',
        title: 'Inventarisasi Kriya Tradisional Anyaman Purun Tanjung Jabung',
        institution: 'Dinas Perindustrian dan Perdagangan Provinsi Jambi',
        year: 2021,
        urlOrDocId: 'DISPERINDAG-JMB-PURUN-2021',
        type: 'Museum_Archive'
      },
      {
        id: 'ref-ap-2',
        title: 'Kearifan Ekologi Pemanfaatan Purun Berkelanjutan',
        institution: 'Badan Restorasi Gambut dan Mangrove (BRGM) & Kemendikbud',
        year: 2023,
        urlOrDocId: 'BRGM-PURUN-JMB-2023',
        type: 'Journal'
      }
    ],
    curatedFacts: [
      'Rumput purun hanya dapat tumbuh di lahan rawa gambut yang memiliki pasokan air alami stabil.',
      'Sebelum dianyam, batang purun ditumbuk menggunakan antan kayu ulin agar seratnya menjadi pipih lentur dan tidak mudah patah.',
      'Anyaman purun tahan air dan memiliki daya tahan hingga puluhan tahun bila dirawat kering.',
      'Merupakan model ekonomi sirkular ramah iklim berbasis kearifan lokal perempuan pesisir Jambi.'
    ],
    claimTests: [
      {
        id: 'claim-ap-1',
        statement: 'Kerajinan anyaman purun memanfaatkan tumbuhan rawa gambut yang ramah lingkungan dan mendukung konservasi lahan basah.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih. Pelestarian kriya purun mendorong masyarakat untuk tidak membakar lahan gambut.',
        sourceReferenceId: 'ref-ap-2'
      },
      {
        id: 'claim-ap-2',
        statement: 'Purun adalah plastik sintetis limbah pabrik kimia yang dilelehkan menggunakan minyak bumi.',
        isTrue: false,
        distractorType: 'hoax',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini keliru. Purun adalah 100% serat tumbuhan rumput liar lahan basah alami tanpa bahan kimia plastik.',
        sourceReferenceId: 'ref-ap-1'
      }
    ],
    discovered: true,
    verified: false,
  },
  {
    id: 'obj-perahu-kajang',
    name: 'Perahu Kajang Sungai Batanghari',
    localName: 'Perahu Kajang Melayu Batanghari',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-jambi',
    regency: 'Kabupaten Muaro Jambi & Batanghari',
    latitude: -1.5022,
    longitude: 103.5512,
    mapX: 60,
    mapY: 45,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Perahu kayu tradisional dengan tudung atap kajang (anyaman daun nipah) yang menjadi urat nadi perniagaan dan hunian terapung leluhur di sepanjang Sungai Batanghari.',
    fullDescription: 'Perahu Kajang adalah bukti sejarah maritim sungai terbesar di Sumatra. Memiliki lambung kayu ulin dengan tudung atap melengkung dari anyaman daun nipah atau rotan (kajang) yang melindungi keluarga nakhoda dari hujan dan terik matahari. Dahulu mengangkut hasil bumi karet, damar, rotan, dan rempah dari hulu Kerinci dan Merangin menuju muara Selat Malaka.',
    philosophicalMeaning: 'Melambangkan filosofi hidup air: "Adat pasang laut surut, biduk lalu kiambang bertaut", mengajarkan kelenturan batin dalam menghadapi perubahan zaman tanpa kehilangan jati diri kebudayaan.',
    historicalEra: 'Abad ke-12 – 20 Masehi (Peradaban Riparian Sungai Batanghari)',
    threatLevel: 'critical',
    threatReason: 'Pembuatan perahu kayu kajang asli kini hampir punah karena digantikan perahu mesin fiberglass modern dan jalan darat lintas Sumatra.',
    references: [
      {
        id: 'ref-pk-1',
        title: 'Sejarah Transportasi Air Sungai Batanghari dan Perahu Kajang',
        institution: 'Balai Pelestarian Kebudayaan (BPK) Wilayah V Jambi',
        year: 2020,
        urlOrDocId: 'BPK-V-PK-2020',
        type: 'Museum_Archive'
      },
      {
        id: 'ref-pk-2',
        title: 'Inventarisasi Tinggalan Bahari Tradisional Jambi',
        institution: 'Kemendikbudristek RI',
        year: 2022,
        urlOrDocId: 'WBTb-JMB-PK-2022',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Perahu Kajang dilengkapi bagian kemudi haluan khusus yang dirancang lincah melintasi jeram dan tikungan dangkal Sungai Batanghari.',
      'Atap kajang dibuat berlapis-lapis dari daun nipah hutan payau yang tahan rembesan air hujan lebat tropis.',
      'Merupakan cikal bakal arsitektur hunian terapung masyarakat Melayu pedalaman tempo dulu.',
      'Replika ukurannya dipamerkan di Museum Negeri Siginjai untuk sarana edukasi generasi penerus.'
    ],
    claimTests: [
      {
        id: 'claim-pk-1',
        statement: 'Perahu Kajang adalah moda transportasi sungai tradisional beratap anyaman daun nipah yang mengarungi Sungai Batanghari.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Klaim ini sahih dan terverifikasi dalam arsip maritim Batanghari BPK Wilayah V.',
        sourceReferenceId: 'ref-pk-1'
      },
      {
        id: 'claim-pk-2',
        statement: 'Perahu Kajang dirancang khusus untuk penerbangan luar angkasa menggunakan bahan bakar roket cair.',
        isTrue: false,
        distractorType: 'exaggeration',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini fiktif. Perahu Kajang adalah perahu kayu transportasi sungai air tawar peradaban Melayu.',
        sourceReferenceId: 'ref-pk-2'
      }
    ],
    discovered: true,
    verified: false,
  },
  ...INDONESIA_CULTURAL_OBJECTS
];

export const INITIAL_LIVING_MAP_POINTS: LivingMapPoint[] = [
  {
    id: 'lmp-candi-muaro-jambi',
    culturalObjectId: 'obj-candi-muaro-jambi',
    name: 'Kawasan Percandian Muaro Jambi',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Muaro Jambi',
    latitude: -1.4789,
    longitude: 103.6683,
    currentStatus: 'at_risk',
    lastUpdated: '2026-09-09',
    verifiedByAi: true,
    culturalBearer: 'Balai Pelestarian Kebudayaan Wilayah V & Komunitas Desa Muaro Jambi',
    narrative: 'Kompleks percandian bata merah terluas di Asia Tenggara (3.981 hektare) yang menjadi pusat universitas Buddhis dunia abad ke-7 hingga 14 Masehi. Dikelilingi jejaring kanal purba yang menghubungkan langsung ke Sungai Batanghari.',
    statusHistory: [
      {
        id: 'sh-1',
        status: 'at_risk',
        changedBy: 'Kurator BPK Wilayah V',
        role: 'Kurator',
        date: '2026-09-09',
        reason: 'Lalu lintas tongkang batubara dan debu polusi bantaran sungai memerlukan pengawasan ketat zona penyangga.'
      },
      {
        id: 'sh-2',
        status: 'active',
        changedBy: 'Kemendikbudristek RI',
        role: 'Pemerintah',
        date: '2026-01-15',
        reason: 'Revitalisasi kanal kuno dan penataan kawasan cagar budaya peringkat nasional.'
      }
    ]
  },
  {
    id: 'lmp-rumah-kajang-lako',
    culturalObjectId: 'obj-rumah-kajang-lako',
    name: 'Rumah Adat Tuho Kajang Lako',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Merangin',
    latitude: -2.3012,
    longitude: 102.6511,
    currentStatus: 'critical',
    lastUpdated: '2026-09-08',
    verifiedByAi: true,
    culturalBearer: 'Lembaga Adat Melayu Marga Batin VIII & Tetua Desa Rantau Panjang',
    narrative: 'Arsitektur vernakular panggung peninggalan abad ke-14 Masehi yang dibangun menggunakan kayu bulian dengan sistem pasak kayu bebas paku tahan gempa Bukit Barisan. Beratap perahu kajang melengkung khas Melayu Kuno.',
    statusHistory: [
      {
        id: 'sh-3',
        status: 'critical',
        changedBy: 'Lembaga Adat Melayu Merangin',
        role: 'Kurator',
        date: '2026-09-08',
        reason: 'Keterbatasan kayu ulin tua dan degradasi atap potong jerambah pada beberapa unit rumah tua suku Batin.'
      }
    ]
  },
  {
    id: 'lmp-senandung-jolo',
    culturalObjectId: 'obj-senandung-jolo',
    name: 'Sastra Lisan Senandung Jolo',
    category: 'Sastra Lisan & Tradisi',
    regency: 'Kabupaten Muaro Jambi',
    latitude: -1.5302,
    longitude: 103.6215,
    currentStatus: 'critical',
    lastUpdated: '2026-09-08',
    verifiedByAi: true,
    culturalBearer: 'Maestro Wak Maryam (Dusun Tanjung Pasir) & Sanggar Kelentung Batanghari',
    narrative: 'Tradisi sastra lisan berpantun spontan diiringi ketukan alat musik kelentung empat bilah kayu nangka berongga. Dituturkan saat menugal padi sawah pasang surut dan hajatan pernikahan Melayu, kini hanya dikuasai segelintir maestro lansia.',
    statusHistory: [
      {
        id: 'sh-4',
        status: 'critical',
        changedBy: 'Peneliti Asosiasi Tradisi Lisan',
        role: 'Kurator',
        date: '2026-09-08',
        reason: 'Jumlah pelantun senior di bawah 5 orang, sangat membutuhkan program magang pewarisan bagi pemuda.'
      }
    ]
  },
  {
    id: 'lmp-aksara-incung',
    culturalObjectId: 'obj-aksara-incung',
    name: 'Naskah Kuno Aksara Incung Kerinci',
    category: 'Naskah & Aksara Kuno',
    regency: 'Kabupaten Kerinci',
    latitude: -2.0531,
    longitude: 101.4011,
    currentStatus: 'critical',
    lastUpdated: '2026-09-05',
    verifiedByAi: true,
    culturalBearer: 'Para Depati & Ninik Mamak Alam Kerinci (Penjaga Larik Rumah Gedang)',
    narrative: 'Satu-satunya aksara kuno pribumi dataran tinggi Kerinci turunan Sumatra Kuno. Digoreskan menggunakan pisau rani pada lempeng tanduk kerbau pusaka, ruas bambu, dan kulit kayu alim untuk mencatat hukum adat, obat-obatan, dan silsilah suku.',
    statusHistory: [
      {
        id: 'sh-5',
        status: 'critical',
        changedBy: 'Filolog Naskah Kuno Nusantara',
        role: 'Kurator',
        date: '2026-09-05',
        reason: 'Hanya tersisa sedikit tetua yang dapat membaca lempeng tanduk kerbau; rentan lapuk akibat jamur tropis.'
      }
    ]
  },
  {
    id: 'lmp-tari-selampit-delapan',
    culturalObjectId: 'obj-tari-selampit-delapan',
    name: 'Tari Selampit Delapan',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kota Jambi',
    latitude: -1.6101,
    longitude: 103.6131,
    currentStatus: 'active',
    lastUpdated: '2026-09-02',
    verifiedByAi: true,
    culturalBearer: 'Sanggar Seni Sekato & Dinas Kebudayaan Kota Jambi',
    narrative: 'Tari klasik pergaulan Melayu Jambi yang ditarikan oleh delapan pemuda-pemudi merajut dan mengurai delapan selendang sutra warna-warni mengelilingi poros tengah, melambangkan kekompakan, silaturahmi, dan persatuan suku bangsa.',
    statusHistory: [
      {
        id: 'sh-6',
        status: 'active',
        changedBy: 'Dinas Kebudayaan Kota Jambi',
        role: 'Pemerintah',
        date: '2026-09-02',
        reason: 'Diajarkan aktif di kurikulum muatan lokal sekolah seni dan festival tahunan.'
      }
    ]
  },
  {
    id: 'lmp-batik-jambi',
    culturalObjectId: 'obj-batik-jambi',
    name: 'Batik Tradisional Jambi (Motif Batanghari)',
    category: 'Kriya & Tekstil',
    regency: 'Kota Jambi',
    latitude: -1.5912,
    longitude: 103.6088,
    currentStatus: 'active',
    lastUpdated: '2026-08-28',
    verifiedByAi: true,
    culturalBearer: 'Komunitas Perajin Seberang Kota Jambi & Dekranasda',
    narrative: 'Kriya tekstil adiluhung dengan motif geometris alam khas seperti Batanghari, Durian Pecah, dan Kapal Sanggat. Menggunakan pewarna alami getah jernang, kayu sepang, dan kulit tingi yang ramah lingkungan.',
    statusHistory: [
      {
        id: 'sh-7',
        status: 'active',
        changedBy: 'Dekranasda Kota Jambi',
        role: 'Pemerintah',
        date: '2026-08-28',
        reason: 'Ekonomi kreatif perajin batik Seberang Kota berkembang melalui promosi pewarna alam jernang.'
      }
    ]
  },
  {
    id: 'lmp-keris-siginjai',
    culturalObjectId: 'obj-keris-siginjai',
    name: 'Pusaka Keris Siginjai Jambi',
    category: 'Senjata & Pusaka',
    regency: 'Kota Jambi',
    latitude: -1.6033,
    longitude: 103.5822,
    currentStatus: 'active',
    lastUpdated: '2026-08-20',
    verifiedByAi: true,
    culturalBearer: 'Museum Negeri Siginjai Jambi & Kerabat Kesultanan Jambi',
    narrative: 'Keris pusaka lambang kedaulatan Sultan Thaha Syaifuddin dan Kesultanan Jambi. Memiliki bilah luk berpamor meteorit dengan warangka berlapis emas murni dan tatahan intan berlian bernilai sejarah tinggi.',
    statusHistory: [
      {
        id: 'sh-8',
        status: 'active',
        changedBy: 'Kurator Koleksi Museum Siginjai',
        role: 'Kurator',
        date: '2026-08-20',
        reason: 'Tersimpan aman dalam ruang konservasi museum berstandar nasional.'
      }
    ]
  },
  {
    id: 'lmp-tempoyak-patin',
    culturalObjectId: 'obj-tempoyak-patin',
    name: 'Kuliner Tradisional Tempoyak Patin Batanghari',
    category: 'Kuliner Tradisional',
    regency: 'Kabupaten Batanghari',
    latitude: -1.7212,
    longitude: 103.2512,
    currentStatus: 'active',
    lastUpdated: '2026-08-15',
    verifiedByAi: true,
    culturalBearer: 'Ibu-Ibu Adat Gastronomi Melayu Batanghari',
    narrative: 'Kearifan fermentasi daging buah durian hutan yang dimasak berkuah gulai kuning pedas gurih bersama ikan patin liar Sungai Batanghari. Bukti gastronomi adaptasi Melayu dalam mengawetkan hasil panen buah musiman.',
    statusHistory: [
      {
        id: 'sh-9',
        status: 'active',
        changedBy: 'Dinas Pariwisata & Kebudayaan Batanghari',
        role: 'Pemerintah',
        date: '2026-08-15',
        reason: 'Sangat lestari dan menjadi sajian utama festival kuliner Melayu nusantara.'
      }
    ]
  },
  {
    id: 'lmp-bantai-adat',
    culturalObjectId: 'obj-bantai-adat',
    name: 'Upacara Adat Bantai Adat Merangin',
    category: 'Ritual & Adat Istiadat',
    regency: 'Kabupaten Merangin',
    latitude: -2.2514,
    longitude: 102.3211,
    currentStatus: 'active',
    lastUpdated: '2026-08-10',
    verifiedByAi: true,
    culturalBearer: 'Lembaga Adat Rantau Panjang & Masyarakat Marga Tiang Pumpung',
    narrative: 'Tradisi gotong royong menyembelih ratusan kerbau ternak secara serentak di lapangan adat menjelang bulan suci Ramadhan. Daging dibagikan merata ke seluruh warga sebagai wujud sedekah komunal dan perekat silaturahmi.',
    statusHistory: [
      {
        id: 'sh-10',
        status: 'active',
        changedBy: 'Dinas Kebudayaan Merangin',
        role: 'Pemerintah',
        date: '2026-08-10',
        reason: 'Terselenggara teratur setiap tahun menjelang Ramadhan dengan dukungan warga adat.'
      }
    ]
  },
  {
    id: 'lmp-krinok-bungo',
    culturalObjectId: 'obj-krinok-bungo',
    name: 'Musik Tradisional Krinok & Gambus Jambi',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kabupaten Bungo',
    latitude: -1.5412,
    longitude: 101.9812,
    currentStatus: 'critical',
    lastUpdated: '2026-08-08',
    verifiedByAi: true,
    culturalBearer: 'Maestro Penembang Krinok Rantau Pandan & Komunitas Seni Bungo',
    narrative: 'Seni vokal vokal Melayu bernada tinggi meliuk-liuk (melisma) diiringi petikan gambus labu berdawai enam. Dilantunkan saat berladang di perbukitan sebagai pelampiasan rasa rindu dan munajat batin manusia terhadap alam.',
    statusHistory: [
      {
        id: 'sh-11',
        status: 'critical',
        changedBy: 'Komunitas Seni Melayu Bungo',
        role: 'Kurator',
        date: '2026-08-08',
        reason: 'Generasi muda yang menguasai teknik cengkok melisma Krinok semakin langka.'
      }
    ]
  },
  {
    id: 'lmp-anyaman-purun',
    culturalObjectId: 'obj-anyaman-purun',
    name: 'Kriya Ramah Lingkungan Anyaman Purun',
    category: 'Kriya & Tekstil',
    regency: 'Kabupaten Tanjung Jabung Timur',
    latitude: -1.2511,
    longitude: 103.8812,
    currentStatus: 'at_risk',
    lastUpdated: '2026-08-05',
    verifiedByAi: true,
    culturalBearer: 'Kelompok Perempuan Penganyam Purun Gambut Mendahara',
    narrative: 'Kriya ramah iklim berbasis pemanfaatan serat rumput liar lahan gambut basah tanpa membakar rawa. Diolah menjadi tikar, tas, dan keranjang tahan air yang mendukung konservasi ekosistem gambut pesisir timur.',
    statusHistory: [
      {
        id: 'sh-12',
        status: 'at_risk',
        changedBy: 'Penyuluh Konservasi Lahan Basah',
        role: 'Kurator',
        date: '2026-08-05',
        reason: 'Pengeringan rawa gambut mengancam luasan padang purun alami.'
      }
    ]
  },
  {
    id: 'lmp-perahu-kajang',
    culturalObjectId: 'obj-perahu-kajang',
    name: 'Perahu Kajang Sungai Batanghari',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Muaro Jambi',
    latitude: -1.5022,
    longitude: 103.5512,
    currentStatus: 'critical',
    lastUpdated: '2026-08-01',
    verifiedByAi: true,
    culturalBearer: 'Tukang Kayu Kapal Tradisional Batanghari & Pelestari Maritim',
    narrative: 'Perahu kayu ulin bertudung atap melengkung anyaman daun nipah (kajang) yang menjadi urat nadi niaga dan hunian terapung leluhur menyusuri 800 km aliran Sungai Batanghari dari hulu hingga muara Selat Malaka.',
    statusHistory: [
      {
        id: 'sh-13',
        status: 'critical',
        changedBy: 'Pemerhati Sejarah Maritim Melayu',
        role: 'Kurator',
        date: '2026-08-01',
        reason: 'Perahu kayu kajang asli di sungai hampir punah dan beralih ke perahu bermotor modern.'
      }
    ]
  },
  ...INDONESIA_LIVING_MAP_POINTS
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-heritage-detective',
    name: 'Detektif Cagar Budaya',
    description: 'Berhasil memverifikasi klaim kebudayaan pertama dengan keakuratan tinggi berbasis rujukan resmi.',
    category: 'Verifikasi',
    icon: 'SearchCheck',
    condition: 'Verifikasi 1 objek cagar budaya'
  },
  {
    id: 'badge-penjelajah-jambi',
    name: 'Penjelajah Bumi Sepucuk Jambi',
    description: 'Menjelajahi minimal 5 titik cagar budaya di peta wilayah perintis Jambi.',
    category: 'Eksplorasi',
    icon: 'Compass',
    condition: 'Jelajahi 5 objek budaya di Jambi'
  },
  {
    id: 'badge-kajang-lako-master',
    name: 'Arsitek Vernakular Kajang Lako',
    description: 'Menuntaskan analisis rekayasa tahan gempa Rumah Tuo Batin Rantau Panjang.',
    category: 'Pengetahuan',
    icon: 'Home',
    condition: 'Selesaikan verifikasi Rumah Kajang Lako'
  },
  {
    id: 'badge-living-map-sentinel',
    name: 'Penjaga Peta Hidup',
    description: 'Mengirimkan laporan pengamatan warga (crowdsourcing) valid atas kondisi objek budaya di lapangan.',
    category: 'Laporan Warga',
    icon: 'MapPin',
    condition: 'Kirimkan 1 laporan Peta Hidup'
  },
  {
    id: 'badge-critical-savior',
    name: 'Penyelamat Tradisi Kritis',
    description: 'Menyusun argumen nalar kritis untuk objek berstatus Kritis Terancam (Senandung Jolo, Aksara Incung, atau Krinok).',
    category: 'Advokasi Budaya',
    icon: 'ShieldAlert',
    condition: 'Verifikasi objek berstatus Kritis'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    name: 'Farhan Dwi Pratama',
    institution: 'SMA Negeri 1 Kota Jambi',
    xp: 2850,
    verifiedCount: 12,
    level: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rank: 1
  },
  {
    id: 'lb-2',
    name: 'Putri Nurhaliza',
    institution: 'Universitas Jambi (Pendidikan Sejarah)',
    xp: 2380,
    verifiedCount: 10,
    level: 4,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rank: 2
  },
  {
    id: 'lb-3',
    name: 'Ahmad Rizky Fauzan',
    institution: 'SMA Negeri 3 Muaro Jambi',
    xp: 1950,
    verifiedCount: 8,
    level: 3,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rank: 3
  },
  {
    id: 'lb-4',
    name: 'Siti Rahmawati',
    institution: 'SMK Negeri 2 Kota Jambi (Kriya Tekstil)',
    xp: 1620,
    verifiedCount: 7,
    level: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rank: 4
  },
  {
    id: 'lb-5',
    name: 'Bagas Aditya Putra',
    institution: 'SMA Titian Teras Jambi',
    xp: 1300,
    verifiedCount: 5,
    level: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rank: 5
  }
];

export const INITIAL_CROWDSOURCE_REPORTS: CrowdsourceReport[] = [
  {
    id: 'rep-01',
    userId: 'user-02',
    userName: 'Putri Nurhaliza',
    userSchool: 'Universitas Jambi',
    livingMapPointId: 'lmp-senandung-jolo',
    culturalObjectName: 'Sastra Lisan Senandung Jolo',
    regency: 'Kabupaten Muaro Jambi',
    observedStatus: 'critical',
    observationNote: 'Saat program KKN di Dusun Tanjung Pasir, maestro Mak Petimah (usia 81 tahun) menuturkan saat ini hampir tidak ada generasi muda desa yang mampu memukul kelentung kayu sambil melantunkan pantun kuno secara utuh.',
    submittedAt: '2026-09-08 14:30',
    aiClassification: 'verified',
    aiConfidenceScore: 92,
    reviewStatus: 'auto_approved',
    curatorNotes: 'Sesuai dengan basis data inventarisasi Kemendikbudristek; program pelatihan regenerasi mendesak dilaksanakan.'
  },
  {
    id: 'rep-02',
    userId: 'user-03',
    userName: 'Ahmad Rizky Fauzan',
    userSchool: 'SMA Negeri 3 Muaro Jambi',
    livingMapPointId: 'lmp-candi-muaro-jambi',
    culturalObjectName: 'Kawasan Percandian Muaro Jambi',
    regency: 'Kabupaten Muaro Jambi',
    observedStatus: 'at_risk',
    observationNote: 'Gelombang air akibat lalu lintas tongkang batubara di Sungai Batanghari mulai mengikis tanah talud bantaran di dekat Candi Gumpung dan kanal percandian.',
    submittedAt: '2026-09-09 10:15',
    aiClassification: 'verified',
    aiConfidenceScore: 88,
    reviewStatus: 'auto_approved',
    curatorNotes: 'Laporan diverifikasi oleh sistem rujukan dan diteruskan ke BPK Wilayah V untuk penanganan abrasi.'
  },
  {
    id: 'rep-03',
    userId: 'user-05',
    userName: 'Bagas Aditya Putra',
    userSchool: 'SMA Titian Teras Jambi',
    livingMapPointId: 'lmp-rumah-kajang-lako',
    culturalObjectName: 'Rumah Adat Tuho Kajang Lako',
    regency: 'Kabupaten Merangin',
    observedStatus: 'lost',
    observationNote: 'Mendengar kabar bahwa seluruh rumah tuo di desa Rantau Panjang sudah dihancurkan dan diganti bangunan beton ruko pasar.',
    submittedAt: '2026-09-09 16:40',
    aiClassification: 'contradicted',
    aiConfidenceScore: 61,
    reviewStatus: 'pending_curator',
    curatorNotes: 'Sistem mendeteksi kontradiksi data: Arsip resmi 2026 mencatat 60+ rumah tuo Kajang Lako masih berdiri tegak dan dilindungi hukum adat Batin. Perlu peninjauan kurator ahli.'
  }
];
