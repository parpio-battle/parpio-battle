/**
 * Hi!  Feel free to make this better.  I know it's terrible, I just threw it together
 * in a about an as a command line tool, but I don't have the time to give it a proper
 * UI at the moment.  Anyway, thanks for checking it out and thanks to gnietschow for
 * making this game!
 */
let units_info = {
  militia: {
    name: "Militia",
    player: true,
    hp: 15,
    attack: 5,
    crit: 0.8,
    order: 0,
	  tier: 1,
    cost: 0,
    merc_cost: 1,
    skills: {},
  },
  archer: {
    name: "Archer",
    player: true,
    hp: 10,
    attack: 20,
    crit: 0.8,
    order: 5,
	  tier: 1,
    cost: 0,
    merc_cost: 4,
    skills: { reach: true },
  },
  recruit: {
    name: "Recruit",
    player: true,
    hp: 40,
    attack: 15,
    crit: 0.8,
    order: 1,
	  tier: 1,
    cost: 1,
    merc_cost: 8,
    skills: {},
  },
  cavalry: {
    name: "Cavalry",
    player: true,
    hp: 5,
    attack: 5,
    crit: 0.8,
    order: 4,
	  tier: 2,
    cost: 1,
    merc_cost: 16,
    skills: { flanking: true, first: true },
  },
  longbow: {
    name: "Longbow Archer",
    player: true,
    hp: 10,
    attack: 15,
    crit: 0.8,
    order: 6,
	  tier: 2,
    cost: 2,
    merc_cost: 32,
    skills: { reach: true, double: true },
  },
  knight: {
    name: "Knight",
    player: true,
    hp: 90,
    attack: 20,
    crit: 0.8,
    order: 2,
	  tier: 3,
    cost: 4,
    merc_cost: 64,
    skills: {},
  },
  crossbow: {
    name: "Crossbowman",
    player: true,
    hp: 15,
    attack: 90,
    crit: 0.8,
    order: 7,
	  tier: 3,
    cost: 4,
    merc_cost: 64,
    skills: { reach: true },
  },
  horse2: {
    name: "Cuirassier",
    player: true,
    hp: 120,
    attack: 10,
    crit: 0.8,
    order: 3,
	  tier: 4,
    cost: 5,
    merc_cost: 128, // Not sure
    skills: { first: true },
  },
  cannon: {
    name: "Cannoneer",
    player: true,
    hp: 60,
    attack: 80,
    crit: 0.8,
    order: 8,
	  tier: 4,
    cost: 5,
    merc_cost: 128, // Not sure
    skills: { reach: true, trample: true, flanking: true, last: true },
  },
  orkling: {
    name: "Orkling",
    hp: 15,
    attack: 5,
    crit: 0.6,
    order: 0,
	  tier: 1,
    skills: {},
  },
  hunter: {
    name: "Orc Hunter",
    hp: 10,
    attack: 20,
    crit: 0.6,
    order: 5,
	  tier: 1,
    skills: { reach: true },
  },
  raider: {
    name: "Orc Raiders",
    hp: 40,
    attack: 15,
    crit: 0.6,
    order: 1,
	  tier: 1,
    skills: {},
  },
  elitehunter: {
    name: "Elite Orc Hunters",
    hp: 10,
    attack: 15,
    crit: 0.6,
    order: 6,
	  tier: 2,
    skills: { reach: true, double: true },
  },
  veteran: {
    name: "Orc Veteran",
    hp: 90,
    attack: 20,
    crit: 0.6,
    order: 2,
	  tier: 3,
    skills: {},
  },
  sniper: {
    name: "Elite Orc Sniper",
    hp: 15,
    attack: 90,
    crit: 0.6,
    order: 7,
	  tier: 3,
    skills: { reach: true },
  },
  warg: {
    name: "Warg Rider",
    hp: 5,
    attack: 5,
    crit: 0.6,
    order: 4,
	  tier: 2,
    skills: { flanking: true, first: true },
  },
  vanguard: {
    name: "Orc Vanguard",
    hp: 120,
    attack: 10,
    crit: 0.6,
    order: 3,
	  tier: 4,
    skills: { first: true },
  },
  demolisher: {
    name: "Orc Demolisher",
    hp: 60,
    attack: 80,
    crit: 0.6,
    order: 8,
	  tier: 4,
    skills: { reach: true, trample: true, flanking: true, last: true },
  },
  boss1: {
    name: "Bula (boss 1)",
    hp: 5000,
    attack: 150,
    crit: 0.5,
    order: 100,
	  tier: 100,
    skills: { trample: true, last: true },
  },
  boss2: {
    name: "Aguk (boss 2)",
    hp: 11000,
    attack: 300,
    crit: 0.5,
    order: 100,
	  tier: 150,
    skills: { trample: true, last: true },
  },
  boss3: {
    name: "Mazoga (boss 3)",
    hp: 120000,
    attack: 100,
    crit: 0.5,
    order: 3.5,
	  tier: 200,
    skills: { trample: true, last: true },
  },
  boss4: {
    name: "Durgash (boss 4)",
    hp: 40000,
    attack: 500,
    crit: 0.5,
    order: 100,
	  tier: 300,
    skills: { trample: true, first: true },
  },
};
Object.keys(units_info).forEach((f) => {
  units_info[f].type = f;
});
const get_units = (forces) => {
  let units = [];
  Object.keys(forces).forEach((u) => {
    for (let i = 0; i < forces[u]; i++) units.push({ ...units_info[u] });
  });
  units.sort((a, b) => a.order - b.order);
  units.forEach((u) => (u.max = u.hp));
  return units;
};

