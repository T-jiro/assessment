'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
 * 指定した要素の子要素をすべて削除する
 * @param{HTMLElement}element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {//子要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = Event => {
    if (Event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理を終了する
        return;
    }
    //TODO　診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button'
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-url', 'https://t-jiro.github.io/assessment/assessment.html')
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、{userName}を気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人いつもは感化されてます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事を常に成功へと導いています。',
    '{userName}のいいところは豊富な知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられています。',
    '{userName}のいいところは雰囲気です。内側から溢れ出る{userName}の良さに皆はいつも惹きつけられています。',
    '{userName}のいいところは決断力です。{userName}のする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が{userName}に感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。周りに配慮した{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。常に新しいことに向かっていく{userName}の姿勢は多くの人にとって魅力的に映ります。',
    '{userName}のいいところは気配りです。周りをよく見て行動している{userName}に多くの人が救われています。',
    '{userName}のいいところは飾らないところです。ありのままの{userName}が周りの皆を惹きつけています。',
    '{userName}のいいところは自制心です。問題が起こりそうになったらすぐに衝動を抑えて行動をできる{userName}を皆が高く評価しています。',
]
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足しあわせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎のする決断にいつも助けられいる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
