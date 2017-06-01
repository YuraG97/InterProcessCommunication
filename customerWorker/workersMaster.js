'use strict';

module.exports = function() {
  const workersCount = 15;
  let startPort = 10000;

  const workers = [];
  for (let i = 0; i < workersCount; i++) {
    const worker = api.cluster.fork();
    workers.push(worker);
  }

  workers.forEach((worker) => {
    worker.send(startPort++);
    worker.on('exit', (code) => {
      console.log('exit ' + worker.process.pid + ' ' + code);
    });
  });
};
