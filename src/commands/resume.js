const { useQueue } = require("discord-player");
const { throwError } = require("../errors");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "resume",
	parameters: "",
	description: "Resume the Music Bot",

	run: async ({ client, message }) => {
		if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const channel = message.member.voice.channel;
		const queue = useQueue(message.guild.id);

		if (!queue.currentTrack) return throwError(message, "not-playing");
		if (queue.channel != channel) return throwError(message, "not-in-same-channel");
		if (!queue.node.isPaused()) return throwError(message, "already-resumed");

		let embed = new EmbedBuilder();
		embed.setDescription(`Resuming`);

		await message.channel.send({
			embeds: [embed],
		});

		queue.node.setPaused(false);
	},
};
