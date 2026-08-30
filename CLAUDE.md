# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要 / Overview

作者 tatsu の作品（WEBアプリ・Windowsアプリ）を一覧で紹介するポートフォリオサイト。
`tatsu-see.github.io`（GitHub Pages、ユーザーサイト）としてサイトルートで公開される。

ビルド・テスト・Lint・依存パッケージは無い。素の HTML / CSS / JavaScript のみ。

## デプロイ / Deploy

- GitHub Pages が `main` ブランチの **`docs/` フォルダ**をサイトルートとして配信する。
- `main` に push すると自動反映される。CI ワークフローは無い（`.github/workflows/` は空。Azure Static Web Apps は移行済みで削除）。
- ローカル確認は `docs/` を静的サーバのルートにして開く。例: `cd docs && python -m http.server` → http://localhost:8000

## 構成 / Structure

- `docs/index.html` — サイト本体。全コンテンツがここに直書きされている単一ページ。
- `docs/assets/lib/Language.js` — 言語切り替え。
- `docs/assets/css/style.css` — 全スタイル。左右20% / 中央60% の3カラム flex レイアウト。
- `docs/assets/icons/` — 各作品の `.ico` とサイトの favicon（`Tww-*`）。
- `docs/assets/img/logo.png` — ヘッダーロゴ。
- `docs/assets/zip/` — ダウンロード配布物（Windows アプリの zip）。バージョン別に併存させている。

### パス指定の注意

`index.html` 内のリンクは絶対パス（`/assets/...`）と相対パス（`./assets/...`）が混在している。
どちらも `docs/` がサイトルートなので解決できるが、**絶対パスはローカルでサブディレクトリ配信すると壊れる**点に注意。

### 多言語表示

`Language.js` の `setLanguage()` が `navigator.language` を見て `ja` / それ以外(`en`) を判定し、
`<span class="lang" data-lang="ja|en">` の表示を切り替える（DOMContentLoaded 時に実行）。
**説明文を追加・変更するときは必ず `en` と `ja` の両方の span を用意すること。**

### アクセス解析

`index.html` の `<head>` に Google Analytics (gtag.js, `G-BPSNJ3YK8X`) を直接埋め込んでいる。

## 作品を追加するとき / Adding a product entry

`docs/index.html` の `#CenterBody` 内に、既存エントリと同じ形の `<h2>` ブロック＋`<hr>` を追加する:

1. アイコンを `docs/assets/icons/` に置き、`<h2>` 内の `<img>` で参照（`height="24px"` / `vertical-align: middle`）。
2. 説明は `data-lang="en"` と `data-lang="ja"` の `<span class="lang">` を両方書く。
3. リンクは外部サービスなら `<a href="..." target="_blank">&gt; Move to</a>`、
   配布物なら `docs/assets/zip/` に zip を置いて `<a href="./assets/zip/XXX.zip">&gt; Download</a>`。
4. サイトを更新したら `<footer>` の `Ver.N` を上げる（コミットメッセージ慣習は「verUp」）。

## Git 運用 / Git workflow

- **`git` コマンドは AI（Claude）は基本的に実行しない。開発者が手動で実行する。**
  `git add` / `commit` / `push` / `mv` / `rm` などは提案のみに留め、実行しないこと。
  ファイルのリネーム・削除も、通常のファイル操作で行い、ステージングは開発者に任せる。
- コミットメッセージは日本語。作業内容を簡潔に（例: 「WebTilesでjsonデータ形式をチェックする処理を追加」「faviconを追加」「verUp」）。
