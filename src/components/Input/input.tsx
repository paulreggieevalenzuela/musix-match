import clsx from 'clsx';
import React, { ChangeEventHandler, FocusEventHandler, forwardRef, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineStop } from 'react-icons/ai';
import { VscWarning } from 'react-icons/vsc';

import s from './Input.module.scss';

import Chip from '@/components/Chip';

export type InputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  messageType?: 'error' | 'warning' | 'success' | string;
  messageText?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  chip?: ChipProps[];
  autoFocus?: boolean;
  textArea?: boolean;
  value?: string;
  disabled?: boolean;
  isOutlined?: boolean;
  isFocused?: boolean;
  width?: string;
  type?: string;
  className?: string;
  onFocus?:
    | FocusEventHandler<HTMLInputElement>
    | FocusEventHandler<HTMLTextAreaElement>;
  onChange?:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>;
  autoComplete?: 'on' | 'off';
  name?: string;
  required?: boolean;
};

type ChipProps = {
  label: string;
  value: string | number;
};

export const Label = ({ label, hint }: InputProps) => {
  return (
    <div className='mb-2 flex justify-between'>
      <h6 className={s.label}> {label} </h6>
      <h6 className={s.hint}> {hint} </h6>
    </div>
  );
};

export const Message = ({ messageType, messageText }: InputProps) => {
  let messageIcon = <></>;

  switch (messageType) {
    case 'error':
      messageIcon = <AiOutlineStop size={14} />;
      break;
    case 'warning':
      messageIcon = <VscWarning size={14} />;
      break;
    case 'success':
      messageIcon = <AiOutlineCheckCircle size={14} />;
      break;
    default:
      break;
  }
  return (
    <div className='mt-1 flex justify-start gap-2'>
      <span className={s.messageIcon}> {messageIcon} </span>
      <span className={s.messageText}> {messageText} </span>
    </div>
  );
};

export const LeftIcon = ({ iconLeft }: InputProps) => {
  return (
    <div className={s.leftIcon}>
      <div className='h-5 w-5'>
        <span>{iconLeft}</span>
      </div>
    </div>
  );
};

export const RightIcon = ({ iconRight }: InputProps) => {
  return <span className={s.rightIcon}> {iconRight} </span>;
};

export const ChipDisplay = ({ chip, messageType }: InputProps) => {
  return (
    <span className={messageType ? s.chipMessage : s.chipDefault}>
      {chip?.map((item, key) => {
        return <Chip key={key} label={item.label} type='default' />;
      })}
    </span>
  );
};

export const InputField = forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref}>
      <Input {...props} />
    </div>
  );
});

export function Input({
  id,
  label,
  placeholder,
  hint,
  messageType,
  messageText,
  iconLeft,
  iconRight,
  chip,
  autoFocus = false,
  textArea,
  value,
  disabled,
  width = 'w-[250px]',
  type,
  onChange,
  onFocus,
  className,
  ...rest
}: InputProps) {
  const [inputValue, setValue] = useState(value);

  const onInputChange = (e: any) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={`${className} ${width}`}>
      {label ? (
        <Label label={label} hint={hint} />
      ) : (
        <div className='mt-6'></div>
      )}
      <div className='relative w-full'>
        {iconLeft ? <LeftIcon iconLeft={iconLeft} /> : ''}
        {chip ? <ChipDisplay chip={chip} messageType={messageType} /> : ''}
        {!textArea ? (
          <input
            type={type ? type : 'text'}
            id={id}
            className={clsx(
              s.Input,
              width,
              s.inputStyle,
              disabled ? s.disabledStyle : s.notDisabledStyle,
              iconLeft ? s.iconStyle : '',
              messageType == 'error'
                ? s.errorStyle
                : messageType == 'success' || messageType == 'warning'
                ? s.nonErrorStyle
                : s.regularStyle
            )}
            placeholder={chip ? '' : placeholder}
            disabled={chip || disabled ? true : false}
            autoFocus={autoFocus}
            value={onChange ? value : inputValue}
            onChange={
              onChange
                ? (onChange as ChangeEventHandler<HTMLInputElement>)
                : onInputChange
            }
            onFocus={onFocus as FocusEventHandler<HTMLInputElement>}
            {...rest}
          />
        ) : (
          <textarea
            id={id}
            rows={2}
            className={clsx(
              s.Input,
              s.textareaStyle,
              disabled ? s.disabledStyle : s.notDisabledStyle,
              iconLeft ? s.iconStyle : '',
              messageType == 'error'
                ? s.errorStyle
                : messageType == 'success' || messageType == 'warning'
                ? s.nonErrorStyle
                : s.regularStyle
            )}
            placeholder={placeholder}
            value={inputValue}
            onChange={onInputChange}
            {...rest}
          />
        )}
        {iconRight ? <RightIcon iconRight={iconRight} /> : ''}
      </div>
      {messageType ? (
        <Message messageType={messageType} messageText={messageText} />
      ) : null}
    </div>
  );
}
