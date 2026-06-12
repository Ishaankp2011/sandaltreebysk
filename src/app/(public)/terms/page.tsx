import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaltreebysk.com";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for booking and using the services of Sandal Tree by SK luxury banquet hall.",
  alternates: { canonical: `${siteUrl}/terms` },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <article className="pt-32 pb-20 md:pt-44 md:pb-28" aria-labelledby="terms-heading">
      <div className="container-luxury max-w-3xl">
        <p className="text-overline mb-4">Legal</p>
        <h1 id="terms-heading" className="heading-display mb-6">Terms & Conditions</h1>
        <div className="w-16 h-px bg-primary mb-10" aria-hidden />

        <div className="font-sans text-muted-foreground leading-relaxed space-y-8">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

          <section aria-labelledby="terms-acceptance">
            <h2 id="terms-acceptance" className="font-serif text-2xl font-light text-foreground mb-4">Acceptance of Terms</h2>
            <p>By accessing this website and enquiring about our venue services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section aria-labelledby="terms-booking">
            <h2 id="terms-booking" className="font-serif text-2xl font-light text-foreground mb-4">Booking and Reservations</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All bookings are subject to availability.</li>
              <li>A booking is only confirmed upon receipt of the advance payment as agreed.</li>
              <li>Submitting an enquiry does not guarantee a booking.</li>
              <li>We reserve the right to decline any booking at our discretion.</li>
            </ul>
          </section>

          <section aria-labelledby="terms-payment">
            <h2 id="terms-payment" className="font-serif text-2xl font-light text-foreground mb-4">Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>An advance payment is required to confirm your booking date.</li>
              <li>The balance must be paid as per the agreed schedule.</li>
              <li>All payments are non-transferable to other dates or events.</li>
              <li>Pricing is subject to change without notice for future bookings.</li>
            </ul>
          </section>

          <section aria-labelledby="terms-cancellation">
            <h2 id="terms-cancellation" className="font-serif text-2xl font-light text-foreground mb-4">Cancellation Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Cancellations must be communicated in writing.</li>
              <li>Advance payments may be non-refundable depending on the notice period.</li>
              <li>Specific cancellation terms will be outlined in your booking agreement.</li>
            </ul>
          </section>

          <section aria-labelledby="terms-conduct">
            <h2 id="terms-conduct" className="font-serif text-2xl font-light text-foreground mb-4">Guest Conduct</h2>
            <p>All guests are expected to conduct themselves in a respectful manner. Sandal Tree by SK reserves the right to ask any person to leave the premises if their behaviour is deemed inappropriate or disruptive.</p>
          </section>

          <section aria-labelledby="terms-liability">
            <h2 id="terms-liability" className="font-serif text-2xl font-light text-foreground mb-4">Limitation of Liability</h2>
            <p>Sandal Tree by SK shall not be liable for any indirect, incidental, or consequential damages arising from the use of our venue or website. Our maximum liability is limited to the amount paid for the booking.</p>
          </section>

          <section aria-labelledby="terms-changes">
            <h2 id="terms-changes" className="font-serif text-2xl font-light text-foreground mb-4">Changes to Terms</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Continued use of our services after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section aria-labelledby="terms-contact">
            <h2 id="terms-contact" className="font-serif text-2xl font-light text-foreground mb-4">Contact</h2>
            <p>For any questions regarding these Terms and Conditions, please contact:</p>
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
