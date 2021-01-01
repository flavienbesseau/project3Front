const initState = {
  hospitalId: undefined,
  specialtyId: undefined,
  experienceId: undefined,
};

const hospitalReducer = (state = undefined, action) => {
  if (action.type === "UPDATE_HOSPITAL_ID") {
    return action.id;
  } else {
    return state;
  }
};

const specialtyReducer = (state = undefined, action) => {
  if (action.type === "UPDATE_SPECIALTY_ID") {
    return action.id;
  } else {
    return state;
  }
};

const experienceReducer = (state = undefined, action) => {
  if (action.type === "UPDATE_EXPERIENCE_ID") {
    return action.id;
  } else {
    return state;
  }
};

const rootReducer = (state = initState, action) => {
  return {
    hospitalId: hospitalReducer(state.hospitalId, action),
    specialtyId: specialtyReducer(state.specialtyId, action),
    experienceId: experienceReducer(state.experienceId, action),
  };
};

export default rootReducer;
