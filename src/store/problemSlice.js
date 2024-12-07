import { createSlice } from '@reduxjs/toolkit';

// Initial state chứa mảng problems và các mảng theo status
const initialState = {
  problems: [], // Mảng chứa tất cả các object problem
  problemsStatus0: [], // Mảng chứa các problem có status = 0
  problemsStatus1: [], // Mảng chứa các problem có status = 1
  problemsStatus2: [], // Mảng chứa các problem có status = 2
  problemsStatus3: [], // Mảng chứa các problem có status = 3
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    // Action để thiết lập lại mảng problems
    setProblems: (state, action) => {
      state.problems = action.payload;
      // Lọc và gán các problem theo status
      state.problemsStatus0 = action.payload.filter(problem => problem.status == 0);
      state.problemsStatus1 = action.payload.filter(problem => problem.status == 1);
      state.problemsStatus2 = action.payload.filter(problem => problem.status == 2);
      state.problemsStatus3 = action.payload.filter(problem => problem.status == 3);
    },
    
    // Action để clear data (reset về mảng trống)
    clearData: (state) => {
      state.problems = [];
      state.problemsStatus0 = [];
      state.problemsStatus1 = [];
      state.problemsStatus2 = [];
      state.problemsStatus3 = [];
    },
  },
});

// Export các action để sử dụng trong components
export const { setProblems, clearData } = problemsSlice.actions;

// Export reducer để sử dụng trong store
export default problemsSlice.reducer;
