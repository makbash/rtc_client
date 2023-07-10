
interface IRouteObject {
    path?: string,
    children?: IRouteObject[],
}

export const publicPaths = ['login', 'register']

export const validatePath = (routes: IRouteObject[]): IRouteObject[] => {
    return [...(routes || [])].filter(item => item?.path === location.pathname.replace(/^\/([^\/]*).*$/, '$1'));
}

export const setItem = (name: string, item: any): void => {
    localStorage.setItem(name, item)
}

export const getItem = (name: string): string | null => {
    return localStorage.getItem(name) as string || null;
}

export const checkItem = (name: string, value: string): boolean => {
    return localStorage.getItem(name) === value;
}

export const keepWaiting = (timeout = 3000) => new Promise((resolve) => setTimeout(resolve, timeout));
