import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center px-6">
        <span className="font-heading text-8xl md:text-9xl font-bold text-gold/20 block mb-4">
          404
        </span>
        <h1 className="font-heading text-3xl md:text-4xl text-navy font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-charcoal/60 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-navy px-8 py-4 font-semibold uppercase tracking-wider text-sm hover:brightness-110 transition-all"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
