import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ServiceProviderDTO } from '../dto/service-provider-dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  private apiUrl = 'http://localhost:8080/api/service-providers';

  constructor(private http: HttpClient) { }

  getAllProviders(page: number, pageSize: number): Observable<ServiceProviderDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceProviderDTO[]>(this.apiUrl, { params });
  }

  getServiceProviderById(id: number): Observable<ServiceProviderDTO> {
    return this.http.get<ServiceProviderDTO>(`${this.apiUrl}/${id}`);
  }

  addProvider(newProvider: Partial<ServiceProviderDTO>): Observable<ServiceProviderDTO> {
    return this.http.post<ServiceProviderDTO>(this.apiUrl, newProvider)
      .pipe(
        catchError(error => {
          let invalidCharacter = 'Invalid character.';
          if (error.error && error.error.detail) {
            invalidCharacter = error.error.detail;
          }
          return throwError(invalidCharacter);
        })
      );
  }

  updateServiceProvider(providerId: number, updatedProvider: Partial<ServiceProviderDTO>): Observable<ServiceProviderDTO> {
    return this.http.put<ServiceProviderDTO>(`${this.apiUrl}/${providerId}`, updatedProvider);
  }

  deleteProvider(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  searchByProvider(providerName: string, page: number, pageSize: number): Observable<ServiceProviderDTO[]> {
    const params = new HttpParams()
      .set('provider', providerName)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceProviderDTO[]>(`${this.apiUrl}?provider=${providerName}&page=${page}&size=${pageSize}`).pipe(
      catchError(error => {
        let noResultsMessage = 'No results.';
        if (error.error && error.error.message) {
          noResultsMessage = error.error.message;
        }
        return throwError(noResultsMessage);
      })
    );
  }

  searchByDescription(description: string, page: number, pageSize: number): Observable<ServiceProviderDTO[]> {
    const params = new HttpParams()
      .set('description', description)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceProviderDTO[]>(`${this.apiUrl}?service=${description}&page=${page}&size=${pageSize}`).pipe(
      catchError(error => {
        let noResultsMessage = 'No results.';
        if (error.error && error.error.message) {
          noResultsMessage = error.error.message;
        }
        return throwError(noResultsMessage);
      })
    );
  }
}
