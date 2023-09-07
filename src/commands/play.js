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
		var shuffle = args[1] && (args[1].toLowerCase() == "shuffle" || args[0].toLowerCase() == "shuffle");

		var arg = getStringArg(message);
		arg = shuffle ? arg.replace("shuffle", "") : arg;

		if (arg == "") return throwError(message, "play-incomplete");

		arg = resolvePlaylist(arg);

		var query = QueryResolver.resolve(arg);

		const result = await player.search(arg, {
			requestedBy: message.user,
			searchEngine: query.type,
		});
		if (result.tracks.length === 0) return throwError(message, "no-results");

		if (shuffle && query.type == "youtubePlaylist") {
			const temp = result.tracks[0];
			const val = getRandomInt(result.tracks.length);
			result.tracks[0] = result.tracks[val];
			result.tracks[val] = temp;
		}

		if (client.player.nodes.get(message.guild.id) && client.player.nodes.get(message.guildId).isPlaying())
			message.channel.send(
				query.type == "youtubePlaylist"
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
			},
		});

		if (shuffle && type == "youtubePlaylist") {
			await client.player.nodes.get(message.guild.id).tracks.shuffle();
		}
	},
};

// resolve the link of a youtubePlaylist
function resolvePlaylist(arg) {
	if (arg.includes("youtube.com") && !arg.includes("www.youtube.com")) {
		arg = arg.replace("youtube.com", "www.youtube.com");
		arg = arg.slice(0, arg.indexOf("&si="));
		return arg;
	}
	return arg;
}
