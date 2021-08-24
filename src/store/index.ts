import {
  createStore,
  MutationTree,
  ActionContext,
  ActionTree,
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger
} from "vuex";

//declare state
export interface Operation { firstNumber: number, operationType: string, secondNumber: number, result: number, date: Date }
export type State = { favoriteOperations: Array<Operation> };


//set state
const state: State = { favoriteOperations: [] };

// mutations and action enums

export enum MutationTypes {
  ADD_OPERATION = "ADD_OPERATION",
  DELETE_OPERATION = "DELETE_OPERATION"
}

export enum ActionTypes {
  ADD_OPERATION = "ADD_OPERATION",
  DELETE_OPERATION = "DELETE_OPERATION"
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.ADD_OPERATION](state: S, payload: Operation): void;
  [MutationTypes.DELETE_OPERATION](state: S, payload: Operation): void;
};

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_OPERATION](state: State, payload: Operation) {
    state.favoriteOperations.push(payload);

  },
  [MutationTypes.DELETE_OPERATION](state: State, payload: Operation) {
    state.favoriteOperations = state.favoriteOperations.filter(operation => operation !== payload);
  }
};

//actions

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

// actions interface

export interface Actions {
  [ActionTypes.ADD_OPERATION](
    { commit }: AugmentedActionContext,
    payload: Operation
  ): void;
  [ActionTypes.DELETE_OPERATION](
    { commit }: AugmentedActionContext,
    payload: Operation
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.ADD_OPERATION]({ commit }, payload: Operation) {
    commit(MutationTypes.ADD_OPERATION, payload);
  },
  [ActionTypes.DELETE_OPERATION]({ commit }, payload: Operation) {
    commit(MutationTypes.DELETE_OPERATION, payload);
  }
};

// Getters types
export type Getters = {
  favoriteOperations(state: State): Array<Operation>;
};

//getters

export const getters: GetterTree<State, State> & Getters = {
  favoriteOperations: state => {
    return state.favoriteOperations;
  }
};

//setup store type
export type Store = Omit<
  VuexStore<State>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger()]
});

export function useStore(): Store {
  return store as Store;
}

