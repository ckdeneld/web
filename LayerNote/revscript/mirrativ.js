function mirrativ(data){

//初めの一行だけ改行
mirrativ_list.appendChild(document.createElement("br"));

//jsonデータから配列を抜き出す

 for (i=0;i<data.feed.entry.length;i++){
  var rev = data.feed.entry[i];

//投稿者名の取り出し
var post_column = document.createTextNode("名前：");
var post = document.createTextNode(rev.author.name.label);
mirrativ_list.appendChild(post_column);
mirrativ_list.appendChild(post);
mirrativ_list.appendChild(document.createElement("br"));

//タイトル(件名)の取り出し
var title_column = document.createTextNode("タイトル：");
var title = document.createTextNode(rev.title.label);
mirrativ_list.appendChild(title_column);
mirrativ_list.appendChild(title);
mirrativ_list.appendChild(document.createElement("br"));

//本文の取り出し
var msg_column = document.createTextNode("レビュー：");
var msg = document.createTextNode(rev.content.label);
mirrativ_list.appendChild(msg_column);
mirrativ_list.appendChild(msg);
mirrativ_list.appendChild(document.createElement("br"));

//区切りとして水平線を引く
mirrativ_list.appendChild(document.createElement("hr"));

 }
}
