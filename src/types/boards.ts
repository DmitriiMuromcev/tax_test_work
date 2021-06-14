export interface IBoardEntity {
    id: string
    title: string
}

export interface IColumnEntity {
    id: string
    title: string
    boardId: string
}

export interface ITaskEntity {
    id: string
    title: string
    columnId: string  
}