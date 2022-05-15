const ADD_DATA_GROUP = "ADD_DATA_GROUP";
const DATA_CHECK = "DATA_CHECK";
const UPDATE_CHECKED = "UPDATE_CHECKED";

export const addDataGroup = (data) => {
  return { type: ADD_DATA_GROUP, payload: data };
};

export const dataCheck = (event) => {
  return { type: DATA_CHECK, payload: event };
};

export const updateChecked = (data) => {
  return { type: UPDATE_CHECKED, payload: data };
};

const initState = {
  dataGroup: [],
  checked: [],
};

export const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA_GROUP:
      return dataGroupHandler(state, action);
    case DATA_CHECK:
      return dataCheckHandler(state, action);
    case UPDATE_CHECKED:
      return updateCheckedHandler(state, action);
    default:
      return state;
  }
};

const dataGroupHandler = (state, action) => {
  const group = arrayGroping(action.payload);
  return { ...state, dataGroup: group };
};

const dataCheckHandler = (state, action) => {
  const { value, checked } = action.payload.target;
  if (checked)
    return { ...state, checked: [...state.checked, parseInt(value)] };
  else if (!checked) {
    const filtered = state.checked.filter((item) => item !== parseInt(value));
    return { ...state, checked: filtered };
  }
};

const updateCheckedHandler = (state, action) => {
  const filtered = state.checked.filter((item) =>
  !action.payload.includes(item)
  );
  return { ...state, checked: filtered };
};

const arrayGroping = (data) => {
  return data.reduce((previousValue, currentValue) => {
    const { id } = currentValue;
    if (!previousValue[id]) previousValue[id] = [];
    previousValue[id].push(currentValue);
    return previousValue;
  }, {});
};
