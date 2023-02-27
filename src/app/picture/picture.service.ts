import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { imageUrl } from '../url';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  addImagesToNode(data: any): Observable<any> {
    return this.http.post<any>(imageUrl.upload, data);
  }

  getImages() {
    return this.http.get<any>(imageUrl.list);
  }

  deleteImgFromNode(data: string): Observable<any> {
    return this.http.delete<any>(imageUrl.delete.replace('<PATH>',data));
  }
}
