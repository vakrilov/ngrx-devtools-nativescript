export const logger = reducer => {
  return function (state, action) {
    console.log('---- DISPATCHED ACTION: ' + JSON.stringify(action));

    //calculate next state based on action
    let nextState = reducer(state, action);

    console.log('---- NEW STATE: ' + JSON.stringify(nextState));
    return nextState;
  };
};