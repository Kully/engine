/* Artificial Intelligence */


export function updateEnemyPositions(PLAYER, ACTIVE_ENEMIES, FRAME)
{
	for(let idx in ACTIVE_ENEMIES)
	{
		let enemyObject = ACTIVE_ENEMIES[idx];
		if(enemyObject["name"] === "sloth")
		{
			// let val = Math.sin(FRAME * 0.01);
			// enemyObject["x"] += Math.round(val);
		}
	}
}