const remove_dead = (arr) => arr.filter((a) => a.hp > 0);
let find_weakest_target = (arr) =>
  arr.reduce((p, c) => {
    if (c.hp <= 0) return p;
    if (p == null) return c;
    if (c.max <= p.max) return c;
    return p;
  }, null);
const find_target = (arr) => arr.find((a) => a.hp > 0);
const damage = (arr, amount, skills) => {
  let target = find_target;
  if (skills.flanking) {
    target = find_weakest_target;
  }
  do {
    let t = target(arr);
    if (t == null) break;
    if (amount < t.hp) {
      t.hp -= amount;
      amount = 0;
    }
    let tmp = t.hp;
    t.hp -= amount;
    amount -= tmp;
  } while (amount > 0 && skills.trample);
};
const victoryCheck = (a, b) => {
  if (a.find((a) => a.hp > 0) == null && b.find((b) => b.hp > 0) == null)
    return true;
  return false;
};
// Shuffles 0, 1, 2, ... 9 into 0, 9, 1, 8, ...
const shuffle = (n, max) => {
  if (n%2 === 0) {
    return n / 2;
  } else {
    return max - ((n - 1) / 2)
  }
}
let crit_counter = 0;
const critical = (chance, deterministic_crits) => {
  if (deterministic_crits) {
    if (chance === 1)
      return true;
    if (chance === 0)
      return false;
    
    crit_counter++;
    return shuffle(crit_counter%10, 9) < chance * 10
  }
  else {
    return Math.random() < chance;
  }
}
const attack = (a, b, deterministic_crits) => {
  a.forEach((unit) => {
    let dmg = unit.attack;
    if (critical(unit.crit, deterministic_crits)) dmg *= 2;
    damage(b, dmg, unit.skills);
  });
};

// Calculate battle time in seconds
const battle_time = (forces_mine, forces_theirs, perk) => {
  let tier_sum = Object.keys(forces_mine).reduce((p, c) => p + forces_mine[c] * units_info[c].tier, 0);
  tier_sum += Object.keys(forces_theirs).reduce((p, c) => p + forces_theirs[c] * units_info[c].tier, 0);
  let result = Math.round(Math.pow(tier_sum * 2, 1.4));
  if (perk) result = Math.max(0, result - 2*60*60) / 2;
  return Math.min(result, 8*60*60);
}

const format_seconds = (seconds) => {
  let out_seconds = seconds%60;
  let minutes = Math.floor(seconds/60);
  let hours = Math.floor(minutes/60);
  minutes = minutes%60;
  return (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "m " : "") + (out_seconds > 0 ? out_seconds + "s " : "")
}

