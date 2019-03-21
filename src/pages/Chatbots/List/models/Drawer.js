export default {
  namespace: 'drawerList',
  state: {
    open: false,
    current: 0,
  },
  reducers: {
    increaseCurrent(state, action){
      // console.log('???wtf');
      return {
        ...state,
        current: state.current + 1,
      }
    },
    resetCurrent(state, action){
      return {
        ...state,
        current: 0,
      }
    },
    handle(state, action) {
      return {
        ...state,
        open: action.payload,
      };
    },
  },
};
