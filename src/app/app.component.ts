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

import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(private translate: TranslateService,
                private router: Router,
                private localStorage: LocalStorageService) {
        translate.use(this.getPreferredLanguage())
    }

    private getPreferredLanguage(): string {
        const preferredLanguage = this.localStorage.retrieve('preferredLanguage');
        if (!preferredLanguage) {
            this.router.navigateByUrl('/choose-language');
            return 'en';
        }
        return preferredLanguage;
    }
}
