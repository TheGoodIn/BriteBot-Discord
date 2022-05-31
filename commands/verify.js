const messages = require("../utils/messages");
const Discord = require('discord.js')
var request = require('request');
const admin = require('firebase-admin');
let db = admin.firestore();
module.exports = {

    description: 'Verify your ticket to get a exclusive role',

    options: [
        {
            name: 'orderid',
            description: 'Enter your Order ID Below',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
  
    
        const addressstring = interaction.options.getString('orderid');
    
        const check = await db.collection("Guild-List").where("ServerID", "==", interaction.guild.id).get();
    
        if(check.docs[0].data().BriteEvent != null){

            var options = {
                'method': 'GET',
                'url': `https://www.eventbriteapi.com/v3/events/${check.docs[0].data().BriteEvent}/attendees/`,
                'headers': {
                  'Authorization': `Bearer ${check.docs[0].data().BriteToken}`,
                }
              };
              request(options, function (error, response) {
               const tickets = JSON.parse(response.body)
               console.log(tickets)

               tickets.attendees.forEach(async user => {

                if(user.order_id == addressstring){
                    console.log('Order ID Matches')
                    const member = await interaction.guild.members.fetch(interaction.user.id)
            const role = await interaction.guild.roles.fetch(check.docs[0].data().RoleID)
            member.roles.add(role)
            const embed = new Discord.MessageEmbed()
            .setTitle('Role Added.') 
            .setDescription('Thanks for buying a ticket, you have gotten your role.')
            .setColor(process.env.EMBED_COLOR)
          interaction.reply({ embeds: [embed], ephemeral: true })

                }
               });
              });

        
               
        
        
                
        
                
              
          
        
          
     
        
         
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
