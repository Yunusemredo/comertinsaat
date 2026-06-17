"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Mock Data for Units for Sale
const UNITS = [
  {
    id: 1,
    title: "Almira Konakları - Lüks 4+1 Daire",
    type: "daire4",
    typeName: "4+1 Daire",
    price: "Fiyat Sorun",
    size: "185 m²",
    floor: "4. Kat",
    status: "Satılık",
    statusColor: "bg-green-50 text-green-700 border-green-300",
    image: "/apartment-interior.png",
    details: "Yerden ısıtmalı, geniş ebeveyn banyolu, giyinme odalı ve lüks ankastreli ultra konforlu yaşam alanı.",
  },
  {
    id: 2,
    title: "Almira Konakları - Modern 3+1 Daire",
    type: "daire3",
    typeName: "3+1 Daire",
    price: "Fiyat Sorun",
    size: "145 m²",
    floor: "2. Kat",
    status: "Ön Satışta",
    statusColor: "bg-amber-50 text-amber-700 border-amber-300",
    image: "/hero-render.png",
    details: "Güney cephe, akıllı ev altyapısı, çocuk oyun alanlarına bakan geniş balkon ve modern mutfak tasarımı.",
  },
  {
    id: 3,
    title: "Almira Konakları - Ticari Mağaza & Dükkan",
    type: "dukkan",
    typeName: "Ticari Alan",
    price: "Fiyat Sorun",
    size: "240 m²",
    floor: "Giriş Kat",
    status: "Satılık",
    statusColor: "bg-green-50 text-green-700 border-green-300",
    image: "/almira-exterior.png",
    details: "Cadde cepheli, yüksek tavanlı, Konya Fetih Caddesi yakınlarında yüksek tabela ve yatırım değerine sahip ticari dükkan.",
  },
  {
    id: 4,
    title: "Almira Konakları - Cadde Üstü Çift Katlı Dükkan",
    type: "dukkan",
    typeName: "Ticari Alan",
    price: "Fiyat Sorun",
    size: "410 m²",
    floor: "Giriş + Bodrum",
    status: "Satıldı",
    statusColor: "bg-red-50 text-red-600 border-red-300",
    image: "/almira-exterior.png",
    details: "Kurumsal market veya kafe kullanımına uygun, geniş ön kullanım alanına sahip prestijli köşe ticari alan.",
  },
  {
    id: 5,
    title: "Almira Konakları - Ferah 3+1 Daire",
    type: "daire3",
    typeName: "3+1 Daire",
    price: "Fiyat Sorun",
    size: "150 m²",
    floor: "3. Kat",
    status: "Satılık",
    statusColor: "bg-green-50 text-green-700 border-green-300",
    image: "/apartment-interior.png",
    details: "Birinci sınıf malzeme kalitesi, geniş koridorlar, ebeveyn banyosu ve çift balkonlu aile odaklı plan.",
  },
  {
    id: 6,
    title: "Almira Konakları - Dubleks Lüks 4+1",
    type: "daire4",
    typeName: "4+1 Daire",
    price: "Fiyat Sorun",
    size: "210 m²",
    floor: "En Üst Kat",
    status: "Satılık",
    statusColor: "bg-green-50 text-green-700 border-green-300",
    image: "/hero-render.png",
    details: "Konya manzaralı, geniş teraslı, kış bahçesi tasarımlı, ultra lüks ankastreli çatı dubleksi.",
  },
];

// Mock Data for Projects Gallery
const GALLERY_IMAGES = [
  { src: "/hero-render.png", title: "Almira Konakları - Gece Görünümü" },
  { src: "/almira-exterior.png", title: "Almira Konakları - Cadde Dükkanları" },
  { src: "/apartment-interior.png", title: "Almira Konakları - Örnek Daire İçi" },
  { src: "/construction-site.png", title: "Şantiye Çalışmaları ve Kalite Kontrol" },
];

// Interactive Building Hotspots
const BUILDING_HOTSPOTS = [
  {
    id: "top",
    name: "En Üst Kat & Çatı Dubleksleri (Lüks 4+1)",
    top: "15%",
    left: "50%",
    interiorImage: "/hero-render.png",
    specs: {
      title: "Almira Konakları - Çatı Dubleksi",
      size: "210 m²",
      type: "4+1 Daire",
      floor: "En Üst Kat (Teraslı)",
      status: "Satılık",
      description: "Panoramik Konya manzarasına hakim, devasa teraslı ve özel kış bahçeli yaşam alanları.",
    }
  },
  {
    id: "middle",
    name: "Ara Kat Daireler (Modern 3+1 & 4+1)",
    top: "45%",
    left: "60%",
    interiorImage: "/apartment-interior.png",
    specs: {
      title: "Almira Konakları - Standart Kat Daire",
      size: "185 m²",
      type: "4+1 & 3+1 Daireler",
      floor: "2. ila 5. Katlar",
      status: "Ön Satışta",
      description: "Akıllı ev altyapısı, ebeveyn banyosu, giyinme odası, çift balkon ve yerden ısıtma sistemli konfor.",
    }
  },
  {
    id: "bottom",
    name: "Giriş Kat Cadde Üstü Ticari Mağazalar",
    top: "75%",
    left: "40%",
    interiorImage: "/almira-exterior.png",
    specs: {
      title: "Almira Konakları - Ticari Dükkanlar",
      size: "240 m² - 410 m²",
      type: "Cadde Cephe Mağaza",
      floor: "Giriş Katlar",
      status: "Satılık & Kiralık",
      description: "Konya Fetih Caddesi yakınında, geniş vitrin cepheli ve yüksek yaya trafiğine sahip prestijli mağazalar.",
    }
  }
];

