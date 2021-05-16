import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonClassifier} from "../model/common-classifier.model";
import {QueryService} from "./query.service";

@Injectable({
    providedIn: 'root'
})
export class CityService extends QueryService<CommonClassifier> {
    constructor(http: HttpClient) {
        super(http, 'api/cities');
    }
}
