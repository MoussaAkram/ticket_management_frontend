import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuditLog, AuditAction } from '../../../../core/models';

interface ActionConfig {
  label: string;
  dotColor: string;
}

const ACTION_CONFIG: Record<AuditAction, ActionConfig> = {
  CREATED: { label: 'Demande créée', dotColor: 'bg-green-500' },
  UPDATED: { label: 'Demande modifiée', dotColor: 'bg-blue-500' },
  STATUS_CHANGED: { label: 'Statut modifié', dotColor: 'bg-indigo-500' },
  DELETED: { label: 'Demande supprimée', dotColor: 'bg-red-500' },
  RESTORED: { label: 'Demande restaurée', dotColor: 'bg-amber-500' },
};

@Component({
  selector: 'app-audit-timeline',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './audit-timeline.component.html',
  styleUrl: './audit-timeline.component.css',
})
export class AuditTimelineComponent {
  @Input({ required: true }) logs: AuditLog[] = [];

  /** Returns the visual config for a given action type */
  getConfig(action: AuditAction): ActionConfig {
    return ACTION_CONFIG[action];
  }

  /** Casts metadata array values coming from JSON */
  asArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map(String) : [];
  }
}
