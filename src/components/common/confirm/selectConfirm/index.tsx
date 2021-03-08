import React from 'react';
import Select, { Props as SelectProps } from 'components/common/select';
import modal, { Props as ModalProps } from 'components/common/confirm/components/modal';
import { TreeSelect } from 'antd';
import { Folder } from 'api/interface/material';
import { TreeNodeValue } from 'antd/lib/tree-select/interface';
import css from './index.less';

type OmitKeys = 'style' | 'onChange';

export interface Props
  extends Omit<ModalProps, 'onOk'>,
    Omit<SelectProps, OmitKeys> {
  title?: string;
  name?: string;
  defaultValue?: TreeNodeValue;
  options?: {id: number; name: string}[];
  onChange?: (val: TreeNodeValue) => void;
  onOk?: (val: TreeNodeValue) => void;
  classTree: Folder[];
}

const SelectComponent: React.FC<Props> = React.memo<Props>(
  ({ title, name, defaultValue, onChange, options, classTree, ...others }) => {
    const { TreeNode } = TreeSelect;
    
    const [value, setValue] = React.useState(defaultValue);
    const [newFolder, setNewFolder] = React.useState(null); // 新文件夹
    function getInpValue(val: TreeNodeValue) {
      setValue(val);
      onChange(val);
    }

    // 递归文件夹结构
    function rnederTree(folder) {
      const { children, name, id } = folder;
      return (
        <TreeNode value={id} title={name} key={id}>
          {
            !!children && children.map(rnederTree)
          }
        </TreeNode>
      );
    }
    return (
      <div className={css.inpWrap}>
        <div className={css.inputTitle}>{title}</div>
        <div className={css.inpBox}>
          <span className={css.inpName}>{name}</span>
          <TreeSelect
            style={{ width: '95%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            onChange={
              (value) => {
                getInpValue(value);
                setNewFolder(value);
              }
            }
          >
            {classTree.map((item) => rnederTree(item))}
          </TreeSelect>
        </div>
      </div>
    );
  }
);

export default function selectConfirm({
  title,
  onChange = () => {},
  name,
  defaultValue,
  onOk,
  onCancel,
  // options = [],
  classTree,
  ...others
}: Props) {
  let value: TreeNodeValue; // 闭包存值，关闭时销毁
  const modalHandlers = modal({
    content: (
      <SelectComponent
        classTree={classTree}
        title={title}
        name={name}
        defaultValue={defaultValue}
        // options={options}
        onChange={id => {
          value = id;
          onChange(id);
        }}
      />
    ),
    props: {
      ...others,
      onCancel() {
        onCancel && onCancel();
        value = null;
      },
      onOk() {
        onOk && onOk(value);
        value = null;
      }
    }
  });

  return modalHandlers;
}
