import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { 
    fetchBoards, 
    selectAllBoards
} from '../../redux/slices/boardsSlice';

import Boards from '../../components/Boards';

const BoardsContainer:React.FC = () => {
    const dispatch = useDispatch()
    
    const boards = useSelector(selectAllBoards);

    const { path } = useRouteMatch();

    useEffect(() => {
        dispatch(fetchBoards());
    }, [])

    return (
        <Boards
            boards={boards}
            path={path}
        />
    );
}

export default BoardsContainer;
