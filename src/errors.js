module.exports = {
	throwError,
};

function throwError(message, error) {
	try {
		switch (error) {
			case "invalid-command":
				message.channel.send("Invalid command : type **!info** to get all the commands");
				break;
			case "play-incomplete":
				message.channel.send("Missing link or key words");
				break;
			case "not-in-channel":
				message.channel.send("You need to be in a VC to use this command");
				break;
			case "cant-kiss":
				message.channel.send("unable to do the bisou to your target :(");
				break;
			case "already-paused":
				message.channel.send("Already Paused");
				break;
			case "already-resumed":
				message.channel.send("Already Playing");
				break;
			case "queue-not-initialized":
				message.channel.send("The queue is not initialized");
				break;
			case "empty-queue":
				message.channel.send("The queue is empty");
				break;
			case "not-in-same-channel":
				message.channel.send("You are not in the same channel as the Music Bot");
				break;
			case "not-playing":
				message.channel.send("The Music Bot is not playing");
				break;
			case "player-error":
				message.channel.send("The player encountered an error and skipped the track, it may be age restricted");
				break;
			default:
				message.channel.send(`${error} errortype not yet implemented`);
				break;
		}
	} catch (e) {
		console.log("error encountered : " + e);
	}
}
