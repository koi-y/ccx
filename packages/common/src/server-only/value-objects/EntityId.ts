import * as t from "io-ts";
import mongoose from "mongodb";

import {
	internalProjectEntityId,
	internalUserEntityId,
	InternalEntityId,
	internalHistoryEntityId,
	internalJobEntityId
} from "../codecs";

export type InternalJobEntityId = t.TypeOf<typeof internalJobEntityId>;

export type InternalHistoryEntityId = t.TypeOf<typeof internalHistoryEntityId>;

export type InternalProjectEntityId = t.TypeOf<typeof internalProjectEntityId>;

export type InternalUserEntityId = t.TypeOf<typeof internalUserEntityId>;

export function createEntityId<T extends InternalEntityId>(
	value: mongoose.ObjectId | string
): T {
	return ((typeof value === "string"
		? new mongoose.ObjectId(value)
		: value) as unknown) as T;
}