// Mock Reels for fallback
const STATIC_REELS = [
  {
    id: 2,
    title: "Temel Beton Dökümü ve Dayanıklılık Testleri",
    views: "18.1K",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "/construction-site.png",
    description: "Depreme dayanıklı radye temel uygulamalarımız ve yüksek dayanımlı C35 beton döküm sürecimizden anlar.",
  },
  {
    id: 3,
    title: "Örnek Daire Tasarım ve İç Mimari Detayları",
    views: "24.9K",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "/apartment-interior.png",
    description: "Estetik detaylar ve modern konforun buluştuğu örnek dairemizi gezin. Kalitemizi yakından hissedin.",
  },
];

export default function Home() {
  // States
  const [activeTab, setActiveTab] = useState("all");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [activeReelVideo, setActiveReelVideo] = useState<string | null>(null);
  const [activeReelTitle, setActiveReelTitle] = useState<string>("");
  
  // Interactive Explorer Hotspot state
  const [selectedHotspot, setSelectedHotspot] = useState(BUILDING_HOTSPOTS[1]); // Default to middle floor
  const [hotspotTransitioning, setHotspotTransitioning] = useState(false);

  // Hakkımızda Tabs
  const [aboutTab, setAboutTab] = useState("kimiz");

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", phone: "", project: "Almira Konakları", msg: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Banner video ended state
  const [videoEnded, setVideoEnded] = useState(false);

  // Stats Counters
  const [stats, setStats] = useState({ years: 0, units: 0, stores: 0, rate: 0 });

  // Live Instagram API Reel state
  const [liveReel, setLiveReel] = useState<{
    title: string;
    views: string;
    videoUrl: string;
    poster: string;
    description: string;
    isLive: boolean;
  } | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(true);
  const [isApiLive, setIsApiLive] = useState(false);

  // Fetch Live Instagram API data
  useEffect(() => {
    // 1. Check if token exists in environment variables
    const instagramToken = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

    if (instagramToken) {
      // Real API request to Instagram Graph API
      fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${instagramToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data && data.data.length > 0) {
            // Find first video/reel post
            const videoPost = data.data.find(
              (item: any) => item.media_type === "VIDEO" || item.media_type === "CAROUSEL_ALBUM"
            ) || data.data[0];

            setLiveReel({
              title: "Instagram'dan Canlı Akış",
              views: "Canlı",
              videoUrl: videoPost.media_url,
              poster: videoPost.thumbnail_url || "/construction-site.png",
              description: videoPost.caption || "ATM Cömert İnşaat güncel şantiye videosu.",
              isLive: true,
            });
            setIsApiLive(true);
          } else {
            // Fallback to simulator if no media found
            triggerSimulator();
          }
        })
        .catch(() => {
          // Fallback to simulator on fetch error
          triggerSimulator();
        })
        .finally(() => {
          setIsApiLoading(false);
        });
    } else {
      // 2. Simulator mode (for presentation): Simulate fetching with a delay
      const timer = setTimeout(() => {
        triggerSimulator();
        setIsApiLoading(false);
      }, 1500); // 1.5s realistic loading time

      return () => clearTimeout(timer);
    }

    function triggerSimulator() {
      setLiveReel({
        title: "Almira Konakları Şantiye Günlüğü",
        views: "15.7K",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: "/construction-site.png",
        description: "Almira Konakları kaba inşaat ve beton döküm süreçleri. instagram.com/p/DWjDgGTjUts/ adresindeki gönderimizden detayları inceleyin.",
        isLive: true,
      });
      setIsApiLive(false); // Indicates it's in demo simulation mode
    }
  }, []);
  
  // Counters mount effect
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        years: Math.min(Math.floor((10 / steps) * currentStep), 10),
        units: Math.min(Math.floor((120 / steps) * currentStep), 120),
        stores: Math.min(Math.floor((20 / steps) * currentStep), 20),
        rate: Math.min(Math.floor((100 / steps) * currentStep), 100),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleHotspotClick = (hotspot: typeof BUILDING_HOTSPOTS[0]) => {
    if (hotspot.id === selectedHotspot.id) return;
    setHotspotTransitioning(true);
    setTimeout(() => {
      setSelectedHotspot(hotspot);
      setHotspotTransitioning(false);
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", project: "Almira Konakları", msg: "" });
    }, 4000);
  };

  const filteredUnits = activeTab === "all" ? UNITS : UNITS.filter(u => u.type === activeTab);

  return (
    <div className="relative min-h-screen text-navy-950 overflow-hidden font-sans selection:bg-gold-400 selection:text-navy-950">

      {/* ── CONSTRUCTION BACKGROUND ANIMATION ── */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#d4af37" stroke="#d4af37" opacity="0.12">

            {/* Tower crane — mast top pivot at viewport (130, 155) */}
            <g transform="translate(130, 155)">
              {/* Mast */}
              <rect x="-6" y="0" width="12" height="745" />
              {/* Cross-bracing */}
              <line x1="-6" y1="0"   x2="6"  y2="60"  strokeWidth="1.5" />
              <line x1="6"  y1="0"   x2="-6" y2="60"  strokeWidth="1.5" />
              <line x1="-6" y1="60"  x2="6"  y2="120" strokeWidth="1.5" />
              <line x1="6"  y1="60"  x2="-6" y2="120" strokeWidth="1.5" />
              <line x1="-6" y1="120" x2="6"  y2="180" strokeWidth="1.5" />
              <line x1="6"  y1="120" x2="-6" y2="180" strokeWidth="1.5" />
              <line x1="-6" y1="180" x2="6"  y2="240" strokeWidth="1.5" />
              <line x1="6"  y1="180" x2="-6" y2="240" strokeWidth="1.5" />
              <line x1="-6" y1="240" x2="6"  y2="300" strokeWidth="1.5" />
              <line x1="6"  y1="240" x2="-6" y2="300" strokeWidth="1.5" />

              {/* Rotating jib — pivot at local (0,0) = mast top */}
              <g>
                {/* A-frame above jib */}
                <rect x="-3" y="-65" width="6" height="65" />
                {/* Main jib arm (right) */}
                <rect x="0" y="-5" width="245" height="8" />
                {/* Counter-jib (left) */}
                <rect x="-150" y="-5" width="150" height="8" />
                {/* Counter-weight */}
                <rect x="-168" y="3" width="28" height="22" />
                {/* Cable stays from A-frame to jib ends */}
                <line x1="0" y1="-65" x2="235" y2="-1" strokeWidth="1.5" />
                <line x1="0" y1="-65" x2="-140" y2="-1" strokeWidth="1.5" />
                {/* Hoist rope and hook — bobs up and down */}
                <g>
                  <line x1="178" y1="3" x2="178" y2="162" strokeWidth="1.5" />
                  <rect x="167" y="160" width="22" height="4" />
                  <rect x="167" y="164" width="4"  height="14" />
                  <rect x="185" y="164" width="4"  height="14" />
                  <rect x="167" y="178" width="22" height="4" />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 0,58; 0,0"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </g>
                {/* Jib slow rotation ±13° around mast top */}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-13 0 0; 13 0 0; -13 0 0"
                  dur="13s"
                  repeatCount="indefinite"
                />
              </g>
            </g>

            {/* Building under construction — right side */}
            <g transform="translate(1078, 0)">
              {/* 3 vertical columns */}
              <rect x="0"   y="330" width="9" height="570" />
              <rect x="114" y="330" width="9" height="570" />
              <rect x="228" y="330" width="9" height="570" />

              {/* Floor slabs — appear bottom to top with staggered delay */}
              {([
                [858, 0.6],
                [788, 1.3],
                [718, 2.0],
                [648, 2.7],
                [578, 3.4],
                [508, 4.1],
                [438, 4.8],
                [368, 5.5],
              ] as [number, number][]).map(([y, delay], i) => (
                <rect key={i} x="0" y={y} width="237" height="9" opacity="0">
                  <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    dur="0.6s"
                    begin={`${delay}s`}
                    fill="freeze"
                  />
                </rect>
              ))}

              {/* Right-side scaffolding */}
              <rect x="246" y="330" width="6" height="570" />
              <rect x="261" y="330" width="6" height="570" />
              <line x1="246" y1="438" x2="267" y2="438" strokeWidth="2" />
              <line x1="246" y1="508" x2="267" y2="508" strokeWidth="2" />
              <line x1="246" y1="578" x2="267" y2="578" strokeWidth="2" />
              <line x1="246" y1="648" x2="267" y2="648" strokeWidth="2" />
              <line x1="246" y1="718" x2="267" y2="718" strokeWidth="2" />
              <line x1="246" y1="788" x2="267" y2="788" strokeWidth="2" />
            </g>

          </g>
        </svg>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/905070559265?text=Merhaba,%20web%20sitenizden%20ulaşıyorum.%20Almira%20Konakları%20projesi%20hakkında%20bilgi%20alabilir%20miyim?"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group flex items-center gap-3"
        aria-label="WhatsApp ile iletişime geçin"
      >
        {/* Hover'da açılan etiket */}
        <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-white text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap pointer-events-none">
          Hemen Yazın
        </span>

        {/* Buton */}
        <div className="w-14 h-14 rounded-l-2xl bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 shadow-lg hover:shadow-[#25D366]/40 hover:shadow-xl flex items-center justify-center group-hover:w-16 group-hover:h-16">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </a>

      {/* 1. HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">
        <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 lg:px-6 py-3 flex items-center justify-between transition-all duration-300 hover:border-gold-400/35 gap-4">

          {/* Logo Container */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-base md:text-xl xl:text-2xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 whitespace-nowrap">
              ATM CÖMERT İNŞAAT
            </span>
          </div>

          {/* Nav Links - Desktop only */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium tracking-wide shrink">
            <a href="#hero" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">Ana Sayfa</a>
            <a href="#almira" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">Almira Konakları</a>
            <a href="#interaktif-kesif" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">İnteraktif Keşif</a>
            <a href="#satilik" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">Satılık İlanlar</a>
            <a href="#reels" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">Şantiye Günlüğü</a>
            <a href="#hakkimizda" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">Hakkımızda</a>
            <a href="#iletisim" className="text-gray-600 hover:text-gold-500 transition-colors whitespace-nowrap">İletişim</a>
          </div>

          {/* Right side: CTA Button + Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/905070559265?text=Merhaba,%20web%20sitenizden%20ulaşıyorum.%20Almira%20Konakları%20projesi%20hakkında%20bilgi%20alabilir%20miyim?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-4 py-2 text-xs md:text-sm font-bold tracking-wide rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 hover:from-gold-400 hover:to-gold-300 transition-all duration-300 shadow-md hover:shadow-gold-400/20 hover:scale-[1.03] flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.08-2.87-6.934C16.356 2.016 13.9 1 11.997 1 6.59 1 2.187 5.4 2.185 10.805c-.001 1.562.415 3.09 1.202 4.47l-.992 3.613 3.704-.972.493.282z"/>
              </svg>
              <span className="hidden sm:inline">Destek Hattı</span>
            </a>

            {/* Hamburger - Mobile only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl border border-gray-200 hover:border-gold-400/50 hover:bg-gold-400/5 transition-all gap-[5px]"
              aria-label="Menüyü aç/kapat"
            >
              <span className={`block w-5 h-[2px] bg-gray-600 transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-[2px] bg-gray-600 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[2px] bg-gray-600 transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden max-w-7xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
          <div className="glass-panel rounded-2xl px-6 py-2 flex flex-col">
            {[
              { href: "#hero", label: "Ana Sayfa" },
              { href: "#almira", label: "Almira Konakları" },
              { href: "#interaktif-kesif", label: "İnteraktif Keşif" },
              { href: "#satilik", label: "Satılık İlanlar" },
              { href: "#reels", label: "Şantiye Günlüğü" },
              { href: "#hakkimizda", label: "Hakkımızda" },
              { href: "#iletisim", label: "İletişim" },
            ].map((item, i, arr) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-sm font-medium text-gray-700 hover:text-gold-500 transition-colors ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative h-screen w-full overflow-hidden flex items-start justify-center">

        {/* Banner Video - Fullscreen */}
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
          onError={() => setVideoEnded(true)}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/bannervideo.mp4" type="video/mp4" />
        </video>

        {/* Siyah gradient overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.80) 100%)"
          }}
        />

        {/* Hero Content — video bitince aşağıdan yukarı kayar, üstte durur */}
        <div
          className={`relative z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6 pt-36 md:pt-44 ${
            videoEnded ? "hero-content-reveal" : ""
          }`}
          style={!videoEnded ? { opacity: 0 } : {}}
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-300 bg-white/10 border border-white/25">
            Konya Karatay'da Prestijli Yaşam
          </span>

          <h1 className="text-4xl md:text-7xl font-serif font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            Geleceğiniz Bizimle <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300">
              Güvenle Yükseliyor
            </span>
          </h1>

          <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed font-sans font-light">
            Lüks mimari, üstün inşaat kalitesi ve yaşam alanlarınıza prestij katacak modern projeler.
            ATM Cömert İnşaat güvencesiyle <strong className="text-white">Almira Konakları</strong>'nda yerinizi alın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="#almira"
              className="px-8 h-14 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-300 text-navy-950 font-bold tracking-wide hover:shadow-lg hover:shadow-gold-400/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center transition-all duration-300"
            >
              Aktif Projeyi İncele
            </a>
            <a
              href="#satilik"
              className="px-8 h-14 rounded-xl border border-white/40 hover:border-white hover:bg-white/10 text-white font-medium tracking-wide flex items-center justify-center transition-all duration-300"
            >
              Satılık Portföyü
            </a>
          </div>
        </div>

        {/* Arrow Down — video bitince kayarak gelir */}
        {videoEnded && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hero-arrow-reveal">
            <a href="#stats" className="text-white/60 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* 3. STATS PANEL */}
      <section id="stats" className="relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            <div className="glass-panel rounded-2xl p-6 md:p-8 text-center flex flex-col gap-2 hover:border-gold-400/25 transition-all">
              <span className="text-4xl md:text-5xl font-serif font-extrabold text-gold-400">
                {stats.years}+
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 uppercase">
                Yıllık Tecrübe
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-6 md:p-8 text-center flex flex-col gap-2 hover:border-gold-400/25 transition-all">
              <span className="text-4xl md:text-5xl font-serif font-extrabold text-gold-400">
                {stats.units}+
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 uppercase">
                Teslim Edilen Konut
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-6 md:p-8 text-center flex flex-col gap-2 hover:border-gold-400/25 transition-all">
              <span className="text-4xl md:text-5xl font-serif font-extrabold text-gold-400">
                {stats.stores}+
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 uppercase">
                Ticari Mağaza & Dükkan
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-6 md:p-8 text-center flex flex-col gap-2 hover:border-gold-400/25 transition-all">
              <span className="text-4xl md:text-5xl font-serif font-extrabold text-gold-400">
                %{stats.rate}
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 uppercase">
                Müşteri Memnuniyeti
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROJECTS SHOWCASE - ALMIRA KONAKLARI */}
      <section id="almira" className="relative py-24 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Description Area */}
            <div className="flex-1 flex flex-col gap-6 items-start">
              <div className="flex items-center gap-2 text-gold-400 font-semibold tracking-wider text-sm uppercase">
                <span className="w-8 h-[1px] bg-gold-400" /> Öne Çıkan Aktif Projemiz
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950 leading-tight">
                Almira Konakları
              </h2>
              <p className="text-gray-600 leading-relaxed font-light font-sans text-base md:text-lg">
                Konya Karatay’ın kalbinde yükselen <strong>Almira Konakları</strong>, hem modern aile yaşantısına uygun konforlu daireleri hem de ticarete yeni bir yön verecek 20 bağımsız dükkanı bir araya getiriyor. 
                Estetik dış cephe tasarımı, yüksek ısı/ses yalıtım standartları ve peyzaj alanları ile lüksü yeniden tanımlıyoruz.
              </p>
              
              {/* Features bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Depreme Dayanıklı Radye Temel</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>20 Adet Cadde Üstü Mağaza</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lüks 3+1 ve 4+1 Daire Seçenekleri</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Geniş Otopark ve Yeşil Alanlar</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#iletisim"
                  className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                >
                  Proje Satış Ofisiyle Görüş
                </a>
                <span className="text-sm text-gray-500 font-medium font-sans">
                  Şantiye Başlangıç: 10.01.2025
                </span>
              </div>
            </div>

            {/* Right Project Gallery Grid */}
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {GALLERY_IMAGES.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setGalleryIndex(index)}
                  className="group relative h-48 md:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-gold-400/10 border border-gray-200 transition-all duration-500"
                >
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                    <span className="text-xs md:text-sm font-serif font-medium text-gold-300 flex items-center gap-1">
                      Büyüt <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4.5. INTERACTIVE 3D BUILDING EXPLORER */}
      <section id="interaktif-kesif" className="relative py-24 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">İnteraktif Proje Modülü</span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950">
              3D Bina Keşfi
            </h2>
            <div className="w-16 h-[2px] bg-gold-400 mt-2" />
            <p className="max-w-xl text-gray-500 text-sm md:text-base font-light">
              Almira Konakları dış cephesindeki **altın renkli dairelere** tıklayarak dairelerin iç mimarisini (3D render) görüntüleyebilir ve detaylı teknik özelliklerine ulaşabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Column: 3D Facade Image with Hotspots */}
            <div className="flex-1 w-full relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/60">
              <Image 
                src="/almira-exterior.png" 
                alt="Almira Bina Facade" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#02040a]/10" />

              {/* Glowing Interactive Hotspots */}
              {BUILDING_HOTSPOTS.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot)}
                  style={{ top: hotspot.top, left: hotspot.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    selectedHotspot.id === hotspot.id
                      ? "bg-gold-400 text-navy-950 scale-110 shadow-lg shadow-gold-400/40"
                      : "bg-white/90 text-gold-600 hover:bg-gold-400 hover:text-navy-950 border border-gold-400/50 shadow"
                  }`}
                  title={hotspot.name}
                >
                  {selectedHotspot.id !== hotspot.id && (
                    <span className="absolute inset-0 rounded-full border border-gold-400 animate-ping opacity-75" />
                  )}
                  
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>

                  <span className="absolute bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-white border border-gold-400/40 text-gold-600 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-30 pointer-events-none shadow-md">
                    {hotspot.name}
                  </span>
                </button>
              ))}

              <div className="absolute top-4 left-4 px-4 py-2 rounded-xl glass-panel text-xs text-gray-600 font-sans flex items-center gap-2 border border-gold-400/15">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                Bina üzerindeki katlara tıklayarak keşfedin
              </div>
            </div>

            {/* Right Column: Interior transition preview container */}
            <div className="flex-1 w-full flex flex-col gap-6">
              
              <div className={`glass-panel rounded-3xl p-8 border border-gold-400/20 flex flex-col gap-6 transition-all duration-300 min-h-[480px] justify-between ${
                hotspotTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400/15 border border-gold-400/30 text-gold-600 uppercase tracking-wider">
                      {selectedHotspot.specs.type}
                    </span>
                    <span className="text-xs text-gray-400 font-sans">{selectedHotspot.specs.floor}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy-950 mt-1">
                    {selectedHotspot.specs.title}
                  </h3>
                </div>

                <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group shadow-md">
                  <Image 
                    src={selectedHotspot.interiorImage} 
                    alt="İç Mekan 3D Render" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md text-xs font-medium bg-white/85 text-gold-600 border border-gold-400/25 backdrop-blur-sm">
                    Seçili Daire İç Mekan Render Görünümü
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {selectedHotspot.specs.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 py-3 border-y border-gray-200 text-xs font-sans text-gray-600">
                    <div className="flex flex-col gap-1 text-center">
                      <span className="text-gray-500">Net/Brüt Alan</span>
                      <strong className="text-navy-950 text-sm">{selectedHotspot.specs.size}</strong>
                    </div>
                    <div className="flex flex-col gap-1 text-center border-x border-gray-200">
                      <span className="text-gray-500">Durum</span>
                      <strong className="text-gold-400 text-sm">{selectedHotspot.specs.status}</strong>
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                      <span className="text-gray-500">Kat Bilgisi</span>
                      <strong className="text-navy-950 text-sm">{selectedHotspot.specs.floor.split(" ")[0]}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <span className="text-sm text-gray-500">Sunum Kodu: <strong className="text-navy-950">#ALM-{selectedHotspot.id.toUpperCase()}</strong></span>
                  <a
                    href={`https://wa.me/905070559265?text=Merhaba,%20web%20sitenizdeki%20interaktif%20bina%20keşfinden%20ulaşıyorum.%20${encodeURIComponent(selectedHotspot.specs.title)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold tracking-wide transition-all shadow-md shadow-gold-400/10 hover:scale-[1.02]"
                  >
                    Detaylı Bilgi Al (WhatsApp)
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. UNITS FOR SALE SECTION */}
      <section id="satilik" className="relative py-24 border-t border-gray-200 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">Satışta Olan Üniteler</span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950">
              Satılık Daireler ve Dükkanlar
            </h2>
            <div className="w-16 h-[2px] bg-gold-400 mt-2" />
            <p className="max-w-xl text-gray-500 text-sm md:text-base font-light">
              Almira Konakları bünyesindeki satılık ticari dükkanlar ve farklı katlardaki lüks 3+1 / 4+1 dairelerimizi filtreleyerek inceleyebilirsiniz.
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === "all"
                  ? "bg-gold-400 border-gold-400 text-navy-950 shadow-md shadow-gold-400/10"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gold-400/50 hover:text-navy-950"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setActiveTab("daire3")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === "daire3"
                  ? "bg-gold-400 border-gold-400 text-navy-950 shadow-md shadow-gold-400/10"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gold-400/50 hover:text-navy-950"
              }`}
            >
              3+1 Daireler
            </button>
            <button
              onClick={() => setActiveTab("daire4")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === "daire4"
                  ? "bg-gold-400 border-gold-400 text-navy-950 shadow-md shadow-gold-400/10"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gold-400/50 hover:text-navy-950"
              }`}
            >
              4+1 Daireler
            </button>
            <button
              onClick={() => setActiveTab("dukkan")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === "dukkan"
                  ? "bg-gold-400 border-gold-400 text-navy-950 shadow-md shadow-gold-400/10"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gold-400/50 hover:text-navy-950"
              }`}
            >
              Ticari Dükkanlar
            </button>
          </div>

          {/* Grid of Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnits.map((unit) => (
              <div 
                key={unit.id}
                className="group glass-panel rounded-3xl overflow-hidden glass-panel-hover flex flex-col h-full border border-gray-200"
              >
                {/* Image & Status Tag */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${unit.statusColor}`}>
                    {unit.status}
                  </span>
                  <span className="absolute bottom-4 right-4 px-3 py-1 rounded-md text-xs font-medium bg-white/85 text-gold-600 backdrop-blur-md">
                    {unit.typeName}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif font-bold text-navy-950 group-hover:text-gold-500 transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {unit.details}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-200 text-xs text-gray-600 font-sans">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      <span>Brüt Alan: <strong>{unit.size}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span>Kat Konumu: <strong>{unit.floor}</strong></span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex items-center justify-between mt-2 pt-2">
                    <span className="text-lg font-serif font-semibold text-gold-400">
                      {unit.price}
                    </span>
                    <a
                      href={`https://wa.me/905070559265?text=Merhaba,%20web%20sitenizden%20bilgi%20alıyorum.%20${encodeURIComponent(unit.title)}%20hakkında%20detaylı%20bilgi%20almak%20istiyorum.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/10 text-gold-600 hover:text-navy-950 transition-all"
                    >
                      Bilgi Al (WhatsApp)
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. INSTAGRAM VIDEO / REELS SLIDER */}
      <section id="reels" className="relative py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-4">
              <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">Yaşayan Şantiye Günlüğü</span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950">
                Instagram Video Galerisi
              </h2>
              <div className="w-16 h-[2px] bg-gold-400" />
            </div>
            <p className="max-w-md text-gray-500 text-sm font-light leading-relaxed">
              İnşaat süreçlerimizi ve Almira Konakları’nın adım adım yükselişini sosyal medyada olduğu gibi web sitemizde de dikey video formatında takip edin.
            </p>
          </div>

          {/* Reels Flex Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: LIVE INSTAGRAM API FEED OR LOADING SKELETON */}
            {isApiLoading ? (
              <div className="relative rounded-3xl border border-gray-200 bg-gray-50 flex flex-col h-[520px] justify-between p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-800/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                <style jsx>{`
                  @keyframes shimmer {
                    100% { transform: translateX(100%); }
                  }
                `}</style>
                <div className="flex justify-between items-center">
                  <div className="w-24 h-6 bg-gray-200 rounded-full" />
                  <div className="w-16 h-6 bg-gray-200 rounded-full" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full self-center" />
                <div className="flex flex-col gap-3">
                  <div className="w-3/4 h-5 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                  <div className="w-5/6 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ) : liveReel ? (
              <div 
                className="group relative rounded-3xl overflow-hidden shadow-2xl border border-gold-400/30 bg-navy-950 flex flex-col h-[520px] cursor-pointer hover:border-gold-400 transition-all duration-300"
                onClick={() => {
                  setActiveReelVideo(liveReel.videoUrl);
                  setActiveReelTitle(liveReel.title);
                }}
              >
                {/* Vertical Video Overlay / Poster */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image 
                    src={liveReel.poster} 
                    alt={liveReel.title} 
                    fill 
                    className="object-cover brightness-[0.35] group-hover:brightness-[0.25] transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/20 z-10" />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/50 group-hover:border-gold-400 group-hover:bg-gold-400/90 group-hover:text-navy-950 text-gold-300 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-gold-400/5">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Meta details (top) */}
                <div className="relative z-20 p-6 flex justify-between items-center text-xs text-gray-300 font-sans">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 backdrop-blur-md font-bold text-gold-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> INSTAGRAM API
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md font-medium text-xs text-white">
                    {liveReel.views} İzlenme
                  </span>
                </div>

                {/* Caption / Details (bottom) */}
                <div className="relative z-20 mt-auto p-6 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                      {liveReel.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-2">
                      {liveReel.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal play trigger
                        window.open("https://www.instagram.com/p/DWjDgGTjUts/", "_blank");
                      }}
                      className="px-3 py-1.5 rounded-lg border border-gold-400/30 hover:border-gold-400 text-gold-300 hover:text-white text-xs font-semibold tracking-wide transition-all"
                    >
                      Instagram'da Aç
                    </button>
                    <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Oynat <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Static Reels (Reel 2 & 3) */}
            {STATIC_REELS.map((reel) => (
              <div 
                key={reel.id}
                className="group relative rounded-3xl overflow-hidden shadow-2xl border border-navy-800/80 bg-navy-950 flex flex-col h-[520px] cursor-pointer"
                onClick={() => {
                  setActiveReelVideo(reel.videoUrl);
                  setActiveReelTitle(reel.title);
                }}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image 
                    src={reel.poster} 
                    alt={reel.title} 
                    fill 
                    className="object-cover brightness-[0.4] group-hover:brightness-[0.3] transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/20 z-10" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/45 group-hover:border-gold-400 group-hover:bg-gold-400/90 group-hover:text-navy-950 text-gold-300 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-gold-400/5">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <div className="relative z-20 p-6 flex justify-between items-center text-xs text-gray-300 font-sans">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md font-semibold text-gold-300">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Şantiyeden
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md font-medium text-white">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    {reel.views}
                  </span>
                </div>

                <div className="relative z-20 mt-auto p-6 flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-2">
                    {reel.description}
                  </p>
                  <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase mt-2 group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                    Videoyu Oynat <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://www.instagram.com/atm.comertinsaat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold-400/40 hover:border-gold-400 hover:bg-gold-400/10 text-gold-600 hover:text-navy-950 font-semibold tracking-wide transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Tüm Instagram Gönderilerini Gör
            </a>
          </div>

        </div>
      </section>

      {/* 7. HAKKIMIZDA SECTION */}
      <section id="hakkimizda" className="relative py-24 border-t border-gray-200 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1 w-full relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <Image 
                src="/construction-site.png" 
                alt="Güvenle İnşa Ediyoruz" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-[#02040a]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel text-left flex flex-col gap-1 border border-gold-400/20">
                <span className="text-xl font-serif font-bold text-gold-400">ATM Cömert İnşaat</span>
                <span className="text-xs text-gray-600 font-sans font-light">Konya genelinde deprem güvenlikli ve modern mimariye sahip yapılar inşa ediyoruz.</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 items-start w-full">
              <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">Kurumsal Değerlerimiz</span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950 leading-tight">
                Geleceğinizi Güvenli <br />
                Yapılarla Kuruyoruz
              </h2>
              <div className="w-16 h-[2px] bg-gold-400" />
              
              <div className="flex border-b border-gray-200 w-full gap-6 text-sm font-sans mt-2">
                <button
                  onClick={() => setAboutTab("kimiz")}
                  className={`pb-3 font-semibold transition-all relative ${
                    aboutTab === "kimiz" ? "text-gold-400" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Biz Kimiz?
                  {aboutTab === "kimiz" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />}
                </button>
                <button
                  onClick={() => setAboutTab("vizyon")}
                  className={`pb-3 font-semibold transition-all relative ${
                    aboutTab === "vizyon" ? "text-gold-400" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Vizyon & Misyon
                  {aboutTab === "vizyon" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />}
                </button>
                <button
                  onClick={() => setAboutTab("kalite")}
                  className={`pb-3 font-semibold transition-all relative ${
                    aboutTab === "kalite" ? "text-gold-400" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Kalite Standartları
                  {aboutTab === "kalite" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />}
                </button>
              </div>

              <div className="min-h-[160px] font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light mt-2">
                {aboutTab === "kimiz" && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <p>
                      Yılların sektörel deneyimi ile Konya merkezli faaliyet gösteren <strong>ATM Cömert İnşaat</strong>, modern mimari çizgileri yüksek mühendislik kalitesiyle buluşturarak Konya Karatay bölgesinde nitelikli projelere imza atmaktadır.
                    </p>
                    <p>
                      Şeffaf yönetim ilkelerimiz ve “yaşayan şantiyelerimiz” sayesinde inşaat sürecinin her anını yatırımcılarımızla paylaşarak sarsılmaz bir güven ilişkisi tesis ediyoruz.
                    </p>
                  </div>
                )}
                {aboutTab === "vizyon" && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <p>
                      <strong>Vizyonumuz:</strong> Estetik değeri yüksek, deprem yönetmeliklerine %100 uyumlu, sürdürülebilir ve yatırımcısına kazandıran birinci sınıf modern yapılar üreterek Konya inşaat sektörünün öncü markası olmak.
                    </p>
                    <p>
                      <strong>Misyonumuz:</strong> Yuva kuran ailelerin huzurunu ve ticaret yapan ortaklarımızın başarısını güvence altına alacak sağlam, konforlu ve zamanında teslim edilen projeler üretmek.
                    </p>
                  </div>
                )}
                {aboutTab === "kalite" && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <p>
                      Ürettiğimiz her blokta en yüksek beton dayanım sınıfları (C30/C35) ve onaylı deprem izolatörlü radye temel teknikleri kullanılmaktadır. 
                    </p>
                    <p>
                      Yerden ısıtma altyapılarımız, birinci sınıf ısı ve ses yalıtım kaplamalarımız ve dayanıklılığı test edilmiş ankastre donanımlarımızla, kaliteden hiçbir aşamada taviz vermiyoruz.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center mt-4 w-full pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-2xl font-serif font-bold text-gold-400">100%</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Planlı ve Şeffaf Süreç</span>
                </div>
                <div className="w-px h-10 bg-gray-200 mx-6 shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-2xl font-serif font-bold text-gold-400">C35</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Beton Sınıfı Güvencesi</span>
                </div>
                <div className="w-px h-10 bg-gray-200 mx-6 shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-2xl font-serif font-bold text-gold-400">Tam</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Zamanında Teslimat</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="iletisim" className="relative py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="flex-1 flex flex-col gap-8 justify-between">
              <div className="flex flex-col gap-4">
                <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">İletişime Geçin</span>
                <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-navy-950">
                  Hayalinizdeki Yatırım <br />İçin Bizi Arayın
                </h2>
                <div className="w-16 h-[2px] bg-gold-400 mt-2" />
                <p className="text-gray-600 font-light font-sans text-sm md:text-base mt-2 max-w-md">
                  Almira Konakları’ndaki satılık konutlar ve cadde üstü dükkanlarımız hakkında daha fazla bilgi almak veya şantiye ofisimizi ziyaret etmek için bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="flex flex-col gap-6 text-sm font-sans mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">İletişim Numaraları</span>
                    <a href="tel:+905070559265" className="text-gray-700 font-bold hover:text-gold-500 transition-colors">+90 507 055 92 65</a>
                    <a href="tel:+905368760508" className="text-gray-600 hover:text-gold-500 transition-colors">+90 536 876 05 08</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Ofis & Proje Adresi</span>
                    <span className="text-gray-700 font-medium leading-relaxed">
                      Gazi Osman Paşa Mah., Fetih Cad., No:291/B, Karatay, Konya
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-44 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 relative shadow-lg">
                <iframe
                  className="w-full h-full border-0 opacity-80"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.919747209355!2d32.52985107663242!3d37.88555547195741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08f36c5357fa1%3A0xe5a36371cb14b035!2zRmV0aGggQ2QuIE5vOjI5MSwgR2F6aSBPc21hbiBQYcWfYSwgNDIwMzAgS2FyYXRheS9Lb255YQ!5e0!3m2!1str!2str!4v1718536838382!5m2!1str!2str"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="glass-panel rounded-3xl p-8 md:p-10 border border-gold-400/20 hover:border-gold-400/30 transition-all shadow-xl shadow-gold-400/2">
                <h3 className="text-2xl font-serif font-bold text-navy-950 mb-6">Detaylı Bilgi Talep Formu</h3>
                
                {formSubmitted ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400 text-gold-400 flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-serif font-bold text-gold-600">Talebiniz Alındı</h4>
                    <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                      Uzman temsilcilerimiz en kısa sürede tarafınızla iletişime geçecektir. Teşekkür ederiz.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 text-sm font-sans">
                    
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Adınız Soyadınız</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="Örn: Ahmet Cömert"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-navy-950 placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-all font-light"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-phone" className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Telefon Numaranız</label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="Örn: 0507 000 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-navy-950 placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-all font-light"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-project" className="text-gray-500 text-xs font-semibold uppercase tracking-wider">İlgilendiğiniz Proje / Alan</label>
                      <select
                        id="form-project"
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-gray-700 focus:outline-none focus:border-gold-400 transition-all font-light appearance-none"
                      >
                        <option value="Almira Konakları">Almira Konakları - Konut Daireleri</option>
                        <option value="Almira Ticari">Almira Konakları - Ticari Dükkanlar</option>
                        <option value="Genel Bilgi">Diğer / Genel Yatırım Bilgisi</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-msg" className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Talebiniz / Mesajınız (İsteğe Bağlı)</label>
                      <textarea
                        id="form-msg"
                        rows={3}
                        placeholder="Proje hakkında belirtmek istediğiniz detaylar..."
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-navy-950 placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-all font-light resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-300 text-navy-950 font-bold tracking-wide shadow-md hover:shadow-gold-400/15 hover:scale-[1.01] active:scale-95 transition-all duration-300 mt-2"
                    >
                      Bilgi Talebi Gönder
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PREMIUM FOOTER */}
      <footer className="relative py-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-sans">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-serif font-bold text-gold-400 tracking-wider">ATM CÖMERT İNŞAAT</span>
            <span className="text-xs text-gray-400 font-light">© {new Date().getFullYear()} ATM Cömert İnşaat. Tüm Hakları Saklıdır.</span>
          </div>

          <div className="flex items-center gap-6 text-gray-500 font-medium text-xs">
            <a href="#hero" className="hover:text-gold-500 transition-colors">Ana Sayfa</a>
            <a href="#almira" className="hover:text-gold-500 transition-colors">Almira Konakları</a>
            <a href="#satilik" className="hover:text-gold-500 transition-colors">Satılık Portföyü</a>
            <a href="#iletisim" className="hover:text-gold-500 transition-colors">İletişim</a>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-light text-center md:text-right">
            Tasarım & Geliştirme:
            <a href="https://01kod.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/logo-black.png"
                alt="01KOD"
                width={72}
                height={24}
                className="object-contain hover:opacity-60 transition-opacity"
                style={{ filter: "brightness(0)" }}
              />
            </a>
          </div>

        </div>
      </footer>

      {/* 10. MODAL: ALMIRA GALLERY MODAL */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-[fade-in_0.3s_ease-out_forwards]">
          <button
            onClick={() => setGalleryIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-navy-950 flex items-center justify-center transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <button
            onClick={() => setGalleryIndex((galleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
            className="absolute left-4 w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-navy-950 flex items-center justify-center transition-all z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="relative w-full max-w-5xl h-[60vh] md:h-[80vh] flex flex-col justify-center items-center gap-4">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image 
                src={GALLERY_IMAGES[galleryIndex].src} 
                alt={GALLERY_IMAGES[galleryIndex].title} 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-sm md:text-base font-serif font-semibold text-gold-600">
              {GALLERY_IMAGES[galleryIndex].title}
            </span>
          </div>

          <button
            onClick={() => setGalleryIndex((galleryIndex + 1) % GALLERY_IMAGES.length)}
            className="absolute right-4 w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-navy-950 flex items-center justify-center transition-all z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      {/* 11. MODAL: PORTRAIT REELS VIDEO MODAL */}
      {activeReelVideo !== null && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-4 animate-[fade-in_0.3s_ease-out_forwards]">
          <button
            onClick={() => setActiveReelVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-navy-950 flex items-center justify-center transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="w-[330px] md:w-[360px] h-[580px] md:h-[640px] rounded-[36px] border-[8px] border-navy-800 bg-navy-950 overflow-hidden shadow-2xl relative flex flex-col justify-between">
            <video 
              autoPlay 
              controls 
              loop
              className="absolute inset-0 w-full h-full object-cover"
              src={activeReelVideo}
            />
            <div className="relative z-10 p-6 mt-auto bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent pt-20">
              <span className="text-xs font-bold text-gold-300 tracking-wider">ATM CÖMERT İNŞAAT REELS</span>
              <h4 className="text-base font-serif font-bold text-white mt-1 leading-snug">{activeReelTitle}</h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
