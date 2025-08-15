import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Google Sheets Web App URL - replace with your actual deployed web app URL
    const GOOGLE_SHEETS_URL =
      "https://script.google.com/macros/s/AKfycbzGtY4hqg-EWM-jDgMXact1z5adNpkCp7mUByzMDBiwSjiCwV_w82qjrn8vo_PuZiN9/exec"

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    // Check for both ok status and redirect status (302) as success
    if (!response.ok && response.status !== 302) {
      console.error("Google Sheets response not ok:", response.status, response.statusText)
      throw new Error(`Google Sheets returned ${response.status}: ${response.statusText}`)
    }

    let responseData = null
    try {
      const text = await response.text()
      if (text) {
        responseData = JSON.parse(text)
      }
    } catch (parseError) {
      // Ignore parse errors for redirects - data likely still submitted successfully
      console.log("Could not parse response (likely a redirect):", parseError)
    }

    console.log("Successfully submitted to Google Sheets")
    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error("Error submitting waitlist:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
