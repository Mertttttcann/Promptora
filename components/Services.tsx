"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

type Service = {
  num: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  status: "live" | "active" | "ready";
};

const realEstateServices: Service[] = [
  {
    num: "01",
    title: "Akıllı Emlak Chatbot'u",
    problem:
      "WhatsApp, Instagram ve Facebook'tan gelen müşteri mesajları cevapsız kaldıkça lead kaybediyorsunuz. Mesai dışında, hafta sonu, gece yarısı yazan müşteri sabaha kalmadan başka emlakçıya geçiyor.",
    solution:
      "Tüm sosyal kanallarınızdan gelen mesajları 7/24 cevaplayan, ilan bilgilerinizi ezbere bilen, müşterinin niyetini anlayıp uygun ilanları öneren AI asistan. Lead'i otomatik CRM'inize kaydeder, randevu oluşturur.",
    features: [
      "WhatsApp + Instagram + Facebook tek nokta",
      "İlan veritabanında semantic arama",
      "Otomatik lead skorlama + sıcak lead bildirimi",
      "Cal.com ile entegre randevu",
    ],
    status: "live",
  },
  {
    num: "02",
    title: "Sesli AI Çağrı Asistanı",
    problem:
      "Müşteri evi gezdirirken telefonu açamıyorsunuz. Aradığında cevap vermediğiniz her potansiyel müşteri, başka emlakçının kapısını çalıyor. Tek bir kayıp çağrı = tek bir kayıp komisyon.",
    solution:
      "Telefon meşgule atıldığında devreye giren Türkçe konuşan AI asistan. Aramanın amacını anlıyor, müşteri bilgilerini topluyor, randevu oluşturuyor ve size anında özet bildirim gönderiyor.",
    features: [
      "Türkçe doğal konuşma (TTS+STT)",
      "Aynı anda sınırsız çağrı yanıtlama",
      "Otomatik randevu + Telegram bildirim",
      "Konuşma transkripti CRM'inize",
    ],
    status: "active",
  },
  {
    num: "03",
    title: "İlan Yayın Otomasyonu",
    problem:
      "Bir ilanı sahibinden, hepsiemlak, emlakjet ve kendi sitenize ayrı ayrı yüklemek saatlerinizi alıyor. Her platform için fotoğraf yeniden boyutlandırma, açıklama yazma, etiket girme... Yorucu, hata payı yüksek.",
    solution:
      "Tek formdan girdiğiniz ilan bilgisi tüm platformlara otomatik dağıtılır. Fotoğraflar her platforma uygun ölçülerde optimize edilir. Açıklama AI tarafından platform-spesifik tonda yeniden yazılır.",
    features: [
      "5+ platforma eş zamanlı yayın",
      "AI ile platform-spesifik açıklama",
      "Otomatik fotoğraf optimize",
      "Tek dashboard ile yönetim",
    ],
    status: "ready",
  },
];

