export type ObjectParams = {
    Bucket: string,
    Key: string,
    Body: File
}

export abstract class S3 {
    public static uploadObject(params: ObjectParams): void { }
    public static deletObject(): void { }
    public static getUrl(fileKey: string) { }
    public static downloadFromS3(fileKey: string) { }
}