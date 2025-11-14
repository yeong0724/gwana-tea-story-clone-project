import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

interface AlertDialogState {
  isOpen: boolean;
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type: 'ALERT' | 'CONFIRM';
  resolve?: (confirmed: boolean) => void;
}

type AlertDialogConfig = Omit<AlertDialogState, 'isOpen' | 'resolve' | 'type'>;

interface AlertDialogActions {
  showAlert: (config: AlertDialogConfig) => void;
  showConfirmAlert: (config: AlertDialogConfig) => Promise<boolean>;
  hideAlert: () => void;
  confirmAlert: () => void;
  cancelAlert: () => void;
}

const initialState: AlertDialogState = {
  isOpen: false,
  title: '',
  description: '',
  onConfirm: undefined,
  onCancel: undefined,
  confirmText: '확인',
  cancelText: '',
  variant: 'default',
  size: 'md',
  type: 'ALERT',
  resolve: undefined,
};

export const alertStore = create<AlertDialogState & AlertDialogActions>((set, get) => ({
  ...initialState,

  // Actions
  showAlert: (config) => {
    set({
      ...initialState,
      ...config,
      isOpen: true,
    });
  },

  showConfirmAlert: (config) => {
    return new Promise<boolean>((resolve) => {
      set({
        ...initialState,
        ...config,
        isOpen: true,
        type: 'CONFIRM',
        resolve,
      });
    });
  },

  hideAlert: () => {
    const { resolve } = get();
    resolve?.(false);
    set(initialState);
  },

  confirmAlert: () => {
    const { onConfirm, resolve } = get();
    onConfirm?.();
    resolve?.(true);
    set(initialState);
  },

  cancelAlert: () => {
    const { onCancel, resolve } = get();
    onCancel?.();
    resolve?.(false);
    set(initialState);
  },
}));

const useAlertStore = () =>
  alertStore(
    useShallow((state) => ({
      showConfirmAlert: state.showConfirmAlert,
      showAlert: state.showAlert,
    }))
  );

export default useAlertStore;
