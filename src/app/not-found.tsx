import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-6">
          404
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
          Page Not Found
        </h1>
        <div className="w-12 h-px bg-primary mx-auto mb-8" aria-hidden />
        <p className="font-sans text-base text-muted-foreground mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-primary/90"
        >
          <ArrowLeft size={14} aria-hidden />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
