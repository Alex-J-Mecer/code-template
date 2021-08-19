// 基于antd的表单组件

import React, { FC, ReactElement, useEffect, useRef } from 'react';
import styles from './index.less';
import {
  Input,
  DatePicker,
  Form,
  Radio,
  Select,
  FormInstance,
  TimePicker,
  InputNumber,
  Divider,
} from 'antd';
import { CSSProperties } from '@umijs/renderer-react/node_modules/@types/react';
import moment from 'moment';
import { Rule } from 'antd/lib/form';
import { value } from 'lodash-es';
const { Item, useForm } = Form;
const { TextArea } = Input;

import { FormMapProps, IFormItem, IRef, IType, IOptions } from './interface';

const index: FC<FormMapProps> = ({
  row = 1,
  list,
  formRef,
  initialValues,
  labelSpan,
  wrapSpan,
}): ReactElement => {
  const ref = useRef<FormInstance<any>>();
  // formRef.current.getData
  useEffect(() => {
    if (!formRef) {
      return;
    }
    formRef.current = {
      getValue: () => {
        return ref.current.validateFields();
      },
      setValue(value) {
        if (!value) return;
        list.forEach((item) => {
          // ! 对时间类型的表单做特殊处理
          let { type } = item;

          if (typeof type === 'object') {
            type = (type as IType).type;
          }

          if (
            (type === 'date' || type === 'time') &&
            value[item.name] &&
            typeof value[item.name] === 'string'
          ) {
            value[item.name] = moment(new Date());
          }
        });
        ref.current.setFieldsValue(value);
      },
      resetData() {
        ref.current.resetFields();
      },
    };
  }, []);

  return (
    <Form
      className={`${styles['form-map']} ${styles[`row-${row}`]}`}
      ref={ref}
      initialValues={initialValues}
      labelCol={{
        span: labelSpan,
      }}
      wrapperCol={{
        span: wrapSpan,
      }}
    >
      {list.map((item, index) => (
        <FormItem {...item} key={item.name} />
      ))}
    </Form>
  );
};

const FormItem: FC<IFormItem> = ({
  label,
  name,
  type,
  options,
  bespread,
  required,
  component,
}): ReactElement => {
  if (type === 'titleLine') {
    return (
      <div style={{ width: '100%' }}>
        <Divider orientation="center">{label || '分割线'}</Divider>
      </div>
    );
  }

  let style: CSSProperties = {};
  let placeholder = `请输入${label || '内容'}`;
  let rules: Rule[] = [];

  if (bespread) {
    style.width = '100%';
  }
  if (type === 'hidden') {
    style.display = 'none';
  }

  if (required && type !== 'hidden' && !component) {
    rules.push({
      required: true,
      message: `${label || name} 为必填项`,
    });
  }

  let FormContent = <Input placeholder={placeholder} />;

  let typeIsObject = typeof type === 'object';
  let t = typeIsObject ? (type as IType).type : type;

  switch (t) {
    case 'date':
      FormContent = <DatePicker placeholder={placeholder} />;
      break;
    case 'radio':
      FormContent = (
        <Radio.Group>
          {options.map((ops, index) =>
            typeof ops === 'string' ? (
              <Radio.Button value={ops} key={index}>
                {ops}
              </Radio.Button>
            ) : (
              <Radio.Button value={ops.value} key={index}>
                {ops.text}
              </Radio.Button>
            ),
          )}
        </Radio.Group>
      );
      break;
    case 'select':
      if (!typeIsObject) {
        FormContent = (
          <Select>
            {options.map((ops, index) =>
              typeof ops === 'string' ? (
                <Select.Option value={ops} key={index}>
                  {ops}
                </Select.Option>
              ) : (
                <Select.Option value={ops.value} key={index}>
                  {ops.text}
                </Select.Option>
              ),
            )}
          </Select>
        );
      } else {
        const { mode } = type as IType;
        FormContent = (
          <Select mode={mode}>
            {options?.map((ops, index) =>
              typeof ops === 'string' ? (
                <Select.Option value={ops} key={index}>
                  {ops}
                </Select.Option>
              ) : (
                <Select.Option value={ops.value} key={index}>
                  {ops.text}
                </Select.Option>
              ),
            )}
          </Select>
        );
      }

      break;
    case 'textArea':
      FormContent = <TextArea placeholder={placeholder} />;
      break;
    case 'hidden':
      FormContent = <Input type="hidden" placeholder={placeholder} />;
      break;
    case 'time':
      let format: string;
      if ((type as IType).format) {
        format = (type as IType).format;
      }

      FormContent = <TimePicker format={format} />;
      break;
    case 'number':
      FormContent = <InputNumber min={0} />;
      break;
  }

  if (component) {
    FormContent = component;
  }

  return (
    <Item
      label={label}
      name={name}
      className={`${styles['form-item']}`}
      style={style}
      required={required}
      rules={rules}
    >
      {FormContent}
    </Item>
  );
};

export default index;
