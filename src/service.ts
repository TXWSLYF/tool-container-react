import createApi from "./createApi";
// TODO: 如何做到区分开发和生产环境
const api = createApi("development");

export const loadTool = (toolKey: string) => {
    return new Promise((resolve) => {
        resolve({
            name: 'counter',
            version: '1.0.0',
            url: 'http://127.0.0.1:8080/counter.min.js'
        })
    })
};
