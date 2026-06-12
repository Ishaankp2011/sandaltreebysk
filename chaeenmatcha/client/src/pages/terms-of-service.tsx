import { Layout } from "@/components/layout/layout";
import ReactMarkdown from "react-markdown";

const termsOfServiceContent = `
# Terms of Service

Effective date: December 23, 2025

## 1. Introduction

These Terms of Service ("Terms") govern your access to and use of the Chaeen Matcha website and services. By accessing or using the site, you agree to be bound by these Terms.

## 2. Who May Use the Site

You must be at least 18 years old and capable of entering into binding contracts to place orders. By using the site you represent and warrant that you meet these requirements.

## 3. Account and Registration

If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.

## 4. Products, Pricing, and Availability

We strive to display accurate product descriptions and pricing. All prices are shown in the currency on the website and may include or exclude taxes and shipping as specified at checkout. We reserve the right to correct pricing errors and to refuse or cancel orders for products listed at an incorrect price.

## 5. Orders and Acceptance

Placing an order is an offer to purchase. We may accept or reject your order for any reason, including product unavailability, errors in the price or product information, or suspected fraud.

## 6. Payment

Payments are processed through third-party payment processors. You agree to provide accurate and complete payment information and to pay all fees and taxes associated with the order.

## 7. Shipping and Returns

Shipping, delivery times, and return policies are described on our Shipping & Returns page. Returns and refunds are subject to our return policy, which may require proof of purchase and product condition verification.

## 8. Refunds and Cancellations

Refunds will be processed according to our Returns policy. We may cancel orders or suspend accounts where we suspect fraud or a breach of these Terms.

## 9. Intellectual Property

All content on the site, including text, images, logos, and design, is the property of Chaeen Matcha or its licensors and is protected by intellectual property laws. You may not use our trademarks or content without our written permission.

## 10. Disclaimers

The site and products are provided "as is" without warranties of any kind to the fullest extent permitted by law. We do not warrant that the site will be uninterrupted or error-free.

## 11. Limitation of Liability

To the maximum extent permitted by law, Chaeen Matcha and its affiliates will not be liable for indirect, incidental, consequential, special, or punitive damages arising from or related to your use of the site or purchase of products.

## 12. Indemnification

You agree to indemnify and hold us harmless from any claims, losses, liabilities, and expenses arising from your use of the site or violation of these Terms.

## 13. Governing Law and Dispute Resolution

These Terms are governed by the laws of the country where Chaeen Matcha is incorporated. Any disputes will be resolved in the courts of that jurisdiction, unless otherwise agreed in writing.

## 14. Changes to Terms

We may update these Terms from time to time. Material changes will be published on the site with an updated Effective Date.

## 15. Contact

For questions about these Terms, contact: support@chaeenmatcha.example.com

*Note: This is a general template. For legal certainty and jurisdiction-specific requirements, consult legal counsel before publishing.*
`;

export default function TermsOfService() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-primary">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-card rounded-lg border p-8 md:p-12 shadow-sm">
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-serif prose-headings:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-serif font-medium text-primary mb-8 border-b border-border pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-serif font-medium text-foreground mt-12 mb-6 first:mt-0">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-medium">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-muted-foreground italic">
                    {children}
                  </em>
                ),
              }}
            >
              {termsOfServiceContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
}
