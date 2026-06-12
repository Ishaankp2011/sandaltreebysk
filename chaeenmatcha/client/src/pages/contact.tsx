import { Layout } from "@/components/layout/layout";
import { Mail, Instagram } from "lucide-react";
import matchaTextureImage from '@assets/generated_images/minimalist_matcha_powder_texture_banner.png';

export default function Contact() {
  return (
    <Layout>
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={matchaTextureImage}
          alt="Matcha texture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white font-medium text-center">
            Connect With Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-medium">Let's Share the Ritual</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you have questions about our ceremonial grade matcha, want to share your brewing experiences,
                or simply connect with fellow tea enthusiasts, we're here to engage in meaningful conversations.
              </p>
            </div>
            <div className="flex-1 text-9xl font-serif opacity-10 text-primary select-none hidden md:block">
              茶
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12 text-center">Reach Out</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center p-8 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4">Email</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Send us your thoughts, questions, or inquiries. We respond to all messages within 24 hours.
                </p>
                <a
                  href="mailto:matchachaeen@gmail.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  matchachaeen@gmail.com
                </a>
              </div>

              <div className="text-center p-8 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Instagram className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4">Instagram</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Follow us for daily inspiration, brewing tips, and glimpses into the world of traditional tea culture.
                </p>
                <a
                  href="https://www.instagram.com/chaeen_matcha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  @chaeen_matcha
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
