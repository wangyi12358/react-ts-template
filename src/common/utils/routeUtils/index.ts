import ROUTES, { Route } from 'common/const/routes';
import * as pathToRegexp from 'path-to-regexp';
// import a from 

export default class RouteUtils {

  /**
   * 通过 pathname 查询选中的 route 及其夫 route
   * 子路由在前，夫路由在后的顺序排列
   * @param pathname 
   */
  // static getRoutesByPathname(pathname: string): Route[] {
  //   const routes: Route[] = [];

  //   ROUTES.some(function check(item) {
  //     if (item.path === pathname) {
  //       routes.push(item);
  //       return true;
  //     }
  //     if (item.children && item.children.some(check)) {
  //       routes.push(item);
  //       return true;
  //     }
  //     return false;
  //   });

  //   return routes;
  // }

  static getRoutesByPathname(pathname: string): Route[] {

    let routes = [];

    function checkSelectMenu(route: Route): boolean {
      // console.log('route', route);
      // console.log('pathname', pathname);
      // console.log('pathToRegexp(route.path)', pathToRegexp(route.path));
      // 匹配成功
      if (pathToRegexp(route.path).exec(pathname)) {
        routes.push(route);
        return true;
      }

      if (route.children && route.children.length) {
        let isParent = route.children
          .map(child => checkSelectMenu(child))
          .some(selected => selected);

        if (isParent) {
          routes.push(route);
        }
        return isParent;
      }
      return false;
    }

    ROUTES.forEach(route => {
      checkSelectMenu(route);
    });

    routes.reverse();

    return routes;
  }


}
