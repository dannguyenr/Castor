import { getUrlParams, objectLiteral } from './helpers';

const pattern = 'staticOne/:paramOne/staticTwo/:paramTwo/:paramThree'

// does not match the first static part: staticOne <> staticZero, returns {}
console.log(getUrlParams('staticZero/one', pattern));

// matched the first static and param part, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one', pattern));

// matched the first static and param part with extra, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one/staticThree/three', pattern));

// matched the first and second static + param parts
// returns {paramOne: 'one', paramTwo: 'two'}
console.log(getUrlParams('staticOne/one/staticTwo/two', pattern));

type Data = { id: string, name?: string, count: number };
const before: Data = { id: '1', count: 0 };
const after: Data = { id: '1', name: 'khan', count: 1 };

const trackResult = objectLiteral<Data>(before, after);
console.log(trackResult);