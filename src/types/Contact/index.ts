export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiry_type: "general" | "legal" | "partnership" | "media";
}

export interface JobApplication {
  position: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
  additionalDocs: File[];
}

export interface Career {
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
