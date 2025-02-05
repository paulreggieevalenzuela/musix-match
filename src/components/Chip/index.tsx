import clsx from 'clsx';

import s from './Chip.module.scss';

type Props = {
  label?: string;
  size?: 'small' | 'large';
  className?: string;
  type?: 'primary' | 'default' | 'disabled';
  icon?: React.ReactNode | React.ReactElement;
  onClick?: () => void;
};

export default function Chip({
  label,
  onClick,
  type = 'primary',
  size = 'large',
  icon,
  className,
}: Props) {
  const chipStyle = clsx(
    s.Chip,
    className,
    size === 'small' && s.Small,
    type === 'primary' && s.Primary,
    type === 'disabled' && s.Disabled
  );

  return (
    <div className={chipStyle} onClick={onClick}>
      {icon && <div className='Chip__icon'>{icon}</div>}
      {label}
    </div>
  );
}