let forces_theirs = {
  orkling: 0,
  hunter: 0,
  raider: 0,
  elitehunter: 79,
  veteran: 0,
  sniper: 0,
  warg: 0,
  boss1: 0,
  boss2: 1,
  boss3: 0,
};
let forces_mine = {
  militia: 0,
  archer: 0,
  recruit: 0,
  cavalry: 0,
  longbow: 0,
  knight: 30,
  crossbow: 70,
  horse2: 0,
  cannon: 0,
};

const resolve_combat = (units_mine, units_theirs, deterministic_crits) => {
  crit_counter = 0;
  while (true) {
    {
      let first_a = units_mine.filter(
        (a) => a.skills.first || a.skills.double
      );
      let first_b = units_theirs.filter(
        (a) => a.skills.first || a.skills.double
      ); // console.log(first_a, first_b);
      attack(first_a, units_theirs, deterministic_crits);
      attack(first_b, units_mine, deterministic_crits); // console.log(units_mine, units_theirs);
      units_mine = remove_dead(units_mine);
      units_theirs = remove_dead(units_theirs);
      if (units_mine.length == 0 || units_theirs.length == 0) break;
    } // console.log(units_mine, units_theirs);
    {
      let first_a = units_mine.filter(
        (a) => !(a.skills.first || a.skills.double || a.skills.last)
      );
      let first_b = units_theirs.filter(
        (a) => !(a.skills.first || a.skills.double || a.skills.last)
      );
      attack(first_a, units_theirs, deterministic_crits);
      attack(first_b, units_mine, deterministic_crits);
      units_mine = remove_dead(units_mine);
      units_theirs = remove_dead(units_theirs);
      if (units_mine.length == 0 || units_theirs.length == 0) break;
    }
    {
      let first_a = units_mine.filter(
        (a) => a.skills.last || a.skills.double
      );
      let first_b = units_theirs.filter(
        (a) => a.skills.last || a.skills.double
      );
      attack(first_a, units_theirs, deterministic_crits);
      attack(first_b, units_mine, deterministic_crits);
      units_mine = remove_dead(units_mine);
      units_theirs = remove_dead(units_theirs);
      if (units_mine.length == 0 || units_theirs.length == 0) break;
    }
  }
  return [units_mine, units_theirs];
}

const decimal = (v) => Math.round(v * 100) / 100;
const doBattle = (forces_mine, forces_theirs, rounds) => {
  Object.keys(units_info).forEach((u) => {
    if (forces_mine[u] == 0) delete forces_mine[u];
    if (forces_theirs[u] == 0) delete forces_theirs[u];
  });
  let losses = [];
  let wins = 0;
  let draws = 0;
  for (let i = 0; i < rounds; i++) {
    let units_mine = get_units(forces_mine);
    let units_theirs = get_units(forces_theirs);
    [units_mine, units_theirs] = resolve_combat(units_mine, units_theirs, false);
    if (units_theirs.length == 0) {
      wins++;
      if (units_mine.length == 0) draws++;
    }
    let rem_m = { ...forces_mine };
    let rem_t = { ...forces_theirs };
    let loss_m = { ...forces_mine };
    let loss_t = { ...forces_theirs };
    units_mine.forEach((u) => loss_m[u.type]--);
    units_theirs.forEach((u) => loss_t[u.type]--);
    Object.keys(rem_m).forEach((u) => (rem_m[u] = forces_mine[u] - loss_m[u]));
    Object.keys(rem_t).forEach(
      (u) => (rem_t[u] = forces_theirs[u] - loss_t[u])
    );
    losses.push([loss_m, loss_t]); // console.log(loss_m, loss_t);  // console.log(units_theirs.length, rem_m, forces_mine, loss_m);  // throw ''
  }
  let avg = (arr) => {
    let keys = Object.keys(arr[0]);
    let avg = {};
    keys.forEach((k) => {
      avg[k] = arr.reduce((p, c) => p + c[k], 0) / arr.length;
    });
    return avg;
  };
  let min = (arr) => {
    let keys = Object.keys(arr[0]);
    let min = {};
    keys.forEach((k) => {
      min[k] = arr.reduce((p, c) => p < c[k] ? p : c[k], 99999999);
    });
    return min;
  };
  let max = (arr) => {
    let keys = Object.keys(arr[0]);
    let max = {};
    keys.forEach((k) => {
      max[k] = arr.reduce((p, c) => p > c[k] ? p : c[k], 0);
    });
    return max;
  };
  // console.log((100 * wins) / rounds, (100 * draws) / rounds);
  // console.log(avg(losses.map((a) => a[0])));
  // console.log(avg(losses.map((a) => a[1])));
  let loss_m = [avg(losses.map((a) => a[0])), min(losses.map((a) => a[0])), max(losses.map((a) => a[0]))];
  let loss_t = [avg(losses.map((a) => a[1])), min(losses.map((a) => a[1])), max(losses.map((a) => a[1]))];
  let btime = format_seconds(battle_time(forces_mine, forces_theirs, false));
  console.log(loss_m);
  let text = `Results:
  Wins: ${decimal((100 * wins) / rounds)}%
  Draws: ${decimal((100 * draws) / rounds)}%
  Losses: ${decimal(100 - (100 * wins) / rounds)}%
  Expected losses (you): ${Object.keys(loss_m[0])
    .map((a) => `${units_info[a].name ?? a}: ${decimal(loss_m[0][a])}${loss_m[1][a] != loss_m[2][a] ? " (" + loss_m[1][a] + "-" + loss_m[2][a] +")" : ""}`)
    .join(" ")}
    Expected losses (orcs): ${Object.keys(loss_t[0])
      .map((a) => `${units_info[a].name ?? a}: ${decimal(loss_t[0][a])}${loss_t[1][a] != loss_t[2][a] ? " (" + loss_t[1][a] + "-" + loss_t[2][a] +")" : ""}`)
      .join(" ")}
  Battle time: ${btime}`;
  document.getElementById("results").innerText = text;
};

