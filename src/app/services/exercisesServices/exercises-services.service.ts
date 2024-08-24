import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesServicesService {

  constructor(private http: HttpClient) { }
  getExercisesByCategoryId(catId: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Exercise/GetExercisesByCategoryId`, {
      params: { CatId: catId }
    })   
  }

  deleteExercise(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/Exercise/DeleteExercise`, {
      params: { Id: id },
      responseType: 'text' as 'json'
    });
  }

addExercise(
  exerciseName: string,
  imageFile: File,
  description: string,
  exerciseLink: string,
  exerciseType: string,
  categoryId: number
):Observable<any> {
  const formData = new FormData();
  formData.append('img', imageFile);

  const url = `${environment.apiUrl}/api/Exercise/AddExercise?` +
              `Name=${encodeURIComponent(exerciseName)}` +
              `&Description=${encodeURIComponent(description)}` +
              `&ExerciseLink=${encodeURIComponent(exerciseLink)}` +
              `&ExerciseType=${encodeURIComponent(exerciseType)}` +
              `&CategoryId=${categoryId}`;

  return this.http.post(url, formData);
}


  updateExercise(exerID:any,exerciseName: string,
  updatedimageFile: File,
  description: string,
  exerciseLink: string,
  exerciseType: string,
  categoryId: number):Observable<any>{
    const formData = new FormData();
    updatedimageFile && formData.append('img', updatedimageFile);
     const url = `${environment.apiUrl}/api/Exercise/UpdateExercise?` +
              `Name=${encodeURIComponent(exerciseName)}` +
              `&Description=${encodeURIComponent(description)}` +
              `&ExerciseLink=${encodeURIComponent(exerciseLink)}` +
              `&ExerciseType=${encodeURIComponent(exerciseType)}` +
              `&CategoryId=${categoryId}`+`&id=${exerID}`;
    return this.http.put(url, formData)
  }

sendExLinkst(payload: { links: string[], clientNumber: string }): Observable<any> {
    const url = `${environment.apiUrl}/api/Whatsapp/SendLinksToClient`;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.post(url, payload, { headers });
}





     getFilteredExercises(categoryId?: any, exerciseType?: any, pageNumber?: number, pageSize?: number): Observable<any> {
    let params = new HttpParams();
    
    if (categoryId !== undefined) {
      params = params.append('CategoryId', categoryId);
    }
    if (exerciseType) {
      params = params.append('ExerciseType', exerciseType);
    }
    if (pageNumber !== undefined) {
      params = params.append('PageNumber', pageNumber);
    }
    if (pageSize !== undefined) {
      params = params.append('PageSize', pageSize);
    }

    return this.http.get(`${environment.apiUrl}/api/Exercise/GetFilteredExercises`, { params });
  }
  
}
