"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const MenuScene_1 = __importDefault(require("./scenes/MenuScene"));
// import your game scene here, too
const config = {
    type: phaser_1.default.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [MenuScene_1.default],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};
const game = new phaser_1.default.Game(config);
