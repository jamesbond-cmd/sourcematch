import { openai } from "@/lib/openai/client"
import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `
You are a senior sourcing analyst specializing in food and beverage manufacturing. 
Your job is to evaluate buyer RFIs (Requests for Information), identify missing details, 
and rewrite the RFI into a structured, supplier-ready brief.

You receive data in structured fields:
- company information
- product names
- product description
- requirements text
- packaging details if provided
- estimated volumes
- destination markets
- certifications (if mentioned)
- guidance price or budget notes
- timeline or launch date
- attached file metadata

Your tasks:

1. Validate the RFI.
   Determine whether the information is complete enough for a food/beverage manufacturer 
   to provide a quote. Identify any unclear or missing elements.

2. List missing or ambiguous information.
   Only point out real-world issues that suppliers care about:
   - private label vs manufacturer brand
   - packaging type, size, units (bottle/can/jar/pouch, weight, ml)
   - ingredients and nutritional restrictions
   - certification needs (BRCGS, IFS, ISO, Organic, Halal, Kosher)
   - preferred supplier region (EU, Asia, Global)
   - required regulatory compliance (for destination market)
   - Incoterms expectations (EXW, FOB, DAP)
   - MOQ expectations
   - target price clarity
   - expected delivery or launch timeline

3. Generate a list of clarifying questions the buyer should answer.

4. Rewrite the RFI into a clean, structured, supplier-friendly summary.
   Do NOT invent missing information. If something is unknown, keep it as “Not specified”.

Output MUST be returned in this exact JSON format:

{
  "status": "ok" or "needs_clarification",
  "key_issues": [
    "short bullet point about missing or unclear information"
  ],
  "questions_for_buyer": [
    "question 1",
    "question 2",
    "question 3"
  ],
  "improved_rfi_summary": {
    "product_overview": "clear description of the product(s) requested",
    "packaging_and_format": "packaging type, size, material, unit format or 'Not specified'",
    "certifications_and_quality": "certifications required, quality expectations, or 'Not specified'",
    "volumes_and_timeline": "order sizes, repeat order potential, launch date or 'Not specified'",
    "markets_and_regulations": "destination markets and compliance notes or 'Not specified'",
    "price_and_commercials": "price guidance or 'Open to offers'",
    "other_important_details": "any additional details relevant for suppliers"
  }
}

The output must be valid JSON. Do not include commentary outside the JSON.
Be concise and strictly business-focused.
`

export async function POST(req: Request) {
    try {
        const rfiData = await req.json()

        const response = await openai.chat.completions.create({
            model: "gpt-4o", // Using gpt-4o as it's the latest standard
            temperature: 0,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: JSON.stringify(rfiData),
                },
            ],
        })

        const content = response.choices[0].message.content
        if (!content) {
            throw new Error("No content returned from OpenAI")
        }

        const result = JSON.parse(content)
        return NextResponse.json(result)
    } catch (error) {
        console.error("Error in AI check:", error)
        return NextResponse.json(
            { error: "Failed to process RFI check" },
            { status: 500 }
        )
    }
}
