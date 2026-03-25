import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DemandeListItem } from '../../../../core/models';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-demande-table',
  standalone: true,
  imports: [DatePipe, RouterLink, StatusBadgeComponent, LucideAngularModule],
  templateUrl: './demande-table.component.html',
  styleUrl: './demande-table.component.css'
})
export class DemandeTableComponent {
  @Input({ required: true }) demandes: DemandeListItem[] = [];
  @Output() onDelete = new EventEmitter<string>();
}
