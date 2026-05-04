import { HasherComparer } from "@/domain/forum/application/cryptography/hasher-comparer";
import { HasherGenerator } from "@/domain/forum/application/cryptography/hasher-generator";
export class FakeHasher implements HasherGenerator, HasherComparer {
    generate(plain: string): Promise<string> {
        const hash = plain.concat("hashed-password")
        return Promise.resolve(hash)
    }
    compare(plain: string, hash: string): Promise<boolean> {
        const isSame = plain.concat("hashed-password") === hash
        return Promise.resolve(isSame)
    }

}