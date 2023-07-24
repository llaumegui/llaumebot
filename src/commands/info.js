const fs = require("fs");
require("dotenv").config();

module.exports = {
	name: "info",
	parameters: "",
	description: "Display the informations of every command",

	run: async ({ client, message }) => {
		var infotxt = "informations :";
		const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const cmd = require(`./${file}`);
			console.log(cmd.name);
			infotxt += `\n**${process.env.PREFIX}${cmd.name}**${cmd.parameters != "" ? ` (*${cmd.parameters}*)` : ""} | ${
				cmd.description
			}`;
		}

		message.channel.send(infotxt);
	},
};
