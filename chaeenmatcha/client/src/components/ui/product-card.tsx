import { motion } from "framer-motion";
import type { Product } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/919310781313?text=${encodeURIComponent(`Hi, I am interested in buying ${product.name} (${product.weight})`)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative flex flex-col gap-3 sm:gap-4 card-elevated p-3 sm:p-4 hover-lift"
    >
      <Link href={`/product/${product.id}`}>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] bg-secondary/30 cursor-pointer relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/6 transition-colors duration-500" />

          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
             <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>

          {product.original_price > product.price && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary/95 text-white backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold uppercase tracking-wider rounded-full shadow">
              Sale
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-foreground cursor-pointer hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="flex flex-col items-end flex-shrink-0">
             <span className="text-base sm:text-lg md:text-xl font-semibold text-primary">₹{product.price}</span>
             {product.original_price > product.price && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                ₹{product.original_price}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">{product.weight}</p>
      </div>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button 
          className="w-full h-10 sm:h-11 mt-1 sm:mt-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="hidden xs:inline">Contact to Buy</span>
          <span className="xs:hidden">Buy</span>
        </Button>
      </a>
    </motion.div>
  );
}
