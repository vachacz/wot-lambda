
export const baseurl = "https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod";

export const playerStatsModelDefinition = [
  { property: "battles" },
  { property: "wins" },
  { property: "winsRatio" },
  { property: "losses" },
  { property: "lossesRatio" },
  { property: "draws" },
  { property: "drawsRatio" },
  { property: "survivedBattles" },
  { property: "survivedBattlesRatio" },
  { property: "damageDealt" },
  { property: "avgDamageDealt",           effectiveProperty: "damageDealt" }, 
  { property: "avgDamageAssisted" },
  { property: "avgDamageAssistedRadio" },
  { property: "avgDamageAssistedTrack" },
  { property: "xp" },
  { property: "avgBattleXp",              effectiveProperty: "xp" }, 
  { property: "frags" },
  { property: "avgFrags",                 effectiveProperty: "frags" }, 
  { property: "spotted" },
  { property: "avgSpotted",               effectiveProperty: "spotted" }, 
  { property: "shots" },
  { property: "avgShots",                 effectiveProperty: "shots" }, 
  { property: "hits" },
  { property: "avgHits",                  effectiveProperty: "hits" }, 
  { property: "hitsRatio" },
  { property: "piercings" },
  { property: "avgPiercings",             effectiveProperty: "piercings" }, 
  { property: "piercingsReceived" },
  { property: "avgPiercingsReceived",     effectiveProperty: "piercingsReceived" }, 
  { property: "explosionHits" },
  { property: "avgExplosionHits",         effectiveProperty: "explosionHits" }, 
  { property: "explosionHitsReceived" },
  { property: "avgExplosionHitsReceived", effectiveProperty: "explosionHitsReceived" }, 
  { property: "directHitsReceived" },
  { property: "avgDirectHitsReceived",    effectiveProperty: "directHitsReceived" }, 
  { property: "damageReceived" },
  { property: "avgDamageReceived",        effectiveProperty: "damageReceived" }, 
  { property: "capturePoints" },
  { property: "avgCapturePoints",         effectiveProperty: "capturePoints" }, 
  { property: "droppedCapturePoints" },
  { property: "avgDroppedCapturePoints",  effectiveProperty: "droppedCapturePoints" }, 
  { property: "avgDamageBlocked" },
  { property: "maxDamage" },
  { property: "maxXp" },
  { property: "maxFrags" }
]

export const playerStatsChartsDefinition = [
  "avgDamageDealt",
  "avgBattleXp",
  "avgFrags",
  "avgSpotted",
  "avgShots",
  "avgHits",
  "avgPiercings",
  "avgPiercingsReceived",
  "avgExplosionHits",
  "avgExplosionHitsReceived",
  "avgDirectHitsReceived",
  "avgDamageReceived",
  "avgCapturePoints",
  "avgDroppedCapturePoints"
]