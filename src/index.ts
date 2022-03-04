import { getUrlParams } from './helpers';

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