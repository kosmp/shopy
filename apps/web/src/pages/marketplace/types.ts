import { Dispatch, SetStateAction } from 'react';

export interface FilterProps {
  inputValueFrom: number | '',
  inputValueTo: number | '',
  handleInputChangeFrom: Dispatch<SetStateAction<number | ''>>,
  handleInputChangeTo: Dispatch<SetStateAction<number | ''>>
}
