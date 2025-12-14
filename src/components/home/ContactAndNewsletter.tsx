"use client";

import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Zoom } from "react-awesome-reveal";

export default function ContactNewsletter() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", newsletterEmail);
    setNewsletterSubmitted(true);
    setTimeout(() => setNewsletterSubmitted(false), 3000);
    setNewsletterEmail("");
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Zoom duration={1000}>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-wide mb-4">
              CONTACT & NEWSLETTER
            </h2>
          </Zoom>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us or subscribe to our newsletter for the latest
            updates on legal programs and initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mx-auto">
          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-600 mb-6">
                Have questions about our programs or need legal assistance? We
                are here to help.
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-900" />
                  <span>info@celgap.org</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-blue-900" />
                  <span>+880 11 2345 6789</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-900" />
                  <span>Dhaka,Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300 resize-vertical"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={contactSubmitted}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-8">
            {/* Newsletter Subscription */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and never miss important updates
                about new programs, legal insights, and upcoming events.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={newsletterSubmitted}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Subscribe to Newsletter
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Links */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="#programs"
                  className="block text-blue-900 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  → View All Programs
                </a>
                <a
                  href="#team"
                  className="block text-blue-900 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  → Meet Our Team
                </a>
                <a
                  href="#about"
                  className="block text-blue-900 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  → About Us
                </a>
                <a
                  href="#resources"
                  className="block text-blue-900 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  → Legal Resources
                </a>
              </div>
            </div> */}

            {/* Office Hours */}
            <div className="border-2 border-blue-800 rounded-xl shadow-lg p-8 text-slate-800">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-slate-800">
                  For urgent matters outside office hours, please email us and
                  we will respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
