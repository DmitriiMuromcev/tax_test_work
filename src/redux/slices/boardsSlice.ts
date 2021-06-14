import { createEntityAdapter, createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import { fetchMockBoards, fetchMockBoard } from '../../utils/mock';

import { IBoardEntity, IColumnEntity, ITaskEntity } from '../../types/boards'

interface IState {
	boards: any
	columns: any
	tasks: any
}

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => await <any>fetchMockBoards());
export const fetchBoard = createAsyncThunk('boards/fetchBoard', async () => await <any>fetchMockBoard());


const boardsAdapter = createEntityAdapter<IBoardEntity>({
	selectId: ({id}) => id
})

const columnsAdapter = createEntityAdapter<IColumnEntity>({
	selectId: ({id}) => id
})

const tasksAdapter = createEntityAdapter<ITaskEntity>({
	selectId: ({id}) => id
})


const boardsSlice = createSlice({
	name: 'boards',
	initialState: boardsAdapter.getInitialState({
		columns: columnsAdapter.getInitialState(),
		tasks: tasksAdapter.getInitialState(),
	}),
	reducers: {
		addTask(state: any, {payload}) {
			tasksAdapter.addOne(state.tasks, payload);
		},
		patchTask(state: any, {payload}) {
			tasksAdapter.updateOne(state.tasks, payload)
		},
		deleteTask(state: any, {payload}) {
			tasksAdapter.removeOne(state.tasks, payload.id)
		},
		addColumn(state: any, {payload}) {
			columnsAdapter.addOne(state.columns, payload);
		},
		deleteColumn(state: any, {payload}) {
			columnsAdapter.removeOne(state.columns, payload.id);
		},
		dragTask(state: any, {payload}) {
			console.log(payload)
			tasksAdapter.updateOne(state.tasks, payload);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchBoards.fulfilled, (state, {payload}) => {
			boardsAdapter.upsertMany(state, payload.boards);
		});

		builder.addCase(fetchBoard.fulfilled, (state, {payload}) => {
			columnsAdapter.upsertMany(state.columns, payload.columns);
			tasksAdapter.upsertMany(state.tasks, payload.tasks);
		})
	}
})

export default boardsSlice.reducer

export const { 
	addTask,
	addColumn,
	patchTask,
	deleteTask,
	deleteColumn,
	dragTask
} = boardsSlice.actions

export const {
	selectAll: selectAllBoards
} = boardsAdapter.getSelectors((state: IState) => state.boards);

export const {
	selectAll: selectAllColumns
} = columnsAdapter.getSelectors((state: IState) => state.boards.columns);

export const {
	selectAll: selectAllTasks,
} = tasksAdapter.getSelectors((state: IState) => state.boards.tasks)

export const selectColumnsByBoardId = createSelector(
	[selectAllColumns, (state: IState, id: string) => id],
	(columns, id) => columns.filter(column => column.boardId === id)
);