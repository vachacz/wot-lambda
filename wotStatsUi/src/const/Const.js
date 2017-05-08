
export const baseurl = "https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod";

export const playerStatsModelDefinition = [
  { header: "battles"          , group: "totals", property: "battles" },
  { header: "wins"             , group: "totals", property: "wins" },
  { header: "wins %"           , group: "ratios", property: "winsRatio" },
  { header: "losses"           , group: "totals", property: "losses" },
  { header: "losses %"         , group: "ratios", property: "lossesRatio" },
  { header: "draws"            , group: "totals", property: "draws" },
  { header: "draws %"          , group: "ratios", property: "drawsRatio" },
  { header: "survived"         , group: "totals", property: "survivedBattles" },
  { header: "survived %"       , group: "ratios", property: "survivedBattlesRatio" },
  { header: "damage"           , group: "totals", property: "damageDealt" },
  { header: "damage avg"       , group: "avgs"  , property: "avgDamageDealt",           effectiveProperty: "damageDealt" },
  { header: "ass avg"          , group: "avgs"  , property: "avgDamageAssisted" },
  { header: "ass radio avg"    , group: "avgs"  , property: "avgDamageAssistedRadio" },
  { header: "ass track avg"    , group: "avgs"  , property: "avgDamageAssistedTrack" },
  { header: "xp"               , group: "totals", property: "xp" },
  { header: "avg xp"           , group: "avgs"  , property: "avgBattleXp",              effectiveProperty: "xp" },
  { header: "frags"            , group: "totals", property: "frags" },
  { header: "avg frags"        , group: "avgs"  , property: "avgFrags",                 effectiveProperty: "frags" },
  { header: "spotted"          , group: "totals", property: "spotted" },
  { header: "avg spotted"      , group: "avgs"  , property: "avgSpotted",               effectiveProperty: "spotted" },
  { header: "shots"            , group: "totals", property: "shots" },
  { header: "avg shots"        , group: "avgs"  , property: "avgShots",                 effectiveProperty: "shots" },
  { header: "hits"             , group: "totals", property: "hits" },
  { header: "avg hits"         , group: "avgs"  , property: "avgHits",                  effectiveProperty: "hits" },
  { header: "hits %"           , group: "ratios", property: "hitsRatio" },
  { header: "piercings"        , group: "totals", property: "piercings" },
  { header: "avg piercings"    , group: "avgs"  , property: "avgPiercings",             effectiveProperty: "piercings" },
  { header: "piercings rcv"    , group: "totals", property: "piercingsReceived" },
  { header: "avg piercings rcv", group: "avgs"  , property: "avgPiercingsReceived",     effectiveProperty: "piercingsReceived" },
  { header: "expl hits"        , group: "totals", property: "explosionHits" },
  { header: "avg expl hits"    , group: "avgs"  , property: "avgExplosionHits",         effectiveProperty: "explosionHits" },
  { header: "expl hits rcv"    , group: "totals", property: "explosionHitsReceived" },
  { header: "avg expl hits rcv", group: "avgs"  , property: "avgExplosionHitsReceived", effectiveProperty: "explosionHitsReceived" },
  { header: "hits rcv"         , group: "totals", property: "directHitsReceived" },
  { header: "avg hits rcv"     , group: "avgs"  , property: "avgDirectHitsReceived",    effectiveProperty: "directHitsReceived" },
  { header: "damage rcv"       , group: "totals", property: "damageReceived" },
  { header: "avg damage rcv"   , group: "avgs"  , property: "avgDamageReceived",        effectiveProperty: "damageReceived" },
  { header: "capture"          , group: "totals", property: "capturePoints" },
  { header: "avg capture"      , group: "avgs"  , property: "avgCapturePoints",         effectiveProperty: "capturePoints" },
  { header: "decap"            , group: "totals", property: "droppedCapturePoints" },
  { header: "avg decap"        , group: "avgs"  , property: "avgDroppedCapturePoints",  effectiveProperty: "droppedCapturePoints" },
  { header: "avg dam block"    , group: "avgs"  , property: "avgDamageBlocked" },
  { header: "max damage"       , group: "max"   , property: "maxDamage" },
  { header: "max xp"           , group: "max"   , property: "maxXp" },
  { header: "max frags"        , group: "max"   , property: "maxFrags" }
]

export const playerTanksStatsModelDefinition = [
  { header: "battles"          , group: "totals", property: "battles" },
  { header: "wins"             , group: "totals", property: "wins" }
]

export const playerStatsChartsDefinition = [
  { property: "avgDamageDealt",           title: "Average damage dealt" },
  { property: "avgDamageReceived",        title: "Average damage received" },
  { property: "avgBattleXp",              title: "Average battle experience" },
  { property: "avgFrags",                 title: "Average frags" },
  { property: "avgSpotted",               title: "Average spotted enemies" },
  { property: "avgShots",                 title: "Average shots" },
  { property: "avgHits",                  title: "Average hits" },
  { property: "avgPiercings",             title: "Average piercings" },
  { property: "avgPiercingsReceived",     title: "Average piercings received" },
  { property: "avgDirectHitsReceived",    title: "Average direct hits received" },
]

export const tiers = [
  { value: "1", label: "Tier I" },
  { value: "2", label: "Tier II" },
  { value: "3", label: "Tier III" },
  { value: "4", label: "Tier IV" },
  { value: "5", label: "Tier V" },
  { value: "6", label: "Tier VI" },
  { value: "7", label: "Tier VII" },
  { value: "8", label: "Tier VIII" },
  { value: "9", label: "Tier IX" },
  { value: "10", label: "Tier X" }
]

export const tanktypes = [
  { value: "AT-SPG",     label: "Tank destroyer" },
  { value: "SPG",        label: "Artillery" },
  { value: "lightTank",  label: "Light tank" },
  { value: "mediumTank", label: "Medium tank" },
  { value: "heavyTank",  label: "Heavy tank" }
]

export const nations = [
  { value: "germany", label: "Germany" },
  { value: "sweden",  label: "Sweden" },
  { value: "china",   label: "China" },
  { value: "japan",   label: "Japan" },
  { value: "ussr",    label: "USSR" },
  { value: "france",  label: "France" },
  { value: "uk",      label: "United Kingdom" },
  { value: "czech",   label: "Czech" },
  { value: "usa",     label: "USA" }
]