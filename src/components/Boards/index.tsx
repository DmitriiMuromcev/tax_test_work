import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './style.sass';
import { IBoardEntity } from '../../types/boards';

import Row from '../shared/Row';

interface IBoards {
    boards: Array<IBoardEntity>
    path: string
}

const Boards:React.FC<IBoards> = props => {

    const {
        boards,
        path
    } = props

    return (
        <Row className="boards">
            { 
                 boards.map(board => (
                    <Link
                        className="boards__item"
                        key={board.id}
                        to={`${path}/${board.id}`}
                    >
                        {board.title}
                    </Link>
                ))
            }

        </Row>
    );
}

export default Boards;