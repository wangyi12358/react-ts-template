import React from 'react';
import { useRequest } from 'ahooks';
import axios from 'axios';

import { provideStore } from '../model';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from 'components/layouts/mainLayout';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import css from './index.less'
import classNames from 'classnames';
import Page404 from 'pages/errorPage/404';
import ROUTES, { Route as IRoute } from 'common/const/routes';

const Router: React.FC = () => {
  const [isEntering, setIsEntering] = React.useState(false);

  function renderRoutes(list: IRoute[] = ROUTES) {

    return list.map(item => {

      // 未获取到用户角色信息，且只有管理员等进入的路由，暂不渲染
      // if (!user && !item.roles.includes(RoleEnum.Admin)) return null;

      const props = {
        path: item.path,
        component: item.component,
        exact: true,
      };

      // 权限不通过，不渲染路由，以及其子路由
      // if (item.roles && user && !item.roles.includes(user.job.role)) return null;

      // 有子节点
      if (item.children && item.children.length) {
        return [
          ...renderRoutes(item.children),
          <Route key={item.path} {...props} />
        ];
      }

      console.log('props==', props);
      return (
        <Route key={item.path} {...props} />
      );
    });
  }

  return (
    <HashRouter>
      <Route render={({ location }) => (
        <MainLayout>
          <TransitionGroup className={classNames(css.transitionGroup, { [css.entering]: isEntering })}>
            <CSSTransition enter exit
              key={location.pathname}
              timeout={300}
              onEntering={() => setIsEntering(true)}
              onEntered={() => setIsEntering(false)}
              classNames={{
                enter: css.routeTransitionEnter,
                enterActive: css.routeTransitionEnterActive,
                exit: css.routeTransitionExit,
                exitActive: css.routeTransitionExitActive,
              }}
            >
              <Switch location={location}>
                {renderRoutes()}
                <Route component={Page404} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </MainLayout>
      )} />
    </HashRouter>
  );
}

export default provideStore(Router);