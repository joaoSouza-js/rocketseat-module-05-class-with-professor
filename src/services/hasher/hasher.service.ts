import { HasherComparer } from "@/domain/forum/application/cryptography/hasher-comparer"
import { HasherGenerator } from "@/domain/forum/application/cryptography/hasher-generator"
import { Injectable } from "@nestjs/common"
import bycrypt from "bcrypt"

@Injectable()
export class HasherService implements HasherGenerator, HasherComparer {
    async generate(password: string): Promise<string> {
        const salt = await bycrypt.genSalt()
        const hashedPassword = await bycrypt.hash(password, salt)
        return hashedPassword
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isValid = await bycrypt.compare(password, hashedPassword)
        return isValid
    }
}