// Start of optimizer section
// Tries to find the troop configuration with the shortest battle duration that meets the goal by picking 100 troops out of the ones available
const GOAL_POSSIBLE_WIN = 10; // Will win if you always crit and the enemy never does
const GOAL_LIKELY_WIN = 20; // Will win with enemy and own crits both at 70% (including enemy bosses). Crits are deterministic.
const GOAL_ALMOST_SURE_WIN = 30 // Will win with enemy crits at 90% and own crits at 40%. Crits are deterministic.
const GOAL_SURE_WIN = 40; // Will win even if you never crit and the enemy always does
const GOAL_NO_CASUALTIES = 50; // Same as SURE_WIN, but no casualties allowed
const GOAL_LOSSES = 60;
const GOAL_KILLS = 70;

const LV_SAME = 1;
const LV_TIER = 2;
const LV_TIER_SQUARED = 3;
const LV_COST = 4;
const LV_MERC_COST = 5;

const KV_SAME = 1;
const KV_TIER = 2;
const KV_HP = 3;
const KV_ATTACK = 4;
const KV_FIRST_STRIKE = 5;
const KV_FLANK = 6;

const metric_loss_value = (u, metrics) => {
  switch (metrics.loss_value_type) {
    case LV_SAME:
      return 1;
    case LV_TIER:
      return units_info[u].tier;
    case LV_TIER_SQUARED:
      return units_info[u].tier * units_info[u].tier;
    case LV_COST:
      return units_info[u].cost;
    case LV_MERC_COST:
      return units_info[u].merc_cost;
  }
}

const metric_kill_value = (u, metrics) => {
  switch (metrics.kill_value_type) {
    case KV_SAME:
      return 1;
    case KV_TIER:
      return units_info[u].tier;
    case KV_HP:
      return units_info[u].hp;
    case KV_ATTACK:
      return units_info[u].attack;
    case KV_FIRST_STRIKE:
      return units_info[u].skills.first || units_info[u].skills.double ? 10 : 1;
    case KV_FLANK:
      return units_info[u].skills.flanking ? 10 : 1;
  }
}

