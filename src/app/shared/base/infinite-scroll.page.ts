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

import {HttpResponse} from '@angular/common/http';
import {EventManager} from '../services/event.manager.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ITEMS_PER_PAGE} from '../constants/app.constants';
import {IQueryService} from '../services/iquery.service';

export abstract class InfiniteScrollPage<T> implements OnDestroy {

    itemsPerPage: number;
    totalItems: number;
    page: number;
    items: T[];
    filter: string;
    filtering = false;
    isLoading = true;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    protected subscriber: any;
    protected subscription: Subscription;
    private refreshTarget;

    protected constructor(protected queryService: IQueryService<T>,
                          protected eventManager: EventManager,
                          protected queryObject: any) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        if (this.eventManager) {
            this.subscriber = eventManager.subscribe('sucesso', () => {
                this.cleanLoad();
            });
        }
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.cleanLoad();
    }

    refresh(event) {
        this.isLoading = true;
        this.refreshTarget = event.target;
        this.filtering = true;
        this.cleanLoad();
    }

    loadAll() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.queryObject.page = this.page - 1;
        this.queryObject.size = this.itemsPerPage;
        this.queryObject.filter = !this.filter ? '' : this.filter;
        this.queryObject.filtering = this.filtering ? this.filtering : null;
        this.subscription = this.queryService.query(this.queryObject).subscribe(
            (res: HttpResponse<T[]>) => this.onLoadSuccess(res.body, res.headers),
            (error) => this.onLoadError(error),
            () => this.completeRefresher()
        );
    }

    public abstract trackById(index, item: T): any;

    loadPage() {
        if (this.hasMore()) {
            this.page++;
            this.loadAll();
        } else {
            this.completeInfiniteScroll();
        }
    }

    onFilterInput() {
        this.filtering = true;
        this.cleanLoad();
    }

    ngOnDestroy(): void {
        if (this.eventManager) {
            this.eventManager.destroy(this.subscriber);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected cleanLoad() {
        this.page = 1;
        this.items = [];
        this.loadAll();
    }

    protected onLoadSuccess(data, headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.items = this.items.concat(data);
        this.completeInfiniteScroll();
    }

    protected onLoadError(error) {
        console.log(error);
    }

    protected hasMore() {
        return !this.totalItems || this.totalItems > this.items.length;
    }

    private completeInfiniteScroll(): void {
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = !this.hasMore();
        }
    }

    protected completeRefresher() {
        this.isLoading = false;
        if (this.refreshTarget) {
            this.refreshTarget.complete();
            this.refreshTarget = null;
            this.filtering = false;
        }
    }
}
