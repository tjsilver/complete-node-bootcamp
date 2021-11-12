const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 1; // set this to 1 to see how crypto functions take longer to complete each time

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('text-file.txt', () => {
    console.log('I/O finished');
    console.log('-----------------------');

    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 finished')); // setImmediate gets executed once per tick

    process.nextTick(() => console.log('Process.nextTick()')); // gets executed immediately

    // these sync functions don't run in event loop
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); // sync version - for demo purposes only!
    console.log(Date.now() - start, 'Sync password encrypted!');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); // sync version - for demo purposes only!
    console.log(Date.now() - start, 'Sync password encrypted!');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); // sync version - for demo purposes only!
    console.log(Date.now() - start, 'Sync password encrypted!');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); // sync version - for demo purposes only!
    console.log(Date.now() - start, 'Sync password encrypted!');

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted!');
    });
});

console.log('Hello from the top-level code!');