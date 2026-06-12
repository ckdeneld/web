var canvas;
var g;
var button1;
var button2;
var button3;
var button4;
var PlayerX;
var PlayerY;
var Player
var pi = 0;
var PlayerImage = ['img/whitebear.png','img/whitebear1.png','img/whitebear.png','img/whitebear2.png'];
var PlayerImager = ['img/whitebearr.png','img/whitebear1r.png','img/whitebearr.png','img/whitebear2r.png'];
var vertical = 0;
var horizon = 0;
var acceleration = 0;
var grapeX = (Math.floor(Math.random() * 900));
var grapeY = 0;
var grapeFall = 4;
var syurikenX = (Math.floor(Math.random() * 900));
var syurikenY = 0;
var syurikenFall = 12;
var audiobgm = new Audio("bgm/EleganceBet.mp3");
audiobgm.loop = true;
var itemgood = new Audio("bgm/itemgood.mp3");
var itembad = new Audio("bgm/itembad.mp3");
var score = 0;
//setIntervalの戻り値用の変数
var time;
//クリア画像。初期状態では画面外に設置しておく。
var clearimgX = -800;
var clearimgY = -800;
var clearbgm = new Audio("bgm/clear.mp3");

function gameload() {
  // 描画コンテキストの取得
  canvas = document.getElementById("gamecanvas");
  g = canvas.getContext("2d");
  // 初期化
  init();
  // 入力処理の指定
  document.onkeydown = keypress;
  document.onmousedown = mousedown;
  // ゲームループの設定
  time = setInterval("gameloop();", 40);
  //GAME STARTボタンを一度しか押せなくする。
  document.getElementById("gamestart").disabled = true;
};



function init() {
	PlayerX = 0; // スタート位置
	PlayerY = 450;
	PlayerR = 60;
	Player = new Image();
	Player.src = PlayerImage[pi];
	//以下、各種ボタン
	button1 = new Image();
	button1.src = 'img/left.png';
	button2 = new Image();
	button2.src = 'img/right.png';
	button3 = new Image();
	button3.src = 'img/stop.png';
	button4 = new Image();
	button4.src = 'img/jump.png';
	//以下、アイテム
	grape = new Image();
	grape.src = 'img/grape.png';
	syuriken = new Image();
	syuriken.src = 'img/syuriken.png';
	//音楽
	audiobgm.play();
    //クリア画像
	clearimg = new Image();
	clearimg.src = 'img/clear.png';
}



//キーボード操作
function keypress(control) {
	if (control.keyCode == 32 && (vertical == 0)) { // [Space]押下時
		vertical = -50; // Y軸の移動スピード
		acceleration = 5; // 加速度（重力)
	} else if (control.keyCode == 39) { // [→]押下時
		horizon = 20; // X軸の移動スピード
	} else if (control.keyCode == 37) { // [←]押下時
		horizon = -20; // X軸の移動スピード
	} else if (control.keyCode == 40) { // [↓]押下時
		horizon = 0; // X軸の移動スピード
	}
}



//マウスクリックもしくはスマートフォン操作
function mousedown(e) {
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	if (mouseX > 840 && mouseX < 1000 && mouseY > 560 && mouseY < 720 && (vertical == 0)) {
		vertical = -50; // Y軸の移動スピード
		acceleration = 5; // 加速度（重力)
	} else if (mouseX > 240 && mouseX < 400 && mouseY > 560 && mouseY < 720) { 
		horizon = 20; // X軸の移動スピード
	} else if (mouseX > 40 && mouseX < 200 && mouseY > 560 && mouseY < 720) {
		horizon = -20; // X軸の移動スピード
	} else if (mouseX > 540 && mouseX < 700 && mouseY > 560 && mouseY < 720) {
		horizon = 0; // X軸の移動スピード
	}
}



function gameloop() {
	update(); // キャラクターの移動
	draw(); // キャラクターの描画
}



function update() {
	//自機の挙動
	vertical = vertical + acceleration;
	PlayerY = PlayerY + vertical;
	PlayerX = PlayerX + horizon;
	if (PlayerY > 450) {
		PlayerY = 450; // 着地
		vertical = 0;
		acceleration = 0;
	}
	if (horizon > 0 || horizon < 0) {
		//プレイヤーのスプライト制御右向き
		if(horizon > 0){
			pi++;
			Player.src = PlayerImage[pi];
			if(pi>2){
				pi = 0;
			}
		}
		//プレイヤーのスプライト制御左向き
		if(horizon < 0){
			pi++;
			Player.src = PlayerImager[pi];
			if(pi>2){
				pi = 0;
			}
		}
	}
	if (PlayerX > 1080) {//画面右端で止める
		PlayerX = 1080;
	}
	if (PlayerX < 0) {//画面左端で止める
		PlayerX = 0;
	}
	
	//ブドウの挙動
    grapeY += grapeFall;
	if(grapeY > 450){
		grapeY = 450;
	}

	//手裏剣の挙動
	syurikenY += syurikenFall;
	if(syurikenY > 500){
		syurikenY = 500;
		syurikenX = (Math.floor(Math.random() * 900));
		syurikenY = 0;
	}

	//自機とブドウの当たり判定
	var diffpgX = PlayerX - grapeX;
	var diffpgY = PlayerY - grapeY;
	var distancepg = Math.sqrt(diffpgX * diffpgX + diffpgY * diffpgY);
	if (distancepg < PlayerR){
		grapeX = (Math.floor(Math.random() * 900));
		grapeY = 0;
		itemgood.play();
		score = score + 20;
	}
	
	//自機と手裏剣の当たり判定
	var diffpsX = PlayerX - syurikenX;
	var diffpsY = PlayerY - syurikenY;
	var distanceps = Math.sqrt(diffpsX * diffpsX + diffpsY * diffpsY);
	if (distanceps < PlayerR){
		syurikenX = (Math.floor(Math.random() * 900));
		syurikenY = 0;
		itembad.play();
		score = score/2;
	}

    //クリア条件
	if(score > 390){
		clearInterval(time);
		clearimgX = 0;
		clearimgY = 0;
		audiobgm.pause();
		clearbgm.play();
	}
}



function draw() {
	// 背景描画
	g.fillStyle = "rgb(153,204,251)";
	g.fillRect(0, 0, 1080, 480);
	g.fillStyle = "rgb(153,204,51)";
	g.fillRect(0, 480, 1080, 30);
	g.fillStyle = "rgb(10,10,10)";
	g.fillRect(0, 510, 1080, 210);
	// 画像の描画と配置
	// 本体の縦と横の半分を引くことによりオブジェクトの中心が基準点となる
	g.drawImage(Player,PlayerX - Player.width / 2,PlayerY - Player.height / 2);
	g.drawImage(grape,grapeX - grape.width/2,grapeY - grape.height/2);
	g.drawImage(syuriken,syurikenX - syuriken.width/2,syurikenY - syuriken.height/2);
    //ボタン
	g.drawImage(button1,40,560);
	g.drawImage(button2,240,560);
	g.drawImage(button3,540,560);
	g.drawImage(button4,840,560);
    //スコアゲージ表示
	g.fillStyle = "rgb(255,255,255)";
	g.fillRect(20, 20, 400, 40);
	g.fillStyle = "rgb(255,0,255)";
	g.fillRect(20, 20, score, 40);
    //クリア画像
	g.drawImage(clearimg,clearimgX,clearimgY);
}
