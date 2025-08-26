"use client"
import React from 'react';

// --- Helper Components ---

// Star Icon SVG
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400' : 'text-zinc-300 dark:text-zinc-600'
          }`}
        />
      ))}
    </div>
  );
};


// --- Main Testimonial Slider Component ---

// Define the type for a single testimonial
type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatarUrl: string;
};

// Mock data for testimonials
const testimonials: Testimonial[] = [
  {
    name: 'Ananya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    quote: "The Kanjivaram saree I bought is a masterpiece. The silk is so pure and the craftsmanship is beyond compare. It felt like wearing a piece of art.",
    avatarUrl: 'https://placehold.co/100x100/EAD2AC/42280A?text=AS'
  },
  {
    name: 'Priya Patel',
    location: 'London, UK',
    rating: 5,
    quote: "Absolutely breathtaking! The Banarasi saree exceeded all my expectations. The delivery was prompt and the packaging was as luxurious as the saree itself.",
    avatarUrl: 'https://placehold.co/100x100/F4D7C9/42280A?text=PP'
  },
  {
    name: 'Deepika Rao',
    location: 'New York, USA',
    rating: 4,
    quote: "A stunning collection. I found the perfect Paithani for my sister's wedding. The customer service was incredibly helpful in making my choice.",
    avatarUrl: 'https://placehold.co/100x100/D6C4B8/42280A?text=DR'
  },
  {
    name: 'Meera Krishnan',
    location: 'Chennai, India',
    rating: 5,
    quote: "As a connoisseur of sarees, I can attest to the authenticity and quality. The colors are vibrant and the zari work is intricate. Truly a treasure.",
    avatarUrl: 'https://placehold.co/100x100/E2C2B3/42280A?text=MK'
  },
  {
    name: 'Saanvi Desai',
    location: 'Dubai, UAE',
    rating: 5,
    quote: "I felt like royalty wearing their saree. It drapes beautifully and the compliments just kept coming. I will definitely be a returning customer.",
    avatarUrl: 'https://placehold.co/100x100/C9B8A8/42280A?text=SD'
  },
  {
    name: 'Aisha Begum',
    location: 'Toronto, Canada',
    rating: 4,
    quote: "The handwoven texture is simply divine. It's a modern heirloom that I will cherish for years to come. The online shopping experience was seamless.",
    avatarUrl: 'https://placehold.co/100x100/BFA898/42280A?text=AB'
  },
];

// To create a seamless loop, we duplicate the testimonials.
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm mx-4">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full border-2 border-zinc-200 dark:border-zinc-600 object-cover"
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/EAD2AC/42280A?text=??')}
        />
        <div className="ml-4">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{testimonial.name}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.location}</p>
        </div>
      </div>
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      <blockquote className="text-zinc-600 dark:text-zinc-300 italic text-base flex-grow">
        "{testimonial.quote}"
      </blockquote>
    </div>
  </div>
);

export default function Testimonial() {
  return (
    <div className="bg-white dark:bg-zinc-900 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Woven in Trust & Elegance
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Hear from our cherished clients who have draped themselves in our timeless creations.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative w-full overflow-hidden group"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}