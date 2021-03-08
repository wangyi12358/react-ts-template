
interface ReaderAttr {
  file: File;
  attr: {
    width?: number;
    height?: number;
    src: string;
  };
}

export default class Utils {

  /**
   * 检测文件类型
   * @param file 
   * @param accept 
   */
  static checkAccept(file: File, accept: string) {
    const { type } = file;
    const accepts = accept.replace(/\*/, '').split(',');
    return accepts.some(item => type.indexOf(item.trim()) > -1);
  }

  /**
   * 获取base64地址
   * @param files 
   */
  static async getBase64Reader(files: File[]) {
    let readers: ReaderAttr[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64Url = await Utils.getReader(file);
      if (file.type.indexOf('image')) {
        const size = await Utils.getImgSize(base64Url);
        readers.push({ attr: { ...size, src: base64Url }, file });
      } else {
        readers.push({ attr: { src: base64Url }, file });
      }
    }
    return readers;
  }

  /**
   * 通过FileReader获取文件base64地址
   * @param file 
   */
  static getReader(file: File) {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
        reader = null;
      };
    });
  }

  /**
   * 获取图片的宽高
   * @param url 
   */
  static getImgSize(url: string) {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onerror = (e) => {
        img = img.onload = img.onerror = null;
        reject(e);
      };
      img.onload = () => {
        const { width, height } = img;
        img = img.onload = img.onerror = null;
        resolve({ width, height });
      };
    });
  }

  /**
   * 截流函数
   * @param func 
   * @param time 
   */
  static debounce<P>(func: (params: P) => void, time: number = 200) {
    let timeout: NodeJS.Timeout;
    return (args: P) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(args), time);
    };
  }

}
