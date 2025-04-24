'use client';

interface CTAProps {
  title: string;
  subtitle: string;
  button: {
    text: string;
    link: string;
  };
}

export default function CTA({ title, subtitle, button }: CTAProps) {
  return (
    <section className="bg-yellow-400 text-black py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg mb-6 font-medium">{subtitle}</p>
        <a
          href={button.link}
          className="inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-zinc-900 transition"
        >
          {button.text}
        </a>
      </div>
    </section>
  );
}
  