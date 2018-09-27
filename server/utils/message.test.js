
const expect = require('expect');
const message = require('./message');

describe('generateMessage' ,() => {

    it('should work correctly',() => {

        var msg = message.generateMessage('naji','test message');
        
        expect(msg.from).toBe('naji');
        expect(msg.text).toBe('test message');
        expect(msg).toIncludeKey('createdAt');
    })
});