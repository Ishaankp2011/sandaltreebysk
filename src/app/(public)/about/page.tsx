import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Sandal Tree by SK — a luxury banquet hall built on a passion for creating unforgettable celebrations.",
};

const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "1000+", label: "Guest Capacity" },
  { value: "10+", label: "Years of Excellence" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-44 md:pb-28"
        aria-labelledby="about-page-heading"
      >
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-overline mb-4">Our Story</p>
            <h1 id="about-page-heading" className="heading-display mb-6">
              Built on a Passion for
              <br />
              <span className="text-primary italic">Extraordinary Moments</span>
            </h1>
            <div className="w-16 h-px bg-primary mb-8" aria-hidden />
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              Sandal Tree by SK is more than a venue — it is a promise to make
              every celebration the most beautiful chapter of your life.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-secondary/20" aria-labelledby="story-heading">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="story-heading" className="heading-section mb-6">
                Where Elegance Meets Warmth
              </h2>
              <div className="w-12 h-px bg-primary mb-8" aria-hidden />
              <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed">
                <p>
                  Founded with a singular vision — to create a space where every
                  celebration feels extraordinary — Sandal Tree by SK has grown
                  into one of the most sought-after luxury banquet halls in the region.
                </p>
                <p>
                  Our journey began when our founder, SK, recognized that truly
                  memorable events require more than just a beautiful space. They
                  demand meticulous attention to detail, heartfelt service, and a
                  deep understanding of what each family and couple envisions for
                  their special day.
                </p>
                <p>
                  Today, we are proud to have been the backdrop to thousands of
                  love stories, milestones, and memories — each one as unique and
                  precious as the people who celebrated here.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1974&auto=format&fit=crop"
                  alt="Interior of Sandal Tree by SK banquet hall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-40 h-40 border border-primary/20 bg-background hidden lg:block"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" aria-labelledby="stats-heading">
        <div className="container-luxury">
          <h2 id="stats-heading" className="sr-only">Our achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-3 transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-charcoal-950" aria-labelledby="mission-heading">
        <div className="container-luxury max-w-4xl text-center">
          <p className="text-overline text-primary/80 mb-4">Our Mission</p>
          <h2 id="mission-heading" className="heading-section text-white mb-8">
            Every Event, An Unforgettable Experience
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" aria-hidden />
          <p className="font-serif text-xl md:text-2xl text-white/70 italic font-light leading-relaxed">
            &ldquo;To provide a venue of timeless beauty where every moment is
            cherished, every detail is perfected, and every guest feels truly
            special.&rdquo;
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding" aria-labelledby="philosophy-heading">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop"
                  alt="Beautifully decorated event at Sandal Tree by SK"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-overline mb-4">Our Philosophy</p>
              <h2 id="philosophy-heading" className="heading-section mb-6">
                Details Make the
                <br />
                <span className="text-primary italic">Difference</span>
              </h2>
              <div className="w-12 h-px bg-primary mb-8" aria-hidden />
              <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed">
                <p>
                  We believe that a truly exceptional event is the sum of a
                  thousand small details — the way the light falls at golden hour,
                  the precision of each floral arrangement, the warmth of a staff
                  member's smile.
                </p>
                <p>
                  At Sandal Tree by SK, we don't just host events. We craft
                  experiences. Every enquiry is treated with personal attention,
                  every event is planned with meticulous care, and every celebration
                  is executed with unwavering dedication.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-10 font-sans text-xs font-medium tracking-widest uppercase text-primary hover:gap-4 transition-all duration-300 group"
              >
                Plan Your Event
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
