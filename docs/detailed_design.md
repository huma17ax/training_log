# トレーニングログアプリケーション 詳細設計書

## 1. システム概要

### 1.1 目的

トレーニングの記録を管理し、進捗を可視化するWebアプリケーション

### 1.2 技術スタック

- フロントエンド: Vue.js 3 (Composition API)
- 状態管理: Pinia
- グラフ描画: Chart.js + vue-chartjs
- ビルドツール: Vite
- 言語: TypeScript
- テスト: Vitest
- コード品質: ESLint, Prettier
- バックエンド: Firebase
  - データベース: Cloud Firestore
  - ホスティング: Firebase Hosting

## 2. システム構成

### 2.1 ディレクトリ構造

src/
├── assets/ # 静的リソース
├── components/ # 共通コンポーネント
├── views/ # ページコンポーネント
├── stores/ # Piniaストア
├── types/ # 型定義
├── utils/ # ユーティリティ関数
├── router/ # ルーティング設定
└── firebase/ # Firebase関連の設定とユーティリティ

### 2.2 主要コンポーネント

#### トレーニングログ

- トレーニングログの入力フォーム
- 日付、種目、セット数、重量、回数の記録

#### トレーニング履歴

- 過去のトレーニング記録の表示
- フィルタリング機能

#### 進捗チャート

- トレーニング進捗のグラフ表示
- 種目ごとの重量推移
- 月間トレーニング回数

## 3. データモデル

### 3.1 Firestoreコレクション構造

#### トレーニングログ

```typescript
interface TrainingLog {
  id: string
  date: Timestamp
  exerciseId: string
  sets: {
    weight?: number
    reps?: number
    setNumber: number
    level?: number
    duration?: number
    speed?: number
  }[]
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### 種目マスター

```typescript
interface Exercise {
  id: string
  name: string
  category: 'weight' | 'cardio' | 'bodyweight'
  targetMuscles: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## 4. 状態管理

### 4.1 Firestoreとの同期

#### トレーニングストア

```typescript
interface TrainingState {
  logs: TrainingLog[];
  exercises: Exercise[];
  selectedDate: Date;
  syncStatus: 'synced' | 'syncing' | 'error' | 'offline';
}

const actions = {
  // Firestoreとの同期
  async initializeFirestore(): Promise<void>;
  async syncTrainingLogs(): Promise<void>;
  async addTrainingLog(log: TrainingLog): Promise<void>;
  async updateTrainingLog(log: TrainingLog): Promise<void>;
  async deleteTrainingLog(id: string): Promise<void>;

  // オフラインサポート
  async enableOfflineSupport(): Promise<void>;
  async handleOfflineChanges(): Promise<void>;
}
```

## 5. 主要機能詳細

### 5.1 トレーニングログ入力

1. 入力フォームの表示/非表示を切り替え
   - デフォルトでは非表示
   - 「記録を追加」ボタンをクリックで表示
   - フォーム送信後に自動的に非表示
2. 日付選択（デフォルトは当日）
3. 種目選択（プリセットから選択または新規追加）
4. セット情報入力（重量、回数）
5. メモ入力（オプション）
6. 保存処理

### 5.2 トレーニング履歴表示

1. カレンダー形式での表示
2. リスト形式での表示
3. 種目別フィルタリング
4. 期間指定フィルタリング

### 5.3 進捗グラフ

1. 種目ごとの最大重量推移
2. 月間トレーニング頻度
3. 部位別トレーニング比率

### 5.4 Firestore同期機能

1. リアルタイム同期

   - onSnapshotを使用したリアルタイムアップデート
   - オフライン時のキャッシュ利用
   - 同期状態の表示

2. バッチ処理

   - 複数のセット情報の一括保存
   - トランザクションの利用

3. エラーハンドリング
   - 接続エラーの検出と再試行
   - オフライン状態の検出と表示
   - 同期エラーの通知

## 6. テスト計画

### 6.1 単体テスト

- コンポーネントのレンダリングテスト
- ストアのアクションテスト
- ユーティリティ関数のテスト

### 6.2 統合テスト

- フォーム入力からデータ保存までのフロー
- フィルタリング機能の動作確認
- グラフ描画の正確性

### 6.3 Firebaseテスト

- Firestoreのモック化
- オフライン動作のテスト
- 同期処理のテスト
- セキュリティルールのテスト

## 7. 非機能要件

### 7.1 パフォーマンス

- 初期読み込み時間: 2秒以内
- データ保存レスポンス: 1秒以内

### 7.2 ブラウザ対応

- モダンブラウザ（Chrome, Firefox, Safari, Edge）の最新2バージョン

### 7.3 レスポンシブ対応

- デスクトップ（1200px以上）

  - 4カラムグリッドレイアウト
  - 余白: 1.25rem
  - フォントサイズ: 基本16px

- タブレット（768px-1199px）

  - 2カラムグリッドレイアウト
  - 余白: 1rem
  - フォントサイズ: 基本15px

- モバイル（767px以下）

  - シングルカラムレイアウト
  - iPhone 12 mini（375x812 pt）を最小サイズとして想定
  - 以下の最適化を実施:

  1. レイアウト

  - グラフの高さは画面の25-30%に制限
  - コンポーネント間の余白を0.75remに調整
  - パディングを0.5-0.75remに調整
  - 全体の余白を0.25-0.5remに調整

  2. タイポグラフィ

