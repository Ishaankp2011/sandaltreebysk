import { Metadata } from "next";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { getSiteContent } from "@/lib/get-content";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Get in touch with Sandal Tree by SK to book your event or enquire about our luxury banquet hall services.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const contactContent = await getSiteContent("contact");

  const phone = contactContent.phone || "+91 XXXXX XXXXX";
  const email = contactContent.email || "info@sandaltreebysk.com";
  const hours = contactContent.hours || "Mon–Sun: 9 AM – 9 PM";
  const instagram = contactContent.instagram || "@sandaltreebysk";
  const mapsUrl =
    contactContent.maps_url || "https://maps.app.goo.gl/igwQWRRDBFBV8LFb6";

  const contactDetails = [
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      external: false,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: instagram,
      href: "https://instagram.com/sandaltreebysk",
      external: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "View on Google Maps",
      href: mapsUrl,
      external: true,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: hours,
      href: null,
      external: false,
    },
  ];

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-44 md:pb-20"
        aria-labelledby="contact-page-heading"
      >
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-overline mb-4">Get In Touch</p>
            <h1 id="contact-page-heading" className="heading-display mb-6">
              Let&apos;s Plan Your
              <br />
              <span className="text-primary italic">Dream Event</span>
            </h1>
            <div className="w-16 h-px bg-primary mb-8" aria-hidden />
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              Fill in the form below and our team will reach out to you within
              24 hours to discuss your vision and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-32" aria-label="Contact form and details">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Details */}
            <aside aria-label="Contact information">
              <h2 className="font-serif text-2xl font-light mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/5">
                      <item.icon
                        size={16}
                        className="text-primary"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          className="font-sans text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map preview */}
              <div className="mt-10">
                <div className="relative w-full h-56 overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2258800214368!2d77.32270977485058!3d28.65295458315419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb216fdc08b1%3A0xd2c1f28e7b10ee00!2sSandal%20Tree%20By%20SK!5e0!3m2!1sen!2sin!4v1781223802316!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sandal Tree by SK on Google Maps"
                    aria-label="Map showing location of Sandal Tree by SK"
                  />
                </div>
                <a
                  href="https://maps.app.goo.gl/igwQWRRDBFBV8LFb6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 font-sans text-xs text-primary tracking-wider uppercase hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </aside>

            {/* Enquiry Form */}
            <div className="lg:col-span-2" aria-label="Booking enquiry form">
              <h2 className="font-serif text-2xl font-light mb-8">
                Send an Enquiry
              </h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
