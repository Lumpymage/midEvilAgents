import Phaser from 'phaser';
import NPC from '../assets/agents/NPC';
import Building from '../assets/buildings/Building';
import Player from '../assets/agents/Player';

export default class MainScene extends Phaser.Scene {
    private npcs: NPC[] = [];
    private buildings: Building[] = [];
    private player!: Player;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('Philip', 'src/assets/sprites/npcs/player5.png');
        this.load.image('Jen', 'src/assets/sprites/npcs/player1.png');
        this.load.image('Lindsey', 'src/assets/sprites/npcs/player2.png');
        this.load.image('Robert', 'src/assets/sprites/npcs/player4.png');
        this.load.image('inn', 'src/assets/sprites/bldgs/inn.png');
        this.load.image('armoury', 'src/assets/sprites/bldgs/armoury.png');
        this.load.image('hospital', 'src/assets/sprites/bldgs/hospital.png');
        this.load.image('supplyStore', 'src/assets/sprites/bldgs/supplyStore.png');
        this.load.image('saloon', 'src/assets/sprites/bldgs/saloon.png');
    }

    create() {
        const playerX = this.game.config.width as number / 2;
        const playerY = this.game.config.height as number / 2;
        this.player = new Player(this, playerX, playerY, 'Philip');
        this.player.setDepth(1);
        const npcKeys = ['Jen', 'Lindsey', 'Robert'];
        const bldgKeys = ['inn', 'armoury', 'hospital', 'supplyStore', 'saloon'];
        const bldgPositions = [
            { x: 100, y: 100 },
            {x: this.game.config.width as number - 100, y: 100},
            {x: 100, y: this.game.config.height as number - 100},
            {x: this.game.config.width as number - 100, y: this.game.config.height as number - 100},
            {x: this.game.config.width as number / 2, y: this.game.config.height as number / 2}
        ];
        

        const personalities = ['only interested in cross stitching', 'angry for no good reason', 'hungry, very very hungry', 'always answers with a question'];
    
        for (let i = 0; i < npcKeys.length; i++) {
            const x = Phaser.Math.Between(0, this.game.config.width as number);
            const y = Phaser.Math.Between(0, this.game.config.height as number);
            const npc = new NPC(this, x, y, npcKeys[i], personalities[i % personalities.length]);
            npc.setDepth(1);
            this.npcs.push(npc);
        }

        for (let i = 0; i < bldgPositions.length; i++) {
            let x = bldgPositions[i].x;
            let y = bldgPositions[i].y;
            
            const bldg = new Building(this, x, y, bldgKeys[i]);
            bldg.setDepth(0);
            this.buildings.push(bldg);
        }

        this.handleOpenAIInteractions();
        
    }

    async handleOpenAIInteractions() {
        const playerInput = await this.player.initInput();
        for (let npc of this.npcs) {
            const npcResponse = await npc.getResponse(playerInput as string);
            console.log(npcResponse);
        }
        // Call this method again after getting all responses
        this.handleOpenAIInteractions();
    }
    
    update() {
        this.npcs.forEach(npc => npc.update());
        this.player.update();
    } 

    getPlayer() {
        return this.player;
    }
}