"use client";
import {
  Briefcase,
  Building,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
  Upload,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "general" | "legal" | "partnership" | "media";
}

interface JobApplication {
  position: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
  additionalDocs: File[];
}

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "internship" | "contract";
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
}

const ContactUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"contact" | "careers">("contact");
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [showApplicationForm, setShowApplicationForm] =
    useState<boolean>(false);

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });

  const [jobApplication, setJobApplication] = useState<JobApplication>({
    position: "",
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null,
    additionalDocs: [],
  });

  const careers: Career[] = [
    {
      id: 1,
      title: "Senior Legal Researcher",
      department: "Research",
      location: "Bengaluru, Karnataka",
      type: "full-time",
      experience: "3-5 years",
      description:
        "Join our research team to conduct comprehensive legal research on constitutional law, human rights, and policy analysis.",
      requirements: [
        "LLM degree from a recognized institution",
        "3+ years experience in legal research",
        "Strong analytical and writing skills",
        "Knowledge of constitutional law and human rights",
        "Proficiency in legal databases and research tools",
      ],
      responsibilities: [
        "Conduct in-depth legal research on various topics",
        "Prepare research reports and policy briefs",
        "Collaborate with legal experts and academics",
        "Present findings at conferences and seminars",
        "Mentor junior researchers and interns",
      ],
      benefits: [
        "Competitive salary package",
        "Health and medical insurance",
        "Professional development opportunities",
        "Conference participation support",
        "Flexible working arrangements",
      ],
      postedDate: "July 15, 2025",
      deadline: "August 30, 2025",
    },
    {
      id: 2,
      title: "Program Coordinator - Gender Justice",
      department: "Programs",
      location: "Bengaluru, Karnataka",
      type: "full-time",
      experience: "2-4 years",
      description:
        "Lead and coordinate gender justice initiatives, working with diverse stakeholders to promote women's rights and gender equality.",
      requirements: [
        "Masters degree in Law, Social Sciences, or related field",
        "Experience in gender justice or human rights work",
        "Project management skills",
        "Strong communication and networking abilities",
        "Knowledge of gender laws and policies in India",
      ],
      responsibilities: [
        "Design and implement gender justice programs",
        "Coordinate with partner organizations",
        "Organize workshops, training sessions, and conferences",
        "Prepare program reports and documentation",
        "Advocate for policy changes and reforms",
      ],
      benefits: [
        "Comprehensive benefits package",
        "Travel opportunities",
        "Training and capacity building",
        "Work-life balance support",
        "Impactful work environment",
      ],
      postedDate: "July 20, 2025",
      deadline: "September 15, 2025",
    },
    {
      id: 3,
      title: "Legal Intern",
      department: "Research",
      location: "Bengaluru, Karnataka",
      type: "internship",
      experience: "Law student (3rd year onwards)",
      description:
        "Gain hands-on experience in legal research, policy analysis, and advocacy work in a dynamic research environment.",
      requirements: [
        "Currently pursuing LLB or LLM",
        "Strong academic record",
        "Interest in constitutional law and human rights",
        "Good research and writing skills",
        "Commitment for minimum 3 months",
      ],
      responsibilities: [
        "Assist in legal research projects",
        "Draft case summaries and legal briefs",
        "Support event organization and coordination",
        "Participate in team meetings and discussions",
        "Contribute to publications and reports",
      ],
      benefits: [
        "Stipend provided",
        "Mentorship from senior researchers",
        "Certificate of completion",
        "Networking opportunities",
        "Potential for full-time opportunities",
      ],
      postedDate: "July 25, 2025",
      deadline: "August 15, 2025",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Handle form submission
    alert("Thank you for your message. We will get back to you soon!");
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "general",
    });
  };

  const handleJobApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job application submitted:", jobApplication);
    // Handle application submission
    alert("Your application has been submitted successfully!");
    setShowApplicationForm(false);
    setJobApplication({
      position: "",
      name: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null,
      additionalDocs: [],
    });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "additional"
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (type === "resume") {
      setJobApplication((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setJobApplication((prev) => ({
        ...prev,
        additionalDocs: [...prev.additionalDocs, ...Array.from(files)],
      }));
    }
  };

  const removeFile = (index: number, type: "resume" | "additional") => {
    if (type === "resume") {
      setJobApplication((prev) => ({ ...prev, resume: null }));
    } else {
      setJobApplication((prev) => ({
        ...prev,
        additionalDocs: prev.additionalDocs.filter((_, i) => i !== index),
      }));
    }
  };

  const getJobTypeColor = (type: string): string => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "internship":
        return "bg-orange-100 text-orange-800";
      case "contract":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect with us for collaborations, partnerships, career
              opportunities, or to learn more about our work in law and policy
              research.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("contact")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "contact"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab("careers")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "careers"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Careers
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === "contact" ? (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      D6, Donna Cynthia, 35, Primrose Road
                      <br />
                      Craig Park Layout, Ashok Nagar
                      <br />
                      Bengaluru, Karnataka 560025
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">centerforlaw@gmail.com</p>
                    <p className="text-gray-600">info@clpr.org.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 80 4143 5060</p>
                    <p className="text-gray-600">+91 80 4143 5061</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Office Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Building className="h-4 w-4" />
                    <span>About Us</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Users className="h-4 w-4" />
                    <span>Our Team</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Publications</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Work With Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      value={contactForm.type}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          type: e.target.value as ContactForm["type"],
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="legal">Legal Services</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                    rows={6}
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Careers Section */
          <div>
            {!showApplicationForm ? (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Join Our Team
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Be part of our mission to advance law and policy research.
                    We offer opportunities for passionate individuals to make a
                    meaningful impact in the legal field.
                  </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-8">
                  {careers.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {job.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(
                                job.type
                              )}`}
                            >
                              {job.type.replace("-", " ").toUpperCase()}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-6">
                            <span className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{job.department}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.experience}</span>
                            </span>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {job.description}
                          </p>

                          <div className="text-sm text-gray-500">
                            <span>Posted: {job.postedDate}</span>
                            <span className="mx-2">•</span>
                            <span>Deadline: {job.deadline}</span>
                          </div>
                        </div>

                        <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 mb-3"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setJobApplication((prev) => ({
                                ...prev,
                                position: job.title,
                              }));
                              setShowApplicationForm(true);
                            }}
                            className="w-full lg:w-auto border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Application Form */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Job Application
                    </h2>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleJobApplicationSubmit}
                    className="space-y-8"
                  >
                    {/* Position Selection */}
                    <div>
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Position Applied For *
                      </label>
                      <select
                        id="position"
                        required
                        value={jobApplication.position}
                        onChange={(e) =>
                          setJobApplication((prev) => ({
                            ...prev,
                            position: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a position</option>
                        {careers.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="app-name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="app-name"
                          required
                          value={jobApplication.name}
                          onChange={(e) =>
                            setJobApplication((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="app-email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="app-email"
                          required
                          value={jobApplication.email}
                          onChange={(e) =>
                            setJobApplication((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="app-phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="app-phone"
                          required
                          value={jobApplication.phone}
                          onChange={(e) =>
                            setJobApplication((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Years of Experience *
                        </label>
                        <input
                          type="text"
                          id="experience"
                          required
                          value={jobApplication.experience}
                          onChange={(e) =>
                            setJobApplication((prev) => ({
                              ...prev,
                              experience: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 3-5 years"
                        />
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-6">
                      {/* Resume Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resume/CV * (PDF, DOC, DOCX - Max 10MB)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, "resume")}
                            className="hidden"
                            id="resume-upload"
                          />
                          <label
                            htmlFor="resume-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">
                              Click to upload resume
                            </span>
                          </label>
                          {jobApplication.resume && (
                            <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">
                                  {jobApplication.resume.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(0, "resume")}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Documents */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Documents (Portfolio, Certificates, etc.)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, "additional")}
                            className="hidden"
                            id="additional-upload"
                          />
                          <label
                            htmlFor="additional-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">
                              Click to upload additional documents
                            </span>
                          </label>
                          {jobApplication.additionalDocs.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {jobApplication.additionalDocs.map(
                                (file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {file.name}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeFile(index, "additional")
                                      }
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label
                        htmlFor="cover-letter"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cover Letter *
                      </label>
                      <textarea
                        id="cover-letter"
                        rows={8}
                        required
                        value={jobApplication.coverLetter}
                        onChange={(e) =>
                          setJobApplication((prev) => ({
                            ...prev,
                            coverLetter: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm text-gray-700"
                      >
                        I consent to the processing of my personal data for
                        recruitment purposes *
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Application</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedJob.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{selectedJob.department}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedJob.location}</span>
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(
                          selectedJob.type
                        )}`}
                      >
                        {selectedJob.type.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Job Description
                    </h4>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>Posted: {selectedJob.postedDate}</span>
                      <span>Application Deadline: {selectedJob.deadline}</span>
                    </div>
                    <button
                      onClick={() => {
                        setJobApplication((prev) => ({
                          ...prev,
                          position: selectedJob.title,
                        }));
                        setShowApplicationForm(true);
                        setSelectedJob(null);
                      }}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply for this Position
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
