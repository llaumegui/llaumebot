const { QueueRepeatMode, useQueue } = require("discord-player");
const { throwError } = require("../errors");

module.exports = {
	name: "loop",
	parameters: "",
	description: "Loop or unloop the current track",

	run: async ({ client, message }) => {
		if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const channel = message.member.voice.channel;
		const queue = useQueue(message.guild.id);
		if (!queue) return throwError(message, "queue-not-initialized");
		if (!queue.currentTrack) return throwError(message, "not-playing");
		if (queue.channel != channel) return throwError(message, "not-in-same-channel");

		await queue.setRepeatMode(queue.repeatMode == QueueRepeatMode.TRACK ? QueueRepeatMode.OFF : QueueRepeatMode.TRACK);
		message.channel.send(
			`**${queue.currentTrack.title}** has been ${queue.repeatMode == QueueRepeatMode.TRACK ? "" : "un"}looped`
		);
	},
};
