import axios, { AxiosResponse } from 'axios';
import { Result } from 'api/interface';
import { AjaxMethods } from 'common/interface/enums';
import Utils from 'common/utils';
import errorCode from './errorCode';

interface QueryData<P> {
  url: string;
  params?: P;
  method?: AjaxMethods;
  successNotice?: string;
  // isMock?: boolean;
  // type?: 'body' | 'form'; // 参数使用 body 或者 表单提交
}

interface UploadQuery<P> extends Omit<QueryData<P>, 'method'> {
  onProgress?: (progress: number) => void;
}

export interface ResponseData<D> {
  data: D;
  msg: string;
  code: string;
}

export default class Ajax {
  /**
   * token
   */
  private static get token() {
    return localStorage.getItem('token');
  }

  /**
   * ajax query
   * @param param0
   */
  static async query<P, D>(data: QueryData<P>): Promise<D> {
    const { url, method = AjaxMethods.GET, params = {}, successNotice } = data;

    // 遍历params 为空删除

    try {
      const result = (await axios({
        url,
        method: method,
        data: method === AjaxMethods.GET ? undefined : params,
        params: method === AjaxMethods.GET ? params : undefined
      })) as AxiosResponse<Result<D>>;

      if (result.status !== 200 || result.data.code != '0') throw result;
      if (successNotice) Utils.message(successNotice, 'success');
      return result.data.data;
    } catch (e) {
      // ajax请求失败，异常处理
      const error = (e.response || e) as AxiosResponse<Result<void>>;

      console.error('ajax failed:', error);

      if (error.status === 401) {
        // 401 未登录，直接跳转登录页面
        // if (PROCESS_ENV.ENV_NODE !== 'local') {
        //   window.location.href = `${PROCESS_ENV.ENV_PROJECT}/login`;
        // }
      } else if (errorCode[error.status]) {
        Utils.message(errorCode[error.status], 'error');
      } else if (error.data && error.data.msg) {
        Utils.message(error.data.msg, 'error');
      }

      throw error;
    }
  }

  /**
   * 上传文件
   * @param param0
   */
  static async upload<P extends FormData, D>({
    url,
    params,
    onProgress = () => { }
  }: UploadQuery<P>) {
    const source = axios.CancelToken.source();
    try {
      const result = await axios.post<Result<D>, AxiosResponse<Result<D>>>(
        url,
        params,
        {
          cancelToken: source.token,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: Ajax.token
          },
          onUploadProgress(p) {
            if (onProgress) onProgress(100 * (p.loaded / p.total));
          }
        }
      );

      if (result.status !== 200 || !result.data.result) throw result;

      return {
        data: result.data.data,
        abort: source.cancel // 取消
      };
    } catch (e) {
      // ajax请求失败，异常处理
      const error = (e.response || e) as AxiosResponse<Result<void>>;

      console.error('ajax failed:', error);

      if (error.status === 401) {
        // 401 未登录，直接跳转登录页面
        // window.location.href = `${PROCESS_ENV.ENV_PROJECT}/login`;
      } else if (errorCode[error.status]) {
        Utils.message(errorCode[error.status], 'error');
      } else if (error.data && error.data.msg) {
        Utils.message(error.data.msg, 'error');
      }

      throw e;
    }
  }
}
