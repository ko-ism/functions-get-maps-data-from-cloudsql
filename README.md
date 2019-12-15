# CloudFunctionsで作る、CloudSQLとのデータ連携API
## 流れ
- POSTでid/titleを渡される(req.body.id / req.body.title)とトリガー
- CloudSQLへCloudSQL Proxy接続を行い、クエリを投げて、検索
- 結果を返す。

## 補足
- フロント側にあるnuxt-view-search-map　から、axiosを利用してAPIを利用される想定
