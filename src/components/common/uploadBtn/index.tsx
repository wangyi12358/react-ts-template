import React, { Fragment } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import css from './index.less';

export interface Props {
  imageUrl?: string;
  className?: string;
  size?: 'small' | 'normal';
  onAdd?: () => void;
  onChange?: () => void;
  onRemove?: () => void;
  btnText?: string[];
  isCheckBox?: boolean;
  onSelect?: () => void;
  isVideo?: boolean;
}

const Upload: React.FC<Props> = React.memo<Props>(
  ({
    imageUrl,
    className,
    onRemove,
    onChange,
    onAdd,
    btnText,
    isCheckBox,
    onSelect,
    size,
    isVideo
  }) => {
    const [isCheck, setIsCheck] = React.useState(false);
    /**
     * 添加图片
     */
    function handleChange() {
      if (!imageUrl) onAdd();
      if (isCheckBox) {
        setIsCheck(!isCheck);
        onSelect();
      }
    }

    function renderEdit() {
      return (
        <div className={css.btns}>
          <span
            onClick={e => {
              e.stopPropagation();
              onChange();
            }}
          >
            {btnText[0]}
          </span>
          |
          <span
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          >
            {btnText[1]}
          </span>
        </div>
      );
    }

    function renderContent() {
      return (
        <Fragment>
          {isVideo ? (
            <video src={imageUrl} className={css.img} />
          ) : (
            <img src={imageUrl} className={css.img} alt="avatar" />
          )}
        </Fragment>
      );
    }

    return (
      <div
        className={classNames(
          css.uploadBox,
          { [css.hasImg]: !!imageUrl },
          { [css.small]: size === 'small' },
          className
        )}
        onClick={handleChange}
      >
        {isCheckBox && (
          <Icon
            className={classNames(css.checkbox, { [css.select]: isCheck })}
          />
        )}
        {imageUrl ? renderContent() : <Icon className={css.icon} />}
        {!!imageUrl && renderEdit()}
      </div>
    );
  }
);

Upload.defaultProps = {
  imageUrl: '',
  size: 'normal',
  onChange: () => {},
  onRemove: () => {},
  onAdd: () => {},
  onSelect: () => {},
  btnText: ['替换', '删除'],
  isCheckBox: false,
  isVideo: false
};

export default Upload;
