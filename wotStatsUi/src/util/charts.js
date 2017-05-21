export function recalculateCharts(chartDefinition, stats) {
  var charts = [];
  charts.push(category("Ratio charts"));
  charts.push(...recalculateSingleStatCharts(stats));
  charts.push(category("Comparision charts"));
  charts.push(...recalculateComparisonCharts(stats));
  charts.push(category("Effective stat charts"));
  charts.push(...recalculateEffectiveCharts(chartDefinition, stats));
  return charts;
}

function category(title) {
  return { type: "category", categoryTitle: title }
}

function recalculateEffectiveCharts(chartDefinition, stats) {
  return chartDefinition.map((definition) => {
    var statSeries = buildSeries(stats, definition.property);
    var effectiveStatSeries = buildSeries(stats, definition.property + "Effective");
    return {
      type: "effective",
      title: definition.title,
      statSeries: statSeries,
      statSeriesRange: computeSeriesRange(statSeries),
      effectiveStatSeries: effectiveStatSeries,
      effectiveStatSeriesRange: computeSeriesRange(statSeries, effectiveStatSeries)
    }
  });
}

function recalculateSingleStatCharts(stats) {
  return [
    recalculateSingleStatChart(stats, "Wins ratio",     "winsRatio"),
    recalculateSingleStatChart(stats, "Survived ratio", "survivedBattlesRatio"),
    recalculateSingleStatChart(stats, "Hits ratio",     "hitsRatio")
  ];
}

function recalculateSingleStatChart(stats, chartTitle, prop) {
  var series = buildSeries(stats, prop);
  return {
    type: "stat",
    title: chartTitle,
    series: series,
    range: computeSeriesRange(series)
  }
}

function recalculateComparisonCharts(stats) {
  return [
    recalculateComparisonChart(stats, "Win ratio vs Losses ratio", "winsRatio",      "lossesRatio",           "Wins",  "Losses"),
    recalculateComparisonChart(stats, "Damage dealt vs received",  "avgDamageDealt", "avgDamageReceived",     "Dealt", "Received"),
    recalculateComparisonChart(stats, "Effective damage dealt vs received",  "avgDamageDealtEffective", "avgDamageReceivedEffective",     "Effective dealt", "Effective received"),
    recalculateComparisonChart(stats, "Hits vs Hits received",     "avgHits",        "avgDirectHitsReceived", "Hits",  "Hits received"),
    recalculateComparisonChart(stats, "Effective hits vs Hits received",     "avgHitsEffective",        "avgDirectHitsReceivedEffective", "Effective hits",  "Effective hits received"),

  ];
}

function recalculateComparisonChart(stats, chartTitle, prop1, prop2, title1, title2) {
  var winsRatioSeries = buildSeries(stats, prop1);
  var lossesRatioSeries = buildSeries(stats, prop2);
  return {
    type: "comparison",
    title: chartTitle,
    series1: winsRatioSeries,
    series2: lossesRatioSeries,
    series1Title: title1,
    series2Title: title2,
    range: computeSeriesRange(winsRatioSeries, lossesRatioSeries)
  }
}

function buildSeries(stats, property) {
  var series = [];
  stats.forEach((val) => {
    if (val[property]) {
      series.push({x: val.timestamp, y: val[property]});
    }
  });
  return series;
}

function computeSeriesRange(...seriesList) {
  var mins = [];
  var maxs = [];
  seriesList.forEach((series) => {
    var seriesValues = series.map((stat) => stat.y);
    mins.push(Math.min(...seriesValues));
    maxs.push(Math.max(...seriesValues));
  });
  return [ getMin(Math.min(...mins)), getMax(Math.max(...maxs)) ];
}

function getMax(value) {
  return Math.min(value + 1, value * 1.01);
}

function getMin(value) {
  return Math.max(value - 1, value * 0.99);
}