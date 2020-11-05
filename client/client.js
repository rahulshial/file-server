const net = require('net');
const FS = require('fs');
const readline = require('readline');

const IP = 'localhost'; // change to IP address of computer or ngrok host if tunneling
const PORT = 3000; // or change to the ngrok port if tunneling

const conn = net.createConnection({
  host: IP,
  port: PORT
});

const RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getFilesizeInBytes = (OutFILE) => {
  const stats = FS.statSync(OutFILE);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log('Server says: ', data);
  RL.question('please enter filename: ', (filename) => {
    RL.close();
    conn.write(filename);
    console.log("data from file...");
    conn.on('data', (dataFromFile) => {
      console.log("received data from server...",dataFromFile);
      FS.writeFile('./' + filename, dataFromFile, (err, dataFromFile) => {
        if (err) {
          return console.log(err);
        } else {
          console.log(`Downloaded and saved ${getFilesizeInBytes(filename)} bytes to ${filename}`);
          process.exit();
        }
      });
    });
  });
});

conn.on('dataFromFile', (dataFromFile) => {
  console.log(dataFromFile);
});

conn.on('connect', () => {
  console.log('connected to server');
  conn.write('Hello from Rahul!');
});

