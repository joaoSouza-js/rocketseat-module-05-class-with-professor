import { ResourceNotFoundError } from "@/core/error/resource-not-found-error"

export function ensureExists<T>(
    value: T | null | undefined,
    resourceName: string,
    data?: string
): T {
    if (value == null) {

        throw new ResourceNotFoundError(resourceName, data)
    }

    return value
}