const tourismServices: Service[] = [
  {
    num: "04",
    title: "Otel Chatbot Asistanı",
    problem:
      "Resepsiyonunuz gece yarısı veya yoğun saatte cevap veremiyor. Yabancı turist İngilizce, Rusça, Arapça yazıyor — personeliniz yetersiz. Rezervasyonu kaçırdığınız her müşteri rakip otele gidiyor.",
    solution:
      "WhatsApp ve web sitesinden gelen mesajları çoklu dilde anında cevaplayan AI asistan. Oda müsaitlik kontrolü, rezervasyon, fiyat sorgu, otel bilgileri — hepsini PMS sisteminize bağlı şekilde halleder.",
    features: [
      "Türkçe + İngilizce + Rusça + Arapça + Almanca",
      "PMS entegrasyonu (Opera, Protel, Sirvoy)",
      "Anlık rezervasyon işlemi",
      "Misafir profili + tercih hafızası",
    ],
    status: "live",
  },
  {
    num: "05",
    title: "Sesli AI Resepsiyonist",
    problem:
      "Aynı anda 5-10 telefon birden çalıyor, tek resepsiyonistiniz hepsini alamaz. Müşteri 30 saniye beklediğinde kapatıp gidiyor. Bayram, sezon zirvesi, yoğun saatlerde rezervasyon kayıpları katlanıyor.",
    solution:
      "Eş zamanlı sınırsız çağrıyı yanıtlayan AI resepsiyonist. Türkçe + 4 yabancı dilde rezervasyon alır, randevu sisteminize kaydeder, oda durumuna göre teklif sunar. Karmaşık durumda insana yönlendirir.",
    features: [
      "Sınırsız eş zamanlı çağrı",
      "5 dilde doğal konuşma",
      "Otomatik rezervasyon → PMS",
      "Kompleks talepler için live takeover",
    ],
    status: "active",
  },
  {
    num: "06",
    title: "QR Oda Asistanı",
    problem:
      "Misafir havlu, room service veya bilgi için resepsiyona ulaşmak zorunda — ya telefonu çekmek, ya bekleyip aramak. Diğer ülkelerden gelen misafir dil bariyerini aşamıyor. Memnuniyet düşüyor.",
    solution:
      "Her odada QR kod. Misafir telefonuyla okutuyor, anında WhatsApp veya web chat açılıyor. İstek (havlu, kahvaltı saati, taksi, spa randevusu) doğru departmana otomatik iletilir. Misafir kendi dilinde yazıyor, sistem çeviriyor.",
    features: [
      "Tek QR — tüm departmanlara erişim",
      "Otomatik departman yönlendirme",
      "Multi-language otomatik algılama",
      "Memnuniyet anketi + NPS toplama",
    ],
    status: "ready",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    };

    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  const statusMap = {
    live: { label: "Production", className: "status-done" },
    active: { label: "Active", className: "status-running" },
    ready: { label: "Available", className: "status-queued" },
  };

  return (
    <div
      ref={cardRef}
      className="card-pp card-spotlight p-7 sm:p-9 group"
      data-service-card
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-[--text-3] tracking-widest">
          {service.num}
        </span>
        <span className={`status-pill ${statusMap[service.status].className}`}>
          {statusMap[service.status].label}
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-[--text] mb-5 tracking-tight">
        {service.title}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#EF4444] mb-1.5">
            ✗ Sorun
          </p>
          <p className="text-sm text-[--text-2] leading-relaxed">
            {service.problem}
          </p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#4ADE80] mb-1.5">
            ✓ Çözümümüz
          </p>
          <p className="text-sm text-[--text] leading-relaxed">
            {service.solution}
          </p>
        </div>
      </div>

      <ul className="space-y-2 pt-5 border-t border-[--border]">
        {service.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-[--text-2]"
          >
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0 text-[--accent]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8l3.5 3.5L13 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectorBlock({
  eyebrow,
  title,
  description,
  services,
}: {
  eyebrow: string;
  title: string;
  description: string;
  services: Service[];
}) {
  const sectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = sectorRef.current;
    if (!block) return;

    const cards = block.querySelectorAll<HTMLElement>("[data-service-card]");
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target.querySelectorAll("[data-service-card]"), {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(120),
              duration: 900,
              ease: "out(3)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectorRef} className="mb-24 sm:mb-32 last:mb-0">
      <div className="max-w-3xl mb-12 sm:mb-16">
        <span className="eyebrow mb-5">
          <span className="eyebrow-dot" />
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-5 leading-[1.1]">
          <span className="text-display">{title}</span>
        </h2>
        <p className="text-[--text-2] text-base sm:text-lg leading-relaxed mt-5">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {services.map((service, i) => (
          <ServiceCard key={service.num} service={service} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="container-pp">
        <SectorBlock
          eyebrow="Emlak Sektörü"
          title="Emlakçılar için AI çözümleri"
          description="Türkiye'de yüzlerce emlakçı, müşteri mesajlarına geç cevap verdiği için ayda binlerce dolarlık komisyon kaçırıyor. Promptora bu kayıpları sıfıra indirir — her mesaj, her çağrı, her ilan otomatik."
          services={realEstateServices}
        />

        <div className="divider mb-24 sm:mb-32" />

        <SectorBlock
          eyebrow="Turizm & Otelcilik"
          title="Oteller için AI ekosistemi"
          description="Misafir deneyimi sezon başında olur, kötü deneyim sezon sonunda biter. Yoğun saatlerde cevapsız kalan rezervasyon talebi, dil bariyeri yüzünden kayıp olan müşteri, tek bir resepsiyonistin yetmediği gece... Hepsini AI çözer."
          services={tourismServices}
        />
      </div>
    </section>
  );
}
