const { useQueue } = require("discord-player");
const { throwError } = require("../errors");

module.exports = {
	name: "shuffle",
	parameters: "",
	description: "Shuffle the Queue",

	run: async ({ client, message }) => {
		if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const channel = message.member.voice.channel;
		const queue = useQueue(message.guild.id);
		if (!queue) return throwError(message, "queue-not-initialized");
		if (!queue.currentTrack) return throwError(message, "not-playing");
		if (queue.channel != channel) return throwError(message, "not-in-same-channel");

		await message.channel.send(`Queue Shuffled`);
		queue.tracks.shuffle();
	},
};
