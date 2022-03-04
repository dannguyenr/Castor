import { describe } from 'mocha';
import { expect } from 'chai';
import { getUrlParams } from './helpers';

describe('Helpers test', () => {
    it('Helper should work', () => {
        const pattern = 'staticOne/:paramOne/staticTwo/:paramTwo/:paramThree'

        // does not match the first static part: staticOne <> staticZero, returns {}
        let params = getUrlParams('staticZero/one', pattern);
        expect('{}').to.be.equal(JSON.stringify(params));

        // matched the first static and param part, returns {paramOne: 'one'}
        params = getUrlParams('staticOne/one', pattern);
        expect(Object.keys(params).length).to.be.equal(1);
        let key = Object.keys(params)[0];
        expect(key).to.be.equal('paramOne');
        expect(params[key]).to.be.equal('one');
        expect('{"paramOne":"one"}').to.be.equal(JSON.stringify(params));

        // matched the first static and param part with extra, returns {paramOne: 'one'}
        params = getUrlParams('staticOne/one/staticThree/three', pattern);
        expect(Object.keys(params).length).to.be.equal(1);
        key = Object.keys(params)[0];
        expect(key).to.be.equal('paramOne');
        expect(params[key]).to.be.equal('one');
        expect('{"paramOne":"one"}').to.be.equal(JSON.stringify(params));

        // matched the first and second static + param parts
        // returns {paramOne: 'one', paramTwo: 'two'}
        params = getUrlParams('staticOne/one/staticTwo/two', pattern);
        expect(Object.keys(params).length).to.be.equal(2);
        let key1 = Object.keys(params)[0];
        let key2 = Object.keys(params)[1];
        expect(key1).to.be.equal('paramOne');
        expect(key2).to.be.equal('paramTwo');
        expect(params[key1]).to.be.equal('one');
        expect(params[key2]).to.be.equal('two');
        expect('{"paramOne":"one","paramTwo":"two"}').to.be.equal(JSON.stringify(params));
    });
});