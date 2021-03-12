import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import RouteUtils from 'common/utils/routeUtils';
import ROUTES from 'common/const/routes';
// import PROJECTS, { ProjectTypeEnum } from 'common/const/projects';
import Icon from 'components/common/icon';
import { useConnect } from 'model/index';
import Header from './components/header';
import css from './index.less';

export interface Props extends RouteComponentProps { }

const { Sider, Content } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

const MainLayout: React.FC<Props> = ({ location, children, history }) => {
  // 选中的路由，及其夫路由集合，
  const selectRoutes = RouteUtils.getRoutesByPathname(location.pathname);
  // 没有选中的route 则默认选中第一个
  if (!selectRoutes.length) {
    selectRoutes.push(ROUTES[0]);
    if (ROUTES[0].children) selectRoutes.push(ROUTES[0].children[0]);
  }

  const [openKey, setOpenKey] = React.useState([selectRoutes[0].path]);
  const [{ collapsed }, dispatch] = useConnect();

  /**
   * 渲染 menu树
   */
  function renderMenuList() {

    return ROUTES.map(route => {
      // 未获取到用户信息，且只有管理员能进入的路由，暂不渲染
      // if (!user && !route.roles.includes(RoleEnum.Admin)) return null;

      // if (route.roles && user && !route.roles.includes(user.job.role)) return null;

      if (route.children) {

        const title = (
          <span >
            <Icon
              type={route.icon}
              className={classNames(
                'anticon',
                css.subIcon,
                { [css.selected]: selectRoutes[0].path === route.path }
              )}
            />
            <span className={css.title}>{route.label}</span>
          </span>
        );
        return (
          <SubMenu
            className={css.hoverIcon}
            onTitleClick={() => {
              setOpenKey([route.path]);
              history.push(route.children[0].path);
            }}
            key={route.path} title={title}>
            {
              route.children.map(child => {
                console.log('route.children[0].path', child);
                return (
                  <MenuItem key={child.path}>
                    <Link className={css.childLabel} to={child.path}>
                      {child.label}
                    </Link>
                  </MenuItem>
                );
              })
            }
          </SubMenu>
        );
      }

      return (
        <MenuItem
          title={route.label}
          onClick={() => {
            setOpenKey([route.path]);
            history.push(route.path);
          }}
          className={classNames(
            css.linkDefault,
            { [css.link]: selectRoutes[0].path === route.path }
          )}
          key={route.path}>
          <Link to={route.path}>
            <Icon
              type={route.icon}
              className={classNames(
                'anticon',
                css.iconMain,
                { [css.iconMainClick]: selectRoutes[0].path === route.path }
              )}
            />
            <span className={css.titleMain}>{route.label}</span>
          </Link>
        </MenuItem>
      );
    });
  }

  return (
    <Layout className={css.layout}>
      <Header />
      <Layout>
        {
          <Sider
            className={css.sider}
            collapsible
            collapsed={collapsed}
            width={160}
            collapsedWidth={40}
            onCollapse={() => {
              dispatch({ type: 'update', payload: { collapsed: !collapsed } });
              setOpenKey([]);
            }}
            trigger={<Icon className={css.trigger} type={collapsed ? 'iconCloseSidebar' : 'iconOpenSidebar'} />} // 底部收缩Icon 出 收
          >
            <Menu
              defaultSelectedKeys={[(selectRoutes.length > 1 ? selectRoutes[1] : selectRoutes[0]).path]}
              selectedKeys={[selectRoutes[1] ? selectRoutes[1].path : selectRoutes[0].path]}
              openKeys={openKey}
              onOpenChange={openKeys => {
                setOpenKey([openKeys.reverse()[0].toString()]);
              }}
              mode="inline"
              inlineIndent={12}
            >
              {renderMenuList()}
            </Menu>
          </Sider>
        }
        <Layout className={css.body}>
          <Content className={css.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

MainLayout.defaultProps = {};

export default withRouter(MainLayout);
