"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/about.png"
            alt="About CELGAP"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At the{" "}
            <span className="font-semibold">
              Centre for Law, Governance & Policy (CELGAP)
            </span>
            , we are committed to advancing research, education, and public
            policy that promotes justice, accountability, and transparency. Our
            work bridges academia, practitioners, and communities to shape
            impactful solutions in law and governance.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Through collaborative programs, training, and policy advocacy,
            CELGAP empowers individuals and institutions to build stronger
            systems for a just and inclusive future.CELGAP is working closely
            with academics, students and CSOs in furtherance of its goal of
            establishing social justice.
          </p>

          <Link
            href="/whoWeAre/faculty"
            className="inline-block px-6 py-3 bg-[#0347A7] text-white font-medium rounded-md shadow hover:bg-[#02357d] transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
