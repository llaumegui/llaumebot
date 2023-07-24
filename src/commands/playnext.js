const { useQueue, QueryResolver } = require("discord-player");
const { getStringArg } = require("../tools");
const { throwError } = require("../errors");

module.exports = {
	name: "playnext",
	parameters: "youtube/soundcloud url OR Youtube Search",
	description: "Add the selected track to be the next in queue",

	run: async ({ client, message }) => {
		if (!message.member.voice.channel) return throwError(message, "not-in-channel");

		const queue = useQueue(message.guildId);
		var arg = getStringArg(message);
		if (!queue || queue.tracks.length == 0) {
			const cmd = client.commands.get("play");
			message.content = `!play ${arg}`;
			await cmd.run({ client, message });
		} else {
			if (arg == "") return throwError(message, "play-incomplete");

			var type = QueryResolver.resolve(arg);

			const result = await client.player.search(arg, {
				requestedBy: message.user,
				searchEngine: type,
			});
			if (result.tracks.length === 0) return throwError(message, "no-results");

			await message.channel.send(
				`**${result.tracks[0].title}** has been added to the Queue (**${result.tracks[0].duration}**)`
			);
			queue.insertTrack(result.tracks[0]);
		}
	},
};
