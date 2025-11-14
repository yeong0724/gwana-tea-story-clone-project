// src/components/common/GlobalAlertDialog.tsx
'use client';

import { useMemo } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { alertStore } from '@/stores/useAlertStore';

const GlobalAlert = () => {
  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    variant,
    size,
    confirmAlert,
    cancelAlert,
    hideAlert,
    type,
  } = alertStore();

  const alertSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return '!max-w-sm';
      case 'md':
        return '!max-w-md';
      case 'lg':
        return '!max-w-lg';
      case 'xl':
        return '!max-w-2xl';
      default:
        return '!max-w-md';
    }
  }, [size]);

  const handleConfirm = () => {
    if (type === 'CONFIRM') {
      confirmAlert();
    } else {
      hideAlert();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => hideAlert()}>
      <AlertDialogContent className={alertSize}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="min-h-[30px]">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === 'CONFIRM' && cancelText && (
            <AlertDialogCancel onClick={cancelAlert}>{cancelText || '취소'}</AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : ''
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalAlert;
