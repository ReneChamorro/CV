// Ámbitos que el visitante ya abrió: los portales hacia ellos dejan de destellar.
const KEY = 'cv-visitados'

export function readVisited() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function markVisited(id) {
  try {
    const visited = readVisited()
    if (!visited.includes(id)) localStorage.setItem(KEY, JSON.stringify([...visited, id]))
  } catch {
    // Sin storage: los portales siguen destellando, no pasa nada.
  }
}
