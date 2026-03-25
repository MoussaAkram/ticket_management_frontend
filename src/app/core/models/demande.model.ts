/**
 * All possible statuses for a Demande.
 * Must stay in sync with DemandeStatus enum on the backend.
 */
export type DemandeStatus =
  | 'BROUILLON'
  | 'SOUMISE'
  | 'VALIDEE'
  | 'REJETEE'
  | 'ANNULEE';

/** Minimal user shape embedded in Demande responses */
export interface UserSummary {
  id: string;
  name: string;
}

export interface Demande {
  id: string;
  reference: string;
  title: string;
  description: string;
  status: DemandeStatus;
  createdBy: UserSummary;
  assignedTo: UserSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface DemandeListItem {
  id: string;
  reference: string;
  title: string;
  status: DemandeStatus;
  createdBy: UserSummary;
  assignedTo: UserSummary | null;
  createdAt: string;
}

export interface PaginatedDemandes {
  data: DemandeListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}