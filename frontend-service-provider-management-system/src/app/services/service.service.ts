import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ServiceDTO } from '../dto/service-dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

  getAllServices(page: number, pageSize: number): Observable<ServiceDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceDTO[]>(this.apiUrl, { params });
  }

  getServiceById(id: number): Observable<ServiceDTO> {
    return this.http.get<ServiceDTO>(`${this.apiUrl}/${id}`);
  }

  addService(newService: Partial<ServiceDTO>): Observable<ServiceDTO> {
    return this.http.post<ServiceDTO>(this.apiUrl, newService)
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

  updateService(serviceId: number, updatedService: Partial<ServiceDTO>): Observable<ServiceDTO> {
    return this.http.put<ServiceDTO>(`${this.apiUrl}/${serviceId}`, updatedService);
  }
  

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  searchByDescription(description: string, page: number, pageSize: number): Observable<ServiceDTO[]> {
    const params = new HttpParams()
      .set('description', description)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceDTO[]>(`${this.apiUrl}?description=${description}&page=${page}&size=${pageSize}`).pipe(
      catchError(error => {
        let noResultsMessage = 'Unknown error occurred.';
        if (error.error && error.error.message) {
          noResultsMessage = error.error.message;
        }
        return throwError(noResultsMessage);
      })
    );
  }
  
 searchByProvider(provider: string, page: number, pageSize: number): Observable<ServiceDTO[]> {
    const params = new HttpParams()
      .set('provider', provider)
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<ServiceDTO[]>(`${this.apiUrl}?provider=${provider}&page=${page}&size=${pageSize}`).pipe(
      catchError(error => {
        let noResultsMessage = 'Unknown error occurred.';
        if (error.error && error.error.message) {
          noResultsMessage = error.error.message;
        }
        return throwError(noResultsMessage);
      })
    );
  }
}
