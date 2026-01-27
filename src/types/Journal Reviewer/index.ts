import { LawItem } from "@/app/(with dashboard Layout)/admin/publications/Law-Journal/page";
import { User } from "@/lib/auth";

export type JournalAssignmentStatus = "assigned" | "completed";

export type JournalAssignment = {
  id: number;

  law_journal_id: number;
  reviewer_id: number;
  user_id: number;

  status: JournalAssignmentStatus;
  comment: string | null;
  submitted_at: string | null;

  created_at: string;
  updated_at: string;

  // Relations
  journal: LawItem;
  reviewer: User;
  user: User;
};
