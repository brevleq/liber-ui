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
import {LocalStorageService} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
    selector: 'language-page',
    templateUrl: './language.page.html',
    styleUrls: ['./language.page.scss'],
})
export class LanguagePage {
    language: string;

    constructor(private localStorage: LocalStorageService,
                private router: Router,
                private translate: TranslateService) {
        this.language = this.localStorage.retrieve('preferredLanguage');
        if (!this.language)
            this.language = 'en';
    }

    changedLanguage(event: any) {
        console.log('changed -> ', this.language);
        this.translate.use(this.language);
    }

    save() {
        this.localStorage.store('preferredLanguage', this.language);
        this.router.navigateByUrl('/');
    }
}
