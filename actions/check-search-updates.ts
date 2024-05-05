'use server'

export async function checkSearchUpdates(queryString : string) {

    function parseQueryString(queryString: string): any {
        const params: any = {};
        const queryStringPairs = queryString.split('&');
        queryStringPairs.forEach(pair => {
            const keyValue = pair.split('=');
            params[keyValue[0]] = decodeURIComponent(keyValue[1] || '');
        });
        
        return params;
    }

    const paramsObject = parseQueryString(queryString.slice(2))

    return paramsObject;
}