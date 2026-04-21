import { describe, expect, it } from "vitest";
import { UnauthorizedActionError } from "@/core/error/unauthorized-action-error";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { ensureOwnership } from "./ensure-ownership";

describe("ensure ownership guard", () => {
    it("should throw a UnauthorizedActionError if id are not the the same", () => {
        const ownerId = UniqueEntityId.create();
        const actorId = UniqueEntityId.create();

        expect(() => ensureOwnership(ownerId, actorId, "Entity")).toThrow(
            UnauthorizedActionError,
        );
    });

    it("should be able to pass if ownerId and actorId are the same", () => {
        const ownerId = UniqueEntityId.create();
        const actorId = UniqueEntityId.fromString(ownerId.toString())
        expect(() => ensureOwnership(ownerId, actorId, "Entity")).not.toThrow(UnauthorizedActionError)
    })
});
