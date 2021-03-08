import lazyComponent from 'components/hoc';
import React from 'react'

export interface Route {
  path: string;
  label: string;
  icon?: string;
  component?: React.ComponentType;
  children?: Route[];
  hidden?: boolean;
  // roles?: RoleEnum[];
}
const routes: Route[] = [
  {
    path: '/demo',
    label: 'demo',
    icon: 'icon-xiaolian',
    children: [
      {
        path: '/demo/list',
        label: '列表',
        icon: 'icon-xiaolian',
        component: lazyComponent(() => import('pages/demo/list')),

      },
      {
        path: '/demo/create',
        label: '新增',
        icon: 'icon-xiaolian',
        component: lazyComponent(() => import('pages/demo/create')),

      }
    ],
  },
];

export default routes;
