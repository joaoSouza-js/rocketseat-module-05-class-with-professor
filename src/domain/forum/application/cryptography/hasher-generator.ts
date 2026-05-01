export interface HasherGenerator {
    generate(plain: string): Promise<string>

}