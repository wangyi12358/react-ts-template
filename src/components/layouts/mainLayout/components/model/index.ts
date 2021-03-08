import createStore from 'common/hooks/useStore';


export interface State {
  imageUrl: string;
  visible: boolean;
  UpdateInfo: boolean;
  infoVisible: boolean;
  codeForm: string;
  state: boolean;
}

export const { provideStore, useConnect, useStore, useDispatch } = createStore<
  State
>({
  initState: {
    codeForm: '',
    state: false,
    UpdateInfo: true,
    imageUrl: '',
    infoVisible: false,
    visible: false,
  },

  reducers: {
    update(prevState, action) {
      return {
        ...prevState,
        ...action.payload
      };
    }
  },

  effects: {
  }
});