// Calculates the metric from a battle result
const calc_metric = (metrics, forces_mine, units_mine, forces_theirs, units_theirs) => {
  let result = 0;
  if (metrics.goal === GOAL_LOSSES) {
    // Calculate losses
    let loss_m = { ...forces_mine };
    units_mine.forEach((u) => loss_m[u.type]--);
    
    // Valuate losses according to metric
    Object.keys(loss_m).forEach((u) => result += loss_m[u] * metric_loss_value(u, metrics));
    
    result *= -1; // We want the lowest losses!
  }
  else if (metrics.goal === GOAL_KILLS) {
    // Calculate kills
    let loss_t = { ...forces_theirs };
    units_theirs.forEach((u) => loss_t[u.type]--);
    
    // Valuate kills according to metric
    Object.keys(loss_t).forEach((u) => result += loss_t[u] * metric_kill_value(u, metrics));
  }
  
  return result;
}

// Checks if a given army can fulfill the given goal
const get_metrics_for_army = (army_mine, forces_theirs, metrics) => {
  //console.log(army_mine);
  let crit_mine = null;
  let crit_theirs = null;
  if (metrics.goal === GOAL_POSSIBLE_WIN) {
	  crit_mine = 1;
	  crit_theirs = 0;
  } else if (metrics.goal === GOAL_LIKELY_WIN) {
	  crit_mine = 0.7;
	  crit_theirs = 0.7;
  } else if (metrics.goal === GOAL_ALMOST_SURE_WIN) {
	  crit_mine = 0.4;
	  crit_theirs = 0.9;
  } else if (metrics.goal === GOAL_SURE_WIN || metrics.goal === GOAL_NO_CASUALTIES) {
	  crit_mine = 0.4;
	  crit_theirs = 0.9;
  }
  let units_mine = get_units(army_mine);
  if (crite_mine != null)
    units_mine.forEach((o) => o.crit = crit_mine);
  let troop_count = units_mine.length;
  let units_theirs = get_units(forces_theirs);
  if (crit_theirs != null)
    units_theirs.forEach((o) => o.crit = crit_theirs);
  [units_mine, units_theirs] = resolve_combat(units_mine, units_theirs, true);
  
  let step_result = {
    army: army_mine,
    win: units_theirs.length === 0,
    metric: 0,
    good_result: false,
    exit_early: false,
  }
  
  // All goals except kills need to win. No casualties additionally needs no casualties.
  step_result.good_result = step_result.win || metrics.goal === GOAL_KILLS;
  if (metrics.goal === GOAL_NO_CASUALTIES)
    step_result.good_result = step_result.win && (units_mine.length === troop_count);
  
  // For the simple optimizer, we are interested only in battle duration, so we want to exit after the first good result
  if (metrics.goal <= GOAL_NO_CASUALTIES)
    step_result.exit_early = step_result.good_result;
  else
    step_result.metric = calc_metric(metrics, army_mine, units_mine, forces_theirs, units_theirs);
  
  return step_result;
}

