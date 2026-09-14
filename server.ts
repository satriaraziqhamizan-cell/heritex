import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with image payload support up to 25MB
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Rate limiter for AI Culture Scanner endpoint: 10 requests per minute
const scanCultureRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Batas kuota pemindaian tercapai (maksimal 10 pindaian per menit per IP). Silakan tunggu 1 menit sebelum memindai kembali.',
    rateLimited: true
  }
});

// Lazy initialization of Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// AI Cultural Scanner Endpoint with Rate Limiting
app.post('/api/gemini/scan-culture', scanCultureRateLimiter, async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Data gambar base64 diperlukan.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di server. Menggunakan mesin analisis cerdas lokal.',
        useFallback: true
      });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

    const systemPrompt = `Anda adalah Ahli Kurator Cagar Budaya & Peneliti Antropologi Kementerian Kebudayaan Indonesia di platform HERITEX.
Tugas Anda: Menganalisis foto/gambar yang diberikan pengguna untuk mengenali warisan budaya di Indonesia (mencakup 38 provinsi di seluruh Nusantara).

Evaluasi secara kritis:
1. Objek/karya budaya apa ini (arsitektur, tarian, tekstil/batik/songket, senjata, upacara adat, sastra/aksara, alat musik, kuliner tradisional)?
2. Asal provinsi, daerah, dan suku bangsanya.
3. Analisis Keaslian & Deteksi Anomali/Rancu/Modifikasi:
   - Apakah objek ini akurat dan otentik sesuai pakem tradisi leluhur?
   - ATAU apakah ini rancu, tiruan modern, salah klaim (misal diklaim dari daerah A padahal motifnya khas daerah B), atau modifikasi kontemporer? Jelaskan secara objektif dari segi ornamen, corak, bentuk, atau fungsi!
4. Nilai filosofis, makna simbolis, dan pesan kearifan lokal.
5. Konteks sejarah, era kerajaan, atau periode kemunculannya.
6. Status keterancaman saat ini (active / at_risk / critical / lost) dan rekomendasi pelestarian untuk generasi muda.

Berikan jawaban HANYA dalam format JSON valid tanpa markdown formatting tambahan atau backticks code fences.
Format skema JSON:
{
  "culturalObjectName": "Nama Objek / Karya Budaya",
  "category": "Arsitektur & Rumah Adat" | "Seni Pertunjukan & Tari" | "Kriya & Tekstil" | "Sastra Lisan & Tradisi" | "Kuliner Tradisional" | "Ritual & Adat Istiadat" | "Naskah & Aksara Kuno" | "Senjata & Pusaka",
  "region": "Nama Kota/Kabupaten & Daerah",
  "province": "Nama Provinsi",
  "confidenceScore": 85-99,
  "authenticityStatus": "authentic" | "hybrid_modern" | "misattributed" | "unrecognized",
  "authenticityLabel": "Sangat Otentik / Terverifikasi" | "Kreasi Kontemporer / Modifikasi" | "Rancu / Klaim Kurang Akurat" | "Tidak Teridentifikasi Sebagai Objek Budaya",
  "authenticityAnalysis": "Uraian telaah keaslian dan penjelasan apakah terdapat kerancuan atau campur aduk motif antar daerah",
  "historicalContext": "Konteks sejarah singkat abad dan asal-usul",
  "philosophicalMeaning": "Makna filosofis dan nilai luhur",
  "preservationStatus": "active" | "at_risk" | "critical",
  "keyFeatures": ["Ciri khas 1", "Ciri khas 2", "Ciri khas 3"],
  "recommendation": "Saran pelestarian untuk pemuda",
  "officialReferences": ["Rujukan Kemendikbud / BPK / Balai Adat"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Identifikasi dan bedah objek kebudayaan Indonesia ini secara presisi. ${userPrompt ? `Pertanyaan pengguna: ${userPrompt}` : ''}\nIngat: Balas hanya dengan raw JSON yang valid sesuai skema.`
          }
        ]
      },
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2
      }
    });

    const rawText = response.text || '';
    // Strip possible markdown code blocks if any
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Gagal memformat respon AI menjadi JSON terstruktur.');
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error in /api/gemini/scan-culture:', error);
    return res.status(500).json({
      error: error.message || 'Terjadi kendala saat memproses gambar dengan AI.',
      useFallback: true
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HERITEX Server running on http://localhost:${PORT}`);
  });
}

startServer();