  - 見出し（h3）: 0.95rem
  - 本文: 0.8-0.9rem
  - ラベル: 0.75-0.8rem
  - フォントサイズは最小14pxを保証

  3. インタラクション

  - タップターゲットは最小44x44 ptを確保
  - スクロール操作の改善
    - スクロールスナップの実装
    - スクロールヒントの表示
    - スムーズスクロールの有効化

  4. コンポーネント別の最適化

  - TrainingStats
    - 2カラムグリッドを維持
    - 統計情報の表示を簡略化
  - TrainingForm
    - 入力フィールドの高さを最適化
    - ラベルとフィールドの間隔を調整
  - TrainingList
    - 横スクロール可能なテーブル
    - スクロールヒントの表示
  - TrainingTabs
    - タブの横スクロール
    - アクティブタブのインジケーター
    - タブ間の間隔を調整

### 7.4 パフォーマンス最適化

1. レンダリング

   - 不要なレンダリングの防止
   - トランジションの最適化

2. データ処理

   - 計算処理の最適化
   - メモ化の活用

3. アセット
   - 画像の最適化
   - アイコンのSVG化

### 7.5 アクセシビリティ

1. キーボード操作

   - フォーカス管理
   - タブ順序の最適化

2. スクリーンリーダー

   - ARIA属性の適切な使用
   - 意味のある見出し構造

3. カラーコントラスト
   - WCAG 2.1のAAレベルに準拠
   - ダークモード対応の考慮

### 7.6 Firebaseパフォーマンス

1. Firestoreの最適化

   - インデックスの適切な設定
   - クエリの最適化
   - データ構造の最適化

2. オフラインサポート

   - キャッシュサイズの管理
   - 同期戦略の最適化

3. セキュリティ
   - セキュリティルールの最適化
   - レート制限の設定

### 7.7 デプロイメント

1. Firebase Hosting

   - キャッシュ設定
   - カスタムドメインの設定
   - SSL証明書の管理

2. CI/CD
   - GitHub Actionsとの連携
   - 自動デプロイの設定
   - 環境変数の管理

## コンポーネント詳細

### ビューコンポーネント

- `LoginView.vue`

  - Google認証によるログイン機能
  - エラーメッセージの表示
  - ローディング状態の表示

- `HomeView.vue`
  - タブナビゲーション
  - ログアウト機能（アイコンボタン）
  - 各トレーニングタブの表示管理
  - トレーニング種目の切り替え
  - レスポンシブ対応のタブレイアウト

### 機能コンポーネント

- 各タブコンポーネント:
  - `RunningTab.vue`: ランニングのタブ
    - 距離、時間、ペースの記録
  - `LegPressTab.vue`: レッグプレスのタブ
    - 重量、セット数、回数の記録
  - `ChestPressTab.vue`: チェストプレスのタブ
    - 重量、セット数、回数の記録
  - `LatPulldownTab.vue`: ラットプルダウンのタブ
    - 重量、セット数、回数の記録
  - `AbdominalTab.vue`: アブドミナルのタブ
    - セット数、回数の記録

### 共通コンポーネント

- `TrainingList.vue`: トレーニング記録のリスト表示
  - 日付順の表示
  - ページネーション機能
  - フィルタリング機能
- `TrainingForm.vue`: 新しいトレーニング記録を入力するフォーム
  - バリデーション機能
  - 入力補助機能
- `TrainingStats.vue`: トレーニングの統計情報を表示
  - 期間別の集計
  - 目標達成率の表示
- `TrainingChart.vue`: トレーニング記録のチャートを表示
  - 種目別の進捗グラフ
  - トレンド分析

## データ構造

### Firestore コレクション

```
users/
  {userId}/
    trainingLogs/
      {logId}/
        type: string
        date: timestamp
        data: {
          // 種目ごとの詳細データ
        }
    settings/
      {settingId}/
        // ユーザー設定データ
```

### ストア設計

- `authStore`

  - ユーザー状態の管理
  - 認証処理
  - エラー処理
  - ローディング状態

- `trainingStore`
  - トレーニングデータの管理
  - フィルタリング
  - ソート
  - ページネーション
  - キャッシュ

## UI/UX詳細

### レイアウト

- ヘッダー

  - 高さ: 64px
  - 固定位置
  - ログアウトボタン配置

- タブバー

  - 高さ: 48px
  - スクロール可能
  - アクティブ表示

- メインコンテンツ
  - 最大幅: 1200px
  - パディング: 16px
  - レスポンシブグリッド

### デザインシステム

- カラー

  - Primary: #4caf50
  - Secondary: #2196f3
  - Accent: #dc3545
  - Background: #f5f5f5
  - Text: #333333

- タイポグラフィ

  - フォントファミリー: Helvetica Neue, Arial
  - 基本サイズ: 16px
  - 行の高さ: 1.6

- スペーシング
  - 基本単位: 8px
  - パディング: 16px
  - マージン: 16px

## セキュリティ実装

### Firestore セキュリティルール

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 入力バリデーション

- 必須項目チェック
- 数値範囲チェック
- 日付形式チェック
- XSS対策

## エラーハンドリング

- ネットワークエラー
- 認証エラー
- バリデーションエラー
- データ整合性エラー

## テスト仕様

- ユニットテスト

  - コンポーネントテスト
  - ストアテスト
  - ユーティリティテスト

- 統合テスト

  - 認証フロー
  - データフロー
  - ルーティング

- E2Eテスト
  - ログインフロー
  - データ入力フロー
  - エラーハンドリング
