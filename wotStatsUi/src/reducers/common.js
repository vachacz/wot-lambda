
export function recalculateStats(statsDefinition, stats, deltaMode) {
  return stats.map((oldStat, index) => {
    var stat = Object.assign({}, oldStat)
    var previousStat = {}
    if (deltaMode === "relative") {
      if (index + 1 < stats.length) { previousStat = stats[index + 1]; }
    }
    if (deltaMode === "absolute") {
      previousStat = stats[0];
    }

    var battleDelta = stat.battles - previousStat.battles

    statsDefinition.forEach((config) => {
      var statDelta = parseFloat((stat[config.property] - previousStat[config.property]).toFixed(2))
      stat[config.property + "Delta"] = statDelta

      if (config.hasOwnProperty("effectiveProperty")) {
        var effectiveStatDelta = stat[config.effectiveProperty] - previousStat[config.effectiveProperty]
        var effectiveValue = parseFloat((effectiveStatDelta / battleDelta).toFixed(2));
        if (!isNaN(effectiveValue)) {
          stat[config.property + "Effective"] = effectiveValue
        }
      }
    })
    return stat;
  });
}

export function calculateAndMergeWn8(stats, expectedTankWnStats) {
  stats.forEach((stat) => {
    var wn8Effective = calculateEffectiveWn8(stat, expectedTankWnStats)
    if (!isNaN(wn8Effective)) {
      stat["wn8Effective"] = wn8Effective
    }
  });
}

function calculateEffectiveWn8(stat, wnEfficiency) {
    var rDAMAGE = stat["avgDamageDealtEffective"]          / wnEfficiency.expDamage;
    var rSPOT   = stat["avgSpottedEffective"]              / wnEfficiency.expSpot;
    var rFRAG   = stat["avgFragsEffective"]                / wnEfficiency.expFrag;
    var rDEF    = stat["avgDroppedCapturePointsEffective"] / wnEfficiency.expDef;
    var rWIN    = stat["winsRatio"]                        / wnEfficiency.expWinRate;

    var rWINc    = Math.max(0,                     (rWIN    - 0.71) / (1 - 0.71) );
    var rDAMAGEc = Math.max(0,                     (rDAMAGE - 0.22) / (1 - 0.22) );
    var rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
    var rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
    var rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

    return (980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145 * Math.min(1.8, rWINc)).toFixed(2);
}

export function recalculateCharts(chartDefinition, stats) {
  var charts = [];
  charts.push(...recalculateSingleStatCharts(stats));
  charts.push(...recalculateComparisonCharts(stats));
  charts.push(...recalculateEffectiveCharts(chartDefinition, stats));
  return charts;
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