# Firebase Authentication セットアップ

## 1. 認証機能の概要

- メールアドレスとパスワードによる認証
- ログイン状態の永続化
- 未認証ユーザーのアクセス制限
- セキュアなデータアクセス制御

## 2. セットアップ手順

### 2.1 Firebase Console での設定

1. Authentication セクションを開く
2. 「Sign-in method」タブで以下の認証方法を有効化
   - Email/Password

### 2.2 セキュリティルールの設定

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーのトレーニングデータに対するルール
    match /users/{userId}/trainingLogs/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 共通の種目マスターデータに対するルール
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
      allow write: if false;  // 管理者のみが編集可能
    }
  }
}
```

## 3. 実装詳細

### 3.1 認証状態の管理

```typescript
// src/stores/auth.ts
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const actions = {
  // ログイン
  async login(email: string, password: string): Promise<void>;

  // ログアウト
  async logout(): Promise<void>;

  // 認証状態の監視
  async initializeAuth(): Promise<void>;
}
```

### 3.2 ルーティングガード

```typescript
// src/router/index.ts
const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true },
  },
]

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  const isAuthenticated = await getCurrentUser()

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (requiresGuest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})
```

## 4. エラーハンドリング

- 無効なメールアドレス/パスワード
- ネットワークエラー
- アカウントロック
- パスワードリセット

## 5. セキュリティ考慮事項

- パスワードの強度要件
- ログインの試行回数制限
- セッションの有効期限
- クロスサイトスクリプティング対策

## 6. テスト

### 6.1 単体テスト

- 認証ストアのテスト
- コンポーネントのテスト
- ルーティングガードのテスト

### 6.2 E2Eテスト

- ログインフロー
- ログアウトフロー
- 保護されたルートへのアクセス
- エラー状態の処理
