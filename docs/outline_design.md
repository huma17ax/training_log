# 概要設計

## システム構成

- フロントエンド: Vue.js + TypeScript
- バックエンド: Firebase
  - データベース: Cloud Firestore
  - ホスティング: Firebase Hosting
  - オフラインサポート: Firestore オフラインモード

## コンポーネント構成

- App.vue: アプリケーションのメインレイアウト
- TrainingTabs.vue: 各トレーニング種目のタブを管理するコンポーネント
- 各タブコンポーネント:
  - RunningTab.vue: ランニングのタブ
  - LegPressTab.vue: レッグプレスのタブ
  - ChestPressTab.vue: チェストプレスのタブ
  - LatPulldownTab.vue: ラットプルダウンのタブ
  - AbdominalTab.vue: アブドミナルのタブ
- 共通コンポーネント:
  - TrainingList.vue: トレーニング記録のリストを表示
  - TrainingForm.vue: 新しいトレーニング記録を入力するフォーム
  - TrainingStats.vue: トレーニングの統計情報を表示
  - TrainingChart.vue: トレーニング記録のチャートを表示

## データ管理

- Firestoreを使用してトレーニング記録を管理
  - コレクション構造でデータを整理
  - リアルタイム同期を実装
  - オフラインサポートを有効化
- Piniaを使用してローカルの状態管理
  - Firestoreとの同期を管理
  - UIの状態を管理

## UI/UX

- モバイルファーストのレスポンシブデザイン
- タブによる直感的なナビゲーション
- 視覚的なチャートで進捗を確認
- 統計情報で成果を可視化
- シンプルで使いやすいフォームで記録を追加
- 入力フォームの表示/非表示を切り替え可能で、画面の視認性を向上
- オフライン時の同期状態を表示

## セキュリティ

- 環境変数による機密情報の管理
- Firestoreセキュリティルールによるデータ保護
- クライアントサイドでの入力バリデーション

## 今後の改善点

- ユーザー認証の実装（Firebase Authentication）
- 目標設定機能の追加
- カスタムトレーニング種目の追加機能
- データのエクスポート/インポート機能
- プッシュ通知機能の追加（Firebase Cloud Messaging）
