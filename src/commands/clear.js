const { useQueue } = require("discord-player");
const { throwError } = require("../errors");

module.exports = {
	name: "clear",
	parameters: "",
	description: "Clear the music queue",

	run: async ({ client, message }) => {
		if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const channel = message.member.voice.channel;
		const queue = useQueue(message.guild.id);
		if (!queue) return throwError(message, "queue-not-initialized");
		if (!queue.currentTrack) return throwError(message, "not-playing");
		if (queue.channel != channel) return throwError(message, "not-in-same-channel");

		await queue.tracks.clear();
		message.channel.send(`Cleared ${queue.tracks.size} track${queue.tracks.size > 1 ? "s" : ""}`);
	},
};
