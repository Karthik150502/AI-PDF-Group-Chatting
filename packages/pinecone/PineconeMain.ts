import { PineconeAbs } from "./pinecone";
import { Pinecone } from "@pinecone-database/pinecone"
import { S3Handler } from "../s3/s3main";
import { convertToASCII, getChunks, prepareDocument } from "./pineconeUtils";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { OpenAiHandler } from "@/packages/openAi/openAiMain";
import { embedDocument } from "./pineconeUtils";

type PDFPage = {
    pageContent: string,
    metadata: {
        loc: {
            pageNumber: number
        }
    }
}


export class PinconeHandler implements PineconeAbs {



    private instance: Pinecone | undefined;
    private s3Client: S3Handler = S3Handler.getInstance();


    getInstance() {
        if (!this.instance) {

            this.instance = new Pinecone({
                apiKey: process.env.PINECONE_API_KEY!
            });
        }
        return this.instance
    }


    public async loadToPinecone(s3filekey: string) {


        const openai = OpenAiHandler.getInstance();

        // 1. Obtain the pdf - Download and read from the pdf
        const fileName = await this.s3Client.downloadFromS3(s3filekey)
        if (!fileName) {
            throw new Error("Could not download from S3.")
        }


        const loader = new PDFLoader(fileName as string)
        // const pages = await loader.pages(); // Deprecated....
        const pages = (await loader.load()) as PDFPage[];



        // 2. Split and segment the PDF..
        const documents = await Promise.all(pages.map(prepareDocument))


        // 3. Vectorise and Embed individual documents
        const vectors = await Promise.all(documents.flat().map(embedDocument))


        // 4. Upload to pinecone 
        const pineconeIndex = this.instance?.Index('pdfchatai')

        const namespace = convertToASCII(fileName as string)





        const chunkedVectors = getChunks(vectors, 10)
        for (const chunk of chunkedVectors) {
            await pineconeIndex?.namespace(namespace).upsert([chunk])
        }
        return documents[0]
    }


    public async getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {


        const pineconeIndex = this.instance?.Index('pdfchatai')
        try {
            const namespace = convertToASCII(fileKey)


            const queryResult = await pineconeIndex?.namespace(namespace).query({
                topK: 3,
                vector: embeddings,
                includeValues: true,
                includeMetadata: true
            });


            console.log('QueriedResult = ', queryResult)
            return queryResult?.matches || []
        } catch (error) {
            console.log("Error in querying the embeddings, ", error)
            throw error
        }
    }


    public async getContext(query: string, fileKey: string) {
        const openai = OpenAiHandler.getInstance()
        const queryEmbeddings = await openai.getEmbeddings(query);

        const matches = await this.getMatchesFromEmbeddings(queryEmbeddings, fileKey);

        const qualifyingDocs = matches.filter(match => match.score && match.score > 0.7)

        type Metadata = {
            text: string,
            pageNumber: number
        }

        console.log("qulifyingDocs = ", qualifyingDocs);
        let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text)
        console.log("docs = ", docs);
        console.log("docs = ", docs.join("\n").substring(0, 3000));

        return docs.join("\n").substring(0, 3000);
    }


} 