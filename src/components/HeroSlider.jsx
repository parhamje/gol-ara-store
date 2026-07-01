import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'کشف زیبایی طبیعی <br class="hidden md:block" /> با <span class="text-pink-500">گل آرا</span>',
    subtitle: 'مجموعه‌ای بی‌نظیر از بهترین برندهای آرایشی و بهداشتی با قیمت‌های استثنایی و ضمانت اصالت کالا.',
    tag: 'کالکشن جدید تابستانه',
    tagIcon: Sparkles,
    image: '/images/hero.png',
    bg: '#fdf4f8',
    stats: true
  },
  {
    id: 2,
    title: 'مراقبت از پوست <br class="hidden md:block" /> با <span class="text-purple-500">محصولات ارگانیک</span>',
    subtitle: 'بهترین سرم‌ها و کرم‌های آبرسان برندهای اوردینری و سراوی برای داشتن پوستی شاداب و درخشان.',
    tag: 'پیشنهاد ویژه پوست',
    tagIcon: Sparkles,
    image: '/images/serum.png',
    bg: '#f3e8f7',
    stats: false
  },
  {
    id: 3,
    title: 'عطرهای لوکس <br class="hidden md:block" /> برای <span class="text-pink-500">لحظات خاص</span>',
    subtitle: 'مجموعه جدیدترین عطرهای برندهای معتبر جهانی (شنل، دیور) با ماندگاری فوق‌العاده بالا.',
    tag: 'جدیدترین عطرها',
    tagIcon: Sparkles,
    image: '/images/perfume.png',
    bg: '#fef1f8',
    stats: false
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-sm border border-pink-50" style={{ height: 'auto', minHeight: '500px' }}>
        
        {/* Slides */}
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ background: slide.bg }}
            >
              <div className="p-10 md:p-16 flex-1 text-center md:text-right w-full">
                {isActive && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-sm font-bold text-pink-600 mb-6 animate-fade-in-up">
                    <slide.tagIcon size={14} />
                    {slide.tag}
                  </div>
                )}

                {isActive && (
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-800 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                )}

                {isActive && (
                  <p
                    className="text-lg mb-10 max-w-lg mx-auto md:mx-0 text-gray-600 animate-fade-in-up leading-relaxed"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {slide.subtitle}
                  </p>
                )}

                {isActive && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link to="/shop" className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-md flex items-center gap-2">
                      ورود به فروشگاه
                      <ArrowLeft size={18} />
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full h-[300px] md:h-full relative">
                {isActive && (
                  <img 
                    src={slide.image} 
                    alt="تصویر بنر" 
                    className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                    style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
                  />
                )}
                {isActive && slide.stats && (
                  <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pink-50 animate-fade-in-up hidden md:flex items-center gap-4" style={{ animationDelay: '0.5s' }}>
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                      <Star size={24} className="fill-pink-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">+۱۰۰۰ محصول</p>
                      <p className="text-xs text-gray-500">تنوع بی‌نظیر</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? 'w-8 bg-pink-500' : 'w-2.5 bg-pink-200 hover:bg-pink-300'}`}
              aria-label={`اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
