import { S3 } from "./s3";
import AWS from "aws-sdk";
import { writeFileSync } from "fs";



export class S3Handler implements S3 {
    static instance: S3Handler | undefined;
    static s3Instance: AWS.S3;

    private constructor() {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        })
        S3Handler.s3Instance = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
            },
            region: process.env.NEXT_PUBLIC_AWS_REGION
        })
    }


    public static getInstance() {
        if (!S3Handler.instance) {

            S3Handler.instance = new S3Handler();

        }
        return S3Handler.instance;
    }


    public async uploadObject(file: File): Promise<{
        fileKey: string, fileName: string
    }> {




        const fileKey = "uploads/" + Date.now().toString() + file.name.replaceAll(" ", "-")
        let params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileKey,
            Body: file
        }
        const upload = S3Handler.s3Instance?.putObject(params).on("httpUploadProgess", () => {
            console.log("Uploading to s3...");
        }).promise()

        await upload?.then((data) => {
            console.log(data)
            console.log(`${params.Key} uploaded successfully.`)
        })
        return Promise.resolve({
            fileKey,
            fileName: file.name
        })
    }


    public async deletObject(): Promise<void> {

    }

    public getUrl(fileKey: string): string {
        const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`
        return url
    }

    public async downloadFromS3(fileKey: string): Promise<string | boolean> {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileKey,
        }
        try {
            const obj = await S3Handler.s3Instance?.getObject(params).promise()
            const fileName = `/tmp/pdf-${Date.now()}.pdf`;
            writeFileSync(fileName, obj?.Body as Buffer as NodeJS.ArrayBufferView)
            return fileName
        } catch (e) {
            console.log(e);
            return false
        }
    }

}