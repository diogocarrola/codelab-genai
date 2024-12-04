import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth();
const project = await auth.getProjectId();

const getAnimalFacts = async (animal: string): Promise<string> => {

    const vertex = new VertexAI({ project: project });
    const generativeModel = vertex.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });

    const prompt = `Give me 10 fun facts about ${animal || 'dog'}. 
            Return as json as an array in the format ['fact 1', 'fact 2']
            Remove backticks and other markdown formatting.`;
    const resp = await generativeModel.generateContent(prompt);

    if (!resp.response.candidates) {
        throw new Error('Did not receive response candidates.')
    }

    console.log({ text: resp.response.candidates[0].content.parts[0].text })

    return JSON.stringify(JSON.parse(resp.response.candidates[0].content.parts[0].text || '[]'));
}

export async function GET({ url }:{ url:URL}): Promise<Response> {

    let animal: string = url.searchParams.get('animal') || 'dog';

    const animalFacts = await getAnimalFacts(animal);

    return new Response(animalFacts, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}