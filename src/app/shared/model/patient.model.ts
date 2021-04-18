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
 * anumber with Liber UI.  If not, see <https://www.gnu.org/licenses/>
 */

export class Patient {

    public id: number;
    public name: String;
    public receptionDate: any;
    public birthDate: any;
    public sex: string;
    public birthPlaceId: number;
    public motherName: String;
    public fatherName: String;
    public maritalStatusId: number;
    public scholarityId: number;
    public professionId: number;
    public working: Boolean;
    public addressStreet: String;
    public addressNeighborhood: String;
    public addressNumber: String;
    public addressComplement: String;
    public addressZip: String;
    public addressCityId: number;
}
