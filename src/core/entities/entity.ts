import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<T> {
    private _id: UniqueEntityId
    protected props: T

    protected constructor(props: T, _id?: UniqueEntityId) {
        const id = _id ?? UniqueEntityId.create()
        this._id = id
        this.props = props
    }

    public equals(entity?: Entity<T>): boolean {
        if (entity === this) return true
        if (entity?._id.equals(this._id)) return true
        return false
    }


    get id() { return this._id }

}