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
