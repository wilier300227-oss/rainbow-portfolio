/**
 * 【使い方】
 * 1. Google スプレッドシートを新規作成
 * 2. メニュー「拡張機能」→「Apps Script」を開く
 * 3. このスクリプトをすべて貼り付けて保存
 * 4. 関数「createSalesDemo」を選択して「実行」
 * 5. 権限を許可したらシートが自動生成される
 */

function createSalesDemo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ========== シートを初期化 ==========
  // 既存シートをすべて削除して作り直す
  var sheets = ss.getSheets();
  for (var i = sheets.length - 1; i >= 0; i--) {
    if (sheets.length > 1) ss.deleteSheet(sheets[i]);
  }

  var masterSheet = ss.getSheets()[0];

  // ========== ① 売上記録シート ==========
  masterSheet.setName('📋 売上記録');
  buildSalesSheet(masterSheet);

  // ========== ② 集計ダッシュボードシート ==========
  var dashSheet = ss.insertSheet('📊 集計ダッシュボード', 1);
  buildDashSheet(ss, dashSheet);

  // ========== ③ マスタシート（プルダウン用） ==========
  var masterDataSheet = ss.insertSheet('🔧 マスタ（編集用）', 2);
  buildMasterSheet(masterDataSheet);

  // 表示シートを売上記録に戻す
  ss.setActiveSheet(masterSheet);

  SpreadsheetApp.getUi().alert('✅ デモシートの作成が完了しました！\n\n「📋 売上記録」に実際の売上を入力できます。\n「📊 集計ダッシュボード」で自動集計されます。');
}