// Builds all armies it can with exactly the given tier sum, and executes the given function on them. Returns the successful army if the function returns true, otherwise returns null.
// Parameter function signature: func(army) returns boolean
// Recursive
var optimization_cancelled = false; // Global
const act_on_armies_of_tier_sum = (forces, unit_types, index, current_army, current_tiersum, target_tiersum, func) => {
  if (optimization_cancelled)
    return null;
  
  //console.log(`Start: index ${index}, current ${current_tiersum}, target ${target_tiersum}`);
  let next_army = { ...current_army };
  let current_unit_count = Object.keys(current_army).reduce((p, c) => p + current_army[c], 0);
  
  // Not the last unit: keep adding more units, and try to fill the rest of the tier sum up with the remaining units
  if (index < unit_types.length - 1) {
    let best_result = null;
    //console.log("Not the last unit");
    for (let i = 0; i <= Math.min(forces[unit_types[index]], 100 - current_unit_count); i++) {
      let next_tiersum = current_tiersum + i * units_info[unit_types[index]].tier;
      next_army[unit_types[index]] = i;
      // We have space left, recurse through remaining units
      if (next_tiersum < target_tiersum) {
        let recursion_result = act_on_armies_of_tier_sum(forces, unit_types, index + 1, next_army, next_tiersum, target_tiersum, func);
        if (recursion_result != null) {
          if (recursion_result.exit_early) // Shortcut for simple optimizer
            return recursion_result;
          if (recursion_result.good_result) { // Maybe update best result
            if (best_result == null) {
              best_result = recursion_result;
            }
            else {
              if (recursion_result.metric > best_result.metric)
                best_result = recursion_result;
            }
          }
        }
      }
      // Exact hit of wanted tier sum, execute function
      else if (next_tiersum === target_tiersum) {
        let result = func(next_army);
        if (result != null) {
          if (result.exit_early)
            return result; // We have a winner!!!
          if (result.good_result) { // Maybe update best result
            if (best_result == null) {
              best_result = result;
            }
            else {
              if (result.metric > best_result.metric)
                best_result = result;
            }
          }
        }
      }
      // Tier sum too large, get out
      else {
        return best_result;
      }
    }
    return best_result; // Loop is finished
  }
  // Special handling of the last unit
  else {
    //console.log("Last unit");
    let remaining_tier = target_tiersum - current_tiersum;
    // We can match the target tiersum
    if (remaining_tier > 0 && (remaining_tier%units_info[unit_types[index]].tier) === 0) {
      next_army[unit_types[index]] = Math.min(remaining_tier / units_info[unit_types[index]].tier, Math.min(forces[unit_types[index]], 100 - current_unit_count));
      let result = func(next_army);
      if (result.good_result)
        return result; // Good one, return it
      else
        return null; // Nothing more to do here
    }
    // We cant match the target tiersum, get out
    else {
      return null;
    }
  }
  console.log("We shouldn't get here!");
  return null;
}

// Calculates the maximum possible tier sum with a set of forces
// Relies on units being present in ascending tier order
const calc_max_tiersum = (forces, available_types) => {
  let remaining_slots = 100;
  let tiersum = 0;
  for (let i = available_types.length - 1; i >= 0 && remaining_slots > 0; i--) {
    let troops_to_add = Math.min(remaining_slots, forces[available_types[i]]);
    remaining_slots -= troops_to_add;
    tiersum += troops_to_add * units_info[available_types[i]].tier;
  }
  return tiersum;
}

const optimize_for_tiersum = (tiersum, max_tiersum, fixed_args, best_result) => {
  // This will only return good results or null, so we don't have to worry about this being a bad one
  result = act_on_armies_of_tier_sum(fixed_args.forces_mine, fixed_args.available_types, 0, {}, 0, tiersum, fixed_args.func);
  let done = false;
  
  if (result == null && (tiersum == max_tiersum || optimization_cancelled)) { // No result and done
    if (fixed_args.advanced) {
      document.getElementById("adv_progress_bar_outer").style.display = "none";
      document.getElementById("adv_cancel_optimization").style.display = "none";
      document.getElementById("adv_optimizer_results").innerText = optimization_cancelled ? "Cancelled" : "Impossible!";
    }
    else {
      document.getElementById("progress_bar_outer").style.display = "none";
      document.getElementById("cancel_optimization").style.display = "none";
      document.getElementById("optimizer_results").innerText = optimization_cancelled ? "Cancelled" : "Impossible!";
    }
    return; // Get out
  } else {
    done = (tiersum === max_tiersum || (result != null && result.exit_early));
    
    // We might have to update our best result
    if (result != null) {
      if (result.exit_early) {
        best_result = result;
      }
      else {
        if (best_result == null || (best_result != null && result.metric > best_result.metric))
          best_result = result;
      }
    }
  }
  
  // Either done (with a result), or we have to keep going
  if (done) {
    let btime = format_seconds(battle_time(best_result.army, fixed_args.forces_theirs, false));
    let text = `Optimizer Results:
  Troops to use: ${Object.keys(best_result.army)
    .map((a) => `${units_info[a].name ?? a}: ${best_result.army[a]}`)
    .join(" ")}
  Battle time: ${btime}`;
    if (fixed_args.advanced) {
      document.getElementById("adv_progress_bar_outer").style.display = "none";
      document.getElementById("adv_cancel_optimization").style.display = "none";
      document.getElementById("adv_optimizer_results").innerText = text;
    }
    else {
      document.getElementById("progress_bar_outer").style.display = "none";
      document.getElementById("cancel_optimization").style.display = "none";
      document.getElementById("optimizer_results").innerText = text;
    }
  }
  else {
    if (fixed_args.advanced)
      document.getElementById("adv_progress_bar_inner").style.width = 100 * Math.pow(tiersum, 1.3) / Math.pow(max_tiersum, 1.3) + "%";
    else
      document.getElementById("progress_bar_inner").style.width = 100 * Math.pow(tiersum, 1.3) / Math.pow(max_tiersum, 1.3) + "%";
    window.setTimeout(() => optimize_for_tiersum(tiersum + 1, max_tiersum, fixed_args), 1, best_result);
  }
}

