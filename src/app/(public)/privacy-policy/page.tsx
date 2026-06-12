import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaltreebysk.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Sandal Tree by SK — how we collect, use, and protect your personal information when you enquire about or book our luxury banquet hall.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="pt-32 pb-20 md:pt-44 md:pb-28" aria-labelledby="privacy-heading">
      <div className="container-luxury max-w-3xl">
        <p className="text-overline mb-4">Legal</p>
        <h1 id="privacy-heading" className="heading-display mb-6">Privacy Policy</h1>
        <div className="w-16 h-px bg-primary mb-10" aria-hidden />

        <div className="prose prose-sm md:prose-base max-w-none font-sans text-muted-foreground leading-relaxed space-y-8">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

          <section aria-labelledby="privacy-intro">
            <h2 id="privacy-intro" className="font-serif text-2xl font-light text-foreground mb-4">Introduction</h2>
            <p>Sandal Tree by SK (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information you provide through our website.</p>
          </section>

          <section aria-labelledby="privacy-collect">
            <h2 id="privacy-collect" className="font-serif text-2xl font-light text-foreground mb-4">Information We Collect</h2>
            <p>When you submit a booking enquiry, we collect:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Event type and preferred date</li>
              <li>Expected guest count</li>
              <li>Your message and requirements</li>
            </ul>
          </section>

          <section aria-labelledby="privacy-use">
            <h2 id="privacy-use" className="font-serif text-2xl font-light text-foreground mb-4">How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Respond to your booking enquiries</li>
              <li>Communicate event-related details</li>
              <li>Improve our services</li>
            </ul>
            <p className="mt-4">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section aria-labelledby="privacy-security">
            <h2 id="privacy-security" className="font-serif text-2xl font-light text-foreground mb-4">Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. Your information is stored securely and access is restricted to authorized personnel only.</p>
          </section>

          <section aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies" className="font-serif text-2xl font-light text-foreground mb-4">Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. These cookies do not collect personally identifiable information and can be disabled through your browser settings.</p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className="font-serif text-2xl font-light text-foreground mb-4">Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us at <a href="mailto:info@sandaltreebysk.com" className="text-primary hover:underline">info@sandaltreebysk.com</a>.</p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className="font-serif text-2xl font-light text-foreground mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-3">
              <strong className="text-foreground">Sandal Tree by SK</strong><br />
              Email: <a href="mailto:info@sandaltreebysk.com" className="text-primary hover:underline">info@sandaltreebysk.com</a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
