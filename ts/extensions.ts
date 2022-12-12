type Stats = {
    [value: string]: any;
}

type Config = {
    [value: string]: number;
}

type Settings ={
    [value: string]: number;
}

type EventBox ={
    [value: string]: EventFunction;
}

type EventFunctionOthers = {
    readonly fruitThis: Entity;
    [value:string] : any
}

type EventFunction = (
    GameSettigns: Settings,
    GameConfig: Config,
    others: EventFunctionOthers) => void

type Board = [
    row: Array<any>
]

type EventName = "collision" | "keyboardUse" | "endGame"