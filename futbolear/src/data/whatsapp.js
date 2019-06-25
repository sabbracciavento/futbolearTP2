//const client = require('twilio')();

const accountSid = 'ACec07fe5287f74a08c4807a8186ae368f'; 
const authToken = '903386eb7988c123f18b2282c22291da'; 
const client = require('twilio')(accountSid, authToken); 
 
async function mandarWhatsapp(jugador){ 
      client.messages 
      .create({ 
         body: `${jugador} se ha unido a tu partido en Futbolear5`, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5491134861995' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}

module.exports = {
      mandarWhatsapp
}
