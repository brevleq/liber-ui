import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from "./crud.service";
import {CommonClassifier} from "../model/common-classifier.model";

@Injectable({
    providedIn: 'root'
})
export class DocumentTypeService extends CrudService<CommonClassifier> {
    constructor(http: HttpClient) {
        super(http, 'api/document-types');
    }
}