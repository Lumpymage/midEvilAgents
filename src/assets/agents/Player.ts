import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
    private targetPosition: Phaser.Math.Vector2 | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Add the player to the scene
        scene.add.existing(this);

        this.initInput();
    }

    initInput(): Promise<string> {
        return new Promise(resolve => {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.style.position = 'absolute';
            inputField.style.bottom = '20px';
            inputField.style.left = '20px';
            inputField.style.display = 'none';
            document.body.appendChild(inputField);
            
            
        if (this.scene &&this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
                // If the key pressed was 'Q', show the input field
                if (event.key === 'q' || event.key === 'Q') {
                    inputField.style.display = 'block';
                    inputField.focus();
                }
    
                // If the key pressed was Enter, resolve the promise with the input field's value and hide the input field
                if (event.key === 'Enter' && document.activeElement === inputField) {
                    resolve(inputField.value);
                    inputField.value = '';
                    inputField.style.display = 'none';
                }
            });
        }
    
            this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                const clickedObjects = this.scene.input.hitTestPointer(pointer);
                for (let object of clickedObjects) {
                    const gameObject = object as Phaser.GameObjects.GameObject;
                    if (gameObject instanceof Phaser.GameObjects.Sprite && 'startDialog' in gameObject) {
                        (gameObject as any).startDialog();
                        this.targetPosition = null;
                        return;
                    }
                }
                this.targetPosition = pointer.position.clone();
            });
        });
    }
                    
    update() {
        if (this.targetPosition) {
            const speed = 1; // Replace with desired player speed
            const direction = this.targetPosition.clone().subtract(new Phaser.Math.Vector2(this.x, this.y)).normalize();
            this.x += direction.x * speed;
            this.y += direction.y * speed;

            // Stop moving when close to target position
            if (Phaser.Math.Distance.Between(this.x, this.y, this.targetPosition.x, this.targetPosition.y) < speed) {
                this.targetPosition = null;
            }
        }
    }
}
