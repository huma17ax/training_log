# Firebase セットアップ手順

## 前提条件

- Node.js がインストールされていること
- Firebase アカウントを持っていること
- Firebase CLI がインストールされていること

## Firebase CLI のインストール

```bash
npm install -g firebase-tools
```

## プロジェクトの初期設定

1. Firebase にログイン

```bash
firebase login
```

2. プロジェクトの初期化

```bash
firebase init
```

以下の機能を選択してください：

- Hosting
- Firestore Database

3. 設定オプション

- Public directory: dist
- Single-page app: Yes
- GitHub Actions deploy: No (オプション)

## デプロイ手順

1. アプリケーションのビルド

```bash
npm run build
```

2. Firebase へのデプロイ

```bash
firebase deploy
```

## Firestore Database の設定

1. Firebase Console でデータベースを作成
2. セキュリティルールの設定
3. インデックスの設定（必要な場合）

## 環境変数の設定

以下の環境変数を `.env` ファイルに設定してください：

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```
