const tmi = require('tmi.js');
var config = require("./config.json");
BOT_USERNAME = config.botUsername
OAUTH_TOKEN = config.oauth
CHANNEL_NAME =config.channelName
CHANNEL_NAME2 = config.channel2
pf = config.prefix

// Define configuration options
const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME,
    CHANNEL_NAME2
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toUpperCase();

  // If the command is known, let's execute it
  if ((commandName.startsWith(`${pf}DICE`)) || (commandName.startsWith(`${pf}ROLL`))) {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if ((commandName.startsWith(`${pf}DISCORD`)) || (commandName.startsWith(`${pf}DISC`))){
      client.say(target, 'The Discord link is: https://discord.gg/hQy9zXK2')
  } else if (commandName === '!HELP'){
      client.say(target, "The Current Commands are: !dice, !discord")
  } else if ((commandName.startsWith(`${pf}FLIP`)) || (commandName.startsWith(`${pf}CF`)) || (commandName.startsWith(`${pf}COINFLIP`))){
      const flip = flipCoin();
      client.say(target, `You flipped a coin and got: ${flip}`) 
  } else if (commandName.startsWith(`${pf}8BALL`)){
        client.say(target, eightBall() + ` LUL`);
  }else {
    console.log(`* Unknown command ${commandName}`);
  }
}

//Function used to generate 8ball response
function eightBall(){
            var answers = ['As I see it, yes', 
            'Ask again later', 
            'Better not tell you now', 
            'Cannot predict now',
            'Concentrate and ask again',
            'Don’t count on it',
            'It is certain',
            'It is decidedly so',
            'Most likely',
            'My reply is no',
            'My sources say no',
            'Outlook good',
            'Outlook not so good',
            'Reply hazy try again',
            'Signs point to yes',
            'Very doubtful',
            'Without a doubt',
            'Yes',
            'Yes, definitely',
            'You may rely on it',
            'Definately',
            'Can pigs fly?']

            return answers[Math.floor(Math.random() * 22)]

    }

//Function used for the flip coin command
function flipCoin(){
    const faces = 2;
    temp = Math.floor(Math.random() * faces) + 1;
    if (temp === 1){
        return "HEADS"
    } else{
        return "TAILS"
    }

}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}