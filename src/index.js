require("dotenv").config();

const { Client, IntentsBitField, Collection } = require("discord.js");

const { Player } = require("discord-player");
const { YouTubeExtractor, SoundCloudExtractor, SpotifyExtractor } = require("@discord-player/extractor");
const fs = require("fs");

const { isBot } = require("./tools");
const { throwError } = require("./errors");
const { embedPlaying, deleteEmbedPlaying } = require("./embeds");

const PREFIX = process.env.PREFIX;
const PROXY = process.env.PROXY;
const COOKIES = process.env.YOUTUBE_COOKIES;
const DEBUG = process.env.DEBUG == "true" ? true : false;
const ID_DEBUG = process.env.ID_DEBUG;

var lastMessage = null;

module.exports = {
	function: embedPlaying,
	DEBUG,
	ID_DEBUG,
};

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds, // Guild = server
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.MessageContent,
	],
});
client.commands = new Collection();
client.player = new Player(client, {
	deafenOnJoin: true,
	leaveOnEmpty: true,
	leaveOnEmptyCooldown: 60000,
	leaveOnEnd: true,
	leaveOnEndCooldown: 300000,
	skipOnNoStream: true,
	ytdlOptions: {
		filter: "audioonly",
		quality: "highestaudio",
		highWaterMark: 1 << 25,
		requestOptions: {
			PROXY,
			headers: {
				cookie: COOKIES,
			},
		},
		html5: "1",
		c: "TVHTML5",
		cver: "6.20180913",
	},
});
client.player.extractors.register(YouTubeExtractor);
client.player.extractors.register(SoundCloudExtractor);
client.player.extractors.register(SpotifyExtractor);

// poivrotek commands
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
	client.commands.set(cmd.name, cmd);

	console.log(`${file} loaded!`);
}

//#region  events
client.on("messageCreate", (message) => {
	// TODO : Check permission
	if (isBot(message) || message.content[0] != PREFIX) return;
	handleCommand(message);
});
async function handleCommand(message) {
	let args = message.content.substring(PREFIX.length).split(" ");
	const cmd = client.commands.get(args[0]);
	//console.log(cmd);
	if (!cmd) {
		if (process.env.INVALID_COMMAND == true) throwError(message, "invalid-command");
		return;
	}
	lastMessage = message;
	await cmd.run({ client, message });
}

// Music Bot Events
client.player.events.on("playerStart", (queue, track) => {
	embedPlaying(queue, track);
});
client.player.events.on("playerError", () => {
	throwError(lastMessage, "player-error");
});

//#endregion
if (DEBUG) {
	client.login(process.env.TOKEN_DEBUG);
	console.log("DEBUG_MODE");
} else client.login(process.env.TOKEN);
client.on("ready", (c) => {
	console.log(`${c.user.username} is Online!`);
});
