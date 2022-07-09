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
    skills: { reach: true },
  },
  footsoldier: {
    name: "Footsoldier",
    player: true,
    hp: 40,
    attack: 15,
    crit: 0.8,
    order: 1,
	tier: 1,
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
const attack = (a, b) => {
  a.forEach((unit) => {
    let dmg = unit.attack;
    if (Math.random() < unit.crit) dmg *= 2;
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
  footsoldier: 0,
  cavalry: 0,
  longbow: 0,
  knight: 30,
  crossbow: 70,
  horse2: 0,
  cannon: 0,
};

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
    while (true) {
      {
        let first_a = units_mine.filter(
          (a) => a.skills.first || a.skills.double
        );
        let first_b = units_theirs.filter(
          (a) => a.skills.first || a.skills.double
        ); // console.log(first_a, first_b);
        attack(first_a, units_theirs);
        attack(first_b, units_mine); // console.log(units_mine, units_theirs);
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
        attack(first_a, units_theirs);
        attack(first_b, units_mine);
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
        attack(first_a, units_theirs);
        attack(first_b, units_mine);
        units_mine = remove_dead(units_mine);
        units_theirs = remove_dead(units_theirs);
        if (units_mine.length == 0 || units_theirs.length == 0) break;
      }
    }
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
