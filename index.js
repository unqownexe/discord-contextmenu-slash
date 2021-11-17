const { Client, Collection, Intents } = require("discord.js");
const mongoose = require('mongoose');
    const database = require('quick.db');
    const Discord = require("discord.js");
const client = new Client({
    intents: Object.keys(Intents.FLAGS), // ALL
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");

let veri = database.get("firstsetup") || false
if(veri == true){
}else{
    console.log("Botun Intent'lerini açmayı unutma.")
        console.log("Botun OAuth2 ayarlarını yapmayı unutma.")
        console.log("Node Sürümünüzün v16 olması gerektiğini unutma.")
        console.log("Bilgi / İletişim: https://unqown.codes/iletisim")
}


require("./handler")(client);

client.login(client.config.token);





client.on('ready', () => {
    client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(async member => {
    const fetch = await database.fetch(member.user.id);
    if(!fetch) return;
    if((Date.now() <= fetch.end) || fetch) {
    let kalan = fetch.end - Date.now();
    let logChannelID = '877973860174147594'; // sizin log kanalızın idsi
    let logChannel = await guild.channels.cache.get(logChannelID);
    setTimeout(() => {
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: <@!${fetch.moderatorID}>
    **• Susturulan**: <@!${member.user.id}>
    **• Sebep**: ${fetch.reason}`)
    .setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL)

    return member.roles.remove('791216519803568168').then(() => database.delete(member.user.id) && logChannel.send({embeds: [embed]}))
    }, kalan);
    };
    });
    });
    });
