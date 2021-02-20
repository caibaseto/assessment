'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // result-area に、何かタグがある限りループ
        element.removeChild(element.firstChild);
    }
}
/**
 * 指定した要素に診断結果用のタグを指定する。
 * @param {HTMLElement} element HTMLの要素
 */
function createAssessmentResult(element, result) {
    // result-areaにh3タグで'診断結果'という文字を表示
    const h3 = document.createElement('h3'); // h3タグを作る
    h3.innerText = '診断結果'; //h3タグに'診断結果'の文字列を設定
    element.appendChild(h3); // result-area に h3 変数を設定

    // result-areaにpタグで診断結果を表示  
    const p = document.createElement('p');
    p.innerText = result;
    element.appendChild(p);

};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    let userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前の入力がなかったので処理を中断
        return;
    }

    //診断結果の表示
    removeAllChildren(resultDivided);
    const result = assessment(userName);
    createAssessmentResult(resultDivided, result);

    // Tweetボタンの表示
        removeAllChildren(tweetDivided); //Tweetエリアの初期化

    // aタグを作って属性を設定する
    
    const anchor = document.createElement('a');
    const href =
        'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', href);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('deta-text', result);
    anchor.innerText = 'tweet #あなたのいいところ';

    // aタグをHTMLとして追加する
    tweetDivided.appendChild(anchor);

    // scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    // scriptタグをHTMLとして追加する

    tweetDivided.appendChild(script);
}



const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];
/**
 * 　名前の文字列を渡すと診断結果を返す関数
 * 　@param {string} userName ユーザーの名前
 * 　@return {string}　診断結果
 */

function assessment(userName) {
    //userName(文字列) を数値に変換
    //全ての文字を足し算する
    var userNameNumber = 0;
    for (let i = 0; i < userName.length; i++) {
        userNameNumber += userName.charCodeAt(i);

    }
    //5桁の数値を回答結果の範囲(0～15)に返還
    var answerNumber = userNameNumber % answers.length;
    //診断結果
    var result = answers[answerNumber];
    return result.replace(/\{userName\}/g, userName);
};
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
