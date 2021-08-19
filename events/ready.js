const client = require("../index");
const database = require('quick.db');
client.on("ready", () =>{
    let veri = database.get("firstsetup") || false
    if(veri == true){
        
    }else{
        database.set("firstsetup", true) 
        
    } 


    console.log(`
                
    

    .o.       oooo            .    o8o   .o88o. 
    .888.      \`888          .o8    \`"'   888 \`" 
   .8"888.      888  oooo  .o888oo oooo  o888oo  
  .8' \`888.     888 .8P'     888   \`888   888    
 .88ooo8888.    888888.      888    888   888    
.8'     \`888.   888 \`88b.    888 .  888   888    
o88o     o8888o o888o o888o   "888" o888o o888o   
                                                 
Inf;
Users: ${client.users.cache.size}
Guilds: ${client.guilds.cache.size}

                                                 
`)
setTimeout(function(){
    console.clear()
    console.log(`
 _     _                               _______             
| |   | |                             (_______)            
| |   | |____   ____  ___  _ _ _ ____  _____   _   _ _____ 
| |   | |  _ \\ / _  |/ _ \\| | | |  _ \\|  ___) ( \\ / ) ___ |
| |___| | | | | |_| | |_| | | | | | | | |_____ ) X (| ____|
 \\_____/|_| |_|\\__  |\\___/ \\___/|_| |_|_______|_/ \\_)_____)
                  |_|                                                                       

                  `)
},5000)
                         
});
