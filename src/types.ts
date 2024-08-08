import { Params } from 'react-router-dom';

export interface IContact {
  id: number;
  photo: string;
  name: string;
  isFavorite: boolean;
  note: string;
}

export interface ILoaderProps {
  params: Params<string>;
};

export interface IActionProps {
  request: Request;
  params: Params<string>;
}