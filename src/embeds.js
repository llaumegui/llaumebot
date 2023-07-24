module.exports = {
	embedPlaying,
	deleteEmbedPlaying,
};

var messagePlaying;

function embedPlaying(queue, track) {
	const client = queue.player.client;

	// delete the previous playing message
	deleteEmbedPlaying();

	var thumbnail = track.thumbnail;
	thumbnail = thumbnail.includes("maxresdefault") ? thumbnail.replace("maxresdefault", "1") : thumbnail;
	messagePlaying = queue.metadata.channel.send({
		embeds: [
			{
				color: 0x0099ff,
				author: {
					name: client.user.username,
					icon_url: client.user.displayAvatarURL({ dynamic: true }),
				},
				description: `**NOW PLAYING:**\n[${track.title}]\n(${track.url})
                \nChannel : \`${track.author}\``,
				fields: [
					{ name: `Progress :`, value: queue.node.createProgressBar({ timecodes: true }), inline: true },
					{ name: `Songs in Queue`, value: `${queue.size + 1}` },
				],
				thumbnail: { url: thumbnail },
				timestamp: new Date(),
			},
		],
	});
}
function deleteEmbedPlaying() {
	if (messagePlaying != null) {
		const p = Promise.resolve(messagePlaying);
		p.then((msg) => {
			msg.delete();
			messagePlaying = null;
		});
	}
}
