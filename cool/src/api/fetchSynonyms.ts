const BASE_URL = 'https://api.datamuse.com'

export const fetchSynonym = (word: string) => {
    return fetch(`${BASE_URL}/words?rel_syn=${word}`)
    .then((response) => response.json())
  };