const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('anything', data => {
    console.log(data);
});

emitter.emit('anything', {a: 1, b: 2});
emitter.emit('anything', {c: 3, d: 4});

class Dispather extends EventEmitter{
    subscribe(eventName, callback) {
        console.log('[Subscribe...]');
        this.on(eventName, callback);
    }

    dispatch(eventName, data){
        console.log('[Dispatching...]');
        this.emit(eventName, data);
    }
}

const dispatch = new Dispather();
dispatch.subscribe('aa', data => {
    console.log(data);
});
dispatch.dispatch('aa', [1, 2, 3, 4, 5]);