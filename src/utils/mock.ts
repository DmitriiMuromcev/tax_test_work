export const fetchMockBoards = () => {

    const boardsMock = {
    
        "boards": [
            {
                "id": "GhK4L6l0kq",
                "title": "Board title",
            },
            {
                "id": "gdasgd7213",
                "title": "Board title2"
            }
        ]
    };
    return new Promise(resolve => setTimeout(() => resolve(boardsMock), 50))
}

export const fetchMockBoard = () => {
    const boardMock = {
        "columns": [
            {
                "boardId": "GhK4L6l0kq",
                "id": "column1",
                "title": "Column title",
            },
            {
                "boardId": "gdasgd7213",
                "id": "column2",
                "title": "Column title2",
            },
            {
                "boardId": "gdasgd7213",
                "id": "column3",
                "title": "Column title3",    
            }
        ],
    
        "tasks": [
            {   
                "id": "taskid1",
                "columnId": "column1",
                "title": "Task title"
            },
            {   
                "id": "taskid2",
                "columnId": "column1",
                "title": "Task title2"
            },
            {   
                "id": "taskid3",
                "columnId": "column1",
                "title": "Task title3"
            },
            {   
                "id": "taskid4",
                "columnId": "column2",
                "title": "Task title4"
            }
        ]
    
    };

    return new Promise(resolve => setTimeout(() => resolve(boardMock), 50))

}