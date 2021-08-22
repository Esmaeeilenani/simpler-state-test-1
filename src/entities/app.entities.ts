import { entity } from "simpler-state";

export enum ToastType {
  success = "success",
  error = "error",
}

interface Requesting {
  caller: string | null;
  status: boolean;
}

interface Toast {
  id: string;
  text: string;
  active: boolean;
  type: ToastType;
}

//Default state Interface
interface IDefaultState {
  requesting: Requesting;
  toasts: Array<Toast>;
}

//object of default state
const defaultState: IDefaultState = {
  requesting: <Requesting>{
    caller: null,
    status: false,
  },
  toasts: Array<Toast>(),
};

export const appEntity = entity<IDefaultState>(defaultState);

// actions
export const requestStart = (caller = "shop") =>
  appEntity.set((state) => ({
    ...state,
    requesting: <Requesting>{
      caller,
      status: true,
    },
  }));

export const requestEnd = () =>
  appEntity.set((state) => ({
    ...state,
    requesting: {
      caller: null,
      status: false,
    },
  }));

export const closeToast = (id: string, duration = 3000) => {
  appEntity.set((state) => ({
    ...state,
    toasts: state.toasts.map((toast) => {
      if (toast.id === id) toast.active = false;

      return toast;
    }),
  }));

  setTimeout(() => {
    appEntity.set((state) => ({
      ...state,
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  }, duration);
};

export const toastMessage = (
  text: string,
  type: ToastType,
  duration = 5000
) => {
  //Creating the ID of the Toast
  const toastId = Math.random().toString(36).substring(2);
  appEntity.set((state) => ({
    ...state,
    toasts: [
      ...state.toasts,
      {
        id: toastId,
        active: true,
        text,
        type,
      },
    ],
  }));

  closeToast(toastId, duration);
};
