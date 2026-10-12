import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SLIDES_DATA = [
  {
    id: 1,
    titleKey: 'hero.slide1_title',
    subtitleKey: 'hero.slide1_subtitle',
    tagKey: 'hero.slide1_tag',
    tagIcon: Sparkles,
    image: import.meta.env.BASE_URL + 'images/hero.png',
    bg: '#fdf4f8',
    stats: true
  },
  {
    id: 2,
    titleKey: 'hero.slide2_title',
    subtitleKey: 'hero.slide2_subtitle',
    tagKey: 'hero.slide2_tag',
    tagIcon: Sparkles,
    image: import.meta.env.BASE_URL + 'images/serum.png',
    bg: '#f3e8f7',
    stats: false
  },
  {
    id: 3,
    titleKey: 'hero.slide3_title',
    subtitleKey: 'hero.slide3_subtitle',
    tagKey: 'hero.slide3_tag',
    tagIcon: Sparkles,
    image: import.meta.env.BASE_URL + 'images/perfume.png',
    bg: '#fef1f8',
    stats: false
  }
];

export default function HeroSlider() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const isRtl = i18n.language === 'fa';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES_DATA.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <div className="relative h-[650px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm border border-pink-50">
        
        {/* Slides */}
        {SLIDES_DATA.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ background: slide.bg }}
            >
              <div className="px-6 py-10 md:p-16 flex-1 text-center md:text-start w-full flex flex-col justify-center items-center md:items-start">
                {isActive && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-sm font-bold text-pink-600 mb-6 animate-fade-in-up">
                    <slide.tagIcon size={14} />
                    {t(slide.tagKey)}
                  </div>
                )}

                {isActive && (
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight text-gray-800 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                    dangerouslySetInnerHTML={{ __html: t(slide.titleKey) }}
                  />
                )}

                {isActive && (
                  <p
                    className="text-lg mb-10 max-w-lg mx-auto md:mx-0 text-gray-600 animate-fade-in-up leading-relaxed"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {t(slide.subtitleKey)}
                  </p>
                )}

                {isActive && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link to="/shop" className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-md flex items-center gap-2">
                      {t('hero.enter_shop')}
                      {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full h-full relative min-h-[250px] md:h-full">
                {isActive && (
                  <img 
                    src={slide.image} 
                    alt="Hero Slide" 
                    className={`absolute inset-0 w-full h-full object-cover animate-fade-in ${isRtl ? 'md:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]' : 'md:[clip-path:polygon(0_0,100%_0,100%_100%,20%_100%)]'}`}
                  />
                )}
                {isActive && slide.stats && (
                  <div className="absolute bottom-10 end-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pink-50 animate-fade-in-up hidden md:flex items-center gap-4" style={{ animationDelay: '0.5s' }}>
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                      <Star size={24} className="fill-pink-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800" dir="ltr">{t('hero.stats_products') || '+1000 Products'}</p>
                      <p className="text-xs text-gray-500">{t('hero.stats_variety') || 'Great Variety'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? 'w-8 bg-pink-500' : 'w-2.5 bg-pink-200 hover:bg-pink-300'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
