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
import { useAlertStore } from '@/stores';

const GlobalAlert = () => {
  const {
    isOpen,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    variant,
    size,
    hideAlert,
  } = useAlertStore();

  const handleConfirm = () => {
    onConfirm?.();
    hideAlert();
  };

  const handleCancel = () => {
    onCancel?.();
    hideAlert();
  };

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

  return (
    <AlertDialog open={isOpen} onOpenChange={hideAlert}>
      <AlertDialogContent className={alertSize}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
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
