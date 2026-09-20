const PAIRS = [
  {
    image: "images/messeage1.png",
    message: `心が疲れているときは、

身体にも「休ませて」と伝えている。

頑張らなきゃ。
ちゃんとしなきゃ。
まだできる。

そうやって心に力を入れ続けていると、
いつの間にか身体まで力んでいることがあります。

肩が重い。
身体がだるい。
呼吸が浅く感じる。
なんとなくスッキリしない。

そんなときは、
さらに頑張るのではなく、

一度、身体をゆるめてあげる。

身体がゆるむと、
心にも少し余白が生まれます。

自分を変えるために頑張ることも大切。

でも同じくらい、
自分を整える時間も大切です。

琥珀部屋は、
ただ身体をほぐす場所ではなく、

忙しい毎日の中で
「自分に戻る時間」を過ごしていただく場所。

最近ちょっと頑張りすぎているな、と感じたら、
身体から自分を整えてみませんか？

今日も、自分の心と身体に
少し優しい時間を。`
  },
  {
    image: "images/messeage2.png",
    message: `「できない理由」を探している間は、
人生は変わらない。

「時間がない」
「私には無理」
「もう少し落ち着いたら」

そう言っているうちに、
今日も同じ一日が終わっていく。

人生を変える人は、
環境が整うのを待たない。

「じゃあ、今の私に何ができる？」

そう問い直す。

身体も, 心も, 人生も、
変化はいつだって
小さな選択から始まる。

今日ひとつ、
「できない」ではなく
「どうしたらできる？」を選んでみよう。`
  },
  {
    image: "images/messeage3.png",
    message: `「自分の幸せは、
自分でつくる。」

誰かが幸せにしてくれるのを
待っているだけでは、
いつまでも心は満たされない。

誰かに認めてもらうこと。
誰かに大切にしてもらうこと。
もちろん、それも嬉しい。

でも、
自分の幸せを誰かに預けてしまわないこと。

何を選ぶのか。
誰と過ごすのか。
何を手放すのか。
自分をどう扱うのか。

その一つひとつを
自分で選んでいく。

「本当はどうしたい？」

その問いから逃げずに、
自分の人生に責任を持つ。

幸せは、
誰かからもらうものではなく、
自分自身で育てていくもの。

🌿 今日も、自分の心と身体の声を聞いて、
自分が幸せになる選択をひとつ。`
  }
];

function jpDate() {
  const p = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  const o = {};
  p.forEach(x => {
    if (x.type !== "literal") {
      o[x.type] = Number(x.value);
    }
  });
  return o;
}

function indexOfDay(d) {
  const s = `${d.year}-${d.month}-${d.day}`;
  let h = 0;
  for (const c of s) {
    h = ((h << 5) - h) + c.charCodeAt(0);
    h |= 0;
  }
  return Math.abs(h) % PAIRS.length;
}

function render() {
  const d = jpDate();
  const i = indexOfDay(d);
  const p = PAIRS[i];

  // 日付の表示
  const dateEl = document.querySelector("#date");
  if (dateEl) dateEl.textContent = `${d.year}.${d.month}.${d.day}`;

  // 今日の0時0分0秒から、12月31日23時59分59秒まで（今日込みで計算）
  const start = new Date(d.year, d.month - 1, d.day, 0, 0, 0);
  const target = new Date(2026, 11, 31, 23, 59, 59);
  const diffDays = Math.ceil((target - start) / (1000 * 60 * 60 * 24));

  // カウントダウン表示（今日9/20なら 103日）
  const daysEl = document.getElementById("days");
  if (daysEl) daysEl.textContent = Math.max(0, diffDays);

  // 画像の表示
  const photoEl = document.querySelector("#photo");
  if (photoEl) {
    photoEl.src = p.image;
    photoEl.alt = `今日のイメージ ${i + 1}`;
  }

  // メッセージの表示
  const msgEl = document.querySelector("#message") || document.querySelector(".message");
  if (msgEl) msgEl.textContent = p.message;

  // 年号の表示
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = d.year;
}

render();