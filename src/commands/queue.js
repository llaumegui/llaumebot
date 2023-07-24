const { useQueue } = require("discord-player");
const { throwError } = require("../errors");
const { embedPlaying } = require("../embeds");

module.exports = {
	name: "queue",
	parameters: "",
	description: "Display the queue",

	run: async ({ client, message }) => {
		const queue = useQueue(message.guild.id);
		if (!queue) return throwError(message, "queue-not-initialized");
		if (!queue.tracks.length == 0) return throwError(message, "empty-queue");
		embedPlaying(queue, queue.currentTrack);
	},
};
