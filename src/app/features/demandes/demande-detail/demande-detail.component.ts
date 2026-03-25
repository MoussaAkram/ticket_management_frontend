import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { StatusStepperComponent } from '../components/status-stepper/status-stepper.component';
import { AuditTimelineComponent } from '../components/audit-timeline/audit-timeline.component';
import { DemandeService, AuditService } from '../../../core/services';
import { Demande, DemandeStatus, AuditLog } from '../../../core/models';

@Component({
  selector: 'app-demande-detail',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    StatusBadgeComponent,
    StatusStepperComponent,
    AuditTimelineComponent,
  ],
  templateUrl: './demande-detail.component.html',
  styleUrl: './demande-detail.component.css',
})
export class DemandeDetailComponent implements OnInit {
  @Input({ required: true }) id!: string;

  private readonly demandeService = inject(DemandeService);
  private readonly auditService = inject(AuditService);
  private readonly router = inject(Router);

  readonly demande = signal<Demande | null>(null);
  readonly auditLogs = signal<AuditLog[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  /**
   * Loads demande and audit trail in parallel.
   */
  private load(): void {
    this.isLoading.set(true);
    this.error.set(null);

    forkJoin({
      demande: this.demandeService.getById(this.id),
      logs: this.auditService.getByDemandeId(this.id),
    }).subscribe({
      next: ({ demande, logs }) => {
        this.demande.set(demande);
        this.auditLogs.set(logs);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger la demande');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Handles a status change from the stepper.
   */
  onStatusChange(newStatus: DemandeStatus): void {
    if (!confirm(`Changer le statut vers "${newStatus}" ?`)) return;

    this.demandeService.changeStatus(this.id, newStatus).subscribe({
      next: (updated) => {
        this.demande.set(updated);
        // Re-fetch only the audit logs — demande is already updated
        this.auditService.getByDemandeId(this.id).subscribe({
          next: (logs) => this.auditLogs.set(logs),
        });
      },
      error: () => this.error.set('Erreur lors du changement de statut'),
    });
  }

  /**
   * Soft-deletes the demande and navigates back to the dashboard.
   */
  onDelete(): void {
    if (!confirm('Supprimer cette demande ?')) return;

    this.demandeService.delete(this.id).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.error.set('Erreur lors de la suppression'),
    });
  }
}
