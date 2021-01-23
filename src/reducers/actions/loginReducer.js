export function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, [action.field]: action.value };

    case "register":
      return { ...state, 
        [action.registerField]: action.registerValue,
      };

    case "validate":
      return {
        ...state,
        name: "",
        email: "",
        userpassword: "",
        passwordConfirmation: "",
        errors: "",
      };

    case "register-errors":
      return {
        ...state,
        errors: {
          path: action.path,
          message: action.message,
        },
      };

    default:
      return state;
  }
}
