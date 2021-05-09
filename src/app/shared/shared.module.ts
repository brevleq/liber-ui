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

import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {IonicModule} from '@ionic/angular';
import {SharedLibsModule} from './shared-libs.module';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {EventManager} from './services/event.manager.service';
import {CurrencyPipe} from '@angular/common';
import {LoadingService} from './services/loading.service';
import {LoadingInterceptor} from "./blocks/interceptor/loading.interceptor";
import {FormValidationDirective} from "./directives/form-validation.directive";
import {ModalSelectComponent} from "./components/select/modal-select.component";
import {CommonClassifierModal} from "./components/modals/common-classifier.modal";

@NgModule({
    imports: [
        HttpClientModule,
        SharedLibsModule,
        IonicModule
    ],
    declarations: [
        CommonClassifierModal,
        ModalSelectComponent,
        FormValidationDirective,
        HasAnyAuthorityDirective,
    ],
    exports: [
        CommonClassifierModal,
        ModalSelectComponent,
        FormValidationDirective,
        HasAnyAuthorityDirective,
        SharedLibsModule
    ],
    providers: [
        CurrencyPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
            deps: [LoadingService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                EventManager
            ]
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
