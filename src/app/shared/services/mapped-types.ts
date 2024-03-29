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

import {Type} from "@angular/core";
import {MaritalStatusService} from "./marital-status.service";
import {ScholarityService} from "./scholarity.service";
import {ProfessionService} from "./profession.service";
import {CityService} from "./city.service";
import {DocumentTypeService} from "./document-type.service";
import {ReleaseReasonService} from "./release-reason.service";

export const mappedTypes = new Map<String, Type<any>>();
mappedTypes.set("MaritalStatusService", MaritalStatusService);
mappedTypes.set("ScholarityService", ScholarityService);
mappedTypes.set("ProfessionService", ProfessionService);
mappedTypes.set("CityService", CityService);
mappedTypes.set("DocumentTypeService", DocumentTypeService);
mappedTypes.set("ReleaseReasonService", ReleaseReasonService);
