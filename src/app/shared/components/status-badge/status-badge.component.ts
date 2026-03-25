import { Component, Input } from '@angular/core';
import { DemandeStatus } from '../../../core/models/demande.model';

const STATUS_CONFIG: Record<DemandeStatus, { label: string; classes: string }> =
  {
    BROUILLON: { label: 'Brouillon', classes: 'bg-gray-100 text-gray-700' },
    SOUMISE: { label: 'Soumise', classes: 'bg-blue-100 text-blue-700' },
    VALIDEE: { label: 'Validée', classes: 'bg-green-100 text-green-700' },
    REJETEE: { label: 'Rejetée', classes: 'bg-red-100 text-red-700' },
    ANNULEE: { label: 'Annulée', classes: 'bg-amber-100 text-amber-700' },
  };

/**
 * Displays a colored badge for a demande status.
 */
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: DemandeStatus;

  get config() {
    return STATUS_CONFIG[this.status];
  }
}
