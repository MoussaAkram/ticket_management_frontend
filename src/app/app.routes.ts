import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'demandes',
    loadComponent: () =>
      import('./features/demandes/demandes.component').then(
        (m) => m.DemandesComponent,
      ),
  },
  {
    path: 'demandes/new',
    loadComponent: () =>
      import('./features/demandes/demande-form/demande-form.component').then(
        (m) => m.DemandeFormComponent,
      ),
  },
  {
    path: 'demandes/:id/edit',
    loadComponent: () =>
      import('./features/demandes/demande-form/demande-form.component').then(
        (m) => m.DemandeFormComponent,
      ),
  },
  {
    path: 'demandes/:id',
    loadComponent: () =>
      import('./features/demandes/demande-detail/demande-detail.component').then(
        (m) => m.DemandeDetailComponent,
      ),
  },
  { path: '', redirectTo: 'demandes', pathMatch: 'full' },
  { path: '**', redirectTo: 'demandes' },
];