# HERITEX — Platform Gamifikasi & Verifikasi Cagar Budaya Nusantara

> **HERITEX** (*Explore Heritage, Experience Technology*) adalah platform edukasi interaktif dan tata kelola pelestarian warisan budaya berbasis **AI Fact-Checking Engine (Gemini API)** dan **Living Map**. Platform ini mengintegrasikan gamifikasi petualangan edukatif, kurasi komunitas, dan pemantauan resmi dinas kebudayaan dalam satu ekosistem terpadu.

---

## 🎯 Fitur Utama

1. **Petualangan & Gamifikasi Budaya (Pilot Wilayah Jambi & Sumatera)**
   - Jelajahi objek cagar budaya (Candi Muaro Jambi, Gentala Arasy, Rumah Tuo Rantau Panjang, Keris Siginjai, Tari Sekapur Sirih, dll).
   - Telaah fakta rujukan resmi, hadapi tes klaim kebenaran sejarah, dan susun argumentasi berbasis referensi valid.
   - Dapatkan XP, tingkatkan level, kumpulkan lencana budaya, dan buka wilayah baru secara progresif.
   - Efek suara kemenangan Web Audio API (*victory fanfare chime*) dan fitur berbagi pencapaian ke WhatsApp/Clipboard.

2. **Peta Hidup Budaya (Living Map)**
   - Peta sebaran interaktif cagar budaya dengan penanda status (*Lestari, Waspada, Kritis*).
   - Menampilkan detail lengkap: **lokasi**, **pelaku/komunitas budaya (*Cultural Bearer*)**, **cerita naratif**, aktivitas, dan status keberlangsungan.
   - Formulir pelaporan partisipatif warga (*crowdsourcing*) untuk mendokumentasikan tradisi lokal.

3. **Mesin Verifikasi AI (AI Fact-Checking & Gemini Computer Vision)**
   - Verifikasi klaim otomatis menggunakan rujukan resmi Kemendikbudristek & Lembaga Adat Melayu.
   - **AI Culture Scanner**: Pindai foto cagar budaya melalui kamera/unggah berkas untuk klasifikasi otomatis dan verifikasi visual berbasis Gemini Vision.
   - Dilengkapi *rate limiting* keamanan di level Express backend.

4. **Multi-Role Tata Kelola 4 Aktor Kebudayaan**
   - **Pelajar / Mahasiswa (`player`)**: Eksplorasi cagar budaya, telaah fakta, kuis, scanner, dan kumpulkan lencana.
   - **Kurator & Ahli Budaya (`curator`)**: Review dan validasi laporan crowdsourcing warga, verifikasi rujukan arsip.
   - **Dinas Kebudayaan & Pemda (`government`)**: Dashboard analitik spasial, pemantauan indeks keterancaman, dan ekspor rekomendasi resmi.
   - **Administrator Sistem (`admin`)**: Kelola pengguna & peran (*User & Role Management*), konfigurasi mesin AI, pemantauan Log Sistem (*System Logs*), dan manajemen wilayah.

5. **Modul Eksperimental & Edukatif**
   - **Puzzleverse Interaktif**: Permainan susun visual budaya (Batik Batanghari, Rumah Kajang Lako) & Campaign Mosaik Nusantara.
   - **Panduan Onboarding**: Tutorial interaktif 3-langkah pemahaman platform.
   - **Dukungan PWA & Mode Gelap**: Dapat diinstal ke perangkat mobile dan disesuaikan temanya.

---

## 🔑 Akun Demo Pengujian (Multi-Peran)

Gunakan kredensial berikut pada form login:

| Peran (*Role*) | Email | Kata Sandi | Deskripsi Akses |
| :--- | :--- | :--- | :--- |
| **Pelajar / Mahasiswa** | `pelajar@heritex.id` | `pelajar2026` | Akses eksplorasi peta, uji klaim, XP & lencana |
| **Kurator & Ahli Budaya** | `kurator@heritex.id` | `kurator2026` | Akses panel kurasi & audit laporan warga |
| **Dinas Kebudayaan & Pemda** | `pemda@heritex.id` | `pemda2026` | Akses dashboard analitik & ekspor kebijakan |
| **Administrator Sistem** | `admin@heritex.id` | `admin2026` | Akses penuh manajemen pengguna, log & sistem |

---

## 🛠️ Panduan Menjalankan Aplikasi

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env` dan tambahkan kunci API Gemini:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Mode Pengembangan (*Development*)
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`.

### 4. Build Produksi (*Production*)
```bash
npm run build
npm start
```

---

## 🏛️ Standar Data & Rujukan Resmi
Data cagar budaya pada platform ini mengacu pada:
- Sistem Registrasi Nasional Cagar Budaya (Kemendikbudristek RI)
- Warisan Budaya Takbenda (WBTb) Indonesia
- Balai Pelestarian Kebudayaan (BPK) Wilayah V Jambi & Bangka Belitung
- Lembaga Adat Melayu (LAM) Jambi
