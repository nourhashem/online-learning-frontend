import classroomActions from 'store/actions/classroom';

const initialState = {
  list: [],
  messages: {},
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case classroomActions.setAll:
      const myClassrooms = Object.keys(state.messages);
      const messages = {
        ...state.messages,
      };
      action.classrooms.forEach((classroom) => {
        if (!myClassrooms.includes(classroom.uuid)) {
          messages[classroom.uuid] = [];
        }
      });
      return {
        ...state,
        list: action.classrooms,
        messages,
      };
    case classroomActions.addMessage:
      let newMessages = { ...state.messages };
      const exists =
        state.messages[action.classroomUuid] &&
        state.messages[action.classroomUuid].filter(
          (message) => message.uuid === action.message.uuid
        ).length === 1;
      if (!exists) {
        newMessages = {
          ...state.messages,
          [action.classroomUuid]: [
            ...state.messages[action.classroomUuid],
            action.message,
          ].sort((a, b) => a.timestamp - b.timestamp),
        };
      }
      return {
        ...state,
        messages: newMessages,
      };
    case classroomActions.addMessages:
      let classMessages = [...state.messages[action.classroomUuid]];
      let receivedMessages = action.messages;
      receivedMessages.forEach((message) => {
        const exists =
          classMessages &&
          classMessages.filter((msg) => msg.uuid === message.uuid).length === 1;
        if (exists) return;
        classMessages.push(message);
      });
      const myMessages = {
        ...state.messages,
        [action.classroomUuid]: classMessages.sort(
          (a, b) => a.timestamp - b.timestamp
        ),
      };
      return {
        ...state,
        messages: myMessages,
      };
    case classroomActions.signOut:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
