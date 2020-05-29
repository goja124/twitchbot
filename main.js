const tmi = require('tmi.js');
var mysql = require('mysql');
// Define configuration options

const opts = {
  identity: {
    username: 'goja1245',
    password: 'oauth:c3jykt6c7wwcljz8ap5xfjbdjq9qxm'
  },
  channels: [
    'goja124'
  ]
};

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'goja1234',
  database : '해해'
});

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);

// Connect to Twitch:
client.connect();
db.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  //공백을 지운다.
  const commandName = msg.trim();

  db.query('select * from meireigo', function(error,topic){

    if(error){
      console.log(error);
    }else if(topic.some(function (item, index, array){ //토픽안에있는 배열을 가져와서 명령어랑 모두 비교함
      return commandName == item.meireigo; //topic의 meireigo id를 가진 값들과 커멘드 내용을 비교함
    })){
          var bango = topic.findIndex(function (item, index, array){
          return commandName == item.meireigo;
        })
        client.say(target, topic[bango].naiyou);
    }
  });

  if(commandName.startsWith("!추가")){//만약 유저가 챗을 쳤는데 !추가로 시작한다면 (!추가 !벽력일섬 헤키레키잇센)
    var kuuhaku = commandName.split(' ')[1]; //그 말을 공백기준으로 나눠서 두번째 꺼를 가져온다. 즉 !벽력일섬를 가져 옴
    var kuuhaku2 = commandName.split(' ')[2]; //그 말을 공백기준으로 나눠서 세번째 꺼를 가져온다. 즉 헤키레키잇센를 가져 옴
    db.query('INSERT INTO meireigo (meireigo, naiyou) VALUES(?, ?)',[kuuhaku, kuuhaku2],function(error,topic){
      if(error){
    		console.log(error);
    	}
    });
  }
}
