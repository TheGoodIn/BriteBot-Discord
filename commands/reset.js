const messages = require("../utils/messages");
const Discord = require('discord.js')
var request = require('request');
const admin = require('firebase-admin');
let db = admin.firestore();
module.exports = {

    description: 'Deletes Account in our System',

 

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }

        // If the member doesn't have enough permissions
  
    
    
        const check = await db.collection("Guild-List").where("ServerID", "==", interaction.guild.id).get();
    
        if(check.docs[0] != null){

     
            const res11 = await db.collection("Guild-List").doc(`${interaction.guild.id}`).delete();
            const embed = new Discord.MessageEmbed()

            .setTitle('Server Reset.') 
            .setDescription('Use /linkaccount to add a new account!')
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
