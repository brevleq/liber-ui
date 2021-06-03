/*
 * Copyright (c) 2020 - 2021 Hudson Orsine Assumpção.
 *
 * This file is part of Liber UI.
 *
 * Liber UI is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later
 * version.
 *
 * Liber UI is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Liber UI.  If not, see <https://www.gnu.org/licenses/>
 */

import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {IonButton, ModalController} from "@ionic/angular";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {mappedTypes} from "../../services/mapped-types";
import {CommonClassifierModal} from "../modals/common-classifier.modal";
import {CrudService} from "../../services/crud.service";
import {CommonClassifier} from "../../model/common-classifier.model";

@Component({
    selector: 'liber-modal-select',
    templateUrl: 'modal-select.component.html',
    styleUrls: ['modal-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ModalSelectComponent),
        }
    ]
})
export class ModalSelectComponent implements ControlValueAccessor, OnInit {

    buttonLabel = '';
    @ViewChild(IonButton) button: IonButton;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() crudServiceClass: string;
    @Input() title: string;
    @Input() unavailableIds: [];

    private onChanges: any;
    private crudService: CrudService<CommonClassifier>

    constructor(private elementRef: ElementRef,
                private modalController: ModalController,
                private injector: Injector) {
    }

    ngOnInit(): void {
        this.crudService = this.injector.get(mappedTypes.get(this.crudServiceClass))
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: CommonClassifierModal,
            componentProps: {
                crudService: this.crudService,
                title: this.title,
                unavailableItems: this.unavailableIds ? this.unavailableIds : []
            }
        });
        modal.present();
        const {data} = await modal.onDidDismiss();
        if (data.item) {
            this.buttonLabel = data.item.name;
            this.ngModel = data.item.id;
            this.ngModelChange.emit(this.ngModel);
            this.addClasses();
        }
    }

    registerOnChange(fn: any): void {
        this.onChanges = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.button.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.ngModel = obj;
        if (this.ngModel)
            this.loadedValue();
        else
            this.unloadedValue();
    }

    private loadedValue() {
        if (!this.buttonLabel) {
            this.crudService.find(this.ngModel).subscribe(
                res => {
                    const dto = res.body
                    if (!dto)
                        return;
                    this.buttonLabel = dto.name;
                    this.addClasses();
                }
            );
        }
    }

    private unloadedValue() {
        this.buttonLabel = '';
        this.removeClasses();
    }

    private addClasses() {
        this.elementRef.nativeElement.parentNode.classList.add('item-interactive')
        this.elementRef.nativeElement.parentNode.classList.add('item-select')
        this.elementRef.nativeElement.parentNode.classList.add('ion-activatable')
        this.elementRef.nativeElement.parentNode.classList.add('item-has-value')
        this.elementRef.nativeElement.parentNode.classList.add('ion-touched')
        this.elementRef.nativeElement.parentNode.classList.add('ion-dirty')
        this.elementRef.nativeElement.parentNode.classList.add('ion-valid')
    }

    private removeClasses() {
        this.elementRef.nativeElement.parentNode.classList.remove('item-interactive')
        this.elementRef.nativeElement.parentNode.classList.remove('item-select')
        this.elementRef.nativeElement.parentNode.classList.remove('ion-activatable')
        this.elementRef.nativeElement.parentNode.classList.remove('item-has-value')
        this.elementRef.nativeElement.parentNode.classList.remove('ion-touched')
        this.elementRef.nativeElement.parentNode.classList.remove('ion-dirty')
        this.elementRef.nativeElement.parentNode.classList.remove('ion-valid')
    }
}
