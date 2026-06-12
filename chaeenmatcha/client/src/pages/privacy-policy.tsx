import { Layout } from "@/components/layout/layout";
import ReactMarkdown from "react-markdown";

const privacyPolicyContent = `
# Privacy Policy

Effective date: December 23, 2025

## 1. Introduction

Chaeen Matcha ("we", "us", "our") operates the website and online store to sell matcha products. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our site and services.

## 2. Information We Collect

- **Personal Information**: name, email address, phone number, shipping and billing addresses when you place an order or contact us.
- **Payment Information**: payment card details are collected and processed by our third-party payment processors. We do not store full payment card details on our servers.
- **Usage Data**: pages visited, search terms, IP addresses, device and browser information, and other analytics data collected automatically.
- **Communications**: any messages or inquiries you send to us via email, chat, or forms.

## 3. How We Use Your Information

We use personal information to:
- Process and fulfill orders, including shipping and returns.
- Communicate with you about your orders, account, and promotions (where you consent).
- Prevent fraud and illegal activity.
- Improve and analyze our website and services.
- Comply with legal obligations.

## 4. Cookies and Tracking

We and our third-party partners use cookies and similar technologies to provide functionality, analyze usage, and show relevant marketing. You can control cookies through your browser settings; disabling some cookies may affect site functionality.

## 5. Third-Party Services

We use third-party service providers for payment processing, shipping, analytics, and marketing. These providers may have access to personal information only to perform services on our behalf and are contractually bound to protect it.

## 6. Data Sharing and Disclosure

We may disclose personal information to:
- Service providers who perform services for us (payments, shipping, analytics).
- Law enforcement or other parties when required by law or to protect our rights.

## 7. Data Retention

We retain personal information as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.

## 8. Security

We implement reasonable technical and organizational measures to protect personal data. However, no method of transmission or electronic storage is 100% secure; we cannot guarantee absolute security.

## 9. Your Rights

Depending on your jurisdiction, you may have the right to access, correct, update, or delete your personal information, object to processing, and request data portability. To exercise these rights, contact us (see Contact section).

## 10. Children

Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have such information, contact us to request deletion.

## 11. International Transfers

If you are located outside the country where we operate, your information may be transferred to, stored, and processed in the country where our servers or service providers are located.

## 12. Changes to This Policy

We may update this Privacy Policy from time to time. When we make changes, we will revise the Effective Date. Material changes will be notified on the website.

## 13. Contact

For questions or to exercise rights, contact: support@chaeenmatcha.example.com

*Note: This is a general template. Consider reviewing with legal counsel to ensure compliance with local laws (e.g., GDPR, CCPA).*
`;

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-primary">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how we protect and handle your personal information
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
              {privacyPolicyContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
}
