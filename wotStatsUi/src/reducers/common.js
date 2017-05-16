
export function recalculateStats(statsDefinition, stats, deltaMode, wnEfficiency) {
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

    if (wnEfficiency) {
      var wn8Effective = calculateEffectiveWn8(stat, wnEfficiency)
      if (!isNaN(wn8Effective)) {
        stat["wn8Effective"] = wn8Effective
      }
    }

    return stat;
  });
}

function calculateEffectiveWn8(stat, wnEfficiency) {
    var rDAMAGE = stat["avgDamageDealtEffective"]          / wnEfficiency.expDamage
    var rSPOT   = stat["avgSpottedEffective"]              / wnEfficiency.expSpot
    var rFRAG   = stat["avgFragsEffective"]                / wnEfficiency.expFrag
    var rDEF    = stat["avgDroppedCapturePointsEffective"] / wnEfficiency.expDef
    var rWIN    = stat["winsRatio"]                        / wnEfficiency.expWinRate

    var rWINc    = Math.max(0,                     (rWIN    - 0.71) / (1 - 0.71) );
    var rDAMAGEc = Math.max(0,                     (rDAMAGE - 0.22) / (1 - 0.22) );
    var rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
    var rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
    var rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

    return (980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145 * Math.min(1.8, rWINc)).toFixed(2);
}

export function recalculateCharts(chartDefinition, stats) {
  return chartDefinition.map((definition) => {

    var { property, title } = definition;
    var modelStat = [];
    var modelEffective = [];

    stats.forEach((val) => {
      modelStat.push({x: val.timestamp, y: val[property]});
      if (val[property + "Effective"]) {
        modelEffective.push({x: val.timestamp, y: val[property + "Effective"]});
      }
    })

    var minStat = Math.min(...modelStat.map((stat) => stat.y))
    var maxStat = Math.max(...modelStat.map((stat) => stat.y))
    var minEffectiveStat = Math.min(...modelEffective.map((stat) => stat.y))
    var maxEffectiveStat = Math.max(...modelEffective.map((stat) => stat.y))

    var effectiveStatChartMin = getMin(Math.min( minStat, minEffectiveStat ))
    var effectiveStatChartMax = getMax(Math.max( maxStat, maxEffectiveStat ))

    return { property: property, title: title, statData: modelStat, effectiveStatData: modelEffective,
      statChartRange: [ getMin(minStat), getMax(maxStat) ],
      effectiveStatChartRange: [ effectiveStatChartMin, effectiveStatChartMax ]}
  });
}

function getMax(value) {
  return Math.min(value + 1, value * 1.01);
}

function getMin(value) {
  return Math.max(value - 1, value * 0.99);
}