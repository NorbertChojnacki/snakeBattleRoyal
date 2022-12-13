type Identifier = Record<string, string>

type Config = Record<string, number>

type Settings = Record<string, number>

type EventBox = Record<string, EventFunction>

type Board = [
    row: Array<Entity> 
]| any

type EventFunctionOthers = {
    [value:string] : any
} 
type EventFunction = (
    GameSettigns: Settings,
    GameConfig: Config,
    others: EventFunctionOthers) => Settings

type EventName = "collision" | "keyboardUse" | "endGame" | "touch" | "hit" | "move"