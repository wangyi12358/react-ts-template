import React from 'react';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouteUtils from 'common/utils/routeUtils';
import { useStore } from 'model';
import css from './index.less';

export interface Props extends RouteComponentProps {
  renderFooter?: () => React.ReactNode;
  render?: (minHeight: number) => React.ReactNode; // 如果存在 render,children无效
  onMouseDown?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const PageLayout: React.FC<Props> = React.memo<Props>(
  ({ location, children, renderFooter, render, onMouseDown }) => {
    // 选中的路由，及其夫路由集合，
    const selectRoutes = RouteUtils.getRoutesByPathname(location.pathname);
    // 设置main最小高度，使其充满屏幕
    let minHeight = document.documentElement.clientHeight - 103;
    const footer = renderFooter();
    const hasFooter = !!renderFooter();

    // 出现横向滚动条
    if (document.body.style.overflow != 'hidden' && document.body.scrollHeight > document.body.offsetHeight) {
      minHeight = minHeight + 16;
    }
    const [hasScroll, setHasScroll] = React.useState(false); // 是否存在滚动条
    // const [width, setWidth] = React.useState('100%');
    const { collapsed } = useStore();
    const mainRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
      const { height } = mainRef.current.getBoundingClientRect();
      if (height > minHeight) setHasScroll(true);

      function onResize() {
        if (document.documentElement.clientWidth <= 1330) {
          setHasScroll(false);
          // setWidth('1348');
        } else {
          setHasScroll(true);
          // setWidth('100%');
        }
      }
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };

    }, []);

    return (
      <div
        className={classNames(css.container, { [css.hasFooter]: hasFooter })}
      >
        <h4>
          {selectRoutes.length > 1
            ? selectRoutes.map(route => route.label).join('-')
            : selectRoutes[0].label}
        </h4>
        <main
          ref={mainRef}
          className={css.content}
          style={{ minHeight: footer ? minHeight - 52 : minHeight }}
          onMouseDown={onMouseDown}
        >
          {render ? render(minHeight) : children}
        </main>
        {/* {hasFooter && (
          <div className={css.footBox}>
            <div
              className={css.footer}
              style={{
                width: `calc(100% - ${(collapsed ? 40 : PROJECTS.type === ProjectTypeEnum.ProductNoMenu || PROJECTS.type === ProjectTypeEnum.NoMenu ? 0 : 160) +
                  (hasScroll ? 15 : 0)}px)`
              }}
            >
              {footer}
            </div>
          </div>
        )} */}
      </div>
    );
  }
);

PageLayout.defaultProps = {
  renderFooter: () => null,
  onMouseDown: () => { }
};

export default withRouter(PageLayout);
