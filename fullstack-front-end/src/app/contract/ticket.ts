import { User } from "./User";

export interface Ticket {
  id: number | null;
  subject: string;             // Required, max 100 chars
  description: string;         // Required, max 1000 chars
  priority: string;    // Required (enum)
  createdBy: number | null;           // Required (user ID)
  assignedTo?: number | null;  // Optional or null (user ID)
  createdAt: Date;             // Java LocalDate → TypeScript Date
  status: string;        // Optional or enum
}


