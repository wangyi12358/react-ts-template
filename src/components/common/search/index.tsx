import React from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import Icon from '../icon';
import css from './index.less';

type OmitKeys = 'value' | 'enterButton' | 'suffix';

export interface Props extends Omit<InputProps, OmitKeys> {
  showReset?: boolean;
  keywords?: string;
  onSearch?: (value: string) => void;
}

const Search: React.FC<Props> = ({
  className, keywords, onSearch, showReset, onChange, width, ...others
}) => {

  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (keywords !== value) setValue(keywords);
  }, [keywords]);

  return (
    <span className={classNames(css.search, className)} style={{ width }}>
      <Input {...others}
        value={value}
        suffix={(
          <Icon type="iconSearch"
            className={classNames(css.icon, { [css.disableIcon]: others.disabled })}
            onClick={() => onSearch(value.trim())}
          />
        )}
        onChange={e => {
          const value = e.target.value;
          if (value.length === 0) {
            onSearch(value.trim());
          }
          setValue(value);
          onChange(e);
        }}
      />
    </span>
  );
};

Search.defaultProps = {
  showReset: true,
  keywords: '',
  onSearch: () => { },
  onChange: () => { },
};

export default Search;
