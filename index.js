const { Client, Collection } = require("discord.js");
const mongoose = require('mongoose');
    const database = require('quick.db');
    const Discord = require("discord.js");
const client = new Client({
    intents: 32767, // ALL
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");

let veri = database.get("firstsetup") || false
if(veri == true){
}else{
    console.log("Botun Intent'lerini açmayı unutma.")
        console.log("Mongo URL Bağlantısını ayarlardan doğru girmeyi unutma.")
        console.log("Botun OAuth2 ayarlarını yapmayı unutma.")
        console.log("Node Sürümünüzün v16 olması gerektiğini unutma.")
        console.log("Bilgi / İletişim: https://unqown.codes/iletisim")
}
mongoose.connect(client.config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log(`

ooo        ooooo                                                oooooooooo.   oooooooooo.  
\`88.       .888'                                                \`888'   \`Y8b  \`888'   \`Y8b 
 888b     d'888   .ooooo.  ooo. .oo.    .oooooooo  .ooooo.       888      888  888     888 
 8 Y88. .P  888  d88' \`88b \`888P"Y88b  888' \`88b  d88' \`88b      888      888  888oooo888' 
 8  \`888'   888  888   888  888   888  888   888  888   888      888      888  888    \`88b 
 8    Y     888  888   888  888   888  \`88bod8P'  888   888      888     d88'  888    .88P 
o8o        o888o \`Y8bod8P' o888o o888o \`8oooooo.  \`Y8bod8P'     o888bood8P'   o888bood8P'  
                                       d"     YD                                           
                                       "Y88888P'                                           
                                                                                           

                                       Giriş Yapıldı
`))

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