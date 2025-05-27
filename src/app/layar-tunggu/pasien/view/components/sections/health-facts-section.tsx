"use client";

import { useEffect, useState } from "react";
import { SparklesIcon } from "lucide-react";

const healthFacts = [
  "Diabetes tipe 2 kini menyerang usia muda akibat pola makan tinggi gula dan kurang aktivitas fisik. Deteksi dini bisa mencegah komplikasi serius.",
  "Stroke adalah penyebab kematian dan disabilitas utama di Indonesia. Tekanan darah tinggi jadi pemicu utama, namun bisa dicegah dengan gaya hidup sehat.",
  "Kolesterol tinggi tidak selalu bergejala, tapi meningkatkan risiko serangan jantung dan stroke. Pola makan tinggi lemak jenuh jadi penyebab utamanya.",
  "Penyakit jantung koroner makin banyak dialami usia produktif karena stres, merokok, dan konsumsi makanan cepat saji.",
  "Obesitas adalah pemicu banyak penyakit kronis, seperti diabetes, hipertensi, dan kanker. Gaya hidup aktif dan pola makan seimbang adalah kunci pencegahan.",
  "Penyakit ginjal kronis sering tidak terdeteksi sampai stadium lanjut. Gaya hidup sehat dan pemeriksaan rutin bisa membantu deteksi dini.",
];

export default function HealthFactsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex + 1 >= healthFacts.length ? 0 : prevIndex + 1,
      );
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex size-full basis-1/3 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 p-5 text-center text-white">
      <div className="flex items-center gap-2 font-bold">
        <SparklesIcon size={20} />
        <h2>Fakta Kesehatan</h2>
      </div>
      <p className="text-sm transition-opacity duration-500 ease-in-out">
        {healthFacts[index]}
      </p>
    </section>
  );
}
