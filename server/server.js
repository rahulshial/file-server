const net = require('net');
const FS = require('fs');
// const { connect } = require('http2');
const server = net.createServer();


// add this line after server is created, before listen is called
server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('What do you want!!!');
  client.setEncoding('utf8'); // interpret data as text
  
  client.on('data', (data) => {
    console.log('Message from client: ', data);
    if (data.includes('txt')) {
      const filename = '../' + data;
      // try {
      if (FS.existsSync(filename)) {
        console.log('file found...');
        const dataFromFile = FS.readFileSync(filename, 'utf8');
        // console.log(dataFromFile);
        client.write(dataFromFile);
        // FS.readFile(filename, 'utf-8', (err, data) => {
        //   if (err) {
        //     console.log("file read error...", err);
        //     return;
        //   }
        //   client.write('data', data);
        // });
      }
      // } catch (err) {
      //   console.error("try catch error...", err);
      // }
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

