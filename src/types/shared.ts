export interface ITitledList<T> {
    [key: string]: Array<T>
}

export type TitledListType<T> = ITitledList<T> & {
    title: string
}
