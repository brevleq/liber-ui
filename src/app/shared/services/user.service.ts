import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {CrudService} from "./crud.service";
import {SERVER_API_URL} from "../constants/app.constants";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService extends CrudService<User> {
    constructor(http: HttpClient) {
        super(http, 'api/users');
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    findById(id: number): Observable<HttpResponse<User>> {
        return this.http.get<User>(SERVER_API_URL + `${this.resourceUrl}/by-id/${id}`, {observe: 'response'});
    }

    resetPassword(id: number): Observable<HttpResponse<void>> {
        return this.http.put<void>(SERVER_API_URL + `${this.resourceUrl}/reset-password/${id}`, {}, {observe: 'response'});
    }

    activate(id: number): Observable<HttpResponse<void>> {
        return this.http.put<void>(SERVER_API_URL + `${this.resourceUrl}/activate/${id}`, {}, {observe: 'response'});
    }

    deactivate(id: number): Observable<HttpResponse<void>> {
        return this.http.put<void>(SERVER_API_URL + `${this.resourceUrl}/deactivate/${id}`, {}, {observe: 'response'});
    }


}
