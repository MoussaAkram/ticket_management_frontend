/**
 * All possible audit actions.
 * Must stay in sync with AuditAction enum on the backend.
 */
export type AuditAction =
  | 'CREATED'
  | 'UPDATED'
  | 'STATUS_CHANGED'
  | 'DELETED'
  | 'RESTORED';


export interface AuditLog {
  id: string;
  action: AuditAction;
  metadata: Record<string, unknown>;
  demandeId: string;
  user: { id: string; name: string; avatarColor: string };
  createdAt: string;
}