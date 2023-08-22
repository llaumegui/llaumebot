const { QueryResolver, useQueue, useMainPlayer } = require("discord-player");
const { throwError } = require("../errors");
const { getStringArg, getArgs, getRandomInt } = require("../tools");
const { DEBUG, ID_DEBUG } = require("../index");

module.exports = {
	name: "play",
	parameters: "youtube/soundcloud url OR youtube playlist OR Youtube Search",
	description: "Add the selected track.s to the queue",

	run: async ({ client, message }) => {
		if (!DEBUG) if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		console.log(message.content);

		const player = useMainPlayer();
		const queue = useQueue(message.guildId);

		if (!DEBUG)
			if (queue && queue.channel != message.member.voice.channel) return throwError(message, "not-in-same-channel");

		let args = getArgs(message);
		var shuffle = args[1] && args[1].toLowerCase() == "shuffle";

		var arg = getStringArg(message);
		arg = shuffle ? arg.replace("shuffle", "") : arg;

		if (arg == "") return throwError(message, "play-incomplete");

		var type = QueryResolver.resolve(arg);
		//console.log(type);

		const result = await player.search(arg, {
			requestedBy: message.user,
			searchEngine: type,
		});
		if (result.tracks.length === 0) return throwError(message, "no-results");

		if (shuffle && type == "youtubePlaylist") {
			const temp = result.tracks[0];
			const val = getRandomInt(result.tracks.length);
			result.tracks[0] = result.tracks[val];
			result.tracks[val] = temp;
		}

		if (client.player.nodes.get(message.guild.id) && client.player.nodes.get(message.guildId).isPlaying())
			message.channel.send(
				type == "youtubePlaylist"
					? `**${result.tracks.length} songs from [${result.playlist.title}]** have been added to the Queue`
					: `**${result.tracks[0].title}** has been added to the Queue (**${result.tracks[0].duration}**)`
			);

		const link = DEBUG ? ID_DEBUG : message.member.voice.channel;
		await player.play(link, result, {
			nodeOptions: {
				metadata: {
					channel: message.channel,
					client: message.guild?.members.me,
					guildId: message.guildId,
				},
				leaveOnEmpty: true,
				leaveOnEmptyCooldown: 60000,
				leaveOnEnd: true,
				leaveOnEndCooldown: 300000,
				skipOnNoStream: true,
			},
		});

		if (shuffle && type == "youtubePlaylist") {
			await client.player.nodes.get(message.guild.id).tracks.shuffle();
		}
	},
};
