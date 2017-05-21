
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