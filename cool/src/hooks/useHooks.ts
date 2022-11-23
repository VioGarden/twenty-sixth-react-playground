import { useState } from "react";
import { fetchSynonym } from "../api/fetchSynonyms";

export type Synonyms = {
    word: string;
    score: number;
  }

export const useGetSynonyms = () => {
    const [synonyms, setSynonyms] = useState<Synonyms[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSynonyms = (word: string) => {
        setIsLoading(true);
        return fetchSynonym(word)
        .then(setSynonyms)
        .then(() => setIsLoading(false));
    }

    return {isLoading, synonyms, getSynonyms };
}