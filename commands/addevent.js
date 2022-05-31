const messages = require("../utils/messages");
const Discord = require('discord.js')
var request = require('request');
const admin = require('firebase-admin');
let db = admin.firestore();
module.exports = {

    description: 'Verify your ticket to get a exclusive role',

    options: [
        {
            name: 'eventid',
            description: 'Enter your Event ID Below',
            type: 'STRING',
            required: true
        },
        {
            name: 'role',
            description: 'Tag the role you want users to gain when verifying',
            type: 'ROLE',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }

        // If the member doesn't have enough permissions
  
    
        const eventid = interaction.options.getString('eventid');
        const roleid = interaction.options.getRole('role');
    
        const check = await db.collection("Guild-List").where("ServerID", "==", interaction.guild.id).get();
    
        if(check.docs[0] != null){

            const data1 = {
                BriteEvent: eventid,
                RoleID: roleid.id     
              };
            const res11 = await db.collection("Guild-List").doc(`${interaction.guild.id}`).update(data1);
            const embed = new Discord.MessageEmbed()
            .setTitle('Setup Done.') 
            .setDescription('Now Users can use /verify to get there roles!')
            .setColor(process.env.EMBED_COLOR)
          interaction.reply({ embeds: [embed], ephemeral: true })
        
        }
        
             
        
                
              
          
        
          
     
        
         
        
        if(check.docs[0] == null){
            const embed = new Discord.MessageEmbed()
            .setTitle('Error.') 
            .setDescription('Server isn\'t Setup Correctly.')
            .setColor(process.env.EMBED_COLOR)
          interaction.reply({ embeds: [embed], ephemeral: true })
        }
        

    }
};
