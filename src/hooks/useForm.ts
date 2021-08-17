import React, { useState } from 'react';

export type IChangeElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export const useForm = <T>(initialState: T, handleAction: Function) => {
  const [formState, setFormState] = useState(initialState);

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
