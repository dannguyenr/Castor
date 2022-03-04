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

/**
 *
 */
export const objectLiteral = <T>(source: T, target: T) => {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);
    const commonKeys = sourceKeys.filter(key => targetKeys.includes(key));
    const sourceOnlyKeys = sourceKeys.filter(key => !targetKeys.includes(key));
    const targetOnlyKeys = targetKeys.filter(key => !sourceKeys.includes(key));
    let trackResult;

    // Detech common keys changes
    for (let index = 0; index < commonKeys.length; index++) {
        const key = commonKeys[index];
        const sourceValue = source[key];
        const targetValue = target[key];
        let detechedChanged = false;

        if (!sourceValue && !targetValue) {
            // Both source and target value are falsy => Not changed data, so dothing
        } else {
            if (sourceValue && !targetValue) {
                // One falsy and the other is truthy => data was changed, deteched changes
                detechedChanged = true;
            } else {
                // Both are truthy => Check data type
                const sourceType = typeof sourceValue;
                if (sourceType !== 'object' && sourceType !== 'function') {
                    // Compare data directly
                    detechedChanged = sourceValue !== targetValue;
                } else {
                    if (sourceType === 'object') {
                        const compareResult = objectLiteral(sourceValue, sourceValue);
                        if (compareResult) {
                            detechedChanged = true;
                        }
                    }
                }
            }
        }

        if (detechedChanged) {
            trackResult = addValueSafelly(trackResult, key, {
                old: sourceValue,
                new: targetValue,
            });
        }
    }

    // Source only keys
    for (let index = 0; index < sourceOnlyKeys.length; index++) {
        const key = sourceOnlyKeys[index];
        const sourceValue = source[key];
        if (sourceValue) {
            trackResult = addValueSafelly(trackResult, key, {
                old: sourceValue,
                new: undefined,
            });
        }
    }

    // Target only keys
    for (let index = 0; index < targetOnlyKeys.length; index++) {
        const key = targetOnlyKeys[index];
        const targetValue = target[key];
        if (targetValue) {
            trackResult = addValueSafelly(trackResult, key, {
                old: undefined,
                new: targetValue,
            });
        }
    }
    return trackResult;
};

const addValueSafelly = (trackResult: Object, key: string, value: Object) => {
    if (!trackResult) {
        trackResult = {};
    }
    trackResult[key] = value;
    return trackResult;
};
