export interface Action<T = string, P = any> {
  type: T;
  payload?: P;
}

// reducer

export interface Reducer<S, A> {
  (prevState: S, action: A): S;
}

export interface Reducers<S, A extends Action = Action> {
  [key: string]: Reducer<S, A>;
}

// effect

export interface EffectParam<S, A> {
  action: A;
  getState(): S;
  put: Dispatch;
}

export interface Effect<S, A extends Action, R = any | void> {
  (param: EffectParam<S, A>): Promise<R>;
}

export interface Effects<S, A extends Action = Action> {
  [key: string]: Effect<S, Action>;
}

// dispatch

export interface Dispatch<T = string, P = any, R = void> {
  (action: Action<T, P>): R;
}

export interface Model<S> {
  initState: S;

  reducers: Reducers<S>;

  effects: Effects<S, Action>;
}
