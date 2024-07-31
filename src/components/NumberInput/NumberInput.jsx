import { useId, useState } from 'react';
import './NumberInput.css';

function NumberInput({
  value,
  onChange,
  prefix = '',
  suffix = '',
  label,
  className,
  ...delegated
}) {
  const [isFocused, setIsFocused] = useState(false);

  // const handleChange = event => {
  //   // Remove existing commas
  //   let inputValue = event.target.value.replace(/,/g, '');

  //   // Remove non-digit characters
  //   inputValue = inputValue.replace(/\D/g, '');

  //   // Format number with commas
  //   if (inputValue !== '') {
  //     inputValue = Number(inputValue).toLocaleString();
  //   }

  //   onChange(inputValue);
  // };

  const id = useId();
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={id} className='number-label'>
        {label}
      </label>
      <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
        {prefix && <span className='prefix'>{prefix}</span>}
        <input
          {...delegated}
          type='number'
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {suffix && <span className='suffix'>{suffix}</span>}
      </div>
    </div>
  );
}

export default NumberInput;
