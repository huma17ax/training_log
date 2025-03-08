# Firestore データ設計

## コレクション構造

```
/users/{userId}/
    /trainingRecords/
        /{recordId}/
            - type: string ('running' | 'legPress' | 'chestPress' | 'latPulldown' | 'abdominal')
            - date: timestamp
            - userId: string

            // ランニングの場合
            - level: number
            - time: number
            - speed: number

            // ウェイトトレーニングの場合
            - weight: number
            - reps: number
            - sets: number
```

## セキュリティルール

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/trainingRecords/{recordId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## データアクセスパターン

1. ユーザーログイン時

   - ユーザーIDに基づいて全トレーニング記録を取得
   - リアルタイムリスナーを設定して最新データを監視

2. 新規記録追加時

   - ユーザーIDと共に記録を保存
   - タイプに応じて必要なフィールドを保存

3. データ更新時

   - 該当する記録のドキュメントを更新

4. データ削除時
   - 該当する記録のドキュメントを削除

## エラーハンドリング

- 接続エラー時はローカルストアを使用してオフライン対応
- 認証エラー時はユーザーに再ログインを要求
- データ取得エラー時は適切なエラーメッセージを表示
