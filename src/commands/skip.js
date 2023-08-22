const { useQueue } = require("discord-player");
const { throwError } = require("../errors");
const { DEBUG } = require("../index");

module.exports = {
	name: "skip",
	parameters: "",
	description: "Skip current track",

	run: async ({ client, message }) => {
		if (!DEBUG) if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const channel = message.member.voice.channel;
		const queue = useQueue(message.guild.id);

		if (!queue.currentTrack) return throwError(message, "not-playing");
		if (!DEBUG) if (queue.channel != channel) return throwError(message, "not-in-same-channel");

		await message.channel.send(`Skipped !`);

		queue.node.skip();
	},
};
