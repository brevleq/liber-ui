import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from "./crud.service";
import {Patient} from "../model/patient.model";

@Injectable({
    providedIn: 'root'
})
export class PatientService extends CrudService<Patient> {
    constructor(http: HttpClient) {
        super(http, 'api/patients');
    }
}
