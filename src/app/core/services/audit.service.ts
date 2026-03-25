import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../models/audit-log.model';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Returns the full audit trail for a demande, oldest entry first.
   */
  getByDemandeId(demandeId: string): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.apiUrl}/demandes/${demandeId}/audit`,
    );
  }
}
