import React, { useState, useEffect } from 'react';

export type IChangeElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export const useForm = <T>(activeRecord: T, handleAction: Function) => {
  const [formState, setFormState] = useState(activeRecord);

  useEffect(() => {
    setFormState(activeRecord);
  }, [activeRecord]);

  const handleChange = (event: React.ChangeEvent<IChangeElement>): void => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleAction(formState);
  };

  return { formState, handleChange, handleSubmit };
};
