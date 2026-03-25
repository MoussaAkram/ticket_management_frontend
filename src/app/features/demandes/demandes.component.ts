import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemandeService } from '../../core/services';
import {
  DemandeListItem,
  DemandeStatus,
  PaginatedDemandes,
} from '../../core/models';
import { DemandeFiltersComponent } from './components/demande-filters/demande-filters.component';
import { DemandeTableComponent } from './components/demande-table/demande-table.component';


@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [RouterLink, DemandeFiltersComponent, DemandeTableComponent],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css',
})
export class DemandesComponent implements OnInit {
  private readonly demandeService = inject(DemandeService);

  readonly demandes = signal<DemandeListItem[]>([]);
  readonly pagination = signal<PaginatedDemandes | null>(null);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly activeFilter = signal<DemandeStatus | null>(null);
  readonly currentPage = signal(1);

  readonly limit = 20;

  ngOnInit(): void {
    this.load();
  }

  /** Resets to page 1 and reloads when filter changes */
  onFilterChange(status: DemandeStatus | null): void {
    this.activeFilter.set(status);
    this.currentPage.set(1);
    this.load();
  }

  /** Navigates to a specific page */
  goToPage(page: number): void {
    if (!this.pagination()) return;
    const { totalPages } = this.pagination()!;
    if (page < 1 || page > totalPages) return;
    this.currentPage.set(page);
    this.load();
  }

  /** Soft deletes a demande and reloads */
  onDelete(id: string): void {
    if (!confirm('Supprimer cette demande ?')) return;

    this.demandeService.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Erreur lors de la suppression'),
    });
  }

  /**
   * Returns the CSS classes for a page number button.
   */
  pageButtonClass(page: number): string {
    const base = 'px-3 py-1.5 text-sm border rounded-lg transition-colors';
    const active = 'bg-indigo-600 text-white border-indigo-600';
    const inactive = 'border-gray-200 text-gray-600 hover:bg-gray-50';
    return `${base} ${page === this.currentPage() ? active : inactive}`;
  }

  /**
   * Computes visible page numbers with ellipsis for large page counts.
   * Always shows first, last, current, and 1 neighbor on each side.
   */
  visiblePages(): number[] {
    const total = this.pagination()?.totalPages ?? 1;
    const current = this.currentPage();
    const pages = new Set<number>();

    pages.add(1);
    pages.add(total);
    pages.add(current);
    if (current > 1) pages.add(current - 1);
    if (current < total) pages.add(current + 1);

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: number[] = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        result.push(-1); // ellipsis sentinel
      }
      result.push(sorted[i]);
    }

    return result;
  }

  /** Loads demandes from the API with current filter and page */
  private load(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.demandeService
      .getAll(this.activeFilter() ?? undefined, this.currentPage(), this.limit)
      .subscribe({
        next: (result) => {
          this.demandes.set(result.data);
          this.pagination.set(result);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Impossible de charger les demandes');
          this.isLoading.set(false);
        },
      });
  }
}
