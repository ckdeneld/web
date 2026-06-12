function reality(data){

//初めの一行だけ改行
reality_list.appendChild(document.createElement("br"));

//jsonデータから配列を抜き出す

 for (i=0;i<data.feed.entry.length;i++){
  var rev = data.feed.entry[i];

//投稿者名の取り出し
var post_column = document.createTextNode("名前：");
var post = document.createTextNode(rev.author.name.label);
reality_list.appendChild(post_column);
reality_list.appendChild(post);
reality_list.appendChild(document.createElement("br"));

//タイトル(件名)の取り出し
var title_column = document.createTextNode("タイトル：");
var title = document.createTextNode(rev.title.label);
reality_list.appendChild(title_column);
reality_list.appendChild(title);
reality_list.appendChild(document.createElement("br"));

//本文の取り出し
var msg_column = document.createTextNode("レビュー：");
var msg = document.createTextNode(rev.content.label);
reality_list.appendChild(msg_column);
reality_list.appendChild(msg);
reality_list.appendChild(document.createElement("br"));

//区切りとして水平線を引く
reality_list.appendChild(document.createElement("hr"));

 }
}
