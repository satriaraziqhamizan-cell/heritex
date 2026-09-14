import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Filter, 
  PlusCircle, 
  History, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Search,
  ExternalLink,
  Sparkles,
  Eye,
  X,
  Compass,
  Camera,
  Maximize2,
  Navigation,
  Users,
  BookOpen
} from 'lucide-react';
import { LivingMapPoint, CulturalStatus, CrowdsourceReport, UserRole, IslandGroup } from '../types';
import { evaluateCrowdsourceReport } from '../services/aiVerifier';
import { Language, useTranslation } from '../i18n';
import { LoadingSpinner } from './LoadingSpinner';
import { SkeletonCard } from './SkeletonCard';

interface LivingMapProps {
  points: LivingMapPoint[];
  onReportSubmitted: (newReport: CrowdsourceReport, updatedPoint?: LivingMapPoint) => void;
  currentRole: UserRole;
  currentUserName: string;
  onOpenScanner?: () => void;
  lang?: Language;
}

// Regional Quick-Jump Centers
const REGION_JUMPS: { name: string; island?: IslandGroup | 'all'; lat: number; lng: number; zoom: number; icon: string }[] = [
  { name: '🇮🇩 Seluruh Nusantara', island: 'all', lat: -2.5, lng: 118.0, zoom: 5, icon: '🇮🇩' },
  { name: 'Lembah Jambi', island: 'Sumatera', lat: -1.6, lng: 103.6, zoom: 9, icon: '🌴' },
  { name: 'Sumatera', island: 'Sumatera', lat: 0.5, lng: 101.5, zoom: 6, icon: '🌊' },
  { name: 'Jawa & Madura', island: 'Jawa', lat: -7.4, lng: 110.5, zoom: 7, icon: '🌋' },
  { name: 'Bali & Nusa Tenggara', island: 'Bali & Nusa Tenggara', lat: -8.5, lng: 117.5, zoom: 7, icon: '🌺' },
  { name: 'Kalimantan', island: 'Kalimantan', lat: -0.5, lng: 114.0, zoom: 6, icon: '🌳' },
  { name: 'Sulawesi', island: 'Sulawesi', lat: -2.5, lng: 120.5, zoom: 6, icon: '🏔️' },
  { name: 'Maluku', island: 'Maluku', lat: -3.2, lng: 128.5, zoom: 7, icon: '⛵' },
  { name: 'Papua', island: 'Papua', lat: -4.0, lng: 138.0, zoom: 6, icon: '🏝️' }
];

