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

import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'liber-search-button',
    templateUrl: 'search-button.component.html',
    styleUrls: ['search-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SearchButtonComponent),
        }
    ]
})
export class SearchButtonComponent implements ControlValueAccessor, OnInit {

    checked = false;
    @Input() typingInterval: number;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() change: EventEmitter<string> = new EventEmitter<string>();
    private inputTimeout: any;
    private onChanges: any;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (!this.typingInterval)
            this.typingInterval = 200;
    }

    changeCheck() {
        this.checked = !this.checked;
    }

    registerOnChange(fn: any): void {
        this.onChanges = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        // this.button.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.ngModel = obj;
    }

    dispatchChange() {
        if (this.inputTimeout)
            clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
            this.ngModelChange.emit(this.ngModel);
            this.change.emit(this.ngModel);
        }, this.typingInterval);
    }
}
