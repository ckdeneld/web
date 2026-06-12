function karitsu(data){

//初めの一行だけ改行
karitsu_list.appendChild(document.createElement("br"));

//jsonデータから配列を抜き出す

 for (i=0;i<data.feed.entry.length;i++){
  var rev = data.feed.entry[i];

//投稿者名の取り出し
var post_column = document.createTextNode("名前：");
var post = document.createTextNode(rev.author.name.label);
karitsu_list.appendChild(post_column);
karitsu_list.appendChild(post);
karitsu_list.appendChild(document.createElement("br"));

//タイトル(件名)の取り出し
var title_column = document.createTextNode("タイトル：");
var title = document.createTextNode(rev.title.label);
karitsu_list.appendChild(title_column);
karitsu_list.appendChild(title);
karitsu_list.appendChild(document.createElement("br"));

//本文の取り出し
var msg_column = document.createTextNode("レビュー：");
var msg = document.createTextNode(rev.content.label);
karitsu_list.appendChild(msg_column);
karitsu_list.appendChild(msg);
karitsu_list.appendChild(document.createElement("br"));

//区切りとして水平線を引く
karitsu_list.appendChild(document.createElement("hr"));

 }
}
