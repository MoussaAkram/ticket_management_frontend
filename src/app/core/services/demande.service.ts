import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Demande,
  DemandeStatus,
  PaginatedDemandes,
} from '../models/demande.model';

export interface CreateDemandePayload {
  title: string;
  description: string;
  assignedToId?: string;
}

export interface UpdateDemandePayload {
  title?: string;
  description?: string;
  assignedToId?: string | null;
}


@Injectable({ providedIn: 'root' })
export class DemandeService {
  private readonly http   = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/demandes`;

  /** Returns a paginated list of active demandes. */
  getAll(
    status?: DemandeStatus,
    page: number = 1,
    limit: number = 20,
  ): Observable<PaginatedDemandes> {
    let params = new HttpParams()
      .set('page',  page.toString())
      .set('limit', limit.toString());

    if (status) params = params.set('status', status);

    return this.http.get<PaginatedDemandes>(this.apiUrl, { params });
  }

  /** Returns a single demande by id */
  getById(id: string): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  /** Creates a new demande */
  create(payload: CreateDemandePayload): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, payload);
  }

  /** Updates demande */
  update(id: string, payload: UpdateDemandePayload): Observable<Demande> {
    return this.http.patch<Demande>(`${this.apiUrl}/${id}`, payload);
  }

  /** Changes the demande status */
  changeStatus(id: string, status: DemandeStatus): Observable<Demande> {
    return this.http.patch<Demande>(`${this.apiUrl}/${id}/status`, { status });
  }

  /** Soft deletes a demande */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}