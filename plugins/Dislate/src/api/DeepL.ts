import { DeepLResponse } from "../type"

const API_URL = "https://api.deeplx.org/translate"

const translate = async (text: string, source_lang: string = "auto", target_lang: string, original: boolean = false) => {
    try {
        if (original) return { source_lang, text }
        val queryBuilder = Http.QueryBuilder("https://translate.googleapis.com/translate_a/single").run {
            append("client", "gtx")
            append("sl", source_lang)
            append("tl", target_lang)
            append("dt", "t")
            append("q", text)
        }
        val translatedJsonReq = Http.Request(queryBuilder.toString(), "GET").apply {
            setHeader("Content-Type", "application/json")
            setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4592.0 Safari/537.36")
        }.execute()

        if (!translatedJsonReq.ok()) throw Error(`Failed to translate text: ${data.message}`)
        val parsedJson = JSONArray(translatedJsonReq.text())

        val translatedSections = parsedJson.getJSONArray(0)

        val translatedText = buildString {
            for (i in 0 until translatedSections.length()) {
                append(translatedSections.getJSONArray(i).getString(0))
            }
        }
        return { source_lang, text: translatedText }
    } catch (e) {
        throw Error(`Failed to fetch from google translate: ${e}`)
    }
}

export default { translate }


