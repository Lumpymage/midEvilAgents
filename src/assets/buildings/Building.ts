import Phaser from 'phaser';

export default class Building extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Add the NPC to the scene
        scene.add.existing(this);
    }

    update() {
        // Here you can add logic for the building
    }
}