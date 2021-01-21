export function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}
