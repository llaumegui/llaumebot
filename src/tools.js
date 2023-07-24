const fs = require("fs");
const PREFIX = process.env.PREFIX;

module.exports = {
	isBot,
	getUserFromMention,
	getRandomInt,
	getArgs,
	getStringArg,
	tryParse,
	getAsset,
};

function isBot(message) {
	return message.author.bot;
}

function getUserFromMention(client, mention) {
	if (!mention) return undefined;

	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1);

		if (mention.startsWith("!")) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

function getStringArg(message) {
	return getArgs(message).join(" ");
}

function getArgs(message) {
	let args = message.content.substring(PREFIX.length).split(" ");
	args.splice(0, 1);
	return args;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function tryParse(str) {
	return str != null && str.length > 0 && !isNaN(str) ? parseInt(str, 10) : null;
}

function getAsset(name) {
	const files = fs.readdirSync("./src/assets").filter((file) => file.includes(name));
	if (files.length == 0) return "";
	return `./src/assets/${files[getRandomInt(files.length)]}`;
}
