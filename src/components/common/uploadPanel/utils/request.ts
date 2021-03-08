
export interface Options {
  onProgress: (event: ProgressEvent<EventTarget> & { percent?: number }) => void;
  onError: (event: ProgressEvent<EventTarget>, body?: object) => void;
  onSuccess: (body: object, xhr: XMLHttpRequest) => void;
  data: object;
  filename: string;
  file: File;
  withCredentials: boolean;
  action: string;
  headers: object;
}

function getError(option: any, xhr: XMLHttpRequest) {
  const msg = `cannot post ${option.action} ${xhr.status}'`;
  const err = new Error(msg) as any;
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

/* option {
 onProgress: (event: { percent: number }): void,
 onError: (event: Error, body?: Object): void,
 onSuccess: (body: Object): void,
 data: Object,
 filename: String,
 file: File,
 withCredentials: Boolean,
 action: String,
 headers: Object,
} */

export default function request(option: Options) {
  const xhr = new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function(e) {
      const event: ProgressEvent<EventTarget> & { percent?: number } = e;
      if (e.total > 0) {
        event.percent = e.loaded / e.total * 100;
      }
      option.onProgress(event);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  // eslint-disable-next-line func-name-matching
  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };


  xhr.open('post', option.action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  // 设置token
  const token = localStorage.getItem('token');
  if (token) {
    xhr.setRequestHeader('Authorization', token);
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
