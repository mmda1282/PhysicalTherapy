
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Category/GetAllCategories`);
  }
  
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/Category/DeleteCategory`, {
      params: { Id: id },
      responseType: 'text' as 'json'
    });
  }
  addCategory(categoryName: string, imageFile: File) {
    const formData = new FormData();
    formData.append('img', imageFile);
    const url = `${environment.apiUrl}/api/Category/AddCategory?CategoryName=${encodeURIComponent(categoryName)}`;
    return this.http.post(url, formData);
  }
  updateCategory(categoryId: any, updatedCategoryName: string, updatedimageFile: File) {
    const formData = new FormData();
    formData.append('img', updatedimageFile);
    const url = `${environment.apiUrl}/api/Category/UpdateCategory?CategoryName=${encodeURIComponent(updatedCategoryName)}&id=${encodeURIComponent(categoryId)}`;
    return this.http.put(url, formData)
  }

}

