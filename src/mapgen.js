export class map{
    constructor(mapWidth, mapHeight, MAP = null){
        this.width = mapWidth
        this.height = mapHeight
        if(MAP != null){
            this.MAP = MAP;
        }
    };
    get seed(){
        var world = require('./json/world.json')

        console.log(world.seed)
    };

    export function islandize(mapWidth , mapHeight, x, y){
        let mapElev = 7;
    };
}
