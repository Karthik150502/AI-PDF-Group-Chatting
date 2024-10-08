import { OpenAIApi, Configuration } from "openai-edge";
import { OpanAiAbs } from "./openAi";



export class OpenAiHandler implements OpanAiAbs {
    static openAiClient: OpenAIApi;
    static instance: OpenAiHandler;

    private constructor() {
        const config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY!
        })

        OpenAiHandler.openAiClient = new OpenAIApi(config)
    }


    static getInstance() {
        if (!OpenAiHandler.instance) {
            OpenAiHandler.instance = new OpenAiHandler();
        }
        return OpenAiHandler.instance
    }

    public async getEmbeddings(body: string) {
        // Need to buy the model from OpenAI. For ambeddings to work.
        try {
            const response = await OpenAiHandler.openAiClient.createEmbedding({
                model: 'text-embedding-ada-002',
                input: body.replaceAll(/\n/g, " ")
            })

            const result = await response.json()
            console.log("result, ", result)
            return result.data[0].embedding as number[];


        } catch (error) {
            console.log("Error calling openAI embedding api, ", error)
            throw Error
        }
    }


    public getPrompt(context: string, role: string = 'SYSTEM') {
        return {
            role,
            content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
        `,
        }
    }







}