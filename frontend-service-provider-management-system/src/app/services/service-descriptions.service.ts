import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceDescriptionsService {

  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

  getAllServiceDescriptions(page: number, size: number): Observable<{ descriptions: string[], totalPages: number }> {
    return this.http.get<any>(`${this.apiUrl}/service-descriptions?page=${page}&size=${size}`).pipe(
      map(response => ({
        descriptions: response.content,
        totalPages: response.totalPages
      }))
    );
  }
}
