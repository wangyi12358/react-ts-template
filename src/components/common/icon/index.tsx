import * as React from 'react';
import * as classnames from 'classnames';
import './index.less';

export interface Props {
  type?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon: React.FC<Props> = (props) => {
  // if (!props.type) {
  //   return <i {...props} />;
  // }

  const svgProps = {
    ...props,
    className: classnames(['iconsvg', props.className])
  };

  return (
    <svg {...svgProps}>
      <use xlinkHref={'#' + props.type} />
    </svg>
  );
};

Icon.defaultProps = {
  type: 'icon-xiaolian'
};

export default Icon;
