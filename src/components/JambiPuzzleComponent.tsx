import React, { useState, useEffect, useRef } from 'react';
import { 
  Puzzle, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Compass, 
  Layers, 
  Share2, 
  MapPin, 
  ChevronRight,
  ChevronLeft,
  BookOpen,
  ArrowRight,
  Volume2,
  VolumeX,
  Award,
  Bot,
  Flame,
  Star,
  ExternalLink,
  Download,
  Info,
  ShieldCheck,
  Zap,
  Grid,
  Filter,
  Maximize2,
  Lightbulb,
  MousePointerClick,
  Play,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CulturalPuzzleItem {
  id: string;
  title: string;
  indigenousName: string;
  region: string;
  province: string;
  category: 'Jambi' | 'Sumatera' | 'Jawa' | 'Bali & Nusa Tenggara' | 'Kalimantan' | 'Sulawesi' | 'Maluku & Papua';
  imageUrl: string;
  defaultDimension: 3 | 4 | 5;
  difficultyLabel: 'Mudah (3x3)' | 'Sedang (4x4)' | 'Maestro (5x5)';
  coordinates: { lat: number; lng: number };
  culturalSignificance: string;
  historicalContext: string;
  philosophicalMeaning: string;
  selokoAdat: string;
  wbtbStatus: string;
  unRecordNo: string;
  xpReward: number;
}

export const CULTURAL_PUZZLE_COLLECTION: CulturalPuzzleItem[] = [
  // ================= JAMBI HERITAGE =================
  {
    id: 'puz-kajang-lako',
    title: 'Rumah Tuo Batin Kajang Lako',
    indigenousName: 'Rumah Tuo Marga Batin Rantau Panjang',
    region: 'Rantau Panjang, Tabir, Merangin',
    province: 'Jambi',
    category: 'Jambi',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -2.1667, lng: 102.2667 },
    culturalSignificance: 'Arsitektur panggung vernakular tertua suku Melayu Batin dengan atap bumbungan melengkung mirip perahu kajang dan konstruksi pasak kayu ulin tanpa sebatang paku besi pun.',
    historicalContext: 'Didirikan sejak abad ke-14 di perkampungan Marga Batin. Memiliki ketahanan terhadap gempa vulkanik berkat sistem sendi kayu lentur yang diwariskan turun-temurun.',
    philosophicalMeaning: 'Pucuk atap menjulang melambangkan ketakwaan kepada Tuhan, sedangkan lantai bertingkat (Tigo Ruang) mencerminkan tata krama musyawarah adat.',
    selokoAdat: 'Adat bersendi syarak, syarak bersendi Kitabullah. Rumah gedang tempat berteduh, tiang kokoh pantang goyah.',
    wbtbStatus: 'Warisan Budaya Takbenda Indonesia (Kemendikbudristek)',
    unRecordNo: 'WBTb-ID-2014-00128',
    xpReward: 150
  },
  {
    id: 'puz-batik-durian-pecah',
    title: 'Motif Batik Durian Pecah & Angso Duo',
    indigenousName: 'Batik Tulis Seberang Kota Jambi',
    region: 'Seberang Kota Jambi (Sekoja)',
    province: 'Jambi',
    category: 'Jambi',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -1.5862, lng: 103.6198 },
    culturalSignificance: 'Karya seni rupa tekstil khas Jambi yang sarat ornamen flora lokal dengan pewarnaan alami getah kayu sepang, daun mangga, dan kulit jering.',
    historicalContext: 'Mekar sejak masa Kesultanan Jambi abad ke-17 di pesisir Sungai Batanghari, digunakan sebagai busana adat pemangku negeri dan busana resmi perkawinan adat Melayu.',
    philosophicalMeaning: 'Meskipun kulit luarnya berduri tajam, dalamnya memberi keharuman dan rasa manis legit; lambang budi pekerti tulus dan kebijaksanaan memimpin.',
    selokoAdat: 'Tampuk manggis tanda kejujuran, durian pecah rasa dibelah dua. Manis budi harum bahasa, tanda manusia berbudi pekerti.',
    wbtbStatus: 'Kekayaan Intelektual Komunal (KIK) & WBTb Provinsi Jambi',
    unRecordNo: 'KIK-JMB-2018-092',
    xpReward: 140
  },
  {
    id: 'puz-candi-muaro-jambi',
    title: 'Percandian Suci Muaro Jambi',
    indigenousName: 'Kawasan Menapo Muaro Jambi',
    region: 'Kecamatan Maro Sebo, Muaro Jambi',
    province: 'Jambi',
    category: 'Jambi',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: -1.4789, lng: 103.6669 },
    culturalSignificance: 'Kompleks percandian bata merah terluas di Asia Tenggara (3.984 hektar) di sepanjang tanggul alami Sungai Batanghari kuno.',
    historicalContext: 'Pusat pendidikan, ilmu pengetahuan, dan universitas Buddhis internasional terbesar pada era Kerajaan Melayu Kuno dan Sriwijaya (abad 7-12 Masehi) yang pernah dikunjungi guru suci Atisha Dipamkara.',
    philosophicalMeaning: 'Keseimbangan ekologis antara teknologi kanal tata air kuno, spiritualitas pencerahan batin, dan kelestarian kanopi hutan duku menapo.',
    selokoAdat: 'Batanghari aeknyo tenang, candi berdiri teguh sepanjang zaman. Budi baik terkenang-kenang, ilmu suci suluh peradaban.',
    wbtbStatus: 'Cagar Budaya Nasional & Tentative List UNESCO World Heritage',
    unRecordNo: 'UNESCO-TL-5695',
    xpReward: 200
  },
  {
    id: 'puz-songket-jambi',
    title: 'Songket Melayu Benang Emas Tabur',
    indigenousName: 'Tenun Songket Melayu Batanghari Sembitan',
    region: 'Kota Jambi & Batanghari',
    province: 'Jambi',
    category: 'Jambi',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: -1.6101, lng: 103.6131 },
    culturalSignificance: 'Kain tenun mewah dengan teknik sungkit benang emas pakan bermotif bunga melati, pucuk rebung, dan tampuk manggis penuh keagungan.',
    historicalContext: 'Dipakai pada upacara pelantikan Datuk Penghulu Adat dan busana kebesaran pengantin adat Batanghari Sembilan Lurah.',
    philosophicalMeaning: 'Kemilau emas pakan melambangkan kemurnian niat, martabat luhur, dan ketelatenan jiwa masyarakat Melayu.',
    selokoAdat: 'Kain ditenun sehelai benang, disulam emas bercahaya terang. Elok perangai orang tersayang, adat dijunjung negeri pun tenang.',
    wbtbStatus: 'Warisan Budaya Takbenda Indonesia',
    unRecordNo: 'WBTb-ID-2016-00344',
    xpReward: 180
  },
  {
    id: 'puz-keris-siginjai',
    title: 'Keris Siginjai Pusaka Melayu Jambi',
    indigenousName: 'Keris Siginjai Kesultanan Jambi',
    region: 'Museum Siginjai, Kota Jambi',
    province: 'Jambi',
    category: 'Jambi',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -1.6033, lng: 103.5855 },
    culturalSignificance: 'Pusaka lambang mahkota kepemimpinan Kesultanan Jambi yang disematkan pada masa pemerintahan Rangkayo Hitam pada abad ke-15.',
    historicalContext: 'Terbuat dari tempaan besi meteorit bertuah berhiaskan hulu emas berukir flora dan permata berlian intan.',
    philosophicalMeaning: 'Simbol kedaulatan, keadilan hukum adat, dan keberanian membela tanah air tanpa pamrih.',
    selokoAdat: 'Pedang di tangan tegakkan hukum, keris di pinggang pertahankan marwah. Pemimpin adil rakyat makmur, negeri aman sentosa.',
    wbtbStatus: 'Benda Cagar Budaya Peringkat Nasional',
    unRecordNo: 'BCB-NAS-0041',
    xpReward: 160
  },

  // ================= SUMATERA HERITAGE =================
  {
    id: 'puz-rumah-gadang',
    title: 'Rumah Gadang Bagonjong',
    indigenousName: 'Rumah Gadang Koto Gadang',
    region: 'Tanah Datar & Bukittinggi',
    province: 'Sumatera Barat',
    category: 'Sumatera',
    imageUrl: 'https://images.unsplash.com/photo-1599818818873-1994b1509fae?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -0.4578, lng: 100.3705 },
    culturalSignificance: 'Istana kayu dengan atap gonjong bertingkat meliuk anggun mirip tanduk kerbau serta dinding penuh ukiran floral geometris Minangkabau.',
    historicalContext: 'Rumah adat sistem kekerabatan matrilineal tertua di dunia berlandaskan musyawarah dan falsafah "Adat basandi syarak, syarak basandi Kitabullah".',
    philosophicalMeaning: 'Gonjong menggapai langit melambangkan cita-cita mulia, dan ukiran Itiak Pulang Patang melambangkan keteraturan hidup rukun.',
    selokoAdat: 'Bulek aie dek pambuluah, bulek kato dek mupakat. Barek samo dipikua, ringan samo dijinjiang.',
    wbtbStatus: 'Warisan Budaya Takbenda Indonesia',
    unRecordNo: 'WBTb-ID-2013-00012',
    xpReward: 150
  },
  {
    id: 'puz-ulos-danau-toba',
    title: 'Kain Ulos Ragi Hidup Batak Toba',
    indigenousName: 'Ulos Ragidup Batak',
    region: 'Kawasan Danau Toba, Samosir',
    province: 'Sumatera Utara',
    category: 'Sumatera',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: 2.6053, lng: 98.7844 },
    culturalSignificance: 'Kain tenun sakral masyarakat Batak yang melambangkan kehangatan hidup (mangulosi), restu orang tua, dan ikatan kekeluargaan Dalihan Na Tolu.',
    historicalContext: 'Menenun ulos adalah laku spiritual para penenun perempuan Batak yang diwariskan dari nenek moyang di perbukitan pusuk buhit.',
    philosophicalMeaning: 'Tiga sumber kehangatan hidup manusia menurut falsafah Batak: matahari, api, dan ulos.',
    selokoAdat: 'Ijuk pangihot ni hodong, Ulos pangihot ni holong. (Ulos adalah pengikat tali kasih sayang sejati).',
    wbtbStatus: 'Warisan Budaya Takbenda Indonesia',
    unRecordNo: 'WBTb-ID-2014-00098',
    xpReward: 170
  },

  // ================= JAWA HERITAGE =================
  {
    id: 'puz-borobudur',
    title: 'Mahakarya Candi Borobudur',
    indigenousName: 'Candi Borobudur Mandala Agung',
    region: 'Magelang, Jawa Tengah',
    province: 'Jawa Tengah',
    category: 'Jawa',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 5,
    difficultyLabel: 'Maestro (5x5)',
    coordinates: { lat: -7.6079, lng: 110.2038 },
    culturalSignificance: 'Monumen candi Buddha terbesar di dunia yang tersusun dari 2 juta balok batu andesit vulkanik dengan 2.672 panel relief dan 504 arca Buddha.',
    historicalContext: 'Dibangun pada wangsa Syailendra sekitar tahun 824 Masehi sebagai perwujudan diagram kosmik makrokosmos dan mikrokosmos.',
    philosophicalMeaning: 'Tiga tingkatan pendakian spiritual manusia: Kamadhatu (dunia nafsu), Rupadhatu (dunia rupa), dan Arupadhatu (dunia sunyata pencerahan).',
    selokoAdat: 'Memayu hayuning bawana (Memperindah dan menjaga keselamatan alam semesta seisinya).',
    wbtbStatus: 'UNESCO World Cultural Heritage (1991)',
    unRecordNo: 'UNESCO-WHC-592',
    xpReward: 250
  },
  {
    id: 'puz-batik-megamendung',
    title: 'Batik Megamendung Keraton Cirebon',
    indigenousName: 'Batik Tulis Megamendung Pesanggrahan',
    region: 'Trusmi, Cirebon',
    province: 'Jawa Barat',
    category: 'Jawa',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -6.7063, lng: 108.5570 },
    culturalSignificance: 'Motif awan pembawa hujan dengan gradasi 7 tingkat warna khas Keraton Kasepuhan hasil akulturasi agung budaya Sunda, Jawa, dan Tiongkok.',
    historicalContext: 'Diciptakan oleh Pangeran Losari abad ke-16 sebagai lambang kepemimpinan sejuk yang mengayomi seluruh lapisan masyarakat tanpa membeda-bedakan.',
    philosophicalMeaning: 'Awan mendung yang menyejukkan mengajarkan agar setiap manusia mampu meredam hawa nafsu amarah dan senantiasa berpikiran jernih.',
    selokoAdat: 'Sabar, tawakal, lan narima ing pandum (Sabar dan ikhlas menerima ketetapan dengan hati sejuk).',
    wbtbStatus: 'UNESCO Masterpiece of Oral and Intangible Heritage',
    unRecordNo: 'UNESCO-ICH-00258',
    xpReward: 160
  },

  // ================= BALI & NUSA TENGGARA =================
  {
    id: 'puz-pura-uluwatu-kecak',
    title: 'Tari Kecak di Tebing Karang Uluwatu',
    indigenousName: 'Seni Tari Sanghyang & Kecak Ramayana',
    region: 'Pecatu, Kuta Selatan, Badung',
    province: 'Bali',
    category: 'Bali & Nusa Tenggara',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: -8.8291, lng: 115.0849 },
    culturalSignificance: 'Seni pertunjukan kolosal sakral dengan lantunan vokal ritmis puluhan pria duduk melingkar di atas tebing karang 70 meter menghadap Samudra Hindia.',
    historicalContext: 'Berasal dari ritual paduan suara trance Sanghyang kuno untuk menjaga keharmonisan desa dari marabahaya.',
    philosophicalMeaning: 'Kesatuan napas dan suara tanpa alat musik melambangkan kekuatan kebersamaan kolektif dalam filosofi Tri Hita Karana.',
    selokoAdat: 'Tri Hita Karana: Palemahan, Pawongan, Parahyangan (Harmoni sesama manusia, alam, dan Sang Hyang Widhi).',
    wbtbStatus: 'Representatif Budaya Dunia UNESCO',
    unRecordNo: 'WBTb-BALI-0019',
    xpReward: 180
  },
  {
    id: 'puz-wae-rebo',
    title: 'Desa Adat Mbaru Niang Wae Rebo',
    indigenousName: 'Rumah Kerucut Mbaru Niang Manggarai',
    region: 'Satarmese Barat, Manggarai',
    province: 'Nusa Tenggara Timur',
    category: 'Bali & Nusa Tenggara',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: -8.7719, lng: 120.2858 },
    culturalSignificance: 'Tujuh rumah kerucut raksasa beratap jerami setinggi 15 meter yang berdiri di lembah berkabut pegunungan Flores.',
    historicalContext: 'Komunitas adat yang melestarikan arsitektur 5 lantai bertingkat warisan Empo Maro selama lebih dari 18 generasi.',
    philosophicalMeaning: 'Bentuk kerucut melambangkan kesatuan rahim ibu pertiwi dan pelindung keluarga besar yang saling menopang.',
    selokoAdat: 'Neka hemong kuni agu kalo (Jangan pernah melupakan tanah kelahiran dan tradisi leluhur).',
    wbtbStatus: 'UNESCO Asia-Pacific Awards for Cultural Heritage Conservation',
    unRecordNo: 'UNESCO-AP-2012',
    xpReward: 190
  },

  // ================= SULAWESI HERITAGE =================
  {
    id: 'puz-tongkonan-toraja',
    title: 'Rumah Adat Tongkonan Toraja',
    indigenousName: 'Tongkonan Layuk Tana Toraja',
    region: 'Kete Kesu, Tana Toraja',
    province: 'Sulawesi Selatan',
    category: 'Sulawesi',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 4,
    difficultyLabel: 'Sedang (4x4)',
    coordinates: { lat: -3.0519, lng: 119.8972 },
    culturalSignificance: 'Pusat tatanan adat keluarga rumpun Toraja dengan atap pelana menjulang menyerupai perahu purba dan tiang bertabur tanduk kerbau (kabongo).',
    historicalContext: 'Tempat bertemunya silsilah darah keluarga untuk upacara Rambu Solo (kedukaan) dan Rambu Tuka (syukuran kehidupan).',
    philosophicalMeaning: 'Menghadap ke arah utara (Ulunna Lino) sebagai sumber mata air dan kehidupan leluhur Puang Matua.',
    selokoAdat: 'Misa kada dipotuo, pantan kada dipomate (Bersatu kita teguh, bercerai kita runtuh).',
    wbtbStatus: 'Tentative List UNESCO World Heritage',
    unRecordNo: 'UNESCO-TL-5462',
    xpReward: 180
  },
  {
    id: 'puz-kapal-pinisi',
    title: 'Mahakarya Kapal Layar Pinisi',
    indigenousName: 'Perahu Layar Pinisi Bulukumba',
    region: 'Tanah Beru, Bulukumba',
    province: 'Sulawesi Selatan',
    category: 'Sulawesi',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 5,
    difficultyLabel: 'Maestro (5x5)',
    coordinates: { lat: -5.5861, lng: 120.2817 },
    culturalSignificance: 'Kapal kayu layar agung dua tiang dan tujuh helai layar yang dibuat tangan oleh Panrita Lopi tanpa gambar rancangan cetak biru.',
    historicalContext: 'Telah mengarungi samudra dunia sejak abad ke-14 membawa rempah-rempah Nusantara dari pesisir Teluk Bone ke seluruh penjuru bumi.',
    philosophicalMeaning: 'Dua tiang melambangkan dua kalimat syahadat, dan tujuh layar melambangkan tujuh lapis langit dan rezeki semesta.',
    selokoAdat: 'Kualleangi tallanga natoalia (Lebih baik tenggelam di lautan daripada surut kembali ke pantai tanpa hasil).',
    wbtbStatus: 'UNESCO Intangible Cultural Heritage of Humanity',
    unRecordNo: 'UNESCO-ICH-01197',
    xpReward: 220
  },

  // ================= KALIMANTAN HERITAGE =================
  {
    id: 'puz-rumah-betang-dayak',
    title: 'Rumah Betang Panjang Dayak',
    indigenousName: 'Rumah Radakng Dayak Iban',
    region: 'Kapuas Hulu, Kalimantan Barat',
    province: 'Kalimantan Barat',
    category: 'Kalimantan',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: 0.8256, lng: 112.9234 },
    culturalSignificance: 'Rumah panggung kayu ulin sepanjang ratusan meter yang dihuni puluhan kepala keluarga secara harmonis di bawah satu atap panjang.',
    historicalContext: 'Arsitektur komunal yang menjaga keselamatan bersama dari serangan binatang buas dan banjir hutan hujan tropis Borneo.',
    philosophicalMeaning: 'Semangat kebersamaan tanpa sekat pemisah dan perlindungan terhadap kelestarian rimba adat leluhur.',
    selokoAdat: 'Adil ka talino, bacuramin ka saruga, basengat ka jubata (Adil kepada sesama manusia, bercermin ke surga, bernapas pada Sang Pencipta).',
    wbtbStatus: 'Warisan Budaya Takbenda Indonesia',
    unRecordNo: 'WBTb-ID-2015-00214',
    xpReward: 160
  },

  // ================= MALUKU & PAPUA =================
  {
    id: 'puz-noken-papua',
    title: 'Noken Rajutan Serat Kayu Papua',
    indigenousName: 'Noken Inovasi Rajutan Mama Papua',
    region: 'Pegunungan Tengah & Wamena',
    province: 'Papua Pegunungan',
    category: 'Maluku & Papua',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    defaultDimension: 3,
    difficultyLabel: 'Mudah (3x3)',
    coordinates: { lat: -4.0958, lng: 138.9439 },
    culturalSignificance: 'Tas jaring multifungsi yang dirajut dari serat kulit kayu mahkota dewa atau anggrek hutan dan digantungkan di dahi oleh perempuan Papua.',
    historicalContext: 'Dipakai turun-temurun untuk mengangkut hasil bumi, kayu bakar, hingga menggendong bayi dengan perlindungan penuh kasih.',
    philosophicalMeaning: 'Simbol rahim ibu pertiwi, kesuburan tanah adat, kerja keras, dan lambang perdamaian antar suku di tanah Papua.',
    selokoAdat: 'Noken adalah rumah berjalan, menjaga kehidupan dari rahim hingga ke liang bumi.',
    wbtbStatus: 'UNESCO List of Intangible Cultural Heritage in Need of Urgent Safeguarding',
    unRecordNo: 'UNESCO-ICH-00619',
    xpReward: 170
  }
];

