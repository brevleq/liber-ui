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

import {Component, ElementRef, EventEmitter, forwardRef, Injector, Input, Output, ViewChild} from '@angular/core';
import {IonButton, ModalController} from "@ionic/angular";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {mappedTypes} from "../../services/mapped-types";
import {CommonClassifierModal} from "../modals/common-classifier.modal";

@Component({
    selector: 'liber-modal-select',
    template: '<ion-button expand="full" fill="clear" (click)="openModal()">{{buttonLabel}}</ion-button>',
    styles: [':host{width: 100%} ion-button{--padding-end: 0; --padding-start: 0; margin: 0;} .button-inner{justify-content: left}'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ModalSelectComponent),
        }
    ]
})
export class ModalSelectComponent implements ControlValueAccessor {

    buttonLabel = '';
    @ViewChild(IonButton) button: IonButton;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() crudServiceClass: string;
    @Input() title: string;

    private onChanges: any;

    constructor(private elementRef: ElementRef,
                private modalController: ModalController,
                private injector: Injector) {
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: CommonClassifierModal,
            componentProps: {
                crudService: this.injector.get(mappedTypes.get(this.crudServiceClass)),
                title: this.title
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
    }

    private addClasses() {
        this.elementRef.nativeElement.parentNode.classList.add('item-interactive')
        this.elementRef.nativeElement.parentNode.classList.add('item-select')
        this.elementRef.nativeElement.parentNode.classList.add('ion-activatable')
        this.elementRef.nativeElement.parentNode.classList.add('item-has-value')
        this.elementRef.nativeElement.parentNode.classList.add('ion-activated')
        this.elementRef.nativeElement.parentNode.classList.add('ion-touched')
        this.elementRef.nativeElement.parentNode.classList.add('ion-dirty')
        this.elementRef.nativeElement.parentNode.classList.add('ion-valid')
    }
}
