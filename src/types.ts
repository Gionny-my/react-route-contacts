import { Params } from 'react-router-dom';

export interface IContact {
  id: string;
  createdAt?: number
  photo?: string;
  name?: string;
  isFavorite?: boolean;
  note?: string;
}

export function isIContact(param: any): param is IContact {
  return (
    param && typeof param.id === 'string'
  );
};

export interface ILoaderProps {
  params: Params<string>;
  request: Request;
};

export interface IActionProps {
  request: Request;
  params: Params<string>;
}