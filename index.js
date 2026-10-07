const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.error("Missing DISCORD_TOKEN or CLIENT_ID environment variable.");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show Vijay Sahani Labs bot commands"),

  new SlashCommandBuilder()
    .setName("about")
    .setDescription("About Vijay Sahani Labs"),

  new SlashCommandBuilder()
    .setName("projects")
    .setDescription("Show Vijay Sahani Labs projects"),

  new SlashCommandBuilder()
    .setName("releaseready")
    .setDescription("Show information about ReleaseReady"),

  new SlashCommandBuilder()
    .setName("sciencequiz")
    .setDescription("Show information about Science Quiz Pro")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("Slash commands registered successfully.");
  } catch (error) {
    console.error(error);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await registerCommands();
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "help":
      await interaction.reply(
        "🤖 **Vijay Sahani Labs Bot**\n\n" +
        "Available commands:\n" +
        "• `/about` — About Vijay Sahani Labs\n" +
        "• `/projects` — Our projects\n" +
        "• `/releaseready` — ReleaseReady\n" +
        "• `/sciencequiz` — Science Quiz Pro"
      );
      break;

    case "about":
      await interaction.reply(
        "🚀 **Vijay Sahani Labs**\n\n" +
        "A creative technology hub for developers, creators, learners and innovators.\n\n" +
        "✨ Learn • Build • Create • Innovate"
      );
      break;

    case "projects":
      await interaction.reply(
        "🛠️ **Vijay Sahani Labs Projects**\n\n" +
        "• ReleaseReady\n" +
        "• Science Quiz Pro\n" +
        "• Gyan Sagar – Science Quiz\n" +
        "• AI & Web Development Projects"
      );
      break;

    case "releaseready":
      await interaction.reply(
        "🚀 **ReleaseReady**\n\n" +
        "A project focused on helping developers prepare and release their applications."
      );
      break;

    case "sciencequiz":
      await interaction.reply(
        "🧪 **Science Quiz Pro**\n\n" +
        "An interactive science quiz project built for learning and practice."
      );
      break;
  }
});

client.login(TOKEN);
