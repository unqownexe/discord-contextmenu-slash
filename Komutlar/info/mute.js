const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");
const database = require('quick.db');
const Discord = require("discord.js");
module.exports = {
    name: "Spam / Flood",
    description: "Bir kişiyi Spam / Flood sebebiyle mutelersiniz.",
    type: 'USER',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.member.roles.cache.has(client.config.staffs.muteStaff) && !interaction.member.permissions.has("ADMINISTRATOR")){
            return interaction.reply({content: "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin"})
        }
        const user = await interaction.guild.members.cache.get(interaction.targetId)
        interaction.followUp({ content: `<:muted:868383706254041108> <@${user.id}> kullanıcısı susturuldu.`})
        user.roles.add(client.config.roles.muted)
        let end = Date.now() + ms("10 seconds") 

        database.set(user.id, { 
            end: end,
            start: Date.now(),
            moderatorUsername: interaction.member.user.username,
            moderatorID: interaction.member.id,
            moderatorAvatarURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
            reason: "Spam / Flood"
            });

        let channel = interaction.guild.channels.cache.get(client.config.logs.mutelog)
        let embed = new MessageEmbed().setAuthor(client.config.embed.sunucuAdı, interaction.guild.iconURL({dynamic: true}))
        .setDescription(`${user} kullanıcısı metin kanallarında ${interaction.user} tarafından **30 dakika** boyunca susturulmuştur.\n\nMute Atılış Tarihi: \`${moment(Date.now()).format("LLL")}\`\nMute Bitiş Tarihi: \`${moment(Date.now() + ms("30m")).format("LLL")}\``)
        .setFooter(client.config.embed.authorTag)
        .setColor("RANDOM")
        channel.send({ embeds: [embed]})


        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: <@!${interaction.member.id}>
            **• Susturulan**: ${user}
            **• Sebep**: Spam / Flood`)
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({ dynamic: true }))
        
            return user.roles.remove('791216519803568168').then(() => database.delete(user.id) && channel.send({embeds: [embed]}))
            }, ms("10 seconds"));
    }
};
