import * as React from 'react';

import { KnobContext } from './KnobContexts';
import { KnobDefinition, UseKnobOptions } from './types';

const useKnob = <T, O = unknown>(
  options: UseKnobOptions<T> & { type: KnobDefinition['type'] } & O,
): [T, (newValue: T) => void] => {
  const { initialValue, name } = options;
  const knobContext = React.useContext(KnobContext);

  const value: T = knobContext.knobs[name] === undefined ? initialValue : knobContext.knobs[name].value;
  const setValue = (newValue: T) => {
    knobContext.setKnobValue(name, newValue);
  };

  React.useEffect(() => {
    knobContext.registerKnob({
      ...options,
      value: initialValue,
    });

    return () => knobContext.unregisterKnob(name);
  }, [name]);

  return [value, setValue];
};

export default useKnob;
