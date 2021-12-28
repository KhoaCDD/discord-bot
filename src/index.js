import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { commands as commandData } from './commands/index.js';
if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
}
else {
	console.log('Using .env.example file to supply config environment variables');
	dotenv.config({ path: '.env.example' });
}

const { DISCORD_TOKEN } = process.env;


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

for (const c of commandData) {
	client.commands.set(c.data.name, c);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(DISCORD_TOKEN);