import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { nanoid } from '@reduxjs/toolkit'
import { useDebounce } from '../../hooks/useDebounce';

import { 
    selectColumnsByBoardId,
    selectAllTasks,
    fetchBoard,
    addTask,
    patchTask,
    deleteTask,
    addColumn,
    deleteColumn,
    dragTask,
    selectAllBoardsById
} from '../../redux/slices/boardsSlice';

import Board from '../../components/Board';


const BoardContainer:React.FC = () => {

    const dispatch = useDispatch();

    const [dragable, setDragable] = useState('');
    
    const { id } = useParams<{id: string}>()

    const allTasks = useSelector(selectAllTasks);
    const columns = useSelector((state: any) => selectColumnsByBoardId(state, id));

    const board = useSelector((state: any) => selectAllBoardsById(state, id))

    const getTasks = (id: string) => allTasks.filter(task => task.columnId === id);

    const addTaskHandler = (id: string) => {
        dispatch(addTask({
            id: nanoid(),
            columnId: id,
            title: ''
        }))
    };

    const deleteTaskHandler = (id: string) => dispatch(deleteTask({id}));

    const patchTaskHandler = useDebounce((id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(patchTask({
            id,
            changes: { title: e.target.value }
        }))
    }, 500)

    const addColumnHandler = () => {
        dispatch(addColumn({
            id: nanoid(),
            boardId: id,
            title: ''
        }))
    };

    const deleteColumnHandler = (id: string) =>  dispatch(deleteColumn({id}));

    useEffect(() => {
       dispatch(fetchBoard());
    }, [])

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        setDragable(id)
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
        e.preventDefault();

        setDragable('')

        dispatch(dragTask({
            columnId,
            id: dragable,
            changes: { columnId }
        }))
    }
    
    return board ? (
        <Board
            columns={columns}
            getTasks={getTasks}
            
            addTaskHandler={addTaskHandler}
            deleteTaskHandler={deleteTaskHandler}
            patchTaskHandler={patchTaskHandler}

            addColumnHandler={addColumnHandler}
            deleteColumnHandler={deleteColumnHandler}
            
            dragStartHandler={dragStartHandler}
            dropHandler={dropHandler}
            dragOverHandler={dragOverHandler}
        />
    ) : (<div>Board Not Found</div>)
}

export default BoardContainer;
