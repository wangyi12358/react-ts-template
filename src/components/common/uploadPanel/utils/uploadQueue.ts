import request from './request';
import Utils from '.';

export interface AjaxConfig<D = {}> {
  action?: string;
  filename?: string;
  data?: D;
  headers?: object;
  withCredentials?: boolean;
}

export interface QueueProps<D> extends AjaxConfig<D> {
  onStartUpload?: (file: File) => void;
  onProgress?: (file: File, event: ProgressEvent<EventTarget> & { percent?: number }) => void;
  onError?: (file: File, event: ProgressEvent<EventTarget>) => void;
  onSuccess?: (file: File, body: object, xhr: XMLHttpRequest) => void;
}

export default class UploadQueue<D> {

  props: QueueProps<D>;
  request: { abort(): void };
  queue: File[] = [];
  status: 'stop' | 'uploading' = 'stop';

  constructor(props: QueueProps<D>) {
    this.props = props;
    this.request = null;
  }

  /**
   * 启动上传
   */
  startUpload() {

    // 正在上传文件中
    if (this.status !== 'stop') {
      return;
    }

    if (this.queue.length > 0) {
      this.status = 'uploading';
      const file = this.queue.shift();
      this.props.onStartUpload(file);
      this.upload(file);
    }

  }

  /**
   * 添加队列
   * @param files
   */
  addQueue = Utils.debounce<File[]>(files => {
    this.queue = this.queue.concat(files);
    this.startUpload();
  }, 200);

  /**
   * 清除队列
   */
  clearQueue() {
    if (this.request) {
      this.request.abort();
      this.request = null;
    }
    this.status = 'stop';
    this.queue = [];
  }

  /**
   * 上传
   * @param file 
   */
  upload(file: File) {

    const {
      action = '',
      filename = 'file',
      data = {},
      headers = {},
      withCredentials = false,
      onProgress = () => {},
      onSuccess = () => {},
      onError = () => {},
    } = this.props;

    this.request = request({
      action,
      filename,
      file,
      data,
      headers,
      withCredentials,
      onProgress: e => onProgress(file, e),
      onSuccess: (res, xhr) => {
        onSuccess(file, res, xhr);
        this.status = 'stop';
        this.request = null;
        this.startUpload();
      },
      onError: (err) => {
        onError(file, err);
        this.status = 'stop';
        this.request = null;
        this.startUpload();
      },
    });

  }
}
