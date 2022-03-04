/**
 * 
 * @param pathString a pathString extracted from a URL with static portions and parameters in the form staticOne/one/Static2/two/three
 * @param patternString a patternString specified from a string which defines static portions and params with : in the form staticOne/:paramOne/Static2/:paramTwo/:paramThree
 */
export const getUrlParams = (pathString: string, patternString: string): Object | any => {
    const result = {};
    const patternItems = patternString.split('/');
    const pathItems = pathString.split('/');

    for (let index = 0; index < patternItems.length; index++) {
        const patternItem = patternItems[index];
        const isOutOfPathString = index > pathItems.length - 1;
        if (isOutOfPathString) {
            return result;
        } else {
            const isParam = patternItem.startsWith(':');
            if (!isParam) {
                // This item is static portion, so it must be same
                if (patternItem !== pathItems[index]) {
                    return result;
                } else {
                    // Continue check the next 
                    continue;
                }
            } else {
                const paramName = patternItem.trim().substring(1);
                const paramValue = pathItems[index];
                result[paramName] = paramValue;
            }
        }
    }
};