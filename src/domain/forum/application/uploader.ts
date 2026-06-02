type UploaderParams = {
    body: Buffer
    fileName: string
    mimeType: string
}

export interface Uploader {
    upload(params: UploaderParams): Promise<string>
}