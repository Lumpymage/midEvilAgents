import Phaser from 'phaser';
import { Configuration, OpenAIApi } from 'openai';

export default class NPC extends Phaser.GameObjects.Sprite {
    private openai: OpenAIApi;
    private personality: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, personality: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.personality = personality;

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not defined in the environment');
        }
        const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
        this.openai = new OpenAIApi(configuration);
    }

    async startDialog() {
        const playerInput = prompt('Enter your message');
        if (playerInput !== null) {
            const npcResponse = await this.getResponse(playerInput);
            console.log(npcResponse);
        }
    }

    async getResponse(prompt: string) {
        // Get a response from the OpenAI API based on the provided prompt
        const completion = await this.openai.createChatCompletion({
            model: 'gpt-4-0613', // or your desired model
            messages: [
                { role: 'system', content: this.personality },
                { role: 'user', content: prompt },
                { role: 'system', content: 'Respond in the context of recent events nown by the character.' },
            ],
        });

        if (!completion.data.choices[0]?.message?.content) {
            throw new Error('No completion returned from OpenAI');
        }

        // Return the assistant's response
        return completion.data.choices[0].message.content;
    }
}
