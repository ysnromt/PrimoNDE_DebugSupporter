````
[これは現在検証中のコードの置き場所です]
これはPrimoNDEのAngular CustomComponentを作成するときに使用するテスト用コンポーネントです。

https://github.com/ExLibrisGroup/customModule
上記のサイトで説明されている
 -Accessing host component instance
 -Accessing app state
の値をコンソールログに出力し、カスタマイズに利用できる値とその格納先を特定するために利用できます。

Memo: 
(1) host component instance

公式に説明されている通り、以下のようにhostComponentを取得しています。
>@Input() private hostComponent!: any;

hostComponentに格納される値は、ページの遷移や操作により動的に変動しています。
例えばFull Recourd Services画面にて、Locationをひとつクリックすると、その時点でitemの情報がhostComponentに入ります。
customComponentMappings.tsにてCustomComponentを適宜位置を変更することでObjectの中身が確認できます。

例：
　<nde-top-bar-after>　→ hostComponent.searchResult.pnx.addata.isbn（他、pnx情報各種）
　<nde-location-item-bottom> → hostComponent.item.callnumber（他、callnumber,itembarcode等）
  <nde-base-request-form-bottom> →hostComponent.form.value.pickupLocation （リクエストフォーム上で、現在選択されているPickUpLocation）

(2) app state
公式に説明されている通り、以下の通り取得しましたが、
>private readonly store = inject(Store);
storeの中身はシステム寄りの情報が多く、カスタマイズに使うにはstateSnapshotを取って確認する方が良いようです（まだ私の理解が浅い所です）。
このコンポーネントでは、Snapshotを"ndeRootState"という名前で保管しています。

ndeRootStateの中の階層構造をコンソールログで確認することで、公式に説明されているisLoggedInの他に取得できるstateとその位置を把握することができます。

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

  //selector作成:選択中の 言語 language.lang
  const selectLanguageFeature = createFeatureSelector<any>('language');
  const selectLang = createSelector(
  selectLanguageFeature,
  (state) => state?.lang
  );
  ````

