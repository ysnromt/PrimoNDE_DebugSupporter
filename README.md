````
[これは現在検証中のコードの置き場所です。早慶コンソーシアムでの共有を想定しています。]
これはPrimoNDEのAngular CustomComponentを作成するときに使用するテスト用コンポーネントです。

https://github.com/ExLibrisGroup/customModule
上記のサイトで説明されている
 -Accessing host component instance
 -Accessing app state
の値をコンソールログに出力し、カスタマイズに利用できる値とその格納先を特定するために利用できます。

(1) host component instance

公式に説明されている通り、以下のようにhostComponentを取得しています。
>@Input() private hostComponent!: any;

hostComponentに格納される値は、ページの遷移や操作により動的に変動しています。
例えばFull Recourd Services画面では、初期表示の時点ではitemの情報はまだ取得されていません。
画面上でLocationをひとつクリックすると、その時点でitemの情報が取得され、hostComponentに入ります。

customComponentMappings.tsにてCustomComponentを適宜位置を変更すると、Objectの中身がそれぞれで異なることが確認できます。

例：
　<nde-top-bar-after>　→ hostComponent.searchResult.pnx.addata.isbn（他、pnx情報各種）
　<nde-location-item-bottom> → hostComponent.item.callnumber（他、callnumber,itembarcode等）
  <nde-base-request-form-bottom> →hostComponent.form.value.pickupLocation （リクエストフォーム上で、現在選択されているPickUpLocation）

上記から逆に、コンポーネントによる改修を検討している時の手順として、まずそのタグ位置の付近(afterが実際の候補であればtop,bottomなど)にまずこのテスト用コンポーネントを適用し、そこで取得できる値が何かを確認する、というアプローチが有効かもしれません。


(2) app state

このコンポーネントでは、Snapshotを"ndeRootState"という名前で保管しています。

公式に説明されている通り、以下の通り取得しましたが、
>private readonly store = inject(Store);
storeの中身はシステム寄りの情報が多く、カスタマイズに使うにはstateSnapshotを取って確認する方が良いようです（まだ私の理解が浅い所です）。

app stateは、hostComponentと異なり、コンポーネントの配置位置によらず

（使い方）
ndeRootStateの中の階層構造をコンソールログで展開して確認（またはコンソール上で >ndeRootStateと実行）することで、取得できるstateとその位置を把握することができます。

例：（stateは大文字・小文字を判別するので注意）

  //selector作成:現在表示中の画面 routerState.routerState
  const selectRouterStateFeature = createFeatureSelector<any>('routerState');
  const selectRouterState = createSelector(
  selectRouterStateFeature,
  (state) => state?.routerState
  );

  //selector作成:選択中の 検索スコープ Search.searchParams.scope
  const selectSearchFeature = createFeatureSelector<any>('Search');
  const selectSearchScope = createSelector(
  selectSearchFeature,
  (state) => state?.searchParams?.scope
  );

  //selector作成:URL内にある　検索語(Query),検索スコープ(search_scope), ViewID(vid) 
  const selectRouterFeature = createFeatureSelector<any>('router'); //大文字・小文字 注意
  //検索語
  const selectQuery = createSelector(
  selectRouterFeature,
  (state) => state?.state?.root?.queryParams?.query
  );
  //検索スコープ
  const selectSearchScope = createSelector(
  selectRouterFeature,
  (state) => state?.state?.root?.queryParams?.search_scope
  );

  //※言語(lang)は、URL中にも値がありますが、ブラウザのキャッシュの都合でURLが変わらない=切り替わらない場合があり、以下のようにlanguage.langからの取得が安定するようです。
  //selector作成:選択中の 言語 language.lang
  const selectLanguageFeature = createFeatureSelector<any>('language');
  const selectLang = createSelector(
  selectLanguageFeature,
  (state) => state?.lang
  );

  // （参考）URLについては、以下のようにwindow.location.hrefからより簡易的に取得することも可能
  const url = new URL(window.location.href);
  const vid = url.searchParams.get('vid');

  
  ````

