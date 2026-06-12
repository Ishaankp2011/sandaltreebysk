import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our premium event services at Sandal Tree by SK — weddings, receptions, engagements, corporate events, birthdays, and more.",
};

const services = [
  {
    id: "weddings",
    title: "Wedding Events",
    description:
      "Your wedding day deserves nothing less than perfection. Our grand halls, meticulous staff, and stunning decor create the fairy-tale setting you've always dreamed of.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Customizable hall layouts for up to 1000+ guests",
      "Premium floral and decor partnerships",
      "Dedicated wedding coordinator",
      "Full catering support with multiple cuisine options",
      "Bridal suite and preparation rooms",
      "Elegant lighting and AV setup",
    ],
  },
  {
    id: "receptions",
    title: "Reception Events",
    description:
      "Celebrate the beginning of a new chapter with a magnificent reception evening. Our venue transforms into a space of joy, elegance, and unforgettable celebration.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    highlights: [
      "Grand stage and backdrop setups",
      "Dance floors and entertainment areas",
      "Live music and DJ-friendly acoustics",
      "Bar and beverage service arrangements",
      "Photography-friendly spaces",
      "Valet parking services",
    ],
  },
  {
    id: "engagements",
    title: "Engagement Ceremonies",
    description:
      "Mark love's first formal promise in a setting of warmth, beauty, and intimacy. We create engagement ceremonies that are as unique as your love story.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    highlights: [
      "Intimate to grand setups available",
      "Ring ceremony stage and mandap arrangements",
      "Photo booth setups",
      "Custom floral arrangements",
      "Traditional and contemporary themes",
      "Personalized decorations",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Functions",
    description:
      "Elevate your corporate events with a sophisticated venue that combines functionality with luxury. From conferences to award nights, we deliver excellence.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "High-speed Wi-Fi and technical infrastructure",
      "Professional AV equipment",
      "Stage, podium, and presentation setups",
      "Corporate catering and break services",
      "Flexible seating arrangements",
      "Dedicated event coordination team",
    ],
  },
  {
    id: "birthdays",
    title: "Birthday Celebrations",
    description:
      "From intimate milestone birthdays to grand celebrations, we ensure every birthday is celebrated in true luxury style with personal touches that make it one-of-a-kind.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Themed decor and customization",
      "Cake setup and dessert tables",
      "Entertainment and activity zones",
      "Kids' party setups available",
      "Custom lighting and balloon decor",
      "Photo and video documentation support",
    ],
  },
  {
    id: "anniversaries",
    title: "Anniversary Celebrations",
    description:
      "Honor years of love and partnership with a celebration as elegant as the journey you've shared. We help you create anniversary events that stir the heart.",
    image:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=2071&auto=format&fit=crop",
    highlights: [
      "Romantic and elegant setups",
      "Surprise event coordination",
      "Live music arrangements",
      "Special anniversary packages",
      "Memory wall and photo displays",
      "Gourmet dining experiences",
    ],
  },
  {
    id: "customized",
    title: "Customized Events",
    description:
      "Have a unique vision that doesn't fit a standard category? Our team thrives on bringing extraordinary ideas to life. We customize every aspect to your imagination.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop",
    highlights: [
      "Fully bespoke event planning",
      "End-to-end coordination",
      "Vendor and vendor management",
      "Unique theme creation",
      "Budget-conscious planning",
      "Dedicated creative team",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28" aria-labelledby="services-page-heading">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-overline mb-4">What We Offer</p>
            <h1 id="services-page-heading" className="heading-display mb-6">
              Services Crafted for
              <br />
              <span className="text-primary italic">Every Occasion</span>
            </h1>
            <div className="w-16 h-px bg-primary mb-8" aria-hidden />
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              From intimate gatherings to grand celebrations, our comprehensive
              services ensure every event is executed with precision and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20 md:pb-32" aria-label="Service listings">
        <div className="container-luxury space-y-24 md:space-y-32">
          {services.map((service, i) => (
            <article
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""
              }`}
              aria-labelledby={`service-${service.id}-heading`}
            >
              {/* Image */}
              <div
                className={`relative ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} at Sandal Tree by SK`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
                <p className="text-overline mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`service-${service.id}-heading`}
                  className="heading-section mb-4"
                >
                  {service.title}
                </h2>
                <div className="w-10 h-px bg-primary mb-6" aria-hidden />
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-10" aria-label={`${service.title} highlights`}>
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className="text-primary mt-1 shrink-0"
                        aria-hidden
                      />
                      <span className="font-sans text-sm text-muted-foreground">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-widest uppercase text-primary hover:gap-4 transition-all duration-300 group"
                >
                  Enquire Now
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30" aria-labelledby="services-cta-heading">
        <div className="container-luxury text-center max-w-2xl">
          <p className="text-overline mb-4">Ready to Begin?</p>
          <h2 id="services-cta-heading" className="heading-section mb-6">
            Let's Plan Your
            <br />
            <span className="text-primary italic">Perfect Event</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" aria-hidden />
          <p className="font-sans text-base text-muted-foreground mb-10 leading-relaxed">
            Contact us today to discuss your vision. Our team is ready to
            turn your dream event into an unforgettable reality.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            Book a Consultation
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
