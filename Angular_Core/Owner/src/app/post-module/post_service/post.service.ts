import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class posts {
    private _getAllUrl = "http://localhost:3000/manager-post/getAll";
    private _createUrl = "http://localhost:3000/manager-post/create-post";
    private _getitembyidUrl = "http://localhost:3000/manager-post/getpostbyid";
    private _updateItem = "http://localhost:3000/manager-post/updatepost";

    constructor(private http: HttpClient) { }

    getAll(userid: number): Observable<any> {
        let params = new HttpParams().set('userId', userid);
        let options = { params: params, withCredentials: true };
        return this.http.get<any>(this._getAllUrl, options);
    }

    createPost(data: any): Observable<any> {
        const options = {
            withCredentials: true
        };
        return this.http.post<any>(this._createUrl, data, options)
    }

    getItembyId(id: string): Observable<any> {
        let params = new HttpParams().set('id', id);
        console.log("vào hàm gọi api", id)
        let options = { params: params, withCredentials: true };
        return this.http.get<any>(this._getitembyidUrl, options);
    }

    updatePost(data: any): Observable<any> {
        const options = {
            withCredentials: true
        };
        return this.http.put<any>(this._updateItem, data, options)
    }
}