// Web Audio Sound Engine with rich haptic audio cues
class PuzzleSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  playPick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playSnap() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playShuffle() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playVictoryGong() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Gong fundamental
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.6);

      // Harmonious chime
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(880, now + 0.5);
      gain2.gain.setValueAtTime(0.2, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 1.2);
    } catch (e) {}
  }
}

const soundEngine = new PuzzleSoundEngine();

interface JambiPuzzleComponentProps {
  onAwardXp?: (amount: number, reason: string) => void;
  currentUserXp?: number;
}

export const JambiPuzzleComponent: React.FC<JambiPuzzleComponentProps> = ({
  onAwardXp,
  currentUserXp = 450
}) => {
  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePuzzleItem, setActivePuzzleItem] = useState<CulturalPuzzleItem>(CULTURAL_PUZZLE_COLLECTION[0]);

  // Dimension: 3x3, 4x4, 5x5
  const [currentDimension, setCurrentDimension] = useState<3 | 4 | 5>(activePuzzleItem.defaultDimension);

  // Board State
  const totalTiles = currentDimension * currentDimension;
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [draggedTileIndex, setDraggedTileIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Gameplay Metrics & States
  const [movesCount, setMovesCount] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showGuidePreview, setShowGuidePreview] = useState<boolean>(false);
  const [showTileNumbers, setShowTileNumbers] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>(['puz-kajang-lako']);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState<boolean>(false);

  // Sync sound settings
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Update dimension on puzzle change
  useEffect(() => {
    setCurrentDimension(activePuzzleItem.defaultDimension);
  }, [activePuzzleItem]);

  // Initialize and shuffle board
  const initializeBoard = (dim: number) => {
    const total = dim * dim;
    const initial = Array.from({ length: total }, (_, i) => i);
    
    // Fisher-Yates Shuffle
    let shuffled = [...initial];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Ensure it's not solved initially
    if (shuffled.every((val, idx) => val === idx)) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }

    setTiles(shuffled);
    setSelectedTileIndex(null);
    setDraggedTileIndex(null);
    setDragOverIndex(null);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setIsSolved(false);

    soundEngine.playShuffle();
  };

  useEffect(() => {
    initializeBoard(currentDimension);
  }, [activePuzzleItem.id, currentDimension]);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSolved) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSolved]);

  // Check victory
  const checkWin = (currentTiles: number[]) => {
    const won = currentTiles.every((val, idx) => val === idx);
    if (won) {
      setIsSolved(true);
      setIsTimerRunning(false);
      soundEngine.playVictoryGong();

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C85A32', '#1E7773', '#FAF8F5']
      });

      if (!completedPuzzles.includes(activePuzzleItem.id)) {
        setCompletedPuzzles(prev => [...prev, activePuzzleItem.id]);
        if (onAwardXp) {
          onAwardXp(
            activePuzzleItem.xpReward, 
            `Menyelesaikan Mahakarya Puzzle: ${activePuzzleItem.title} (${activePuzzleItem.province})`
          );
        }
      }
    }
  };

  // Swap Two Tiles with Audio Snap
  const swapTiles = (indexA: number, indexB: number) => {
    if (indexA === indexB || isSolved) return;

    const newTiles = [...tiles];
    const temp = newTiles[indexA];
    newTiles[indexA] = newTiles[indexB];
    newTiles[indexB] = temp;

    setTiles(newTiles);
    setMovesCount(prev => prev + 1);
    setSelectedTileIndex(null);
    soundEngine.playSnap();
    checkWin(newTiles);
  };

  // Handle tile click (Click first, then click second to swap)
  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
      soundEngine.playPick();
    } else if (selectedTileIndex === index) {
      // Deselect if clicked again
      setSelectedTileIndex(null);
    } else {
      swapTiles(selectedTileIndex, index);
    }
  };

  // Smart Hint: Place 1 mismatched tile into its correct position
  const handleSmartHint = () => {
    if (isSolved) return;

    // Find the first tile that is not in its correct position
    const wrongSlotIndex = tiles.findIndex((tileTarget, slot) => tileTarget !== slot);
    if (wrongSlotIndex === -1) return;

    // The tile that belongs to wrongSlotIndex is wrongSlotIndex
    const correctTargetTile = wrongSlotIndex;
    const currentHoldingSlot = tiles.findIndex(t => t === correctTargetTile);

    if (currentHoldingSlot !== -1) {
      swapTiles(wrongSlotIndex, currentHoldingSlot);
      soundEngine.playPick();
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (index: number) => {
    if (isSolved) return;
    setDraggedTileIndex(index);
    soundEngine.playPick();
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedTileIndex !== null && draggedTileIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedTileIndex !== null && draggedTileIndex !== targetIndex) {
      swapTiles(draggedTileIndex, targetIndex);
    }
    setDraggedTileIndex(null);
    setDragOverIndex(null);
  };

  // Auto Solve Helper for instant demonstration
  const autoSolve = () => {
    const solved = Array.from({ length: totalTiles }, (_, i) => i);
    setTiles(solved);
    setIsSolved(true);
    setIsTimerRunning(false);
    soundEngine.playVictoryGong();
    confetti({ particleCount: 80, spread: 70 });
    if (!completedPuzzles.includes(activePuzzleItem.id)) {
      setCompletedPuzzles(prev => [...prev, activePuzzleItem.id]);
      if (onAwardXp) {
        onAwardXp(Math.round(activePuzzleItem.xpReward * 0.75), `Tuntaskan Puzzle Budaya: ${activePuzzleItem.title}`);
      }
    }
  };

  // Go to next puzzle
  const handleNextPuzzle = () => {
    const currentIndex = CULTURAL_PUZZLE_COLLECTION.findIndex(p => p.id === activePuzzleItem.id);
    const nextIndex = (currentIndex + 1) % CULTURAL_PUZZLE_COLLECTION.length;
    setActivePuzzleItem(CULTURAL_PUZZLE_COLLECTION[nextIndex]);
  };

  // Format stopwatch
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Count correct tiles
  const correctTilesCount = tiles.filter((tile, idx) => tile === idx).length;
  const progressPercent = Math.round((correctTilesCount / totalTiles) * 100);

  // Filter Categories
  const categories = ['Semua', 'Jambi', 'Sumatera', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];
  const filteredPuzzles = selectedCategory === 'Semua'
    ? CULTURAL_PUZZLE_COLLECTION
    : CULTURAL_PUZZLE_COLLECTION.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 1. Header Banner & Global Cultural Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0D3B3A] via-[#144846] to-[#C85A32] p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400/30">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none select-none text-amber-200">
          <Puzzle className="w-80 h-80 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-xs font-black tracking-wide mb-3 backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>GAME REKONSTRUKSI PUSAKA BUDAYA NUSANTARA</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white drop-shadow-sm">
              Tantangan Puzzle Cagar Budaya & Seloko Adat
            </h1>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Pilih cagar budaya, susun potongan gambar ke posisi yang tepat, dan pelajari filosofi luhur di balik setiap mahakarya.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold text-amber-200/90">
              <button
                type="button"
                onClick={() => setShowHowToPlayModal(true)}
                className="flex items-center gap-1.5 bg-amber-400 text-neutral-950 px-3.5 py-1.5 rounded-xl font-black hover:bg-amber-300 transition-all shadow-md"
              >
                <HelpCircle className="w-4 h-4" />
                <span>📖 Panduan Cara Bermain</span>
              </button>

              <span className="flex items-center gap-1 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Data Resmi Kemendikbud & UNESCO
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
            <div className="bg-black/35 backdrop-blur-md border border-amber-400/30 rounded-2xl p-4 flex items-center gap-4 shadow-lg flex-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 flex items-center justify-center font-black text-base shadow-inner border border-amber-200">
                <Trophy className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-amber-300 tracking-wider block">Koleksi Terpecahkan</span>
                <span className="text-lg font-black text-white">
                  {completedPuzzles.length} / {CULTURAL_PUZZLE_COLLECTION.length} Objek
                </span>
                <span className="text-[11px] text-emerald-300 block font-medium">
                  +{completedPuzzles.length * 150} Cultural XP Diperoleh
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  soundEnabled
                    ? 'bg-amber-400/20 border-amber-300/40 text-amber-200'
                    : 'bg-white/10 border-white/20 text-neutral-300'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Suara Aktif' : 'Hening'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive How To Play Banner (Always visible & super intuitive) */}
      <div className="bg-amber-50/80 border-2 border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8B4513]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-[#132726] block text-sm">Alur Permainan:</span>
            <span>
              <strong>1.</strong> Klik kepingan untuk memilih (keping akan bercahaya emas) &bull; 
              <strong> 2.</strong> Klik keping tujuan untuk menukar posisi &bull; 
              <strong> 3.</strong> Keping yang tepat ditandai garis hijau & nomor bercentang!
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHowToPlayModal(true)}
          className="self-end sm:self-auto px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-[#C85A32] font-black hover:bg-amber-100 transition-colors whitespace-nowrap shadow-2xs"
        >
          Lihat Detail →
        </button>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-[#C85A32] text-white shadow-md ring-2 ring-[#C85A32]/30 scale-102'
                : 'bg-white text-[#4A5E5D] hover:bg-[#FAF8F5] border border-[#E8E2D5] hover:text-[#0D3B3A]'
            }`}
          >
            {cat === 'Jambi' && '🏛️ Budaya Jambi'}
            {cat === 'Semua' && '✨ Semua Wilayah'}
            {cat === 'Sumatera' && '🌴 Sumatera'}
            {cat === 'Jawa' && '🏯 Jawa'}
            {cat === 'Bali & Nusa Tenggara' && '🌺 Bali & NT'}
            {cat === 'Kalimantan' && '🌳 Kalimantan'}
            {cat === 'Sulawesi' && '⛵ Sulawesi'}
            {cat === 'Maluku & Papua' && '🪶 Maluku & Papua'}
          </button>
        ))}
      </div>

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Object Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8B4513] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#C85A32]" />
              <span>Pilih Objek Cagar Budaya ({filteredPuzzles.length})</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#526665]">Klik untuk Memilih</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[660px] overflow-y-auto pr-1">
            {filteredPuzzles.map(item => {
              const isSelected = activePuzzleItem.id === item.id;
              const isDone = completedPuzzles.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePuzzleItem(item)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 group relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-50/90 border-[#C85A32] ring-2 ring-[#C85A32]/40 shadow-md scale-101'
                      : 'bg-white border-[#E8E2D5] hover:border-[#C85A32]/60 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C85A32]" />
                  )}

                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#E8E2D5] shadow-xs">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {isDone ? (
                      <div className="absolute inset-0 bg-emerald-900/70 backdrop-blur-2xs flex items-center justify-center text-white">
                        <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                      </div>
                    ) : (
                      <div className="absolute bottom-1 right-1 bg-black/70 text-amber-300 text-[9px] font-black px-1.5 py-0.2 rounded">
                        {item.defaultDimension}x{item.defaultDimension}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-orange-100 text-[#9C3817]">
                        {item.province}
                      </span>
                      <span className="text-[10px] text-[#526665] font-semibold">
                        +{item.xpReward} XP
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-[#132726] truncate group-hover:text-[#C85A32] transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-[#526665] truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C85A32] flex-shrink-0" />
                      <span>{item.region}</span>
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-[#C85A32] translate-x-1' : 'text-[#D5CEBF] group-hover:text-[#526665]'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Canvas Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Active Level Header Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-xs flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E8E2D5]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#0D3B3A] text-emerald-200">
                    {activePuzzleItem.category}
                  </span>
                  <span className="text-xs text-[#526665] flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    {activePuzzleItem.region}, {activePuzzleItem.province}
                  </span>
                </div>
                
                <h2 className="text-lg sm:text-xl font-black font-serif text-[#132726]">
                  {activePuzzleItem.title}
                </h2>
                <p className="text-xs text-[#8B4513] italic">
                  "{activePuzzleItem.indigenousName}"
                </p>
              </div>

              {/* HUD: Accuracy, Stopwatch & Moves */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="px-3 py-1.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className={`w-4 h-4 ${progressPercent === 100 ? 'text-emerald-600' : 'text-[#C85A32]'}`} />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8B4513] block">Kelengkapan</span>
                    <span className="text-xs font-black text-[#132726]">{correctTilesCount}/{totalTiles} ({progressPercent}%)</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] flex items-center gap-2 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#C85A32]" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8B4513] block">Waktu</span>
                    <span className="text-xs font-black text-[#132726]">{formatTime(timerSeconds)}</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] flex items-center gap-2 shadow-2xs">
                  <RotateCcw className="w-4 h-4 text-[#1E7773]" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8B4513] block">Langkah</span>
                    <span className="text-xs font-black text-[#132726]">{movesCount}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#F0EBE1] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#C85A32] to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              
              {/* Grid Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                <span className="text-[11px] font-bold text-[#526665] px-2 flex items-center gap-1">
                  <Grid className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Ukuran:</span>
                </span>
                
                {[3, 4, 5].map((dim) => (
                  <button
                    key={dim}
                    type="button"
                    onClick={() => setCurrentDimension(dim as 3 | 4 | 5)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      currentDimension === dim
                        ? 'bg-[#C85A32] text-white shadow-xs'
                        : 'text-[#526665] hover:text-[#132726]'
                    }`}
                  >
                    {dim}x{dim} {dim === 3 ? 'Mudah' : dim === 4 ? 'Sedang' : 'Maestro'}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGuidePreview(!showGuidePreview)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    showGuidePreview
                      ? 'bg-amber-100 border-amber-300 text-[#8B4513]'
                      : 'bg-white border-[#E8E2D5] text-[#526665] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {showGuidePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#C85A32]" />}
                  <span>{showGuidePreview ? 'Tutup Pratinjau' : 'Lihat Gambar Asli'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowTileNumbers(!showTileNumbers)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    showTileNumbers
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-[#E8E2D5] text-[#526665] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showTileNumbers ? 'Nomor On' : 'Nomor Off'}</span>
                </button>

                {!isSolved && (
                  <button
                    type="button"
                    onClick={handleSmartHint}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-[#8B4513] font-bold hover:bg-amber-100 transition-colors shadow-2xs"
                    title="Pasang 1 keping ke posisi yang benar secara otomatis"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bantuan 1 Keping</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => initializeBoard(currentDimension)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2D5] text-[#526665] hover:text-[#C85A32] font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Acak Ulang</span>
                </button>

                {!isSolved && (
                  <button
                    type="button"
                    onClick={autoSolve}
                    className="text-[11px] text-[#C85A32] hover:text-[#9C3817] font-bold underline px-1"
                  >
                    Bantu Selesaikan
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Canvas Wood Stage Frame */}
          <div className="relative rounded-3xl p-5 sm:p-7 border-4 border-amber-700/40 bg-gradient-to-b from-[#3D2314] via-[#2A180E] to-[#1F120A] shadow-2xl flex flex-col items-center overflow-hidden">
            
            {/* Guide Preview Modal / Card */}
            {showGuidePreview && (
              <div className="mb-4 w-full max-w-sm rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl animate-fade-in relative z-20">
                <img 
                  src={activePuzzleItem.imageUrl} 
                  alt="Panduan Puzzle" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                  Target Gambar Asli
                </div>
              </div>
            )}

            {/* Hint Notification when Tile is selected */}
            {selectedTileIndex !== null && !isSolved && (
              <div className="mb-3 px-4 py-1.5 rounded-full bg-amber-400 text-neutral-950 font-black text-xs shadow-lg animate-bounce flex items-center gap-1.5">
                <MousePointerClick className="w-4 h-4" />
                <span>Keping #{tiles[selectedTileIndex] + 1} dipilih! Sekarang klik keping tujuan untuk menukar posisinya.</span>
              </div>
            )}

            {/* The Authentic Grid Stage Frame */}
            <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-amber-600/30 via-amber-900/40 to-black/60 border-2 border-amber-500/50 shadow-inner">
              <div 
                className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square rounded-xl overflow-hidden bg-neutral-950 shadow-2xl select-none"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentDimension}, minmax(0, 1fr))`,
                  gap: '4px',
                  padding: '4px'
                }}
              >
                {tiles.map((tileTargetIndex, currentSlotIndex) => {
                  const isCorrect = tileTargetIndex === currentSlotIndex;
                  const isSelected = selectedTileIndex === currentSlotIndex;
                  const isDragged = draggedTileIndex === currentSlotIndex;
                  const isDragOver = dragOverIndex === currentSlotIndex;

                  // CSS Background position calculations
                  const row = Math.floor(tileTargetIndex / currentDimension);
                  const col = tileTargetIndex % currentDimension;
                  const posX = currentDimension > 1 ? (col / (currentDimension - 1)) * 100 : 0;
                  const posY = currentDimension > 1 ? (row / (currentDimension - 1)) * 100 : 0;

                  return (
                    <button
                      key={currentSlotIndex}
                      type="button"
                      draggable={!isSolved}
                      onDragStart={() => handleDragStart(currentSlotIndex)}
                      onDragOver={(e) => handleDragOver(e, currentSlotIndex)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, currentSlotIndex)}
                      onClick={() => handleTileClick(currentSlotIndex)}
                      className={`relative w-full h-full cursor-pointer transition-all rounded-lg overflow-hidden border shadow-md focus:outline-hidden ${
                        isDragged
                          ? 'opacity-30 scale-90 ring-4 ring-[#C85A32]'
                          : isDragOver
                            ? 'ring-4 ring-amber-300 scale-105 z-20 shadow-2xl animate-pulse'
                            : isSelected
                              ? 'ring-4 ring-amber-400 scale-102 z-20 shadow-xl brightness-110'
                              : isCorrect
                                ? 'border-emerald-400/80 ring-1 ring-emerald-400/50'
                                : 'border-white/20 hover:scale-[1.02] hover:brightness-105'
                      }`}
                      style={{
                        backgroundImage: `url(${activePuzzleItem.imageUrl})`,
                        backgroundSize: `${currentDimension * 100}% ${currentDimension * 100}%`,
                        backgroundPosition: `${posX}% ${posY}%`,
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      {/* Selection overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/25 flex items-center justify-center">
                          <span className="text-[10px] font-black bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-md shadow-md">
                            Dipilih
                          </span>
                        </div>
                      )}

                      {/* Tile Number Indicator */}
                      {showTileNumbers && (
                        <span className={`absolute top-1 left-1 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-xs ${
                          isCorrect
                            ? 'bg-emerald-600 text-white border border-emerald-300'
                            : 'bg-black/80 text-amber-300 border border-amber-400/40'
                        }`}>
                          #{tileTargetIndex + 1}
                        </span>
                      )}

                      {/* Correct Position Checkmark */}
                      {isCorrect && (
                        <span className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs border border-emerald-200">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instruction Footer */}
            <div className="flex items-center gap-2 mt-4 text-[11px] text-amber-200/90 text-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span>
                <strong>Tips:</strong> Anda dapat mengklik kepingan atau menyeretnya (drag & drop) untuk menukar posisi kepingan secara bebas.
              </span>
            </div>

            {/* Solved Victory Modal / Banner */}
            {isSolved && (
              <div className="w-full max-w-lg mt-5 p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0D3B3A] to-emerald-900 text-white text-center shadow-2xl border-2 border-emerald-400 animate-fade-in relative z-20">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/30 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-3 text-emerald-200 shadow-inner">
                  <Trophy className="w-8 h-8 text-amber-300" />
                </div>
                
                <span className="text-[10px] font-black tracking-widest text-emerald-300 uppercase block">
                  MAHAKARYA BUDAYA BERHASIL DIREKONSTRUKSI!
                </span>
                
                <h3 className="text-xl font-black font-serif text-white mt-1 mb-1">
                  {activePuzzleItem.title}
                </h3>
                
                <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                  Selesai dalam <strong>{movesCount} langkah</strong> dengan durasi <strong>{formatTime(timerSeconds)}</strong>. Hadiah <strong>+{activePuzzleItem.xpReward} Cultural XP</strong> telah ditambahkan ke profil Anda!
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleNextPuzzle}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Objek Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => initializeBoard(currentDimension)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Main Lagi</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Educational Cultural Facts & Seloko Adat Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#C85A32] font-black text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Kajian Etnopedagogi & Filosofi Budaya</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] space-y-2">
                <span className="font-black text-[#132726] block">📜 Konteks Sejarah & Arsitektur</span>
                <p className="text-[#526665] leading-relaxed">
                  {activePuzzleItem.historicalContext}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] space-y-2">
                <span className="font-black text-[#132726] block">🌟 Makna Filosofis & Nilai Luhur</span>
                <p className="text-[#526665] leading-relaxed">
                  {activePuzzleItem.philosophicalMeaning}
                </p>
              </div>
            </div>

            {/* Seloko Adat Melayu Quote */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-[#8B4513] space-y-1">
              <div className="flex items-center gap-1.5 font-black text-xs text-[#C85A32]">
                <Compass className="w-3.5 h-3.5" />
                <span>Seloko Adat & Pepatah Leluhur</span>
              </div>
              <p className="font-serif italic text-sm text-[#5C2E0B]">
                "{activePuzzleItem.selokoAdat}"
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D5] text-[11px] text-[#526665]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Status: <strong>{activePuzzleItem.wbtbStatus}</strong>
              </span>
              <span className="font-mono text-[#8B4513]">
                ID Arsip: {activePuzzleItem.unRecordNo}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* How To Play Modal */}
      {showHowToPlayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8E2D5] shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-2 text-[#C85A32] font-black text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Panduan Bermain Game Puzzle Budaya</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHowToPlayModal(false)}
                className="p-1 rounded-lg text-[#526665] hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-[#2A3E3D] leading-relaxed">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                <div className="w-6 h-6 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-[#132726] block mb-0.5">Pilih Objek Budaya</strong>
                  <span>Gunakan daftar di sebelah kiri untuk memilih cagar budaya yang ingin Anda susun (Rumah Kajang Lako, Percandian Muaro Jambi, dll).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                <div className="w-6 h-6 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-[#132726] block mb-0.5">Pilih Kepingan Pertama & Kepingan Kedua</strong>
                  <span>Klik kepingan pertama hingga bercahaya emas, lalu klik kepingan kedua di papan untuk menukar posisi kepingan secara instan.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                <div className="w-6 h-6 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-[#132726] block mb-0.5">Gunakan Fitur Bantuan</strong>
                  <span>Jika mengalami kesulitan, klik <strong>"Lihat Gambar Asli"</strong> untuk melihat contoh utuh atau <strong>"Bantuan 1 Keping"</strong> untuk memposisikan 1 keping secara otomatis.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <strong className="text-[#132726] block mb-0.5">Klaim Hadiah XP & Buka Pengetahuan</strong>
                  <span>Setelah seluruh kepingan terpasang pas (100%), Anda akan mendapatkan bonus Cultural XP dan membuka kajian etnopedagogi lengkap!</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHowToPlayModal(false)}
              className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] text-white font-bold text-xs transition-colors shadow-md"
            >
              Mengerti & Mulai Bermain!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
