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

import {Component, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {IonButton, ModalController} from "@ionic/angular";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {enabledModals} from "./enabled-modals";

@Component({
    selector: 'liber-modal-select',
    template: '<ion-button expand="full" fill="clear" (click)="openModal()">{{valueLabel}}</ion-button>',
    styles: [':host{width: 100%}'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ModalSelectComponent),
        }
    ]
})
export class ModalSelectComponent implements ControlValueAccessor {

    valueLabel: string = '';
    @ViewChild(IonButton) button: IonButton;
    @ViewChild(ViewContainerRef) viewContainerRef: ViewContainerRef;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() modalClass: any; //ComponentRef

    private onChanges: any;


    constructor(private modalController: ModalController) {
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: enabledModals.get(this.modalClass)
        });
        modal.present();
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
}
