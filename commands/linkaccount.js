const messages = require("../utils/messages");
const Discord = require('discord.js')
var request = require('request');
const admin = require('firebase-admin');
var crypto = require("crypto");

let db = admin.firestore();
module.exports = {

    description: 'Verify your ticket to get a exclusive role',

    

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }

        // If the member doesn't have enough permissions
  
    
        const addressstring = interaction.options.getString('orderid');
    
        const check = await db.collection("Guild-List").where("ServerID", "==", interaction.guild.id).get();
    
        if(check.docs[0] != null){

            if(check.docs[0].data().BriteToken != null){
                const embed = new Discord.MessageEmbed()
                .setTitle('Error.') 
                .setDescription('Sever is already setup')
                .setColor(process.env.EMBED_COLOR)
              interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }

        if(check.docs[0] == null){
            var id = crypto.randomBytes(30).toString('hex');

            const data1 = {
                ServerID: interaction.guild.id,
                TempToken: id,            
              };
          
              const res11 = await db.collection("Guild-List").doc(`${interaction.guild.id}`).set(data1);

              const embed2 = new Discord.MessageEmbed()
                .setTitle('Login Here.') 
                .setDescription(`Click Here to Link your EventBrite Account: [Click Here](https://api.britebot.tools/login?accountid=${id})`)
                .setColor(process.env.EMBED_COLOR)
              interaction.reply({ embeds: [embed2], ephemeral: true })
        }
    }
}