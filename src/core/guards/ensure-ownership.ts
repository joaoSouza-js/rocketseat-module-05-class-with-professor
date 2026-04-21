import { UnauthorizedActionError } from "@/core/error/unauthorized-action-error";
import type { UniqueEntityId } from "../entities/unique-entity-id";



export function ensureOwnership(
    ownerId: UniqueEntityId,
    actorId: UniqueEntityId,
    resourceName: string,
    resourceId?: string
) {
    if (ownerId.equals(actorId) === false) {

        throw new UnauthorizedActionError(resourceName, resourceId);
    }
}
