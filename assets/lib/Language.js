// Ver. 1.0.0

/**
 *  DOMが読み込まれたら window.name をタイトルに設定
 * */
window.addEventListener('DOMContentLoaded', () => {

  // 言語切り替え処理を動かす。
  setLanguage();
});

/**
 * 言語設定で、表示を切り替える。
 *
 *  Edgeの場合 設定＞言語＞優先する言語 から、英語を一番上に持ってきて、
 *  更新(F5)することで表示を確認できます。
 */
let LANG_PRE_FIX = null;

function setLanguage() {
  const userLang = navigator.language || navigator.userLanguage;

  LANG_PRE_FIX = userLang.startsWith('ja') ? 'ja' : 'en';

  document.querySelectorAll('.lang').forEach(el => {
    el.style.display = (el.dataset.lang === LANG_PRE_FIX) ? 'inline' : 'none';
  });
}

// Expose for other scripts if needed (attach to window)
window.LANG_PRE_FIX = LANG_PRE_FIX;
//window.setLanguage = setLanguage;