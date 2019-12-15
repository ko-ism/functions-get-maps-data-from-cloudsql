# CloudFunctionsで作る、CloudSQLとのデータ連携API
## 流れ
- POSTでid/titleを渡される(req.body.id / req.body.title)とトリガー
- GCP CloudSQL(MySQL)へCloudSQL Proxy接続を行い、クエリを投げて、検索
- 結果を返す。

## 環境変数は以下のファイルに保存
```common/constants.js```
```
exports.constants = {
  DB_CONNECTION_NAME: "<your CloudSQL connection name>",
  DB_USER: "your CloudSQL password",
  DB_PASSWORD: "your CloudSQL password",
  DB_NAME_DATABASE: "your CloudSQL database name",
  PROJECT_ID: "your project>",
  ALLOWED_METHODS: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS'
  ],
  ALLOWED_ORIGINS: [
    'http://localhost:3000'
  ]
};
```

## デプロイ
``` gcloud beta functions deploy GetMapsData --trigger-http --region asia-northeast1 --runtime nodejs10 ```

## 補足
- フロント側にあるnuxt-view-search-map　から、axiosを利用してAPIを利用される想定
