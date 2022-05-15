const ADD_SELECT_DATA = "ADD_SELECT_DATA";
const CHECK_SELECT_DATA = "CHECK_SELECT_DATA";
const DELETE_SELECT_DATA = "DELETE_SELECT_DATA";

export const addSelectData = (id, data) => {
  return { type: ADD_SELECT_DATA, payload: { id, data } };
};

export const deleteSelectData = (id) => {
  return { type: DELETE_SELECT_DATA, payload: id };
};

export const checkSelectData = (event) => {
  return { type: CHECK_SELECT_DATA, event };
};

const initState = {
  dataSelect: [],
  dataGroup: [],
  checked: [],
};

export const selectDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_SELECT_DATA:
      return addHandler(state, action);
    case DELETE_SELECT_DATA:
      return deleteHandler(state, action);
    case CHECK_SELECT_DATA:
      return checkHandler(state, action);
    default:
      return state;
  }
};

const addHandler = (state, action) => {
  const selectedData = action.payload.data.filter((item) =>
    action.payload.id.includes(item.uniqueId)
  );
  const group = arrayGroping(selectedData);
  return {
    ...state,
    dataGroup: group,
    dataSelect: selectedData,
  };
};

const deleteHandler = (state, action) => {
  const filtered = state.dataSelect.filter(
    (item) => !action.payload.includes(item.uniqueId)
  );
  const group = arrayGroping(filtered);
  const checkFiltered = state.checked.filter((item) => item === action.payload);
  return {
    ...state,
    dataGroup: group,
    checked: checkFiltered,
    dataSelect: filtered,
  };
};

const checkHandler = (state, action) => {
  const { value, checked } = action.event.target;
  if (checked)
    return { ...state, checked: [...state.checked, parseInt(value)] };
  else if (!checked) {
    const filtered = state.checked.filter((item) => item !== parseInt(value));
    return { ...state, checked: filtered };
  }
};

const arrayGroping = (data) => {
  return data.reduce((previousValue, currentValue) => {
    const { id } = currentValue;
    if (!previousValue[id]) previousValue[id] = [];
    previousValue[id].push(currentValue);
    return previousValue;
  }, {});
};
