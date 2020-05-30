const fs = require('fs');
const tmi = require('tmi.js');

const options = {
	options: {
		debug: true,
	},
	connection: {
		secure: true,
		reconnect: true,
	},
	identity: {
		username: '',
		password: '',
	},
	channels: ['mimelive'],
};

const client = new tmi.Client(options);

client.connect();

client.on('connected', () => {
	client.say('mimelive', 'dangit');
});

client.on('message',  (channel, tags, message, self) => {

	if (message.toLowerCase() === '!test'){
		client.say('mimelive', 'this test works');
	}
//fuck
	if (tags.username === 'mimelive'){
		client.say('mimelive', message);
		fs.appendFileSync('log.txt', message + "\n");
	}
});