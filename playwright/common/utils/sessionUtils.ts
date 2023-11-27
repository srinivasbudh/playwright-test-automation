
let sessionVariables: Record<string, any> = {};

export const setSessionVariable = (key: string, value: any): void => {
    sessionVariables[key] = value;
};

export const getSessionVariable = (key: string): any => {
    return sessionVariables[key];
};
