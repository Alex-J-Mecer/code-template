import { ReactElement } from 'react';

interface IOptions {
  value: any;
  text: any;
}
type TType =
  | 'text'
  | 'date'
  | 'radio'
  | 'select'
  | 'textArea'
  | 'hidden'
  | 'time'
  | 'number'
  | 'titleLine';

interface IType {
  type: TType;
  mode?: 'tags' | 'multiple';
  format?: string;
  [k: string]: any;
}

interface IFormItem {
  label: string;
  name: string;
  type?: TType | IType;
  options?: Array<IOptions> | string[];
  bespread?: boolean;
  required?: boolean;
  component?: ReactElement;
}
interface IRef {
  getValue(): any;
  setValue(value: any): void;
  resetData(): void;
}

interface FormMapProps {
  row?: 1 | 2 | 3;
  list?: IFormItem[];
  formRef?: React.MutableRefObject<IRef>;
  labelSpan?: number;
  wrapSpan?: number;
  initialValues: {
    [k: string]: any;
  };
}

export { FormMapProps, IFormItem, IRef, IType, IOptions };
