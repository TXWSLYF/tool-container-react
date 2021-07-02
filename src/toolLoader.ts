import { loadTool } from "./service";

/**
 * @description 工具加载器
 */

class ToolLoader {
  /**
   * @description 缓存加载过的工具信息
   * 通过 name@version 唯一确定一个工具的信息
   */
  private loadedTools: {
    [key: string]: any;
  } = {
    // 'hello_world@0.0.1': {
    //   factory: {},
    // },
  };

  // 正在加载的工具信息
  private promisesCenter: {
    [key: string]: {
      promise: Promise<any>;
      resolve: any;
      reject: any;
    };
  } = {
    // 'hello_world@0.0.1': {
    //   promise: Promise,
    //   resolve: Function,
    //   reject: Function,
    // },
  };

  /**
   * @description 工具定义函数
   * @param {String} name 工具名称
   * @param {String} version 工具版本
   * @param {Object} factory 工具描述对象
   */
  define(name: string, version: string, factory: any) {
    const key = `${name}@${version}`;

    this.loadedTools[key] = {
      factory,
    };

    if (this.promisesCenter[key]) {
      this.promisesCenter[key].resolve(factory);
    }
  }

  /**
   * @description 脚本加载函数
   * @param {String} url 脚本地址
   */
  private loadScript(url: string) {
    const scriptEl = document.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.src = url;

    // TODO: 脚本加载失败 & 加载超时处理
    document.body.appendChild(scriptEl);
  }

  /**
   * @description 远程加载工具
   */
  load(toolKey: string) {
    return loadTool(toolKey).then((res) => {
      // @ts-ignore
      const { name, version, url } = res;
      const key = `${name}@${version}`;

      // 工具已经加载过
      if (this.loadedTools[key]) {
        return this.loadedTools[key].factory;
      }
      // 工具正在加载中
      else if (this.promisesCenter[key]) {
        return this.promisesCenter[key].promise;
      }
      // 工具没有被加载过
      else {
        const loadPromise = new Promise((resolve, reject) => {
          // @ts-ignore
          this.promisesCenter[key] = {};
          this.promisesCenter[key].resolve = resolve;
          this.promisesCenter[key].reject = reject;

          // 脚本加载
          this.loadScript(url);
        });
        this.promisesCenter[key].promise = loadPromise;

        return loadPromise;
      }
    });
  }
}

const toolLoader = new ToolLoader();
// @ts-ignore
window.toolLoader = toolLoader;

// @ts-ignore
if (!window["TOOL_LOADER_DEFINE"]) {
  // @ts-ignore
  window["TOOL_LOADER_DEFINE"] = {};
  // @ts-ignore
  window["TOOL_LOADER_DEFINE"].define = (name, version, factory) => {
    toolLoader.define(name, version, factory);
  };
}

export default toolLoader;
