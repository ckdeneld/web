    // 泡を作成して、bodyに設定
    const size = 60;   // 泡要素の数
	const elArr = [];  // 泡要素の配列
	for (let i = 0; i < size; i ++) {
		// x, y座標を作成
		const x = Math.random() * window.innerWidth  - 50; // 50は泡の半径
		const y = Math.random() * window.innerHeight - 50;

		// div要素を作成して、bubbleクラスにする。スタイルで位置を設定
		elArr[i] = document.createElement('div');
		elArr[i].classList.add('bubble');
		elArr[i].style.left = x + 'px';
		elArr[i].style.top  = y + 'px';

		// bodyに追加
		document.body.appendChild(elArr[i]);
	}

	// タイムスタンプ記録用変数
	let tmOld = 0;

	// アニメーション用関数
	const step = function(tm) {
		// タイムスタンプの差分を求めて、過去値を更新
		let tmDif = tm - tmOld;
		if (tmDif > 1000) { tmDif = 0 }
		tmOld = tm;
	


		// 全ての要素に処理
		elArr.forEach(function(el){
			// 現在の位置
			const xEl = parseFloat(el.style.left);
			const yEl = parseFloat(el.style.top);
		
			// タイムスタンプの時間から移動位置を計算
			let x = xEl;
			let y = yEl - (tmDif / 80);

			// 画面の上から出たら、画面の下に移動
			if (y < -100) {
				y = window.innerHeight;
			}

			// 位置の反映
			el.style.left = x + 'px';
			el.style.top  = y + 'px';
		});

		// アニメーションの再実行
		requestAnimationFrame(step);
	};

	// アニメーションの実行
	requestAnimationFrame(step);