// ========================================================
//  売上記録シートの構築
// ========================================================
function buildSalesSheet(sheet) {
  // タイトル行
  var headers = ['日付', '商品カテゴリ', '商品名', '担当者', '販売数', '単価（円）', '売上（円）', '目標（円）', '達成率', '状態'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // ヘッダースタイル
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#1a1a2e')
             .setFontColor('#ffffff')
             .setFontWeight('bold')
             .setHorizontalAlignment('center');

  // サンプルデータ（10行）
  var data = [
    ['2026/06/01', '家電',     'ワイヤレスイヤホン', '田中',   3, 8800,  '',  30000, '', ''],
    ['2026/06/03', '衣類',     'Tシャツ（白）',       '佐藤',   5, 2200,  '',  15000, '', ''],
    ['2026/06/05', '食品',     'プロテインバー',      '田中',   10, 350,  '',   5000, '', ''],
    ['2026/06/08', 'スポーツ', 'ヨガマット',          '鈴木',   2, 4500,  '',  10000, '', ''],
    ['2026/06/10', '家電',     'USBハブ',             '佐藤',   6, 3200,  '',  20000, '', ''],
    ['2026/06/12', '衣類',     'パーカー（黒）',      '田中',   4, 5500,  '',  25000, '', ''],
    ['2026/06/15', '食品',     'ナッツ詰め合わせ',    '鈴木',   8, 1200,  '',   8000, '', ''],
    ['2026/06/18', 'スポーツ', 'ダンベルセット',      '佐藤',   1, 15000, '',  15000, '', ''],
    ['2026/06/20', '家電',     '充電器（65W）',       '田中',   7, 4800,  '',  40000, '', ''],
    ['2026/06/22', '衣類',     'ジーンズ',            '鈴木',   3, 7800,  '',  30000, '', ''],
  ];
  sheet.getRange(2, 1, data.length, data.length > 0 ? data[0].length : 1).setValues(data);

  // G列（売上）に数式：販売数 × 単価
  for (var i = 2; i <= 11; i++) {
    sheet.getRange(i, 7).setFormula('=E' + i + '*F' + i);
  }

  // I列（達成率）に数式：売上 / 目標
  for (var i = 2; i <= 11; i++) {
    sheet.getRange(i, 9).setFormula('=IFERROR(G' + i + '/H' + i + ', "")');
    sheet.getRange(i, 9).setNumberFormat('0%');
  }

  // J列（状態）に数式：達成率で自動判定
  for (var i = 2; i <= 11; i++) {
    sheet.getRange(i, 10).setFormula('=IF(I' + i + '="","",IF(I' + i + '>=1,"✅ 達成","⚠️ 未達"))');
  }

  // 日付フォーマット
  sheet.getRange(2, 1, 10, 1).setNumberFormat('yyyy/MM/dd');

  // 数値フォーマット（単価・売上・目標）
  sheet.getRange(2, 6, 10, 3).setNumberFormat('#,##0');

  // 条件付き書式①：達成率 100%以上 → 緑
  var achievedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(I2<>"",I2>=1)')
    .setBackground('#d9ead3')
    .setFontColor('#274e13')
    .setRanges([sheet.getRange('A2:J11')])
    .build();

  // 条件付き書式②：達成率 80%未満 → 赤
  var notAchievedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(I2<>"",I2<0.8)')
    .setBackground('#fce8e6')
    .setFontColor('#a61c00')
    .setRanges([sheet.getRange('A2:J11')])
    .build();

  // 条件付き書式③：達成率 80〜100% → 黄
  var nearRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(I2<>"",I2>=0.8,I2<1)')
    .setBackground('#fff2cc')
    .setFontColor('#7f6000')
    .setRanges([sheet.getRange('A2:J11')])
    .build();

  sheet.setConditionalFormatRules([achievedRule, notAchievedRule, nearRule]);

  // プルダウン：商品カテゴリ（B列）
  var categoryRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['家電', '衣類', '食品', 'スポーツ', '日用品', 'その他'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('B2:B100').setDataValidation(categoryRule);

  // プルダウン：担当者（D列）
  var staffRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['田中', '佐藤', '鈴木', '山田', 'その他'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('D2:D100').setDataValidation(staffRule);

  // 列幅調整
  sheet.setColumnWidth(1, 105);  // 日付
  sheet.setColumnWidth(2, 120);  // カテゴリ
  sheet.setColumnWidth(3, 200);  // 商品名
  sheet.setColumnWidth(4, 90);   // 担当者
  sheet.setColumnWidth(5, 75);   // 販売数
  sheet.setColumnWidth(6, 105);  // 単価
  sheet.setColumnWidth(7, 105);  // 売上
  sheet.setColumnWidth(8, 105);  // 目標
  sheet.setColumnWidth(9, 80);   // 達成率
  sheet.setColumnWidth(10, 100); // 状態

  // 行を固定（ヘッダー固定）
  sheet.setFrozenRows(1);

  // 入力エリアのガイドテキスト（12行目以降はそのまま入力可能）
  sheet.getRange('A12').setValue('← 13行目以降に新しい売上を追加できます');
  sheet.getRange('A12').setFontColor('#999999').setFontStyle('italic');
}


// ========================================================
//  集計ダッシュボードシートの構築
// ========================================================
function buildDashSheet(ss, sheet) {
  // ---- カテゴリ別集計テーブル ----
  sheet.getRange('A1').setValue('📊 カテゴリ別集計');
  sheet.getRange('A1').setFontWeight('bold').setFontSize(14);

  var catHeaders = ['カテゴリ', '売上合計（円）', '件数', '売上構成比'];
  sheet.getRange(2, 1, 1, catHeaders.length).setValues([catHeaders]);
  sheet.getRange(2, 1, 1, catHeaders.length)
       .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold');

  var categories = ['家電', '衣類', '食品', 'スポーツ', '日用品', 'その他'];
  for (var i = 0; i < categories.length; i++) {
    var row = i + 3;
    sheet.getRange(row, 1).setValue(categories[i]);
    sheet.getRange(row, 2).setFormula(
      '=SUMIF(\'📋 売上記録\'!B:B,"' + categories[i] + '",\'📋 売上記録\'!G:G)'
    );
    sheet.getRange(row, 3).setFormula(
      '=COUNTIF(\'📋 売上記録\'!B:B,"' + categories[i] + '")'
    );
    sheet.getRange(row, 4).setFormula('=IFERROR(B' + row + '/SUM(B3:B8),"")');
    sheet.getRange(row, 4).setNumberFormat('0.0%');
  }
  sheet.getRange('B3:B8').setNumberFormat('#,##0');

  // 小計行
  sheet.getRange(9, 1).setValue('合計');
  sheet.getRange(9, 2).setFormula('=SUM(B3:B8)').setNumberFormat('#,##0');
  sheet.getRange(9, 3).setFormula('=SUM(C3:C8)');
  sheet.getRange(9, 1, 1, 4).setFontWeight('bold').setBackground('#e8eaf6');

  // ---- 担当者別集計テーブル ----
  sheet.getRange('F1').setValue('👤 担当者別集計');
  sheet.getRange('F1').setFontWeight('bold').setFontSize(14);

  var staffHeaders = ['担当者', '売上合計（円）', '件数'];
  sheet.getRange(2, 6, 1, staffHeaders.length).setValues([staffHeaders]);
  sheet.getRange(2, 6, 1, staffHeaders.length)
       .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold');

  var staffList = ['田中', '佐藤', '鈴木', '山田', 'その他'];
  for (var i = 0; i < staffList.length; i++) {
    var row = i + 3;
    sheet.getRange(row, 6).setValue(staffList[i]);
    sheet.getRange(row, 7).setFormula(
      '=SUMIF(\'📋 売上記録\'!D:D,"' + staffList[i] + '",\'📋 売上記録\'!G:G)'
    );
    sheet.getRange(row, 8).setFormula(
      '=COUNTIF(\'📋 売上記録\'!D:D,"' + staffList[i] + '")'
    );
  }
  sheet.getRange('G3:G7').setNumberFormat('#,##0');

  // 列幅
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 70);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 30);  // 区切り
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 140);
  sheet.setColumnWidth(8, 70);

  // ---- カテゴリ別グラフ ----
  Utilities.sleep(500); // シートが更新されるまで少し待つ

  var chartBuilder = sheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sheet.getRange('A2:B8'))
    .setPosition(11, 1, 0, 0)
    .setOption('title', 'カテゴリ別 売上構成比')
    .setOption('pieSliceText', 'percentage')
    .setOption('width', 420)
    .setOption('height', 280)
    .setOption('legend', {position: 'right'})
    .build();
  sheet.insertChart(chartBuilder);

  // ---- 担当者別グラフ ----
  var barChartBuilder = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(sheet.getRange('F2:G7'))
    .setPosition(11, 6, 0, 0)
    .setOption('title', '担当者別 売上合計')
    .setOption('width', 420)
    .setOption('height', 280)
    .setOption('hAxis', {title: '売上（円）'})
    .setOption('legend', {position: 'none'})
    .build();
  sheet.insertChart(barChartBuilder);
}


// ========================================================
//  マスタシートの構築（プルダウン定義の見える化）
// ========================================================
function buildMasterSheet(sheet) {
  sheet.getRange('A1').setValue('このシートはプルダウン選択肢の管理用です');
  sheet.getRange('A1').setFontColor('#666666').setFontStyle('italic');

  sheet.getRange('A3').setValue('商品カテゴリ').setFontWeight('bold');
  var cats = ['家電', '衣類', '食品', 'スポーツ', '日用品', 'その他'];
  sheet.getRange(4, 1, cats.length, 1).setValues(cats.map(function(c){return [c];}));

  sheet.getRange('C3').setValue('担当者').setFontWeight('bold');
  var staff = ['田中', '佐藤', '鈴木', '山田', 'その他'];
  sheet.getRange(4, 3, staff.length, 1).setValues(staff.map(function(s){return [s];}));

  sheet.setColumnWidth(1, 140);
  sheet.setColumnWidth(3, 100);
}
