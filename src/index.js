// Require the necessary discord.js classes
import fs from 'fs';
import dotenv from 'dotenv';
import { Client, Collection, Intents } from 'discord.js';

if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
}
else {
	console.log('Using .env.example file to supply config environment variables');
	dotenv.config({ path: '.env.example' });
}

const { DISCORD_TOKEN } = process.env;
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

console.log('token:', DISCORD_TOKEN);
// Login to Discord with your client's token
client.login(DISCORD_TOKEN);