export interface Program {
  id: number;
  type: "Course" | "Workshop" | "Seminar";
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  capacity: number;
  enrolled: number;
  price: string;
  image: string;
  status: "upcoming" | "registration-open" | "full";
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: Date;
  status: "published" | "draft";
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface Speaker {
  id: number;
  photo: string;
  name: string;
  designation: string;
  organization: string;
}
export interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  category: string;
  attendees: string;
  price: string;
  status: "upcoming" | "registration-open" | "full" | "completed";
  speaker_id: string;
}

export interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "preview";
  webinar?: Webinar;
  loadWebinar: () => Promise<void>;
  speakers?: Speaker[];
}
export interface SpringSchoolEvent {
  id: number;
  title: string;
  date: string;
  venue: string;
  time: string;
  duration: string | number;
  description: string;
  status: "upcoming" | "ongoing" | "completed" | string;
  category: string;
  speaker_id: string;
  speakerName?: string;
  speakerRole?: string;
  image?: string;
}
export interface IUser {
  id: number;
  image?: string;
  name: string;
  email: string;
  phone?: string;
  institute?: string;
  designation?: string;
  address?: string;
  isActive?: boolean;
  role: "user" | "admin" | "reviewer";
  created_at?: string;
  updatedAt?: string;
}
