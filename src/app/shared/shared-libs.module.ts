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

import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NgxWebstorageModule} from "ngx-webstorage";
import locale from '@angular/common/locales/pt';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        NgxWebstorageModule.forRoot({prefix: 'liber', separator: '-'}),
        TranslateModule.forChild()
    ],
    providers: [{
        provide: LOCALE_ID,
        useValue: 'pt'
    }],
    exports: [
        FormsModule,
        HttpClientModule,
        TranslateModule,
        CommonModule,
    ]
})
export class SharedLibsModule {
    constructor() {
        registerLocaleData(locale);
    }
}
