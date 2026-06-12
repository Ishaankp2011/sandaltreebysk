import { Layout } from "@/components/layout/layout";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/ui/product-card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Loader2 } from "lucide-react";
import teaCeremonyImage from '@assets/generated_images/japanese_tea_ceremony_minimalist_setup.png';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <Layout>
      <Hero />
      
      {/* Marquee Section */}
      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block text-white/90 text-sm font-medium tracking-[0.3em] uppercase"
        >
          <span className="mx-8">• Ceremonial Grade A</span>
          <span className="mx-8">• Sourced from Shizuoka</span>
          <span className="mx-8">• Stone Ground</span>
          <span className="mx-8">• 100% Organic</span>
          <span className="mx-8">• Ceremonial Grade A</span>
          <span className="mx-8">• Sourced from Shizuoka</span>
          <span className="mx-8">• Stone Ground</span>
          <span className="mx-8">• 100% Organic</span>
          <span className="mx-8">• Ceremonial Grade A</span>
          <span className="mx-8">• Sourced from Shizuoka</span>
          <span className="mx-8">• Stone Ground</span>
          <span className="mx-8">• 100% Organic</span>
        </motion.div>
      </div>

      <section className="py-16 sm:py-24 md:py-32 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4 sm:mb-6 font-medium"
            >
              Curated Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground"
            >
              The Collection
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-square overflow-hidden rounded-2xl shadow-2xl order-2 lg:order-1"
            >
              <img 
                src={teaCeremonyImage} 
                alt="Japanese Tea Ceremony" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
            
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium block mb-4 sm:mb-6">The Origin</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 sm:mb-8">
                  From Shizuoka <br/>
                  <span className="text-primary italic">to Your Cup.</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
                  Our matcha is shade-grown for 20 days before harvest to boost chlorophyll and amino acid levels. 
                  Hand-picked and stone-ground in traditional granite mills.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-y-6 sm:gap-x-8 md:gap-x-12">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg sm:text-xl font-medium">Shade Grown</h4>
                    <p className="text-sm text-muted-foreground">Boosts L-Theanine for calm focus.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg sm:text-xl font-medium">Stone Ground</h4>
                    <p className="text-sm text-muted-foreground">Preserves delicate nutrients.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg sm:text-xl font-medium">First Harvest</h4>
                    <p className="text-sm text-muted-foreground">Sweetest, most tender leaves.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg sm:text-xl font-medium">Direct Trade</h4>
                    <p className="text-sm text-muted-foreground">Supporting local farmers.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 z-0 pointer-events-none" />
      </section>
    </Layout>
  );
}
