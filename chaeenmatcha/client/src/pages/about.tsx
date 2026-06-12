import { Layout } from "@/components/layout/layout";
import teaCeremonyImage from '@assets/generated_images/japanese_tea_ceremony_minimalist_setup.png';

export default function About() {
  return (
    <Layout>
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={teaCeremonyImage} 
          alt="Tea Ceremony" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white font-medium text-center">
            The Ritual of Cha
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-medium">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At CHAEEN, we believe that tea is more than a beverage—it is a moment of pause, a ritual of mindfulness, and a connection to nature. 
                Inspired by the centuries-old Japanese tea ceremony (Sadō), we bring you matcha that honors tradition while fitting seamlessly into modern life.
              </p>
            </div>
            <div className="flex-1 text-9xl font-serif opacity-10 text-primary select-none hidden md:block">
              和
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-center">The Source</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-3">Shizuoka, Japan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our matcha comes exclusively from the pristine tea fields of Shizuoka, a region renowned for its nutrient-rich volcanic soil and ideal climate. 
                  Mount Fuji watches over the fields, providing a spiritual backdrop to the careful cultivation of our camellia sinensis plants.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Ceremonial Grade A</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We only offer Ceremonial Grade A matcha—the highest quality available. It is made from the youngest tea leaves, shade-grown to boost chlorophyll 
                  and L-Theanine, then steamed, dried, and stone-ground into a fine powder. No bitterness, just pure, smooth umami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
