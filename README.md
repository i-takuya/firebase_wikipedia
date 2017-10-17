# firebase_wikipedia
Dialogflowからwikipediaのsimple apiに向けてリクエストを投げるスクリプト(http://wikipedia.simpleapi.net/)

intentにwikipediaを作ってそのargをwikipediaさんに聞く。

```
firebase login
firebase deploy --only functions
```

を実行するとfirebaseに登録されたgoogle userに紐付いたプロジェクトのfunctionにfunctionディレクトリ以下のスクリプトが
デプロイされる。

Dialogflowのサンプルを利用して作ったのでだいぶライブラリが古いの注意
