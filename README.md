# 画像仕分けWebアプリ

画像を「Good」「Normal」「Bad」の3カテゴリに簡単に仕分けできるWebアプリケーションです。
完全にフロントエンドで動作し、仕分けた画像はZIPファイルとしてダウンロードできます。

## 機能

### 📸 画像のアップロード
- 複数の画像を一度にアップロード可能
- ドラッグ＆ドロップでの追加に対応
- 対応フォーマット: PNG, JPG, GIF

### 🔍 画像の表示と操作
- 画像の拡大/縮小表示
- 1枚ずつ順番に表示
- 直感的な操作性

### 📑 仕分け機能
- 3つのカテゴリ（Good/Normal/Bad）に分類
- キーボードショートカット対応
  - `G`: Good
  - `N`: Normal
  - `B`: Bad
  - `Ctrl/Cmd + Z`: やり直し

### 💾 保存機能
- 仕分け結果をZIPファイルでダウンロード
- カテゴリごとに自動で分類
- ファイル名を保持

### 🔄 やり直し機能
- 直前の仕分けを取り消し可能
- 複数回のやり直しに対応

## 使い方

1. **画像のアップロード**
   - 「クリックして画像を選択」をクリック、または
   - 画像ファイルをドラッグ＆ドロップ

2. **仕分け作業**
   - 画面中央に表示される画像を確認
   - 「Good」「Normal」「Bad」ボタンをクリック、または
   - キーボードショートカット（G/N/B）を使用

3. **進捗確認**
   - 残り枚数と進捗バーで作業状況を確認
   - 必要に応じて「やり直し」ボタンを使用

4. **結果の保存**
   - 「ダウンロード」ボタンをクリック
   - ZIPファイルが自動的にダウンロード

## 技術仕様

- TypeScript + React
- Tailwind CSS
- JSZip（ZIP生成）
- Vite（開発環境）

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## ライセンス

MIT License
