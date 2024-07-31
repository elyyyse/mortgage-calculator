import { useId, useState } from 'react';
import './RadioGroup.css';

function RadioGroup({
  legend,
  values,
  currentValue,
  onChange,
  className,
  ...delegated
}) {
  const id = useId();
  return (
    <fieldset className={className}>
      <legend className='radio-group-label'>{legend}</legend>
      <div className='radio-container'>
        {values.map(({ label, value }) => {
          const optionId = `radio-group-${id}-${value}`;
          return (
            <div
              key={value}
              className={`radio-wrapper ${
                currentValue === value ? 'checked' : ''
              }`}
            >
              <input
                {...delegated}
                type='radio'
                id={optionId}
                name={id}
                value={value}
                checked={currentValue === value}
                onChange={() => onChange(value)}
              />
              <label htmlFor={optionId} className='radio-input-label'>
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RadioGroup;
