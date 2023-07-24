require("dotenv").config();

module.exports = {
	name: "gromit",
	parameters: "",
	description: "Plays Wallace & Gromit",

	run: async ({ client, message }) => {
		const cmd = client.commands.get("play");
		message.content = `!play ${process.env.GROMIT}`;
		await cmd.run({ client, message });
	},
};