export const LivingMap: React.FC<LivingMapProps> = ({
  points,
  onReportSubmitted,
  currentRole,
  currentUserName,
  onOpenScanner,
  lang = 'id'
}) => {
  const { t } = useTranslation(lang);
  const [selectedPoint, setSelectedPoint] = useState<LivingMapPoint | null>(points[0] || null);
  const [statusFilter, setStatusFilter] = useState<CulturalStatus | 'all'>('all');
  const [islandFilter, setIslandFilter] = useState<IslandGroup | 'all'>('all');
  const [regencyFilter, setRegencyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real Google Maps Layer Switcher
  const [mapLayer, setMapLayer] = useState<'satellite' | 'streets' | 'terrain' | 'carto'>('satellite');

  // Modals
  const [showReportForm, setShowReportForm] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  // Form State
  const [targetPointId, setTargetPointId] = useState<string>(points[0]?.id || '');
  const [reportedStatus, setReportedStatus] = useState<CulturalStatus>('at_risk');
  const [reportNote, setReportNote] = useState('');
  const [isEvaluatingReport, setIsEvaluatingReport] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<{
    classification: 'verified' | 'unverified' | 'contradicted';
    confidenceScore: number;
    rationale: string;
    reviewStatus: 'auto_approved' | 'pending_curator';
  } | null>(null);

  // Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Unique regencies from dataset
  const regencies = Array.from(new Set(points.map(p => p.regency))).sort();

  // Filtered points
  const filteredPoints = points.filter(pt => {
    const matchesStatus = statusFilter === 'all' || pt.currentStatus === statusFilter;
    const matchesIsland = islandFilter === 'all' || pt.islandGroup === islandFilter;
    const matchesRegency = regencyFilter === 'all' || pt.regency === regencyFilter;
    const matchesSearch = searchQuery === '' || 
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pt.province && pt.province.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesIsland && matchesRegency && matchesSearch;
  });

  // Status Summary Counts
  const counts = {
    active: points.filter(p => p.currentStatus === 'active').length,
    at_risk: points.filter(p => p.currentStatus === 'at_risk').length,
    critical: points.filter(p => p.currentStatus === 'critical').length,
    lost: points.filter(p => p.currentStatus === 'lost').length,
  };

  const getStatusBadge = (status: CulturalStatus) => {
    switch (status) {
      case 'active':
        return { label: 'Aktif Terjaga', bg: 'bg-[#EAF6F5] text-[#1E7773] border-[#278B86]', dot: 'bg-[#1E7773]', hex: '#1E7773' };
      case 'at_risk':
        return { label: 'Rentan Terancam', bg: 'bg-[#FAF5EE] text-[#C85A32] border-[#E8C4B5]', dot: 'bg-[#C85A32]', hex: '#C85A32' };
      case 'critical':
        return { label: 'Kritis Mendesak', bg: 'bg-red-50 text-[#B3261E] border-red-200', dot: 'bg-[#B3261E]', hex: '#B3261E' };
      case 'lost':
        return { label: 'Punah / Arsip', bg: 'bg-stone-100 text-[#637675] border-stone-300', dot: 'bg-[#637675]', hex: '#637675' };
    }
  };

  // Initialize Leaflet Real Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Map if not created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-2.5, 118.0],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true
      });

      mapInstanceRef.current = map;

      // Create Layer Group for markers
      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
    }

    const map = mapInstanceRef.current;

    // Remove previous tile layer if any
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // Set Google Maps / Tile layer according to selected mode
    let newTileLayer: L.TileLayer;
    if (mapLayer === 'satellite') {
      newTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps Satellite Imagery'
      });
    } else if (mapLayer === 'streets') {
      newTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps Jalan & Administrasi'
      });
    } else if (mapLayer === 'terrain') {
      newTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps Kontur Topografi'
      });
    } else {
      newTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap & CartoDB'
      });
    }

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;

    // Cleanup when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLayer]);

  // Update Markers whenever filteredPoints or selectedPoint changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    filteredPoints.forEach(pt => {
      const isSelected = selectedPoint?.id === pt.id;
      const statusCfg = getStatusBadge(pt.currentStatus);

      const markerHtml = `
        <div class="group relative flex flex-col items-center cursor-pointer" style="transform: translate(-50%, -50%);">
          <div class="relative flex items-center justify-center">
            ${pt.currentStatus === 'critical' ? '<span class="absolute h-10 w-10 rounded-full bg-red-500/40 animate-ping"></span>' : ''}
            <div class="flex h-8 w-8 items-center justify-center rounded-2xl shadow-lg border-2 ${
              isSelected 
                ? 'bg-[#C85A32] text-white border-white scale-125 ring-4 ring-[#C85A32]/50' 
                : 'bg-white text-[#0D3B3A] border-[#D5CEBD] hover:scale-110'
            } transition-all duration-200">
              <span class="h-3 w-3 rounded-full" style="background-color: ${statusCfg.hex}"></span>
            </div>
          </div>
          <div class="mt-1 whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[9px] font-bold text-[#0D3B3A] border border-[#E5DFD2] shadow-sm pointer-events-none">
            ${pt.name.length > 22 ? pt.name.slice(0, 20) + '...' : pt.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'heritex-custom-marker',
        html: markerHtml,
        iconSize: [36, 44],
        iconAnchor: [18, 22]
      });

      const marker = L.marker([pt.latitude, pt.longitude], { icon: customIcon });

      // Rich popup showing location, bearer, story, and status
      const popupHtml = `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #132726; min-width: 230px; max-width: 290px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #C85A32; letter-spacing: 0.05em;">${pt.category}</span>
            <span style="font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background-color: ${statusCfg.hex}15; color: ${statusCfg.hex}; border: 1px solid ${statusCfg.hex}40;">${statusCfg.label}</span>
          </div>
          <h4 style="font-family: ui-serif, Georgia, Cambria, serif; font-size: 13px; font-weight: 700; color: #0D3B3A; margin: 0 0 3px 0; line-height: 1.3;">${pt.name}</h4>
          <p style="font-size: 10px; color: #637675; margin: 0 0 6px 0;">📍 ${pt.regency}${pt.province ? ', ' + pt.province : ''}</p>
          
          ${pt.culturalBearer ? `
            <div style="background-color: #FAF8F5; border: 1px solid #E5DFD2; border-radius: 8px; padding: 6px; margin-bottom: 5px;">
              <span style="font-weight: 700; color: #0D3B3A; display: block; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">👥 Pelaku / Komunitas Budaya:</span>
              <span style="color: #2A3E3D; font-size: 10.5px; font-weight: 600; line-height: 1.3; display: block;">${pt.culturalBearer}</span>
            </div>
          ` : ''}

          ${pt.narrative ? `
            <div style="background-color: #FAF8F5; border: 1px solid #E5DFD2; border-radius: 8px; padding: 6px; margin-bottom: 5px;">
              <span style="font-weight: 700; color: #0D3B3A; display: block; font-size: 9px; text-transform: uppercase; margin-bottom: 2px;">📖 Cerita & Latar Belakang:</span>
              <p style="color: #4A5E5D; font-size: 10px; line-height: 1.4; margin: 0;">${pt.narrative}</p>
            </div>
          ` : ''}

          <div style="font-size: 9px; color: #8C9C9B; text-align: right; border-top: 1px solid #EFECE4; padding-top: 4px; margin-top: 4px;">
            Terakhir Diaudit: ${pt.lastUpdated}
          </div>
        </div>
      `;
      marker.bindPopup(popupHtml, { maxWidth: 300 });

      // Click handler
      marker.on('click', () => {
        setSelectedPoint(pt);
        mapInstanceRef.current?.flyTo([pt.latitude, pt.longitude], Math.max(mapInstanceRef.current.getZoom(), 11), {
          duration: 1.2
        });
      });

      marker.addTo(markersGroup);
    });

  }, [filteredPoints, selectedPoint]);

  // Jump to specific region
  const handleJumpToRegion = (jump: typeof REGION_JUMPS[0]) => {
    if (jump.island && jump.island !== 'all') {
      setIslandFilter(jump.island);
    } else {
      setIslandFilter('all');
    }
    mapInstanceRef.current?.flyTo([jump.lat, jump.lng], jump.zoom, {
      duration: 1.5
    });
  };

  // Center on Selected Point
  const handleCenterSelectedPoint = () => {
    if (!selectedPoint || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([selectedPoint.latitude, selectedPoint.longitude], 13, {
      duration: 1.2
    });
  };

  // Handle Crowdsource Report Submission with AI Verifier
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportNote.trim()) return;

    setIsEvaluatingReport(true);

    setTimeout(() => {
      const selectedPt = points.find(p => p.id === targetPointId) || points[0];
      const evalResult = evaluateCrowdsourceReport(reportNote, selectedPt.culturalObjectId, reportedStatus);
      
      setEvaluationFeedback(evalResult);
      setIsEvaluatingReport(false);

      const newReport: CrowdsourceReport = {
        id: 'rep-' + Date.now(),
        userId: 'user-current',
        userName: currentUserName,
        userSchool: currentRole === 'player' ? 'SMA Negeri 1 Kota Jambi' : undefined,
        livingMapPointId: selectedPt.id,
        culturalObjectName: selectedPt.name,
        regency: selectedPt.regency,
        observedStatus: reportedStatus,
        observationNote: reportNote,
        submittedAt: new Date().toISOString().split('T')[0],
        aiClassification: evalResult.classification,
        aiConfidenceScore: evalResult.confidenceScore,
        reviewStatus: evalResult.reviewStatus,
        curatorNotes: evalResult.rationale
      };

      let updatedPoint: LivingMapPoint | undefined;
      if (evalResult.reviewStatus === 'auto_approved') {
        updatedPoint = {
          ...selectedPt,
          currentStatus: reportedStatus,
          lastUpdated: new Date().toISOString().split('T')[0],
          statusHistory: [
            {
              id: 'sh-' + Date.now(),
              status: reportedStatus,
              changedBy: currentUserName + ' (Laporan Warga Tervalidasi AI)',
              role: currentRole,
              date: new Date().toISOString().split('T')[0],
              reason: reportNote
            },
            ...selectedPt.statusHistory
          ]
        };
      }

      onReportSubmitted(newReport, updatedPoint);
    }, 800);
  };

  return (
    <div className="space-y-6 text-[#132726] dark:text-stone-200">
      
      {/* Top Header & Status Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C85A32] dark:text-amber-400 uppercase">
              Observatorium Geospasial Nusantara
            </span>
            <span className="rounded-md bg-[#EAF6F5] dark:bg-emerald-950/60 px-2 py-0.5 text-[9px] font-semibold text-[#1E7773] dark:text-emerald-400 border border-[#278B86] dark:border-emerald-800">
              Google Maps Platform Terhubung
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] dark:text-stone-100 tracking-wide mt-0.5">
            {t('livingMapTitle')}
          </h1>
          <p className="text-xs text-[#4A5E5D] dark:text-stone-400 mt-0.5 max-w-2xl leading-relaxed">
            {t('livingMapSubtitle')}
          </p>
        </div>

        {/* Action Buttons: Pindai AI & Lapor Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenScanner && (
            <button
              id="btn-map-open-ai-scanner"
              onClick={onOpenScanner}
              className="flex items-center gap-2 rounded-2xl bg-[#1E7773] hover:bg-[#165A57] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>{t('navScanner')} (Vision)</span>
            </button>
          )}

          <button
            id="btn-open-crowdsource-report"
            onClick={() => {
              setEvaluationFeedback(null);
              setShowReportForm(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-[#C85A32] hover:bg-[#B54E27] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('reportCrowdsource')}</span>
          </button>
        </div>
      </div>

      {/* Status Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
          className={`rounded-2xl p-3.5 border transition-all text-left shadow-2xs ${
            statusFilter === 'active' 
              ? 'bg-[#EAF6F5] dark:bg-emerald-950/40 border-[#278B86] dark:border-emerald-700 ring-2 ring-[#278B86]/30' 
              : 'bg-white dark:bg-stone-900 border-[#E5DFD2] dark:border-stone-800 hover:border-[#1E7773]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1E7773] dark:text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1E7773] dark:bg-emerald-400"></span>
              {t('statusPreserved')}
            </span>
            <span className="text-lg font-bold text-[#0D3B3A] dark:text-stone-100">{counts.active}</span>
          </div>
          <p className="text-[10px] text-[#5B6D6C] dark:text-stone-400 mt-1">Praktik tradisi lestari & regenerasi berjalan</p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'at_risk' ? 'all' : 'at_risk')}
          className={`rounded-2xl p-3.5 border transition-all text-left shadow-2xs ${
            statusFilter === 'at_risk' 
              ? 'bg-[#FAF5EE] dark:bg-amber-950/40 border-[#C85A32] dark:border-amber-700 ring-2 ring-[#C85A32]/30' 
              : 'bg-white dark:bg-stone-900 border-[#E5DFD2] dark:border-stone-800 hover:border-[#C85A32]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#C85A32] dark:text-amber-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C85A32] dark:bg-amber-400"></span>
              {t('statusVulnerable')}
            </span>
            <span className="text-lg font-bold text-[#0D3B3A] dark:text-stone-100">{counts.at_risk}</span>
          </div>
          <p className="text-[10px] text-[#5B6D6C] dark:text-stone-400 mt-1">Mengalami degradasi fisik atau minim pewaris</p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'critical' ? 'all' : 'critical')}
          className={`rounded-2xl p-3.5 border transition-all text-left shadow-2xs ${
            statusFilter === 'critical' 
              ? 'bg-red-50 dark:bg-red-950/40 border-red-400 dark:border-red-700 ring-2 ring-red-400/30' 
              : 'bg-white dark:bg-stone-900 border-[#E5DFD2] dark:border-stone-800 hover:border-red-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B3261E] dark:text-red-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#B3261E] dark:bg-red-400 animate-ping"></span>
              {t('statusCritical')}
            </span>
            <span className="text-lg font-bold text-[#0D3B3A] dark:text-stone-100">{counts.critical}</span>
          </div>
          <p className="text-[10px] text-[#5B6D6C] dark:text-stone-400 mt-1">Maestro lansia & terancam hilang total</p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'lost' ? 'all' : 'lost')}
          className={`rounded-2xl p-3.5 border transition-all text-left shadow-2xs ${
            statusFilter === 'lost' 
              ? 'bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-600 ring-2 ring-stone-400/30' 
              : 'bg-white dark:bg-stone-900 border-[#E5DFD2] dark:border-stone-800 hover:border-stone-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#637675] dark:text-stone-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#637675]"></span>
              Punah / Arsip
            </span>
            <span className="text-lg font-bold text-[#0D3B3A] dark:text-stone-100">{counts.lost}</span>
          </div>
          <p className="text-[10px] text-[#637675] dark:text-stone-400 mt-1">Hanya tersisa dalam dokumen & museum</p>
        </button>
      </div>

      {/* Real Map Layer & Island Quick Jump Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 p-3 shadow-2xs">
        
        {/* Layer Switcher (Google Satellite, Google Streets, Google Terrain, Carto) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#0D3B3A] dark:text-stone-200 flex items-center gap-1 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
            Lapisan Peta:
          </span>

          <button
            onClick={() => setMapLayer('satellite')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              mapLayer === 'satellite'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-[#FAF8F5] dark:bg-stone-800 text-[#4A5E5D] dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-stone-750'
            }`}
          >
            <span>🛰️ Satelit Google Asli</span>
          </button>

          <button
            onClick={() => setMapLayer('streets')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              mapLayer === 'streets'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-[#FAF8F5] dark:bg-stone-800 text-[#4A5E5D] dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-stone-750'
            }`}
          >
            <span>🗺️ Jalan Google Maps</span>
          </button>

          <button
            onClick={() => setMapLayer('terrain')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              mapLayer === 'terrain'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-[#FAF8F5] dark:bg-stone-800 text-[#4A5E5D] dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-stone-750'
            }`}
          >
            <span>⛰️ Topografi Google</span>
          </button>

          <button
            onClick={() => setMapLayer('carto')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              mapLayer === 'carto'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-[#FAF8F5] dark:bg-stone-800 text-[#4A5E5D] dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-stone-750'
            }`}
          >
            <span>📜 Peta Kartografi</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#637675] dark:text-stone-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari candi, wayang, adat, tari..."
            className="w-full rounded-xl bg-[#FAF8F5] dark:bg-stone-800 border border-[#E5DFD2] dark:border-stone-700 pl-8 pr-3 py-1.5 text-xs text-[#132726] dark:text-stone-200 placeholder:text-[#8C9C9B] dark:placeholder:text-stone-500 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
          />
        </div>

      </div>

      {/* Regional Quick Jump Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-[11px] text-[#4A5E5D] dark:text-stone-400 shrink-0 mr-1 flex items-center gap-1">
          <Navigation className="w-3 h-3 text-[#1E7773] dark:text-emerald-400" />
          Lompat Cepat ke Wilayah:
        </span>
        {REGION_JUMPS.map((jump, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleJumpToRegion(jump)}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-stone-850 hover:bg-[#FAF5EE] dark:hover:bg-stone-800 border border-[#E5DFD2] dark:border-stone-750 hover:border-[#C85A32] dark:hover:border-amber-400 text-[11px] text-[#0D3B3A] dark:text-stone-200 font-medium transition-all shadow-2xs"
          >
            <span>{jump.icon}</span>
            <span>{jump.name}</span>
          </button>
        ))}
      </div>

      {/* Main Map & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real Google Maps Leaflet Canvas */}
        <div className="lg:col-span-2 space-y-3">
          
          <div className="relative h-[520px] w-full rounded-3xl overflow-hidden border border-[#E5DFD2] dark:border-stone-800 shadow-md bg-stone-200 dark:bg-stone-850">
            {/* The Real Leaflet Map Container */}
            <div ref={mapContainerRef} className="h-full w-full z-0" />

            {/* Quick Map Overlay Status Bar */}
            <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-[#0D3B3A] dark:text-stone-200 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#E5DFD2] dark:border-stone-800 shadow-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE GIS • {filteredPoints.length} Titik Cagar Budaya Terpetakan</span>
            </div>

            {selectedPoint && (
              <button
                type="button"
                onClick={handleCenterSelectedPoint}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-xl bg-white/95 dark:bg-stone-900/95 hover:bg-white dark:hover:bg-stone-850 px-3 py-2 text-xs font-bold text-[#0D3B3A] dark:text-stone-200 border border-[#E5DFD2] dark:border-stone-750 shadow-md transition-transform hover:scale-105"
              >
                <Compass className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                <span>Pusatkan ke {selectedPoint.name.split(' ')[0]}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-[#637675] dark:text-stone-400 px-1">
            <span>Menampilkan {filteredPoints.length} titik cagar budaya di peta interaktif</span>
            <span className="text-[11px] text-[#C85A32] dark:text-amber-400 font-semibold">
              Geser & perbesar peta untuk melihat rincian lokasi nyata
            </span>
          </div>
        </div>

        {/* Right 1 Col: Selected Cultural Point Detail, Audit History & Actions */}
        <div className="space-y-4">
          {selectedPoint ? (
            <div className="rounded-3xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 p-5 shadow-sm space-y-4 transition-colors">
              
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#C85A32] dark:text-amber-400 uppercase font-bold tracking-wider">
                    {selectedPoint.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0D3B3A] dark:text-stone-100 mt-0.5">
                    {selectedPoint.name}
                  </h3>
                  <p className="text-xs text-[#637675] dark:text-stone-400 mt-0.5">
                    📍 {selectedPoint.regency}{selectedPoint.province ? `, ${selectedPoint.province}` : ''}
                  </p>
                </div>

                <span className={`rounded-md px-2.5 py-1 text-xs font-bold border shrink-0 ${getStatusBadge(selectedPoint.currentStatus).bg}`}>
                  {getStatusBadge(selectedPoint.currentStatus).label}
                </span>
              </div>

              {/* Pelaku & Komunitas Budaya (Cultural Bearer) */}
              {selectedPoint.culturalBearer && (
                <div className="rounded-2xl bg-[#FAF8F5] dark:bg-stone-850 p-3 border border-[#E5DFD2] dark:border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#0D3B3A] dark:text-stone-200">
                    <Users className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#637675] dark:text-stone-400">
                      {t('culturalBearer')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0D3B3A] dark:text-stone-200 pl-5 leading-snug">
                    {selectedPoint.culturalBearer}
                  </p>
                </div>
              )}

              {/* Cerita Singkat & Latar Belakang (Narrative) */}
              {selectedPoint.narrative && (
                <div className="rounded-2xl bg-[#FAF8F5] dark:bg-stone-850 p-3 border border-[#E5DFD2] dark:border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#0D3B3A] dark:text-stone-200">
                    <BookOpen className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#637675] dark:text-stone-400">
                      {t('narrative')}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#4A5E5D] dark:text-stone-300 pl-5 leading-relaxed">
                    {selectedPoint.narrative}
                  </p>
                </div>
              )}

              {/* Coordinates & Last Updated */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-[#FAF8F5] dark:bg-stone-850 p-2.5 border border-[#E5DFD2] dark:border-stone-800">
                  <span className="text-[10px] text-[#637675] dark:text-stone-400 font-bold uppercase block">Koordinat Nyata</span>
                  <span className="font-mono text-[#0D3B3A] dark:text-stone-200 font-bold text-[11px] mt-0.5 block">
                    {selectedPoint.latitude.toFixed(4)}, {selectedPoint.longitude.toFixed(4)}
                  </span>
                </div>
                <div className="rounded-xl bg-[#FAF8F5] dark:bg-stone-850 p-2.5 border border-[#E5DFD2] dark:border-stone-800">
                  <span className="text-[10px] text-[#637675] dark:text-stone-400 font-bold uppercase block">Terakhir Diaudit</span>
                  <span className="text-[#0D3B3A] dark:text-stone-200 font-semibold text-[11px] mt-0.5 block">
                    {selectedPoint.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Direct Open in Official Google Maps Button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.latitude},${selectedPoint.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-[#FAF8F5] dark:bg-stone-850 hover:bg-[#F3EFE6] dark:hover:bg-stone-800 px-3 py-2 text-xs font-bold text-[#0D3B3A] dark:text-stone-200 border border-[#E5DFD2] dark:border-stone-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                <span>Buka di Google Maps Langsung ↗</span>
              </a>

              {/* Status Audit History Snippet */}
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-stone-850 p-3.5 border border-[#E5DFD2] dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D3B3A] dark:text-stone-200 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                    Riwayat Jejak Audit Budaya
                  </span>
                  {selectedPoint.statusHistory.length > 2 && (
                    <button
                      onClick={() => setShowTimelineModal(true)}
                      className="text-[10px] text-[#C85A32] dark:text-amber-400 hover:underline font-semibold"
                    >
                      Lihat Semua ({selectedPoint.statusHistory.length})
                    </button>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  {selectedPoint.statusHistory.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-[11px] border-l-2 border-[#C85A32] dark:border-amber-400 pl-2.5 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#0D3B3A] dark:text-stone-200">{item.changedBy}</span>
                        <span className="text-[10px] text-[#637675] dark:text-stone-400">{item.date}</span>
                      </div>
                      <p className="text-[#4A5E5D] dark:text-stone-300 text-[11px] leading-relaxed line-clamp-2">
                        {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Pindai AI & Laporkan Pembaruan */}
              <div className="space-y-2 pt-1">
                {onOpenScanner && (
                  <button
                    onClick={onOpenScanner}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1E7773] hover:bg-[#165A57] py-2.5 text-xs font-bold text-white transition-all shadow-xs"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Pindai & Bedah Budaya dengan AI</span>
                  </button>
                )}

                <button
                  id="btn-report-selected-point"
                  onClick={() => {
                    setTargetPointId(selectedPoint.id);
                    setReportedStatus(selectedPoint.currentStatus);
                    setEvaluationFeedback(null);
                    setShowReportForm(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FAF5EE] dark:bg-amber-950/30 hover:bg-[#F5ECE0] dark:hover:bg-amber-900/40 py-2.5 text-xs font-bold text-[#C85A32] dark:text-amber-400 border border-[#E8C4B5] dark:border-amber-800/60 transition-all shadow-2xs"
                >
                  <PlusCircle className="w-4 h-4 text-[#C85A32] dark:text-amber-400" />
                  <span>Kirim Observasi Lapangan Baru</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 p-6 text-center text-[#637675] dark:text-stone-400 text-xs">
              Pilih titik cagar budaya di peta untuk melihat status dan jejak perubahannya.
            </div>
          )}

          {/* Quick Critical List */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 p-4 space-y-2 shadow-2xs">
            <span className="text-[10px] font-bold text-[#B3261E] dark:text-red-400 uppercase tracking-wider block px-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B3261E] dark:text-red-400" />
              Prioritas Kritis Mendesak (Butuh Advokasi Segera)
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {points.filter(p => p.currentStatus === 'critical').map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => {
                    setSelectedPoint(pt);
                    mapInstanceRef.current?.flyTo([pt.latitude, pt.longitude], 12, { duration: 1.2 });
                  }}
                  className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition-colors ${
                    selectedPoint?.id === pt.id 
                      ? 'bg-red-50 dark:bg-red-950/50 text-[#B3261E] dark:text-red-300 border border-red-300 dark:border-red-800 font-bold' 
                      : 'bg-[#FAF8F5] dark:bg-stone-850 hover:bg-[#FAF5EE] dark:hover:bg-stone-800 text-[#2A3E3D] dark:text-stone-200 border border-[#E5DFD2] dark:border-stone-800'
                  }`}
                >
                  <span className="font-medium truncate mr-1">{pt.name}</span>
                  <span className="text-[9px] bg-red-100 dark:bg-red-900/60 text-[#B3261E] dark:text-red-300 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded font-bold shrink-0">
                    Kritis
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CROWDSOURCE REPORT MODAL */}
      {showReportForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 shadow-2xl p-6 space-y-4 text-[#132726] dark:text-stone-200 transition-colors">
            <div className="flex items-center justify-between border-b border-[#EFECE4] dark:border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#C85A32] dark:text-amber-400 uppercase tracking-wider">
                  Pelaporan Partisipatif Komunitas
                </span>
                <h3 className="font-serif text-base font-bold text-[#0D3B3A] dark:text-stone-100">
                  Laporkan Status Praktik Budaya Terkini
                </h3>
              </div>
              <button
                onClick={() => setShowReportForm(false)}
                className="text-[#637675] dark:text-stone-400 hover:text-[#0D3B3A] dark:hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#2A3E3D] dark:text-stone-300 block mb-1">
                  Pilih Objek / Cagar Budaya
                </label>
                <select
                  id="form-select-object"
                  value={targetPointId}
                  onChange={(e) => setTargetPointId(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF8F5] dark:bg-stone-800 border border-[#E5DFD2] dark:border-stone-700 p-2.5 text-xs text-[#0D3B3A] dark:text-stone-200 font-medium focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                >
                  {points.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.regency})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2A3E3D] dark:text-stone-300 block mb-1">
                  Status Pengamatan Lapangan Anda
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['active', 'at_risk', 'critical', 'lost'] as CulturalStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReportedStatus(st)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        reportedStatus === st 
                          ? getStatusBadge(st).bg + ' ring-2 ring-[#C85A32]/40' 
                          : 'bg-[#FAF8F5] dark:bg-stone-800 text-[#4A5E5D] dark:text-stone-300 border-[#E5DFD2] dark:border-stone-700'
                      }`}
                    >
                      {getStatusBadge(st).label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2A3E3D] dark:text-stone-300 block mb-1">
                  Catatan Observasi & Bukti Lapangan
                </label>
                <textarea
                  id="form-textarea-note"
                  rows={4}
                  required
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Contoh: Saat pengamatan lapangan di dusun, maestro hanya tersisa 1 orang berusia lanjut, anak-anak muda desa jarang berlatih instrumen ini..."
                  className="w-full rounded-xl bg-[#FAF8F5] dark:bg-stone-800 border border-[#E5DFD2] dark:border-stone-700 p-3 text-xs text-[#132726] dark:text-stone-200 placeholder:text-[#8C9C9B] dark:placeholder:text-stone-500 leading-relaxed focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                />
              </div>

              {/* AI Verifier Live Feedback */}
              {evaluationFeedback && (
                <div className={`rounded-2xl p-3.5 border text-xs space-y-1.5 ${
                  evaluationFeedback.classification === 'verified' 
                    ? 'bg-[#EAF6F5] dark:bg-emerald-950/40 border-[#278B86] dark:border-emerald-700 text-[#1E7773] dark:text-emerald-300' 
                    : evaluationFeedback.classification === 'contradicted'
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-[#B3261E] dark:text-red-300'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Verifikasi: {evaluationFeedback.classification.toUpperCase()}
                    </span>
                    <span>Tingkat Keyakinan: {evaluationFeedback.confidenceScore}%</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {evaluationFeedback.rationale}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE4] dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-[#637675] dark:text-stone-400 hover:text-[#0D3B3A] dark:hover:text-stone-200"
                >
                  {t('btnCancel')}
                </button>
                <button
                  id="btn-submit-report-form"
                  type="submit"
                  disabled={isEvaluatingReport || !reportNote.trim()}
                  className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-5 py-2.5 text-xs font-bold text-white shadow-xs disabled:opacity-50"
                >
                  {isEvaluatingReport ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>AI Memvalidasi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('btnSubmit')} Laporan Budaya</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL TIMELINE AUDIT HISTORY MODAL */}
      {showTimelineModal && selectedPoint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-3xl bg-white dark:bg-stone-900 border border-[#E5DFD2] dark:border-stone-800 shadow-2xl p-6 text-[#132726] dark:text-stone-200 transition-colors">
            <div className="flex items-center justify-between border-b border-[#EFECE4] dark:border-stone-800 pb-3 shrink-0">
              <div>
                <span className="text-[10px] font-bold text-[#C85A32] dark:text-amber-400 uppercase tracking-wider">
                  Rekam Jejak Konservasi
                </span>
                <h3 className="font-serif text-base font-bold text-[#0D3B3A] dark:text-stone-100">
                  Audit Lengkap: {selectedPoint.name}
                </h3>
                {selectedPoint.culturalBearer && (
                  <p className="text-xs text-[#637675] dark:text-stone-400 mt-0.5">
                    Komunitas: <span className="font-semibold text-[#0D3B3A] dark:text-stone-200">{selectedPoint.culturalBearer}</span>
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowTimelineModal(false)}
                className="text-[#637675] dark:text-stone-400 hover:text-[#0D3B3A] dark:hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
              {selectedPoint.statusHistory.map((item, index) => (
                <div key={item.id} className="relative pl-6 border-l-2 border-[#D5CEBD] dark:border-stone-700 pb-4 last:pb-0">
                  <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-[#C85A32] ring-4 ring-white dark:ring-stone-900" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0D3B3A] dark:text-stone-200">{item.changedBy}</span>
                    <span className="text-[10px] text-[#637675] dark:text-stone-400">{item.date}</span>
                  </div>
                  <span className={`inline-block mt-1 rounded-md px-2 py-0.5 text-[10px] font-bold border ${getStatusBadge(item.status).bg}`}>
                    {getStatusBadge(item.status).label}
                  </span>
                  <p className="text-xs text-[#4A5E5D] dark:text-stone-300 mt-1.5 leading-relaxed bg-[#FAF8F5] dark:bg-stone-850 p-2.5 rounded-xl border border-[#E5DFD2] dark:border-stone-800">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EFECE4] dark:border-stone-800 flex justify-end shrink-0">
              <button
                onClick={() => setShowTimelineModal(false)}
                className="rounded-xl bg-[#F4EFE6] dark:bg-stone-800 hover:bg-[#EAE4D7] dark:hover:bg-stone-750 px-4 py-2 text-xs font-bold text-[#0D3B3A] dark:text-stone-200"
              >
                {t('btnClose')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
