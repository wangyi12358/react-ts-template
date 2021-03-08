import React from 'react';
import classNames from 'classnames';
import Hooks from 'common/hooks';
import css from './index.less';


export interface Tab {
  key: string;
  render: React.ReactNode;
}
export interface Props {
  selectedKey: string;
  className?: string;
  width?: number | string;
  tabs: Tab[];
  onChange?: (key: string) => void;
}

const Tabs: React.FC<Props> = React.memo<Props>(({ 
  selectedKey, tabs, onChange, className, width
}) => {

  const [boxRef, lineWidth, lineLeft, setIndex] = Hooks.useUnderlineWidth<HTMLUListElement>(0, 0);

  React.useEffect(() => {
    tabs.find((item, index) => {
      if (item.key === selectedKey) {
        setIndex(index);
        return true;
      }
      return false;
    });
  }, [selectedKey, tabs]);

  return (
    <ul className={classNames(css.box, className)} ref={boxRef} style={{ width }}>
      {
        tabs.map(item => {
          return (
            <li 
              key={item.key} 
              className={classNames({ [css.selected]: selectedKey === item.key })}
              onClick={() => onChange(item.key)}
            >
              {item.render}
            </li>
          );
        })
      }
      <span className={css.line} style={{ left: lineLeft, width: lineWidth }} />
    </ul>
  );
});

Tabs.defaultProps = {
  onChange: () => {},
};

export default Tabs;
