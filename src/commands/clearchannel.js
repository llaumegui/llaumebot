const { throwError } = require("../errors");
const { getArgs, tryParse } = require("../tools");

module.exports = {
	name: "clearchannel",
	parameters: "Number OR no parameter",
	description: "Delete x messages from the channel",

	run: async ({ client, message }) => {
		let args = getArgs(message);
		if (args.length == 0) {
			await message.channel.bulkDelete(100);
		} else {
			var count = tryParse(args[0]);
			if (count == null) return throwError(message, "not-a-number");

			await message.channel.bulkDelete(count > 100 ? 100 : count);
		}
	},
};
