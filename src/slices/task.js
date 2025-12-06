import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasksArr: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { setTasksArr } = taskSlice.actions
export default taskSlice.reducer
