import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from "./crud.service";
import {Report} from "../model/report.model";

@Injectable({
    providedIn: 'root'
})
export class ReportService extends CrudService<Report> {
    constructor(http: HttpClient) {
        super(http, 'api/reports');
    }
}
