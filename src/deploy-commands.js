import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
import { commands as commandData } from './commands/index.js';
const commands = [];
if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
}
else {
	console.log('Using .env.example file to supply config environment variables');
	dotenv.config({ path: '.env.example' });
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;


for (const c of commandData) {
	commands.push(c.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);
console.log(DISCORD_TOKEN);
rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then((res) => console.log('Successfully registered application commands:', res))
	.catch(console.error);