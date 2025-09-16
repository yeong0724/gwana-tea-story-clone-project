import { ChangeEvent, useMemo } from 'react';

import { isEmpty } from 'lodash-es';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';

import { getRegexpByType } from '@/lib/utils';
import type {
  FormatEnum,
  HandleChange,
  ReactHookFormEventType,
} from '@/types/type';

const ControllerInput = <T extends FieldValues>({
  required = false,
  name,
  className = '',
  placeholder = '',
  type = '',
  callbackFn = null,
}: {
  required?: boolean;
  name: FieldPath<T>;
  className?: string;
  placeholder?: string;
  type?: FormatEnum;
  callbackFn?: HandleChange<
    HTMLInputElement,
    FieldPathValue<T, FieldPath<T>>
  > | null;
}) => {
  const { setValue, control, clearErrors } = useFormContext<T>();

  const REG_EXP = useMemo(() => getRegexpByType(type), [type]);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const onFilterValue = (event: ChangeEvent<ReactHookFormEventType<T>>) => {
    const { value } = event.target;
    return REG_EXP ? value.replace(REG_EXP, '') : value;
  };

  const onChangeHandler = (
    event: ChangeEvent<ReactHookFormEventType<T> & HTMLInputElement>
  ) => {
    const value = onFilterValue(event);

    if (callbackFn) {
      callbackFn(null, { name, value });
      return;
    }

    setValue(name, value, {
      shouldDirty: false,
      shouldValidate: required, // required가 false면 검증하지 않음
    });
  };

  const handleFocus = () => {
    if (!isEmpty(error)) {
      clearErrors(name);
    }
  };

  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        value={field.value}
        onChange={onChangeHandler}
        onFocus={handleFocus}
        className={`${className} ${error?.message ? 'border-red-500' : ''}`}
      />
      {error?.message && (
        <div className="text-red-500 p-1 text-sm">{error.message}</div>
      )}
    </>
  );
};

export default ControllerInput;
