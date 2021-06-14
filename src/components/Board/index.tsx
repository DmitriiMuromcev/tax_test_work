import React from 'react';
import { IColumnEntity, ITaskEntity } from '../../types/boards';

import './style.sass';

import Row from '../shared/Row';
import Column from '../shared/Column';

interface IBoard {
    columns: Array<IColumnEntity>
    getTasks: (id: string) => Array<ITaskEntity>

    addTaskHandler: (id: string) => void
    deleteTaskHandler: (id: string) => void
    patchTaskHandler: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void

    addColumnHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
    deleteColumnHandler: (id: string) => void

    dragStartHandler: (e: React.DragEvent<HTMLDivElement>, id: string) => void
    dropHandler: (e: React.DragEvent<HTMLDivElement>, id: string) => void
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>, id: string) => void
}

const Board:React.FC<IBoard> = props => {
    
    const {
        columns,
        getTasks,
        addTaskHandler,
        addColumnHandler,
        patchTaskHandler,
        deleteTaskHandler,
        deleteColumnHandler,
        dragStartHandler,
        dropHandler,
        dragOverHandler
    } = props

    return (
        <Row className="board">
            {
                columns.map(column => (

                    <Column className="board__column" key={column.id}>
                        <div className="board__column-title">{column.title}</div>

                        {
                            getTasks(column.id).map(task => (
                                <div
                                    className="task" 
                                    key={task.id}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, task.id)}
                                    onDragOver={(e) => dragOverHandler(e, column.id)}
                                    onDrop={(e) => dropHandler(e, task.id)}

                                >
                                    <input
                                        type="text" 
                                        className="task__input" 
                                        placeholder="Task name"
                                        defaultValue={task.title}
                                        onChange={(e) => patchTaskHandler(task.id, e)}
                                    />
                                    <button 
                                        className="delete-icon"
                                        onClick={() => deleteTaskHandler(task.id)}
                                    >
                                        +
                                    </button>
                                </div>
                            ))
                        }
                        
                        <button 
                            className="board__button"
                            onClick={() => addTaskHandler(column.id)}
                        >
                            Add task
                        </button>
                        
                        <button 
                            className="delete-icon"
                            onClick={() => deleteColumnHandler(column.id)}
                        >
                            +
                        </button>

                    </Column>
                ))
            }
            
            <button 
                className="board__button_add-column"
                onClick={addColumnHandler}
                >
                Add column
            </button>
        </Row>
    );
}

export default Board;