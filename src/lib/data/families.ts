"use server"

import { sdk } from "@lib/config"

export type FamilyTag = { id: string; value: string }

export async function listFamilies(): Promise<FamilyTag[]> {
	const { families } = await sdk.client.fetch<{ families: FamilyTag[] }>(
		`/store/families`,
		{
			method: "GET",
			// ensure latest tags (we may create missing ones on the fly)
			cache: "no-store",
		}
	)
	return families || []
}


