import createStore from 'common/hooks/useStore';

interface Props {
  collapsed?: boolean;

};

export const { provideStore, useConnect, useDispatch, useStore } = createStore<Props>({

  initState: {
    collapsed: false
  },

  reducers: {

    update(prevState, action) {
      return {
        ...prevState,
        ...action.payload,
      };
    }

  },

  effects: {
  },

});