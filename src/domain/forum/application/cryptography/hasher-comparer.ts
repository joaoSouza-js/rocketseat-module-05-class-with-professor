export interface HasherComparer {
    compare(plain: string, hash: string): Promise<boolean>
}