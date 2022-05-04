import classroomActions from 'store/actions/classroom';

const initialState = {
  classrooms: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case classroomActions.setAll:
      return {
        ...state,
        classrooms: action.classrooms,
      };
    default:
      return state;
  }
}
