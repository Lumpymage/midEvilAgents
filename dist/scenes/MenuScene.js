"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
class MenuScene extends phaser_1.default.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    preload() {
        // Load any assets here
    }
    create() {
        // Here, we'll create our menu
        this.add.text(100, 100, 'MidEvil Agents', { color: '#0f0' });
        const playButton = this.add.text(100, 200, 'Play', { color: '#0f0' });
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            // Start the game scene
            this.scene.start('GameScene');
        });
    }
}
exports.default = MenuScene;