const optimize = (forces_mine, forces_theirs, metrics) => {
  // Setup
  // let optimization_result = {army: null, win: false, best_metric: 0};
  let available_types = [];
  Object.keys(forces_mine).forEach((k) => {if(forces_mine[k] > 0) available_types.push(k);});
  if (available_types.length == 0)
    return;
  
  let max_tiersum = calc_max_tiersum(forces_mine, available_types);
  
  let fixed_args = {};
  fixed_args.forces_mine = forces_mine;
  fixed_args.forces_theirs = forces_theirs;
  fixed_args.available_types = available_types;
  fixed_args.func = (army) => get_metrics_for_army(army, forces_theirs, metrics);
  fixed_args.advanced = (metrics.goal === GOAL_KILLS || metrics.goal === GOAL_LOSSES);
  
  // Loop over tier sum
  optimization_cancelled = false;
  if (fixed_args.advanced) {
    document.getElementById("adv_optimizer_results").innerText = "";
    document.getElementById("adv_progress_bar_outer").style.display = "flex";
    document.getElementById("adv_cancel_optimization").style.display = "flex";
  }
  else {
    document.getElementById("optimizer_results").innerText = "";
    document.getElementById("progress_bar_outer").style.display = "flex";
    document.getElementById("cancel_optimization").style.display = "flex";
  }
  optimize_for_tiersum(1, max_tiersum, fixed_args, null);
}

const cancel_optimization = () => {
  optimization_cancelled = true;
}

//best ui framework ever!!!
let ui_lookup = {};
window.onload = () => {
  let town = document.getElementById("town");
  let rounds = document.getElementById("rounds");
  ui_lookup.rounds = rounds;
  let player_div = document.createElement("div");
  player_div.className = "unitList";
  let enemy_div = document.createElement("div");
  enemy_div.className = "unitList";

  town.appendChild(enemy_div);
  town.appendChild(player_div);
  Object.keys(units_info).forEach((k) => {
    let div = document.createElement("div");
    div.className = "unitEntry";
    let sp = document.createElement("span");
    sp.innerText = units_info[k].name;
    let ip = document.createElement("input");
    ip.type = "number";
    ip.value = 0;
    div.appendChild(sp);
    div.appendChild(ip);
    if (units_info[k].player) player_div.appendChild(div);
    else enemy_div.appendChild(div);
    ui_lookup[k] = ip;
  });
  // doBattle(forces_mine, forces_theirs, 1000);
};

const battle = () => {
  let rounds = parseInt(ui_lookup.rounds.value);
  let enemy_forces = {};
  let player_forces = {};
  Object.keys(units_info).forEach((k) => {
    let c = parseInt(ui_lookup[k].value);
    if (c > 0 && !isNaN(c)) {
      if (units_info[k].player) player_forces[k] = c;
      else enemy_forces[k] = c;
    }
  });
  doBattle(player_forces, enemy_forces, rounds);
};

const optbutton = (goal) => {
  let enemy_forces = {};
  let player_forces = {};
  Object.keys(units_info).forEach((k) => {
    let c = parseInt(ui_lookup[k].value);
    if (c > 0 && !isNaN(c)) {
      if (units_info[k].player) player_forces[k] = c;
      else enemy_forces[k] = c;
    }
  });
  
  metrics = {goal: goal};
  metrics.loss_value_type = LV_TIER;
  metrics.kill_value_type = KV_TIER;
  
  optimize(player_forces, enemy_forces, metrics);
};
