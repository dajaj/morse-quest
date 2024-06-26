import { GameInterface } from "./interface/GameInterface";
import { Camera } from "./system/Camera";
import { GameController } from "./system/GameController";
import { Engine } from "./core/Engine";
import { GameMap } from "./system/GameMap";
import { GameGraphics } from "./system/GameGraphics";
import { Player } from "./system/Player";
import { GameStartWindow } from "./interface/GameStartWindow";

export interface GameParameters {
    heroSprite?: string;
}

export class Game extends Engine {

    private gameMap: GameMap;
    private player: Player;
    private camera: Camera;
    private gameInterface: GameInterface;
    private gameStartWindow: GameStartWindow;

    private fpsLastCallTime: number;
    private fpsLastMeasures: number[] = [];
    private enableDebug = false;

    public static parameters: GameParameters;

    constructor(
        canvasid = 'morsequest',
        parameters: GameParameters = {}
        ) {
        
        Game.parameters = parameters;
        console.log('game parameters', parameters);
        
        super(canvasid);
        
    }

    protected override initCanvas(canvasid: string): boolean {
        if (!super.initCanvas(canvasid)) return false;

        this.gameMap = new GameMap();
        this.player = new Player();
        this.camera = new Camera();
        this.gameInterface = new GameInterface();
        this.gameStartWindow = new GameStartWindow(() => {
            this.engineObjects = []; // it contains only gameStartWindow
            delete this.gameStartWindow;

            this.engineObjects.push(this.gameMap);
            this.engineObjects.push(this.player);
            this.engineObjects.push(this.camera);
            this.engineObjects.push(this.gameInterface);

            this.initRun();
        });

        this.resize();
        
        this.engineObjects.push(this.gameStartWindow);

        return true;
    }

    private initRun(): void {
        // init game parameters
        if (Game.parameters && Game.parameters.heroSprite) {
            console.log('init hero sprite', Game.parameters.heroSprite)
            GameGraphics.imgHero = new Image;
            GameGraphics.imgHero.src = Game.parameters.heroSprite;
        }

        Player.teleport(GameMap.getRandomSpawnPoint());

        this.resize();

        Camera.snap();
    }

    protected override onLoop(): void {
        if (this.enableDebug) {
            this.writeDebug();
        }
    }

    protected override keyPressed(e: KeyboardEvent) {
        super.keyPressed(e);
        if (e.key == '²') {
            this.enableDebug = !this.enableDebug;
        }
    }

    private writeDebug() {
        if (!this.fpsLastCallTime) {
            this.fpsLastCallTime = performance.now();
        }
        const delta = (performance.now() - this.fpsLastCallTime);
        this.fpsLastCallTime = performance.now();
        const fps = Math.floor(1000 / delta);
        this.fpsLastMeasures.push(fps);
        if (this.fpsLastMeasures.length > 200) this.fpsLastMeasures.shift();

        GameGraphics.ctx.save();
        GameGraphics.ctx.translate(5, 5);
        GameGraphics.ctx.font = '11px Arial';
        GameGraphics.ctx.fillStyle = 'green';
        GameGraphics.ctx.textAlign = 'left'
        GameGraphics.ctx.textBaseline = 'top';
        GameGraphics.ctx.fillText('offsetX: ' + Camera.offsetX, 0, 15);
        GameGraphics.ctx.fillText('offsetY: ' + Camera.offsetY, 0, 30);
        GameGraphics.ctx.fillText('playerX: ' + Player.x, 0, 45);
        GameGraphics.ctx.fillText('playerY: ' + Player.y, 0, 60);

        GameGraphics.ctx.fillText('mouseX: ' + GameController.mouseX, 80, 15);
        GameGraphics.ctx.fillText('mouseY: ' + GameController.mouseY, 80, 30);
        GameGraphics.ctx.fillText('mouseTileX: ' + GameController.mouseTileX, 80, 45);
        GameGraphics.ctx.fillText('mouseTileY: ' + GameController.mouseTileY, 80, 60);

        GameGraphics.ctx.fillText('movements frozen: ' + GameInterface.freezeControls, 170, 15);
        GameGraphics.ctx.fillText('player dam reduc: ' + Player.stats.flatDamageReductor, 170, 30);
        
        GameGraphics.ctx.fillText('FPS : ' + fps, 0, 2);
        GameGraphics.ctx.strokeStyle = 'green';
        GameGraphics.ctx.lineWidth = 1;
        for (let i = 0; i<this.fpsLastMeasures.length - 1; i++) {
            GameGraphics.ctx.beginPath();
            GameGraphics.ctx.moveTo(60+i * 3, 70 - this.fpsLastMeasures[i]);
            GameGraphics.ctx.lineTo(60+(i+1) * 3, 70 - this.fpsLastMeasures[i+1]);
            GameGraphics.ctx.stroke();
        }

        GameGraphics.ctx.restore();
    }
}

