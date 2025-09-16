import { create } from 'zustand';

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
}

interface AlertDialogActions {
  showAlert: (config: Omit<AlertDialogState, 'isOpen'>) => void;
  hideAlert: () => void;
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
};

const useAlertStore = create<AlertDialogState & AlertDialogActions>(
  (set, get) => ({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: undefined,
    onCancel: undefined,
    confirmText: '확인',
    cancelText: '',
    variant: 'default',
    size: 'md',

    // Actions
    showAlert: (value) => {
      const config = get();
      set({ ...config, isOpen: true, ...value });
    },

    hideAlert: () => set({ ...get(), ...initialState }),
  })
);

export default useAlertStore;
