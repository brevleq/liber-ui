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

export enum ReportType {
    PSYCHIATRIC = 'PSYCHIATRIC',
    PSYCHOLOGICAL = 'PSYCHOLOGICAL',
    SOCIAL = 'SOCIAL',
    DENTAL = 'DENTAL'
}

export enum ReportStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
}

export class Report {
    public id: number;
    public type: ReportType;
    public status: ReportStatus;
    public title: string;
    public content: string;
    public patientId: number;
    public authorId: number;
    public authorFirstName: string;
    public authorLastName: string;
    public createdDate: any;
}
