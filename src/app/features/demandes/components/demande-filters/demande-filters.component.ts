import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DemandeStatus } from '../../../../core/models';

interface FilterChip {
  label: string;
  value: DemandeStatus | null;
}

const CHIPS: FilterChip[] = [
  { label: 'Tous', value: null },
  { label: 'Brouillon', value: 'BROUILLON' },
  { label: 'Soumise', value: 'SOUMISE' },
  { label: 'Validée', value: 'VALIDEE' },
  { label: 'Rejetée', value: 'REJETEE' },
  { label: 'Annulée', value: 'ANNULEE' },
];


@Component({
  selector: 'app-demande-filters',
  standalone: true,
  imports: [],
  templateUrl: './demande-filters.component.html',
  styleUrl: './demande-filters.component.css',
})
export class DemandeFiltersComponent {
  @Input() activeFilter: DemandeStatus | null = null;
  @Output() filterChange = new EventEmitter<DemandeStatus | null>();

  readonly chips = CHIPS;

  chipClass(value: DemandeStatus | null): string {
    const base = 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors';
    const active = 'bg-indigo-600 text-white';
    const idle = 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    return `${base} ${value === this.activeFilter ? active : idle}`;
  }
}
