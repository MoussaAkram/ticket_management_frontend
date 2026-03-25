import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DemandeStatus } from '../../../../core/models';

/** Available transitions and their button styles per status */
const TRANSITIONS: Record<
  DemandeStatus,
  { label: string; value: DemandeStatus; style: string }[]
> = {
  BROUILLON: [
    {
      label: 'Soumettre',
      value: 'SOUMISE',
      style: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    {
      label: 'Annuler',
      value: 'ANNULEE',
      style: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    },
  ],
  SOUMISE: [
    {
      label: 'Valider',
      value: 'VALIDEE',
      style: 'bg-green-600 hover:bg-green-700 text-white',
    },
    {
      label: 'Rejeter',
      value: 'REJETEE',
      style: 'bg-red-100 hover:bg-red-200 text-red-700',
    },
    {
      label: 'Annuler',
      value: 'ANNULEE',
      style: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    },
  ],
  REJETEE: [],
  VALIDEE: [],
  ANNULEE: [],
};

const STATUS_LABELS: Record<DemandeStatus, string> = {
  BROUILLON: 'Brouillon',
  SOUMISE: 'Soumise',
  VALIDEE: 'Validée',
  REJETEE: 'Rejetée',
  ANNULEE: 'Annulée',
};

@Component({
  selector: 'app-status-stepper',
  standalone: true,
  imports: [],
  templateUrl: './status-stepper.component.html',
  styleUrl: './status-stepper.component.css',
})
export class StatusStepperComponent {
  @Input({ required: true }) currentStatus!: DemandeStatus;
  @Output() statusChange = new EventEmitter<DemandeStatus>();

  readonly labels = STATUS_LABELS;

  /** Available transition buttons for the current status */
  get transitions() {
    return TRANSITIONS[this.currentStatus] ?? [];
  }
}
