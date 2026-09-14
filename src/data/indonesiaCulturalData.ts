import { CulturalObject, LivingMapPoint } from '../types';

export const INDONESIA_CULTURAL_OBJECTS: CulturalObject[] = [
  // --- JAWA ---
  {
    id: 'obj-candi-borobudur',
    name: 'Candi Borobudur',
    localName: 'Candi Borobudur (Kamadhatu, Rupadhatu, Arupadhatu)',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Magelang',
    province: 'Jawa Tengah',
    islandGroup: 'Jawa',
    latitude: -7.6079,
    longitude: 110.2038,
    mapX: 45,
    mapY: 65,
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Monumen candi Buddha Mahayana terbesar di dunia yang dibangun abad ke-8 era Dinasti Syailendra, berhiaskan 2.672 panel relief dan 504 arca Buddha.',
    fullDescription: 'Candi Borobudur merupakan mahakarya arsitektur batu andesit bertingkat sembilan (enam bujur sangkar dan tiga lingkaran) dengan stupa induk di puncaknya. Struktur ini mencerminkan kosmologi Buddhis tentang perjalanan spiritual manusia melalui tiga tingkatan kosmik: Kamadhatu (dunia hasrat fana), Rupadhatu (dunia wujud terbebas nafsu), dan Arupadhatu (alam nirwujud kesempurnaan). Ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1991.',
    philosophicalMeaning: 'Melambangkan proses metamorfosis batin manusia dari ikatan hawa nafsu keduniawian menuju pencerahan sejati nirwana.',
    historicalEra: 'Abad ke-8 – 9 Masehi (Dinasti Syailendra, Kerajaan Medang/Mataram Kuno)',
    threatLevel: 'at_risk',
    threatReason: 'Tekanan pariwisata massal dan pelapukan mikroorganisme pada batuan andesit memerlukan pembatasan ketat kapasitas naik stupa.',
    references: [
      {
        id: 'ref-borobudur-1',
        title: 'Penetapan Warisan Dunia Borobudur Temple Compounds (Ref: 592)',
        institution: 'UNESCO World Heritage Centre',
        year: 1991,
        urlOrDocId: 'UNESCO-WHC-592',
        type: 'WBTb_Official'
      },
      {
        id: 'ref-borobudur-2',
        title: 'Kajian Konservasi dan Daya Dukung Lingkungan Percandian Borobudur',
        institution: 'Balai Konservasi Borobudur',
        year: 2023,
        urlOrDocId: 'BKB-BDR-2023',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Borobudur dibangun tanpa menggunakan semen atau perekat modern, mengandalkan sambungan batu bertakik (interlocking stone system).',
      'Memiliki 2.672 panel relief naratif yang menceritakan Lalitavistara, Jataka, dan Gandavyuha.',
      'Ditemukan kembali oleh Sir Thomas Stamford Raffles pada tahun 1814 setelah tertimbun abu vulkanik Gunung Merapi selama berabad-abad.'
    ],
    claimTests: [
      {
        id: 'claim-borobudur-1',
        statement: 'Candi Borobudur dibangun pada masa penjajahan Belanda abad ke-19 sebagai benteng militer kolonial.',
        isTrue: false,
        distractorType: 'false_attribution',
        correctClassification: 'contradicted',
        explanation: 'Klaim ini salah total. Borobudur dibangun abad ke-8-9 M oleh Dinasti Syailendra sebagai tempat ibadah Buddhis agung.',
        sourceReferenceId: 'ref-borobudur-1'
      },
      {
        id: 'claim-borobudur-2',
        statement: 'Arsitektur Borobudur membagi tingkatan kosmos spiritual menjadi Kamadhatu, Rupadhatu, dan Arupadhatu.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta sahih sesuai kosmologi Buddhis Mahayana yang diabadikan pada struktur relief dan teras candi.',
        sourceReferenceId: 'ref-borobudur-2'
      }
    ],
    discovered: true,
    verified: true
  },
  {
    id: 'obj-candi-prambanan',
    name: 'Candi Prambanan',
    localName: 'Candi Loro Jonggrang',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Sleman & Klaten',
    province: 'DI Yogyakarta / Jawa Tengah',
    islandGroup: 'Jawa',
    latitude: -7.7520,
    longitude: 110.4915,
    mapX: 47,
    mapY: 67,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kompleks percandian Hindu (Trimurti: Siwa, Brahma, Wisnu) terbesar di Indonesia yang menjulang setinggi 47 meter dengan pahatan epos Ramayana.',
    fullDescription: 'Candi Prambanan didirikan sekitar tahun 850 Masehi oleh Rakai Pikatan dari Kerajaan Mataram Kuno untuk menandingi kemegahan Borobudur dan menegaskan kejayaan wangsa Sanjaya yang beraliran Hindu Siwa. Candi utamanya dipersembahkan bagi Dewa Siwa sang penghancur keburukan, diapit oleh Candi Brahma dan Candi Wisnu, dengan relief epik Ramayana dan Krishnayana yang terpahat anggun di dinding pagar langkan.',
    philosophicalMeaning: 'Melambangkan pemujaan Trimurti dan harmoni kehidupan universal antara penciptaan (Brahma), pemeliharaan (Wisnu), dan daur ulang kosmik (Siwa).',
    historicalEra: 'Abad ke-9 Masehi (Wangsa Sanjaya, Kerajaan Medang Mataram)',
    threatLevel: 'active',
    threatReason: 'Kerentanan zona gempa vulkanik Merapi dan gempa tektonik lempeng selatan Jawa memerlukan pemantauan sensor seismik berkelanjutan.',
    references: [
      {
        id: 'ref-prambanan-1',
        title: 'Prambanan Temple Compounds UNESCO World Heritage Designation',
        institution: 'UNESCO',
        year: 1991,
        urlOrDocId: 'UNESCO-WHC-642',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Candi Siwa di kompleks Prambanan menjulang hingga ketinggian 47 meter di atas tanah dataran Prambanan.',
      'Dikelilingi oleh 240 candi perwara yang sebagian sedang dalam proses rekonstruksi anastilosis arkeologis.'
    ],
    claimTests: [
      {
        id: 'claim-prambanan-1',
        statement: 'Candi Prambanan adalah candi Hindu persembahan bagi Trimurti (Siwa, Wisnu, Brahma).',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta terverifikasi. Tiga candi utama dipersembahkan bagi tiga manifestasi utama Tuhan dalam agama Hindu.',
        sourceReferenceId: 'ref-prambanan-1'
      }
    ],
    discovered: true,
    verified: true
  },
  {
    id: 'obj-wayang-kulit',
    name: 'Wayang Kulit Purwa',
    localName: 'Wayang Kulit Gagrag Surakarta / Yogyakarta',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-nusantara',
    regency: 'Kota Surakarta & Yogyakarta',
    province: 'Jawa Tengah & DI Yogyakarta',
    islandGroup: 'Jawa',
    latitude: -7.5561,
    longitude: 110.8316,
    mapX: 48,
    mapY: 66,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Seni pertunjukan teater bayangan boneka kulit kerbau bertatah intrik dengan iringan gamelan pelog-slendro yang diakui UNESCO sebagai Mahakarya Kemanusiaan.',
    fullDescription: 'Wayang Kulit Purwa adalah sintesis agung sastra, seni rupa, musik gamelan, dan filsafat spiritual Jawa. Diciptakan dari lembaran kulit kerbau yang disamak dan ditatah secara detail menggunakan ratusan jenis tatah logam, lalu diwarnai pigmen alami prada emas. Dimainkan oleh seorang Ki Dalang di balik kelir putih dengan penerangan lampu blencong menyimbolkan matahari kehidupan.',
    philosophicalMeaning: 'Bayangan di kelir melambangkan kefanaan dunia semu (maya), sedangkan Ki Dalang menyimbolkan Sang Pencipta yang menggerakkan seluruh takdir semesta.',
    historicalEra: 'Abad ke-10 Masehi hingga era Wali Songo & Kesultanan Mataram Islam',
    threatLevel: 'active',
    threatReason: 'Peralihan minat hiburan generasi digital ke media instan menantang eksistensi pertunjukan wayang semalam suntuk (durasi 8 jam).',
    references: [
      {
        id: 'ref-wayang-1',
        title: 'Wayang Puppet Theatre Proclamation of Masterpieces',
        institution: 'UNESCO Intangible Cultural Heritage',
        year: 2003,
        urlOrDocId: 'UNESCO-ICH-00063',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Diakui UNESCO sebagai Warisan Budaya Takbenda Dunia pertama dari Indonesia pada tahun 2003.',
      'Tokoh Punokawan (Semar, Gareng, Petruk, Bagong) merupakan kearifan lokal asli Jawa yang tidak ada dalam epos Mahabharata India asli.'
    ],
    claimTests: [
      {
        id: 'claim-wayang-1',
        statement: 'Tokoh Semar dan Punokawan merupakan tokoh impor yang ditulis langsung dari kitab Sanskerta kuno India tanpa campur tangan pujangga Jawa.',
        isTrue: false,
        distractorType: 'false_attribution',
        correctClassification: 'contradicted',
        explanation: 'Salah. Tokoh Punokawan adalah kreasi asli pujangga dan Wali Songo Jawa sebagai simbol rakyat jelata yang arif dan humoris.',
        sourceReferenceId: 'ref-wayang-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-reog-ponorogo',
    name: 'Seni Reog Ponorogo',
    localName: 'Reog Ponorogo (Dhadhak Merak & Singo Barong)',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Ponorogo',
    province: 'Jawa Timur',
    islandGroup: 'Jawa',
    latitude: -7.8671,
    longitude: 111.4646,
    mapX: 52,
    mapY: 68,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tarian kepahlawanan akrobatik spektakuler dengan topeng kepala singa berhiaskan bulu merak raksasa seberat 50 kg yang diangkat hanya dengan gigitan gigi penari Warok.',
    fullDescription: 'Reog Ponorogo adalah seni pertunjukan rakyat Jawa Timur yang memadukan kekuatan spiritual, ketangkasan fisik, dan satir politik era Kerajaan Majapahit. Tokoh sentralnya adalah Singo Barong dengan Dhadhak Merak setinggi 2,25 meter dan berat 50-60 kilogram, digigit oleh penari pembarong sembari berputar lincah diiringi gending kempul, selompret, dan angklung reog.',
    philosophicalMeaning: 'Melambangkan keberanian menaklukkan ego buas angkara murka (kepala harimau) dan keanggunan budi pekerti yang memesona (bulu merak).',
    historicalEra: 'Abad ke-15 Masehi (Era Prabu Brawijaya V & Ki Ageng Kutu / Surya Alam)',
    threatLevel: 'active',
    threatReason: 'Keterbatasan bulu merak hijau alami (Pavo muticus) yang dilindungi undang-undang mendorong inovasi penggunaan bulu rontokan berlisensi dan serat sintetis ramah lingkungan.',
    references: [
      {
        id: 'ref-reog-1',
        title: 'Inventarisasi Warisan Budaya Takbenda Indonesia: Reog Ponorogo',
        institution: 'Direktorat Perlindungan Kebudayaan Kemendikbudristek',
        year: 2021,
        urlOrDocId: 'WBTb-JATIM-REOG-2021',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Topeng Dhadhak Merak diangkat semata-mata dengan kekuatan gigitan gigi dan leher penari tanpa tali pengikat ke pundak.',
      'Tarian ini sarat pesan satir kritik sosial dari Ki Ageng Kutu terhadap Raja Majapahit yang saat itu terpengaruh oleh permaisurinya.'
    ],
    claimTests: [
      {
        id: 'claim-reog-1',
        statement: 'Topeng Dhadhak Merak Reog Ponorogo yang berbobot puluhan kilogram diangkat hanya menggunakan kekuatan gigitan gigi pembarong.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta sahih dan menjadi bukti latihan fisik batin Warok Ponorogo yang legendaris.',
        sourceReferenceId: 'ref-reog-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- SUMATERA ---
  {
    id: 'obj-tari-saman',
    name: 'Tari Saman Gayo',
    localName: 'Saman Jekan / Saman Gayo',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-sumatra',
    regency: 'Kabupaten Gayo Lues',
    province: 'Aceh',
    islandGroup: 'Sumatera',
    latitude: 4.0728,
    longitude: 97.3190,
    mapX: 18,
    mapY: 15,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tarian tepuk tangan serempak berkecepatan tinggi tanpa alat musik yang dibawakan puluhan penari pria dalam satu saf, diakui UNESCO pada Kategori Perlindungan Mendesak.',
    fullDescription: 'Tari Saman dikembangkan oleh ulama sufi Syekh Saman pada abad ke-14 untuk menyiarkan dakwah Islam dan merekatkan persaudaraan suku Gayo. Keunikan mutlak tarian ini adalah irama ritmis dihasilkan murni dari tepukan dada, paha, dan lantai oleh para penari secara serentak dalam tempo yang kian lama kian cepat dan presisi tanpa komando verbal.',
    philosophicalMeaning: 'Melambangkan kekompakan mutlak, kesetaraan derajat di hadapan Tuhan, dan kepatuhan terhadap kepemimpinan spiritual (Penangkat).',
    historicalEra: 'Abad ke-14 Masehi (Era Syekh Saman, Dataran Tinggi Gayo)',
    threatLevel: 'at_risk',
    threatReason: 'Arus urbanisasi generasi muda Gayo keluar daerah dan berkurangnya penutur lirik sastra bahasa Gayo kuno.',
    references: [
      {
        id: 'ref-saman-1',
        title: 'Saman Dance in Need of Urgent Safeguarding',
        institution: 'UNESCO Intangible Cultural Heritage',
        year: 2011,
        urlOrDocId: 'UNESCO-ICH-00509',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Tari Saman asli hanya dibawakan oleh laki-laki dalam jumlah ganjil duduk bersimpuh rapat membentuk satu garis lurus.',
      'Sering tertukar di publik dengan tari Ratoh Jaroe asal Aceh pesisir yang ditarikan oleh perempuan.'
    ],
    claimTests: [
      {
        id: 'claim-saman-1',
        statement: 'Tari Saman Gayo tradisional diiringi oleh orkestra gamelan Jawa lengkap dengan gong tiup.',
        isTrue: false,
        distractorType: 'false_attribution',
        correctClassification: 'contradicted',
        explanation: 'Keliru. Tari Saman asli tidak menggunakan alat musik eksternal; irama murni berasal dari tepukan tubuh penari dan lantunan syair vokal.',
        sourceReferenceId: 'ref-saman-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-rumah-gadang',
    name: 'Rumah Gadang Minangkabau',
    localName: 'Rumah Bagonjong (Gadang Gajah Maharam)',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-sumatra',
    regency: 'Kabupaten Tanah Datar & Agam',
    province: 'Sumatera Barat',
    islandGroup: 'Sumatera',
    latitude: -0.9471,
    longitude: 100.4172,
    mapX: 25,
    mapY: 35,
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Arsitektur vernakular tahan gempa beratap lengkung meruncing serupa tanduk kerbau yang merefleksikan sistem kekerabatan matrilineal suku Minangkabau.',
    fullDescription: 'Rumah Gadang adalah pusat kehidupan komunal kaum Minangkabau berlandaskan falsafah "Adat Basandi Syarak, Syarak Basandi Kitabullah". Dirancang tahan guncangan gempa bumi cincin api Sumatra dengan tiang-tiang kayu utama yang bertumpu pada batu pipih (batu sandi) tanpa ditanam mati ke dalam tanah, sehingga bangunan dapat bergoyang lentur saat gempa besar tanpa patah.',
    philosophicalMeaning: 'Bentuk atap gonjong tanduk kerbau melambangkan kemenangan diplomasi leluhur serta aspirasi vertikal menuju Yang Maha Kuasa.',
    historicalEra: 'Abad ke-13 Masehi (Peradaban Adat Minangkabau Luhak Nan Tigo)',
    threatLevel: 'at_risk',
    threatReason: 'Kelangkaan pohon kayu juar tua dan ilalang atap ijuk alami, serta biaya perawatan ukiran dinding yang tinggi.',
    references: [
      {
        id: 'ref-gadang-1',
        title: 'Arsitektur Tradisional Rumah Gadang Sumatera Barat',
        institution: 'Balai Pelestarian Kebudayaan Wilayah III',
        year: 2020,
        urlOrDocId: 'BPK-III-SB-2020',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Rumah Gadang diwariskan dari ibu ke anak perempuan (sistem matrilineal tertua yang masih eksis di dunia).',
      'Setiap ukiran kayu di dindingnya diberi nama flora atau fauna yang mengandung pepatah adat, seperti Itiak Pulang Petang.'
    ],
    claimTests: [
      {
        id: 'claim-gadang-1',
        statement: 'Rumah Gadang didesain fleksibel tahan gempa karena tiang-tiang utamanya tidak dicor semen ke dalam tanah melainkan diletakkan di atas batu sandi datar.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta otentik arsitektur nenek moyang Minangkabau yang terbukti tahan puluhan kali gempa bumi Bukit Barisan.',
        sourceReferenceId: 'ref-gadang-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-kain-ulos',
    name: 'Kain Tenun Ulos Batak',
    localName: 'Ulos Ragidup / Ulos Mangiring',
    category: 'Kriya & Tekstil',
    worldId: 'world-sumatra',
    regency: 'Kabupaten Toba & Samosir',
    province: 'Sumatera Utara',
    islandGroup: 'Sumatera',
    latitude: 2.6105,
    longitude: 98.8682,
    mapX: 22,
    mapY: 22,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Kain tenun sakral masyarakat Batak yang menjadi medium restu kehidupan, kehangatan jiwa, dan pengikat tali persaudaraan dari lahir hingga wafat.',
    fullDescription: 'Ulos adalah rajutan identitas kosmologi suku Batak di sekitar Danau Toba. Ditenun helai demi helai menggunakan alat tenun gedogan tradisional selama berminggu-minggu dengan benang kapas celup pewarna alam seperti daun salaon (nila) dan kulit kayu. Digunakan dalam ritual Mangulosi (pemberian ulos) sebagai simbol curahan kasih sayang, doa restu, dan kehangatan jasmani rohani.',
    philosophicalMeaning: 'Leluhur Batak meyakini ada tiga sumber kehangatan bagi manusia: matahari, api, dan ulos.',
    historicalEra: 'Abad ke-14 Masehi (Peradaban Megalitik & Tradisi Suku Batak)',
    threatLevel: 'active',
    threatReason: 'Persaingan dengan kain ulos cetak mesin industri modern (tekstil printing) yang tidak memiliki nilai sakral tenun tangan.',
    references: [
      {
        id: 'ref-ulos-1',
        title: 'Penetapan Ulos sebagai Warisan Budaya Takbenda Nasional Indonesia',
        institution: 'Kemendikbud RI',
        year: 2014,
        urlOrDocId: 'SK-MENDIKBUD-WBTB-ULOS-2014',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Ulos Ragidup (pola kehidupan) merupakan jenis ulos dengan derajat sakral tertinggi dalam adat Batak.',
      'Tanggal 17 Oktober diperingati secara rutin sebagai Hari Ulos Nasional di Indonesia.'
    ],
    claimTests: [
      {
        id: 'claim-ulos-1',
        statement: 'Kain Ulos adalah kain tenun Batak yang memiliki fungsi sakral Mangulosi untuk memberikan restu dan kehangatan.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar dan terdaftar resmi dalam inventaris Warisan Budaya Takbenda Kemendikbud.',
        sourceReferenceId: 'ref-ulos-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- BALI & NUSA TENGGARA ---
  {
    id: 'obj-tari-kecak',
    name: 'Tari Kecak Bali',
    localName: 'Tari Kecak Uluwatu (Cak Cak Cak)',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Badung & Gianyar',
    province: 'Bali',
    islandGroup: 'Bali & Nusa Tenggara',
    latitude: -8.8291,
    longitude: 115.0849,
    mapX: 58,
    mapY: 72,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Drama tari ritmis polifonik yang dibawakan puluhan hingga ratusan pria bertelanjang dada duduk melingkar menyerukan koor "cak" mengelilingi api suci.',
    fullDescription: 'Tari Kecak berakar dari ritual Sanghyang Kuno (upacara penolak bala) yang dikembangkan pada dekade 1930-an bersama pelukis Walter Spies menjadi drama tari epos Ramayana. Para penari melingkari obor perapian sembari mengangkat kedua tangan ke angkasa, melantunkan koor vokal kompleks bertingkat yang menirukan desau angin dan gemuruh pasukan kera Sugriwa.',
    philosophicalMeaning: 'Harmoni suara tanpa alat musik melambangkan kekuatan doa kolektif manusia untuk memenangkan kebajikan (dharma) atas keangkaramurkaan (adharma).',
    historicalEra: 'Tradisi ritual purba Sanghyang & revitalisasi 1930 Masehi (Bali)',
    threatLevel: 'active',
    threatReason: 'Terjaga sangat baik di panggung amfiteater Tebing Uluwatu dan desa adat Gianyar.',
    references: [
      {
        id: 'ref-kecak-1',
        title: 'Kecak Dance of Bali Intangible Cultural Heritage Registration',
        institution: 'Kemendikbudristek & Dinas Kebudayaan Provinsi Bali',
        year: 2015,
        urlOrDocId: 'WBTb-BALI-KECAK-2015',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Kecak sama sekali tidak memakai iringan gamelan logam gong, melainkan suara vokal akapela polifonik para penarinya.',
      'Puncak adegannya menampilkan Hanoman melompati kobaran api panas (babak api Hanoman Duta).'
    ],
    claimTests: [
      {
        id: 'claim-kecak-1',
        statement: 'Tari Kecak diiringi oleh orkes seruling bambu elektrik dari negara Jepang.',
        isTrue: false,
        distractorType: 'false_attribution',
        correctClassification: 'contradicted',
        explanation: 'Salah. Keunikan utama Tari Kecak terletak pada ritme vokal "cak-cak-cak" ratusan penari tanpa instrumen musik.',
        sourceReferenceId: 'ref-kecak-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-sasando-rote',
    name: 'Alat Musik Sasando',
    localName: 'Sasando Gong / Sasando Biola (Sasandu)',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Rote Ndao',
    province: 'Nusa Tenggara Timur',
    islandGroup: 'Bali & Nusa Tenggara',
    latitude: -10.7410,
    longitude: 123.1250,
    mapX: 68,
    mapY: 82,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Alat musik dawai petik polifonik tradisional yang unik dengan resonator resonansi suara terbuat dari anyaman daun pohon lontar (palma Borassus).',
    fullDescription: 'Sasando adalah instrumen dawai khas Pulau Rote di Nusa Tenggara Timur. Tabung bambu panjang tempat terbentangnya 28 hingga 56 senar dawai kawat dipasang di dalam mangkuk kipas daun lontar kering setengah lingkaran yang bertindak sebagai ruang resonansi akustik alami. Menghasilkan alunan melodi lembut yang mampu mengiringi lagu ratapan, tarian adat, hingga syair lisan leluhur.',
    philosophicalMeaning: 'Mengajarkan keselarasan antara nada batin manusia dengan karunia tanaman pohon kehidupan (lontar) yang menopang pulau tandus.',
    historicalEra: 'Abad ke-15 Masehi (Legenda Sangguana di Pulau Rote)',
    threatLevel: 'at_risk',
    threatReason: 'Jumlah pengrajin pembuat Sasando daun lontar otentik di Pulau Rote semakin sedikit karena pergeseran ke bahan kayu lapis dan sasando elektrik.',
    references: [
      {
        id: 'ref-sasando-1',
        title: 'Sasando Rote Warisan Budaya Takbenda Nasional Indonesia',
        institution: 'Kemendikbudristek RI',
        year: 2013,
        urlOrDocId: 'WBTb-NTT-SASANDO-2013',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Daun pohon lontar harus dipetik pada usia tertentu lalu dijemur tanpa retak agar menghasilkan ruang pantul akustik berdesir merdu.',
      'Instrumen ini menjadi salah satu alat musik akustik paling unik di muka bumi yang memadukan bambu, dawai kawat, dan daun palem.'
    ],
    claimTests: [
      {
        id: 'claim-sasando-1',
        statement: 'Resonator suara Sasando Rote dibuat dari lembaran anyaman daun pohon lontar alami.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar. Daun lontar merupakan ciri khas mutlak Sasando tradisional asli Nusa Tenggara Timur.',
        sourceReferenceId: 'ref-sasando-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- KALIMANTAN ---
  {
    id: 'obj-mandau-dayak',
    name: 'Senjata Tradisional Mandau Dayak',
    localName: 'Mandau / Ambang Kenyah & Ngaju',
    category: 'Senjata & Pusaka',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Kapuas & Kutai Barat',
    province: 'Kalimantan Tengah & Timur',
    islandGroup: 'Kalimantan',
    latitude: -1.2654,
    longitude: 113.8400,
    mapX: 52,
    mapY: 42,
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Senjata pusaka bilah baja khas suku Dayak berhiaskan ukiran krawang tembus, hulu tanduk rusa berukir aso, dan kudi anak pisau kecil.',
    fullDescription: 'Mandau adalah identitas kehormatan dan ksatria suku Dayak di pedalaman hutan tropis Kalimantan. Ditempa dari bijih besi mantikei berkualitas tinggi dengan satu sisi bilah cekung dan sisi lainnya cembung. Gagang mandau (pulan) diukir dari tanduk rusa atau kayu ulin dengan motif binatang mitis naga aso dan dihias jumbai rambut manusia atau serat ijuk.',
    philosophicalMeaning: 'Bukan sekadar senjata perang, melainkan lambang martabat, perlindungan keluarga, dan keterikatan batin dengan roh leluhur penjaga rimba.',
    historicalEra: 'Abad ke-14 Masehi (Peradaban Leluhur Suku Dayak Borneo)',
    threatLevel: 'active',
    threatReason: 'Penurunan jumlah empu pandai besi tradisional yang menguasai teknik penempaan besi mantikei kuno berukir tembus.',
    references: [
      {
        id: 'ref-mandau-1',
        title: 'Inventarisasi Senjata Tradisional Mandau Dayak Kalimantan',
        institution: 'Balai Pelestarian Nilai Budaya Kalimantan Barat',
        year: 2018,
        urlOrDocId: 'BPNB-KALBAR-MANDAU-2018',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Mandau pusaka asli dilengkapi pisau kecil pendamping di sarungnya yang disebut "kudi" atau "ambang" untuk memotong rotan dan menguliti kayu.',
      'Sisi bilah Mandau yang asimetris dirancang agar ayunan sayatan meluncur presisi menembus semak belukar lebat hutan hujan.'
    ],
    claimTests: [
      {
        id: 'claim-mandau-1',
        statement: 'Gagang hulu Mandau Dayak tradisional umumnya dibuat dari tanduk rusa yang diukir motif satwa naga aso.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta sahih sesuai kriya senjata pusaka Dayak Kalimantan.',
        sourceReferenceId: 'ref-mandau-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-rumah-betang',
    name: 'Rumah Panjang Betang Radakng',
    localName: 'Rumah Radakng / Rumah Betang Dayak',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-nusantara',
    regency: 'Kota Pontianak & Kapuas Hulu',
    province: 'Kalimantan Barat',
    islandGroup: 'Kalimantan',
    latitude: -0.0263,
    longitude: 109.3425,
    mapX: 42,
    mapY: 38,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Rumah panggung kayu ulin raksasa sepanjang hingga 180 meter yang menampung puluhan hingga ratusan keluarga Dayak dalam satu atap persaudaraan.',
    fullDescription: 'Rumah Betang Radakng adalah mahakarya arsitektur kayu ulin (kayu besi) suku Dayak di Kalimantan Barat. Dibangun di atas tiang panggung setinggi 3 hingga 5 meter untuk menghindari serangan binatang buas dan banjir luapan sungai. Di dalamnya terdapat serambi terbuka luas tempat musyawarah adat dan bilik-bilik keluarga (lawang) yang mencerminkan demokrasi komunal paling tulen.',
    philosophicalMeaning: 'Filosofi kebersamaan mutlak: "Berat sama dipikul, ringan sama dijinjing", tidak ada sekat kelas sosial di bawah atap Betang.',
    historicalEra: 'Abad ke-12 Masehi (Tradisi Komunal Hutan Hujan Kalimantan)',
    threatLevel: 'at_risk',
    threatReason: 'Banyak rumah betang kayu asli di pedalaman terbakar atau ditinggalkan karena beralih ke rumah tunggal modern.',
    references: [
      {
        id: 'ref-betang-1',
        title: 'Pelestarian Arsitektur Tradisional Rumah Betang Kalimantan Barat',
        institution: 'Dinas Pendidikan dan Kebudayaan Provinsi Kalimantan Barat',
        year: 2021,
        urlOrDocId: 'DISDIKBUD-KALBAR-BETANG-2021',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Rumah Radakng di Pontianak tercatat sebagai salah satu rumah panggung adat terpanjang di Indonesia dengan panjang mencapai 138 meter.',
      'Tangga masuknya dibuat dari sebatang pohon utuh yang ditakik pijakan kaki, disebut tangga hejot.'
    ],
    claimTests: [
      {
        id: 'claim-betang-1',
        statement: 'Rumah Betang Dayak didirikan di atas tanah rawa menggunakan tiang-tiang panggung tinggi berbahan kayu ulin.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar. Kayu ulin adalah material utama karena semakin tua dan basah semakin mengeras seperti batu.',
        sourceReferenceId: 'ref-betang-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- SULAWESI ---
  {
    id: 'obj-toraja-tongkonan',
    name: 'Rumah Adat Tongkonan Toraja',
    localName: 'Tongkonan Layuk / Tongkonan Pekamberan',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Tana Toraja & Toraja Utara',
    province: 'Sulawesi Selatan',
    islandGroup: 'Sulawesi',
    latitude: -3.0560,
    longitude: 119.8660,
    mapX: 62,
    mapY: 52,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Rumah adat panggung dengan atap melengkung menjulang mirip perahu leluhur yang dihiasi jajaran tanduk kerbau (kabongo) sebagai simbol status garis keturunan.',
    fullDescription: 'Tongkonan adalah pusat spiritual dan sosial klan keluarga suku Toraja. Wujud atapnya yang melengkung dramatis mengingatkan pada perahu nenek moyang yang mendarat di dataran tinggi Sulawesi. Tiang utama di muka rumah dipasangi puluhan pasang tanduk kerbau hasil upacara Rambu Solo, mencerminkan kedermawanan dan status kebangsawanan kaum.',
    philosophicalMeaning: 'Menghubungkan tiga alam kosmos Aluk Todolo: atap langit kedewataan, lantai panggung pergaulan manusia, dan kolong bumi tempat ternak kerbau.',
    historicalEra: 'Abad ke-10 Masehi (Tradisi Kuno Aluk Todolo Tana Toraja)',
    threatLevel: 'active',
    threatReason: 'Alih fungsi material atap ijuk bambu ke seng bergelombang karena kepraktisan perawatan.',
    references: [
      {
        id: 'ref-toraja-1',
        title: 'Toraja Settlement Tentative World Heritage List',
        institution: 'UNESCO World Heritage Tentative List',
        year: 2009,
        urlOrDocId: 'UNESCO-TENTATIVE-5462',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Tongkonan selalu menghadap tepat ke arah Utara, tempat bersemayamnya Puang Matua (Sang Pencipta) dan asal datangnya leluhur perahu.',
      'Tidak dapat diperjualbelikan karena merupakan hak milik pusaka turun-temurun satu rumpun keluarga besar.'
    ],
    claimTests: [
      {
        id: 'claim-toraja-1',
        statement: 'Tongkonan Toraja selalu dibangun menghadap ke arah Utara sesuai pandangan kosmis Aluk Todolo.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar dan terverifikasi dalam arsitektur vernakular Toraja.',
        sourceReferenceId: 'ref-toraja-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-perahu-phinisi',
    name: 'Perahu Layar Phinisi',
    localName: 'Pinisi Bulukumba (Panrita Lopi)',
    category: 'Kriya & Tekstil',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Bulukumba',
    province: 'Sulawesi Selatan',
    islandGroup: 'Sulawesi',
    latitude: -5.5562,
    longitude: 120.4491,
    mapX: 63,
    mapY: 62,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Mahakarya pembuatan kapal layar kayu bertiang dua dengan tujuh helai layar agung karya Panrita Lopi suku Bugis-Makassar, diakui UNESCO sebagai Warisan Kemanusiaan.',
    fullDescription: 'Seni pembuatan perahu Phinisi di Tana Beru Bulukumba diwariskan turun-temurun tanpa menggunakan gambar cetak biru arsitektur modern maupun paku besi. Seluruh lambung kapal dari kayu besi ulin dan bitti dirangkai dengan pasak kayu dan dihitung murni lewat kepekaan rasa dan doa batin sang nakhoda pembuat (Panrita Lopi). Berlayar mengarungi samudra pasifik hingga benua Amerika.',
    philosophicalMeaning: 'Tujuh helai layar melambangkan tujuh lapis langit dan tekad tak kenal gentar pelaut nusantara: "Kualleangi tallanga na toalia" (Lebih baik tenggelam di samudra daripada kembali tanpa hasil).',
    historicalEra: 'Abad ke-14 Masehi (Era Sawerigading & Maritim Bugis-Makassar)',
    threatLevel: 'active',
    threatReason: 'Berkurangnya pasokan kayu bitti dan kayu ulin tua legal di Sulawesi.',
    references: [
      {
        id: 'ref-phinisi-1',
        title: 'Pinisi, art of boatbuilding in South Sulawesi UNESCO Inscription',
        institution: 'UNESCO Intangible Cultural Heritage',
        year: 2017,
        urlOrDocId: 'UNESCO-ICH-01197',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Dibangun di tepi pantai terbuka tanpa dermaga galangan modern dan diluncurkan ke laut saat air pasang purnama.',
      'Konstruksinya merekatkan papan lambung terlebih dahulu sebelum memasang rangka gading, berbeda dengan tradisi pembuatan kapal barat.'
    ],
    claimTests: [
      {
        id: 'claim-phinisi-1',
        statement: 'Perahu Phinisi dirakit tanpa menggunakan cetak biru gambar kerja kertas dan paku besi logam modern.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta otentik yang membuat seni pembuatan Phinisi dinobatkan sebagai warisan dunia UNESCO tahun 2017.',
        sourceReferenceId: 'ref-phinisi-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- MALUKU ---
  {
    id: 'obj-tifa-totobuang',
    name: 'Musik Tradisional Tifa Totobuang',
    localName: 'Tifa Totobuang & Gamelan Gong Maluku',
    category: 'Seni Pertunjukan & Tari',
    worldId: 'world-nusantara',
    regency: 'Kota Ambon & Maluku Tengah',
    province: 'Maluku',
    islandGroup: 'Maluku',
    latitude: -3.6547,
    longitude: 128.1906,
    mapX: 78,
    mapY: 55,
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Perpaduan musik ritmis membranofon tifa kayu berbalut kulit rusa dengan gamelan gong melodi totobuang yang mengiringi tradisi persaudaraan Pela Gandong.',
    fullDescription: 'Tifa Totobuang adalah harmoni musikal khas Kepulauan Rempah Maluku. Tifa terbuat dari batang pohon sukun atau linggua yang dilubangi dan dipasangi kulit rusa hutan, dimainkan bersama barisan gong kuningan kecil Totobuang bertangga nada diatonis. Mengiringi tarian kegembiraan Lenso dan prosesi sumpah damai Pela Gandong antar desa Islam dan Kristen.',
    philosophicalMeaning: 'Melambangkan detak jantung persaudaraan sejati lintas agama dan pulau di bumi raja-raja.',
    historicalEra: 'Abad ke-16 Masehi (Era Jalur Rempah Pala & Cengkeh Maluku)',
    threatLevel: 'active',
    threatReason: 'Eksis kuat di Kota Musik Dunia Ambon UNESCO, perlu regenerasi pemain totobuang di desa-desa terluar.',
    references: [
      {
        id: 'ref-tifa-1',
        title: 'Inventarisasi Warisan Musik Tradisional Maluku',
        institution: 'Balai Pelestarian Kebudayaan Wilayah XX Maluku',
        year: 2022,
        urlOrDocId: 'BPK-XX-TIFA-2022',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Ambon dinobatkan oleh UNESCO sebagai "City of Music" pada tahun 2019 salah satunya berkat napas musik Tifa Totobuang.',
      'Kulit penutup Tifa diikat kencang menggunakan rotan hutan tanpa sekrup logam.'
    ],
    claimTests: [
      {
        id: 'claim-tifa-1',
        statement: 'Tifa Totobuang adalah instrumen musik tradisional khas kepulauan Maluku yang memadukan tabung tifa dan gong kecil.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar dan terverifikasi dalam arsip musik tradisional Maluku.',
        sourceReferenceId: 'ref-tifa-1'
      }
    ],
    discovered: true,
    verified: false
  },

  // --- PAPUA ---
  {
    id: 'obj-rumah-honai',
    name: 'Rumah Tradisional Honai Papua',
    localName: 'Honai Pegunungan Tengah (Suku Dani / Lani)',
    category: 'Arsitektur & Rumah Adat',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Jayawijaya',
    province: 'Papua Pegunungan',
    islandGroup: 'Papua',
    latitude: -4.0982,
    longitude: 138.9482,
    mapX: 88,
    mapY: 62,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Rumah bundar mungil beratap kubah jerami ilalang tebal dengan perapian di tengah yang dirancang cerdas menahan hawa dingin pegunungan tinggi 2.000 mdpl.',
    fullDescription: 'Honai adalah hunian tradisional suku Dani di Lembah Baliem, Papua Pegunungan. Memiliki bentuk silinder melingkar tanpa jendela untuk mencegah masuknya angin beku pegunungan. Dindingnya dibuat dari kayu papan kayu berlapis dua, beratap kerucut jerami tebal, dengan perapian batu di tengah lantai dasar sebagai penghangat tubuh dan tempat berbincang para tetua adat.',
    philosophicalMeaning: 'Bentuk lingkaran bulat melambangkan satu hati, satu tujuan, dan kesatuan tekad suku tanpa awal dan tanpa akhir.',
    historicalEra: 'Peradaban Neolitik Abad Silam Dataran Tinggi Papua',
    threatLevel: 'active',
    threatReason: 'Penggantian jerami ilalang dengan atap seng yang justru membuat hawa di dalam rumah menjadi sangat dingin saat malam hari.',
    references: [
      {
        id: 'ref-honai-1',
        title: 'Arsitektur Vernakular Rumah Honai Suku Dani Lembah Baliem',
        institution: 'Balai Pelestarian Kebudayaan Wilayah XXII Papua',
        year: 2021,
        urlOrDocId: 'BPK-XXII-HONAI-2021',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Honai khusus untuk laki-laki dewasa disebut Honai, sedangkan rumah khusus perempuan dan anak-anak disebut Ebei.',
      'Lantai dua beralaskan bilah jerami rumput empuk berfungsi sebagai tempat tidur yang sangat hangat.'
    ],
    claimTests: [
      {
        id: 'claim-honai-1',
        statement: 'Honai dirancang melingkar tanpa jendela untuk menahan angin dingin lembah pegunungan Papua.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar sesuai prinsip kearifan arsitektur iklim dingin suku Dani.',
        sourceReferenceId: 'ref-honai-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-tas-noken',
    name: 'Tas Noken Serat Kayu Papua',
    localName: 'Noken Papua (Inokson / Yato)',
    category: 'Kriya & Tekstil',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Jayapura & Mimika',
    province: 'Papua & Papua Tengah',
    islandGroup: 'Papua',
    latitude: -2.5337,
    longitude: 140.7181,
    mapX: 92,
    mapY: 55,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Tas jaring multifungsi yang dianyam dari pintalan serat kulit pohon alami oleh para mama Papua, disematkan di dahi kepala dan diakui UNESCO.',
    fullDescription: 'Noken adalah tas tradisional masyarakat Papua yang dianyam secara manual dari kulit pohon seperti pohon manduam atau anggrek hutan. Cara membawanya sangat khas dengan menaruh tali gantungan di kening dahi, lalu menjuntai ke punggung belakang. Digunakan untuk membawa hasil kebun umbi keladi, kayu bakar, hingga menggendong bayi mungil.',
    philosophicalMeaning: 'Melambangkan rahim ibu, kesuburan, perdamaian, dan kemandirian hidup yang dianugerahkan oleh alam rimba Papua.',
    historicalEra: 'Peradaban Leluhur Asli Tanah Papua',
    threatLevel: 'at_risk',
    threatReason: 'Masuknya kantong plastik sekali pakai dan benang sintetis murah yang mengikis tradisi menenun serat kulit pohon asli.',
    references: [
      {
        id: 'ref-noken-1',
        title: 'Noken Multifunctional Knotted or Woven Bag Inscription',
        institution: 'UNESCO Urgent Safeguarding List',
        year: 2012,
        urlOrDocId: 'UNESCO-ICH-00619',
        type: 'WBTb_Official'
      }
    ],
    curatedFacts: [
      'Diakui UNESCO sebagai Warisan Budaya Takbenda Dunia yang Membutuhkan Perlindungan Mendesak pada tahun 2012.',
      'Tradisi membuat Noken adalah ujian kedewasaan bagi anak perempuan Papua sebelum berumah tangga.'
    ],
    claimTests: [
      {
        id: 'claim-noken-1',
        statement: 'Tas Noken tradisional Papua dianyam dari pintalan serat kulit pohon hutan dan digantungkan pada dahi kepala.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar dan terdaftar dalam Warisan Budaya Dunia UNESCO.',
        sourceReferenceId: 'ref-noken-1'
      }
    ],
    discovered: true,
    verified: false
  },
  {
    id: 'obj-ukiran-asmat',
    name: 'Seni Ukir Kayu Suku Asmat',
    localName: 'Ukiran Asmat & Tiang Bisj',
    category: 'Kriya & Tekstil',
    worldId: 'world-nusantara',
    regency: 'Kabupaten Asmat',
    province: 'Papua Selatan',
    islandGroup: 'Papua',
    latitude: -5.4485,
    longitude: 138.4891,
    mapX: 89,
    mapY: 68,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Mahakarya seni pahat patung kayu bakau bertingkat (Tiang Bisj) yang dipahat tanpa pola sketsa awal oleh para Wow-ipits (pemahat ulung Asmat).',
    fullDescription: 'Suku Asmat di pesisir rawa lumpur Papua Selatan dikenal dunia internasional sebagai pemahat kayu paling jenius. Tiang Bisj adalah patung totem setinggi 3-5 meter yang dipahat dari sebatang pohon bakau utuh dengan akar bannya. Setiap sosok figur manusia yang bertumpuk menggambarkan arwah para tetua leluhur yang dihormati.',
    philosophicalMeaning: 'Mengekspresikan penghormatan abadi kepada arwah nenek moyang serta keyakinan bahwa manusia dan pohon adalah satu kesatuan kosmik.',
    historicalEra: 'Tradisi Spiritual Primitif Purba Suku Asmat',
    threatLevel: 'active',
    threatReason: 'Kompleksitas akses logistik dan pemeliharaan habitat hutan bakau rawa pasang surut.',
    references: [
      {
        id: 'ref-asmat-1',
        title: 'Dokumentasi Warisan Budaya Seni Ukir Suku Asmat Papua',
        institution: 'Museum Kebudayaan dan Kemajuan Asmat',
        year: 2019,
        urlOrDocId: 'ASMAT-MUSEUM-2019',
        type: 'Museum_Archive'
      }
    ],
    curatedFacts: [
      'Pemahat Asmat (Wow-ipits) memahat langsung tanpa membuat sketsa pensil terlebih dahulu di atas kayu.',
      'Koleksi ukiran Asmat dipajang di museum-museum bergengsi dunia termasuk Metropolitan Museum of Art New York.'
    ],
    claimTests: [
      {
        id: 'claim-asmat-1',
        statement: 'Tiang Bisj suku Asmat dipahat dari sebatang pohon bakau utuh sebagai persembahan bagi arwah leluhur.',
        isTrue: true,
        distractorType: 'factual',
        correctClassification: 'verified',
        explanation: 'Fakta benar dan terbukti dalam etnografi antropologi suku Asmat.',
        sourceReferenceId: 'ref-asmat-1'
      }
    ],
    discovered: true,
    verified: false
  }
];

export const INDONESIA_LIVING_MAP_POINTS: LivingMapPoint[] = [
  {
    id: 'lmp-candi-borobudur',
    culturalObjectId: 'obj-candi-borobudur',
    name: 'Candi Borobudur',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Magelang',
    province: 'Jawa Tengah',
    islandGroup: 'Jawa',
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    latitude: -7.6079,
    longitude: 110.2038,
    currentStatus: 'at_risk',
    lastUpdated: '2026-09-08',
    verifiedByAi: true,
    culturalBearer: 'Balai Konservasi Borobudur & Majelis Buddhis Indonesia',
    narrative: 'Monumen candi Buddha Mahayana terbesar di dunia dengan 2.672 panel relief dan 504 arca Buddha yang merefleksikan tingkatan kosmik Kamadhatu, Rupadhatu, dan Arupadhatu. Memerlukan konservasi mikroskopis batu andesit secara berkesinambungan.',
    statusHistory: [
      {
        id: 'sh-bb-1',
        status: 'at_risk',
        changedBy: 'Balai Konservasi Borobudur',
        role: 'Kurator',
        date: '2026-09-08',
        reason: 'Penerapan kuota sandal upanat dan pembatasan pengunjung harian untuk melindungi batuan lantai teras.'
      }
    ]
  },
  {
    id: 'lmp-candi-prambanan',
    culturalObjectId: 'obj-candi-prambanan',
    name: 'Candi Prambanan',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Sleman & Klaten',
    province: 'DI Yogyakarta / Jateng',
    islandGroup: 'Jawa',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    latitude: -7.7520,
    longitude: 110.4915,
    currentStatus: 'active',
    lastUpdated: '2026-09-05',
    verifiedByAi: true,
    culturalBearer: 'Balai Pelestarian Kebudayaan Wilayah X & Parisada Hindu Dharma Indonesia',
    narrative: 'Kompleks percandian Hindu Siwa termegah di Indonesia peninggalan wangsa Sanjaya abad ke-9 Masehi. Didedikasikan bagi Trimurti dengan relief epos Ramayana dan Krishnayana yang terpahat mengelilingi candi utama setinggi 47 meter.',
    statusHistory: [
      {
        id: 'sh-pr-1',
        status: 'active',
        changedBy: 'BPK Wilayah X Yogyakarta',
        role: 'Pemerintah',
        date: '2026-09-05',
        reason: 'Sistem monitoring sensor seismik dan penataan zona taman cagar budaya berjalan optimal.'
      }
    ]
  },
  {
    id: 'lmp-wayang-kulit',
    culturalObjectId: 'obj-wayang-kulit',
    name: 'Wayang Kulit Purwa',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kota Surakarta & Yogyakarta',
    province: 'Jawa Tengah & DIY',
    islandGroup: 'Jawa',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    latitude: -7.5561,
    longitude: 110.8316,
    currentStatus: 'active',
    lastUpdated: '2026-09-01',
    verifiedByAi: true,
    culturalBearer: 'Persatuan Pedalangan Indonesia (PEPADI) & ISI Surakarta',
    narrative: 'Seni pertunjukan teater bayang-bayang kulit kerbau bertatah sungging halus yang dipandu seorang Ki Dalang semalam suntuk diiringi gamelan komplit. Mengandung wejangan filsafat hidup dan moralitas adiluhung.',
    statusHistory: [
      {
        id: 'sh-wy-1',
        status: 'active',
        changedBy: 'Institut Seni Indonesia Surakarta',
        role: 'Kurator',
        date: '2026-09-01',
        reason: 'Pewarisan pedalangan aktif di sanggar-sanggar muda dan pentas siaran daring.'
      }
    ]
  },
  {
    id: 'lmp-reog-ponorogo',
    culturalObjectId: 'obj-reog-ponorogo',
    name: 'Seni Reog Ponorogo',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kabupaten Ponorogo',
    province: 'Jawa Timur',
    islandGroup: 'Jawa',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    latitude: -7.8671,
    longitude: 111.4646,
    currentStatus: 'active',
    lastUpdated: '2026-08-25',
    verifiedByAi: true,
    culturalBearer: 'Yayasan Reog Ponorogo & Paguyuban Warok Sepuh',
    narrative: 'Seni pertunjukan rakyat kolosal yang menampilkan topeng kepala singa berhiaskan ratusan helai bulu merak (Dadap Merak) seberat 50 kg yang diangkat murni menggunakan kekuatan gigi penari Warok.',
    statusHistory: [
      {
        id: 'sh-reog-1',
        status: 'active',
        changedBy: 'Dinas Kebudayaan Ponorogo',
        role: 'Pemerintah',
        date: '2026-08-25',
        reason: 'Festival Nasional Reog Ponorogo terlaksana rutin dengan ribuan seniman muda.'
      }
    ]
  },
  {
    id: 'lmp-tari-saman',
    culturalObjectId: 'obj-tari-saman',
    name: 'Tari Saman Gayo',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kabupaten Gayo Lues',
    province: 'Aceh',
    islandGroup: 'Sumatera',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    latitude: 4.0728,
    longitude: 97.3190,
    currentStatus: 'at_risk',
    lastUpdated: '2026-08-20',
    verifiedByAi: true,
    culturalBearer: 'Syekh Saman Adat Gayo & Dinas Kebudayaan Gayo Lues',
    narrative: 'Tarian tepuk dada, paha, dan lantai bersaf serempak berkecepatan tinggi tanpa alat musik instrumental. Ditetapkan UNESCO sebagai warisan budaya takbenda yang memerlukan perlindungan mendesak (Urgent Safeguarding List).',
    statusHistory: [
      {
        id: 'sh-saman-1',
        status: 'at_risk',
        changedBy: 'Dinas Kebudayaan Gayo Lues',
        role: 'Kurator',
        date: '2026-08-20',
        reason: 'Perlu penguatan program Saman masuk kurikulum wajib sekolah untuk menjaga transmisi syair bahasa Gayo.'
      }
    ]
  },
  {
    id: 'lmp-rumah-gadang',
    culturalObjectId: 'obj-rumah-gadang',
    name: 'Rumah Gadang Minangkabau',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Tanah Datar',
    province: 'Sumatera Barat',
    islandGroup: 'Sumatera',
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    latitude: -0.9471,
    longitude: 100.4172,
    currentStatus: 'at_risk',
    lastUpdated: '2026-08-15',
    verifiedByAi: true,
    culturalBearer: 'Lembaga Kerapatan Adat Alam Minangkabau (LKAAM) & Bundo Kanduang',
    narrative: 'Arsitektur vernakular matrilineal beratap runcing menyerupai tanduk kerbau (gonjong) dengan dinding ukiran flora simetris. Dirancang dengan pasak kayu lentur tahan gempa sesar Bukit Barisan.',
    statusHistory: [
      {
        id: 'sh-rg-1',
        status: 'at_risk',
        changedBy: 'Lembaga Kerapatan Adat Alam Minangkabau',
        role: 'Kurator',
        date: '2026-08-15',
        reason: 'Revitalisasi ukiran kayu dan penggantian tiang lapuk di nagari-nagari tua.'
      }
    ]
  },
  {
    id: 'lmp-kain-ulos',
    culturalObjectId: 'obj-kain-ulos',
    name: 'Kain Tenun Ulos Batak',
    category: 'Kriya & Tekstil',
    regency: 'Kabupaten Toba',
    province: 'Sumatera Utara',
    islandGroup: 'Sumatera',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    latitude: 2.6105,
    longitude: 98.8682,
    currentStatus: 'active',
    lastUpdated: '2026-08-10',
    verifiedByAi: true,
    culturalBearer: 'Partonun Ulos Tradisional Samosir & Toba',
    narrative: 'Kain tenun sakral masyarakat Batak yang melambangkan kehangatan batin (mangulosi), restu leluhur, dan ikatan kekerabatan Dalihan Na Tolu dalam siklus kelahiran, pernikahan, hingga kedukaan.',
    statusHistory: [
      {
        id: 'sh-ulos-1',
        status: 'active',
        changedBy: 'Dekranasda Sumatera Utara',
        role: 'Pemerintah',
        date: '2026-08-10',
        reason: 'Sentra tenun ulos di desa Meat dan Samosir berkembang dengan teknik pewarna alam tarum.'
      }
    ]
  },
  {
    id: 'lmp-tari-kecak',
    culturalObjectId: 'obj-tari-kecak',
    name: 'Tari Kecak Uluwatu',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kabupaten Badung',
    province: 'Bali',
    islandGroup: 'Bali & Nusa Tenggara',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    latitude: -8.8291,
    longitude: 115.0849,
    currentStatus: 'active',
    lastUpdated: '2026-09-02',
    verifiedByAi: true,
    culturalBearer: 'Desa Adat Pecatu & Sekaa Tari Sanghyang Uluwatu',
    narrative: 'Seni drama tari ritual sakral berpadu epos Ramayana yang dilantunkan secara akapela poliritmik oleh puluhan hingga ratusan pria melingkari lidah api dupa suci di tebing samudera.',
    statusHistory: [
      {
        id: 'sh-kc-1',
        status: 'active',
        changedBy: 'Dinas Kebudayaan Kabupaten Badung',
        role: 'Pemerintah',
        date: '2026-09-02',
        reason: 'Pentas harian terjadwal dengan ratusan penari pemuda desa adat Pecatu.'
      }
    ]
  },
  {
    id: 'lmp-sasando-rote',
    culturalObjectId: 'obj-sasando-rote',
    name: 'Alat Musik Sasando Rote',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kabupaten Rote Ndao',
    province: 'Nusa Tenggara Timur',
    islandGroup: 'Bali & Nusa Tenggara',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    latitude: -10.7410,
    longitude: 123.1250,
    currentStatus: 'at_risk',
    lastUpdated: '2026-08-28',
    verifiedByAi: true,
    culturalBearer: 'Maestro Pembuat Sasando Rote & Sanggar Seni Flobamora',
    narrative: 'Instrumen petik dawai berdawai kawat yang dipasang mengelilingi tabung bambu dan dinaungi mangkok resonator anyaman daun lontar alami (Haik). Memiliki harmoni nada lembut khas kepulauan Rote.',
    statusHistory: [
      {
        id: 'sh-ss-1',
        status: 'at_risk',
        changedBy: 'Yayasan Seni Budaya Flobamora',
        role: 'Kurator',
        date: '2026-08-28',
        reason: 'Pelatihan pembuatan daun lontar sasando akustik tradisional bagi generasi muda Rote.'
      }
    ]
  },
  {
    id: 'lmp-mandau-dayak',
    culturalObjectId: 'obj-mandau-dayak',
    name: 'Senjata Tradisional Mandau Dayak',
    category: 'Senjata & Pusaka',
    regency: 'Kabupaten Kapuas',
    province: 'Kalimantan Tengah',
    islandGroup: 'Kalimantan',
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    latitude: -1.2654,
    longitude: 113.8400,
    currentStatus: 'active',
    lastUpdated: '2026-08-15',
    verifiedByAi: true,
    culturalBearer: 'Pandai Besi Adat Dayak Ngaju & Dewan Adat Dayak',
    narrative: 'Bilah senjata pusaka kehormatan ksatria Dayak yang ditempa dari batu mantikei dengan tatahan kuningan, berhulu ukiran tanduk rusa dan sarung kayu bersimpul anyaman rotan jernang.',
    statusHistory: [
      {
        id: 'sh-md-1',
        status: 'active',
        changedBy: 'Dewan Adat Dayak Kalimantan Tengah',
        role: 'Kurator',
        date: '2026-08-15',
        reason: 'Tradisi penempaan bilah mandau diwariskan aktif dalam klan pandai besi adat.'
      }
    ]
  },
  {
    id: 'lmp-rumah-betang',
    culturalObjectId: 'obj-rumah-betang',
    name: 'Rumah Panjang Betang Radakng',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kota Pontianak',
    province: 'Kalimantan Barat',
    islandGroup: 'Kalimantan',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    latitude: -0.0263,
    longitude: 109.3425,
    currentStatus: 'active',
    lastUpdated: '2026-08-12',
    verifiedByAi: true,
    culturalBearer: 'Dewan Adat Dayak Kalimantan Barat & Komunitas Rumah Radakng',
    narrative: 'Rumah panggung kayu ulin raksasa sepanjang ratusan meter yang menjadi pusat hunian komunal puluhan keluarga Dayak. Menjadi simbol kerukunan hidup bersama, musyawarah adat, dan pertahanan desa rimba.',
    statusHistory: [
      {
        id: 'sh-bt-1',
        status: 'active',
        changedBy: 'Dinas Pemuda Olahraga & Pariwisata Kalbar',
        role: 'Pemerintah',
        date: '2026-08-12',
        reason: 'Pusat kegiatan Gawai Dayak tahunan dan destinasi cagar budaya kebanggaan Kalimantan.'
      }
    ]
  },
  {
    id: 'lmp-toraja-tongkonan',
    culturalObjectId: 'obj-toraja-tongkonan',
    name: 'Rumah Adat Tongkonan Toraja',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Tana Toraja',
    province: 'Sulawesi Selatan',
    islandGroup: 'Sulawesi',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    latitude: -3.0560,
    longitude: 119.8660,
    currentStatus: 'active',
    lastUpdated: '2026-09-01',
    verifiedByAi: true,
    culturalBearer: 'Keluarga Adat Kete Kesu & Tetua Adat Palawa Toraja',
    narrative: 'Rumah adat berbentuk perahu menjulang ke utara dengan barisan tanduk kerbau (kabongo) di tiang utama. Pusat pertemuan kekerabatan klan keluarga bangsawan Toraja dalam upacara Rambu Solo dan Rambu Tuka.',
    statusHistory: [
      {
        id: 'sh-tk-1',
        status: 'active',
        changedBy: 'Badan Pekerja Adat Toraja',
        role: 'Kurator',
        date: '2026-09-01',
        reason: 'Kawasan pemukiman adat Kete Kesu dan Palawa terjaga lestari dengan ritual berkala.'
      }
    ]
  },
  {
    id: 'lmp-perahu-phinisi',
    culturalObjectId: 'obj-perahu-phinisi',
    name: 'Perahu Layar Phinisi',
    category: 'Kriya & Tekstil',
    regency: 'Kabupaten Bulukumba',
    province: 'Sulawesi Selatan',
    islandGroup: 'Sulawesi',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    latitude: -5.5562,
    longitude: 120.4491,
    currentStatus: 'active',
    lastUpdated: '2026-08-30',
    verifiedByAi: true,
    culturalBearer: 'Para Panrita Lopi (Empu Kapal) Tana Beru & Suku Konjo',
    narrative: 'Kapal layar kayu bertiang dua dengan tujuh helai layar agung yang dibangun tanpa cetak biru gambar kerja, murni mengandalkan intuisi keahlian leluhur dan ritual adat pembacaan tanda laut.',
    statusHistory: [
      {
        id: 'sh-ph-1',
        status: 'active',
        changedBy: 'Panrita Lopi Tana Beru',
        role: 'Kurator',
        date: '2026-08-30',
        reason: 'Pesanan pembuatan kapal kayu phinisi dunia internasional terus berlanjut di galangan pesisir.'
      }
    ]
  },
  {
    id: 'lmp-tifa-totobuang',
    culturalObjectId: 'obj-tifa-totobuang',
    name: 'Musik Tradisional Tifa Totobuang',
    category: 'Seni Pertunjukan & Tari',
    regency: 'Kota Ambon',
    province: 'Maluku',
    islandGroup: 'Maluku',
    thumbnail: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=80',
    latitude: -3.6547,
    longitude: 128.1906,
    currentStatus: 'active',
    lastUpdated: '2026-08-25',
    verifiedByAi: true,
    culturalBearer: 'Musisi Negeri Adat Hutumuri & Ambon Music Office',
    narrative: 'Ensembel kolaborasi instrumen perkusi ritmis tabung kulit rusa (Tifa) dengan gong kecil berpencon melodi (Totobuang). Menjadi perekat persaudaraan pela gandong antar-negeri di Kepulauan Maluku.',
    statusHistory: [
      {
        id: 'sh-tf-1',
        status: 'active',
        changedBy: 'Ambon Music Office UNESCO',
        role: 'Pemerintah',
        date: '2026-08-25',
        reason: 'Diintegrasikan dalam kurikulum seni sekolah dan festival musik etnik nusantara.'
      }
    ]
  },
  {
    id: 'lmp-rumah-honai',
    culturalObjectId: 'obj-rumah-honai',
    name: 'Rumah Tradisional Honai Papua',
    category: 'Arsitektur & Rumah Adat',
    regency: 'Kabupaten Jayawijaya',
    province: 'Papua Pegunungan',
    islandGroup: 'Papua',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    latitude: -4.0982,
    longitude: 138.9482,
    currentStatus: 'active',
    lastUpdated: '2026-08-18',
    verifiedByAi: true,
    culturalBearer: 'Kepala Suku & Tetua Adat Suku Dani Lembah Baliem',
    narrative: 'Rumah bundar berdinding kayu tanpa jendela beratap kubah jerami ilalang tebal. Dirancang khusus menyimpan panas perapian guna menghangatkan keluarga dari udara dingin pegunungan salju tropis.',
    statusHistory: [
      {
        id: 'sh-hn-1',
        status: 'active',
        changedBy: 'Tetua Adat Lembah Baliem',
        role: 'Kurator',
        date: '2026-08-18',
        reason: 'Perawatan berkala atap jerami ilalang di desa-desa adat Wamena.'
      }
    ]
  },
  {
    id: 'lmp-tas-noken',
    culturalObjectId: 'obj-tas-noken',
    name: 'Tas Noken Serat Kayu Papua',
    category: 'Kriya & Tekstil',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    islandGroup: 'Papua',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    latitude: -2.5337,
    longitude: 140.7181,
    currentStatus: 'at_risk',
    lastUpdated: '2026-08-14',
    verifiedByAi: true,
    culturalBearer: 'Mama-Mama Penganyam Noken Papua & Yayasan Noken',
    narrative: 'Tas rajut serat kulit kayu mahkota dewa/manduam yang digantung di kepala wanita Papua. Simbol rahim kehidupan, kesuburan, perdamaian antarsuku, dan kearifan ekologi hutan adat Papua.',
    statusHistory: [
      {
        id: 'sh-nk-1',
        status: 'at_risk',
        changedBy: 'Yayasan Noken Papua',
        role: 'Kurator',
        date: '2026-08-14',
        reason: 'Dibutuhkan perlindungan pohon manduam dan sertifikasi keaslian noken rajutan serat kayu alami.'
      }
    ]
  },
  {
    id: 'lmp-ukiran-asmat',
    culturalObjectId: 'obj-ukiran-asmat',
    name: 'Seni Ukir Kayu Suku Asmat',
    category: 'Kriya & Tekstil',
    regency: 'Kabupaten Asmat',
    province: 'Papua Selatan',
    islandGroup: 'Papua',
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
    latitude: -5.4485,
    longitude: 138.4891,
    currentStatus: 'active',
    lastUpdated: '2026-08-10',
    verifiedByAi: true,
    culturalBearer: 'Para Wow-Ipits (Pengukir Ulung) Suku Asmat',
    narrative: 'Karya ukir kayu bakau dan besi magis berbentuk tiang leluhur (Bisj Pole), perisai perang, dan perahu arwah. Menghubungkan dunia manusia hidup dengan roh para leluhur di alam baka Safan.',
    statusHistory: [
      {
        id: 'sh-as-1',
        status: 'active',
        changedBy: 'Pemerhati Seni Budaya Asmat',
        role: 'Kurator',
        date: '2026-08-10',
        reason: 'Pesta Budaya Asmat tahunan berlangsung semarak dengan pelelangan ukiran kayu langsung.'
      }
    ]
  }
];
