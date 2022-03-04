import { describe } from 'mocha';
import { expect } from 'chai';
import { getUrlParams, objectLiteral } from './helpers';

describe('Helpers test', () => {
    it('getUrlParams function should work', () => {
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

    it('typeof should work', () => {
        expect(typeof 42).to.be.equal('number');

        const data = {
            key1: 123,
            func1: function() {
                console.log('func1');
            },
            func2: () => {
                console.log('func2');
            },
        };
        expect(typeof data).to.be.equal('object');
        expect(typeof data.func1).to.be.equal('function');
        expect(typeof data.func2).to.be.equal('function');

        expect(typeof null).to.be.equal('object');
        expect(typeof undefined).to.be.equal('undefined');
    });

    it('objectLiteral shoudl work', () => {
        type Data = {id: string, name?: string, count: number};
        const before: Data = {id: '1', count: 0};
        const after: Data = {id: '1', name: 'khan', count: 1};

        const trackResult = objectLiteral<Data>(before, after);
        console.log(trackResult);
        expect('{"count":{"old":0,"new":1},"name":{"new":"khan"}}').to.be.equal(JSON.stringify(trackResult));
        
    });
});