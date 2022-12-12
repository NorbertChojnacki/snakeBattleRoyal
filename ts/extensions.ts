type Identifier = Record<string, string>

type Config = Record<string, number>

type Settings = Record<string, number>

type EventBox = Record<string, EventFunction>

type EventFunctionOthers = {
    readonly entityThis: Entity;
    [value:string] : any
} 
type EventFunction = (
    GameSettigns: Settings,
    GameConfig: Config,
    others: EventFunctionOthers) => Settings

type Board = [
    row: Array<any>
]

type EventName = "collision" | "keyboardUse" | "endGame" | "touch"