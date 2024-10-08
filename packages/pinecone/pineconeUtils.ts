import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter"
import { PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { OpenAiHandler } from "@/packages/openAi/openAiMain";
import md5 from "md5";




type PDFPage = {
    pageContent: string,
    metadata: {
        loc: {
            pageNumber: number
        }
    }
}


export const truncateStringByBytes = (s: string, bytes: number) => {
    const encoding = new TextEncoder()
    return new TextDecoder('utf-8').decode(encoding.encode(s).slice(0, bytes))
}



export async function prepareDocument(page: PDFPage) {
    let { pageContent, metadata } = page;

    pageContent = pageContent.replaceAll(/\n/g, "")


    // Splitting the doc

    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ])


    console.log("Documents from RecursiveCharacterTextSplitter = ", docs)
    console.log("Length of the document = ", docs.length)

    return docs;
}


export async function embedDocument(doc: Document) {

    try {
        const openai = OpenAiHandler.getInstance();
        const embeddings = await openai.getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)
        const result = {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        } as PineconeRecord<RecordMetadata>
        console.log(result)
        return result
    } catch (error) {
        console.log("Error embedding the document ", error)
        throw error
    }
}




export function convertToASCII(s: string) {
    // Remove all non-ASCII characters
    const asciiString = s.replace(/[^\x00-\x7F]+/g, "")
    return asciiString;
}


export const getChunks = (array: PineconeRecord<RecordMetadata>[], batchSize: number = 10) => {
    const chunks: PineconeRecord<RecordMetadata>[] = [];

    for (let i = 0; i < array.length; i += batchSize) {
        // chunks.push(array.slice(i, i + batchSize));
        chunks.push(array[i]);
    }

    return chunks;
};
