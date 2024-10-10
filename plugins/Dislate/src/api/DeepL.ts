import { DeepLResponse } from "../type"

const API_URL = "https://api.deeplx.org/translate"

const translate = async (
    text: string,
    source_lang: string = "auto",
    target_lang: string,
    original: boolean = false
): Promise<{ source_lang: string; text: string }> => {
    try {
        if (original) return { source_lang, text };

        const queryBuilder = new URLSearchParams();
        queryBuilder.append("client", "gtx");
        queryBuilder.append("sl", source_lang);
        queryBuilder.append("tl", target_lang);
        queryBuilder.append("dt", "t");
        queryBuilder.append("q", text);

        const url = `https://translate.googleapis.com/translate_a/single?${queryBuilder.toString()}`;

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4592.0 Safari/537.36'
            }
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`Failed to translate text: ${response.statusText}`);

        const parsedJson = await response.json();
        const translatedSections = parsedJson[0];
        const translatedText = translatedSections.map((section: any) => section[0]).join('');

        return { source_lang, text: translatedText };
    } catch (e) {
        throw new Error(`Failed to fetch from Google Translate: ${e}`);
    }
}

export default { translate }


