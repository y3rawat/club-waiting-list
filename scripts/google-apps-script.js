// ============================================================================
// ELITE BUSINESS CLUB - GOOGLE APPS SCRIPT
// Premium Waitlist Management System
// ============================================================================
// Deploy this as a web app in Google Apps Script (script.google.com)
// The globals SpreadsheetApp, ContentService, and MailApp are provided by Google
// ============================================================================

/* global SpreadsheetApp, ContentService, MailApp */

// Declare global variables for Google Apps Script environment
var SpreadsheetApp
var ContentService
var MailApp

/**
 * Elite Business Club - Premium Membership Application Handler
 * Processes high-value member applications with luxury experience
 */

// Configuration Constants
const CLUB_CONFIG = {
  name: "Elite Business Club",
  tagline: "Where Next-Gen Wealth Meets Opportunity",
  brandColors: {
    primary: "#d4af37", // Luxury gold
    secondary: "#0f172a", // Deep slate
    accent: "#10b981", // Emerald green
  },
  adminEmail: "admin@elitebusinessclub.com", // Update with your admin email
  maxMembers: 150,
  responseTime: "48 hours",
}

/**
 * Main POST handler for membership applications
 * Processes form submissions with premium experience
 */
function doPost(e) {
  try {
    console.log("[Elite Club] Processing new membership application...")

    const applicationData = JSON.parse(e.postData.contents)

    // Initialize premium spreadsheet if needed
    const sheet = initializePremiumSpreadsheet()

    // Record application with timestamp
    const enrichedData = {
      ...applicationData,
      timestamp: new Date().toISOString(),
      status: "Under Review",
      applicationId: generateApplicationId(),
    }

    // Store application data
    recordApplication(sheet, enrichedData)

    // Send luxury confirmation experience
    sendPremiumConfirmation(enrichedData)

    // Notify admin team
    sendExecutiveNotification(enrichedData)

    console.log("[Elite Club] Application processed successfully")

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        applicationId: enrichedData.applicationId,
        message: "Application submitted successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("[Elite Club] Application processing error:", error)

    return ContentService.createTextOutput(
      JSON.stringify({
        error: "Application processing failed",
        details: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Initialize premium spreadsheet with luxury formatting
 */
function initializePremiumSpreadsheet() {
  const sheet = SpreadsheetApp.getActiveSheet()

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Application ID",
      "Timestamp",
      "Status",
      "Full Name",
      "Age",
      "Email",
      "Phone",
      "City",
      "Family Business",
      "Personal Interests",
      "Networking Goals",
      "Referral Source",
      "Review Notes",
    ]

    sheet.getRange(1, 1, 1, headers.length).setValues([headers])

    // Premium header styling
    const headerRange = sheet.getRange(1, 1, 1, headers.length)
    headerRange
      .setFontWeight("bold")
      .setFontSize(12)
      .setBackground("#0f172a")
      .setFontColor("#d4af37")
      .setBorder(true, true, true, true, true, true, "#d4af37", SpreadsheetApp.BorderStyle.SOLID_MEDIUM)

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, headers.length)
  }

  return sheet
}

/**
 * Record application with premium data structure
 */
function recordApplication(sheet, data) {
  sheet.appendRow([
    data.applicationId,
    data.timestamp,
    data.status,
    data.fullName,
    data.age,
    data.email,
    data.phone,
    data.city,
    data.familyBusiness,
    data.personalInterests || "Not provided",
    data.networkingGoals || "Not provided",
    data.referralSource || "Direct application",
    "", // Review notes - to be filled by admin
  ])

  const lastRow = sheet.getLastRow()
  const rowRange = sheet.getRange(lastRow, 1, 1, 13)

  if (lastRow % 2 === 0) {
    rowRange.setBackground("#f8fafc")
  }
}

/**
 * Generate unique application ID
 */
function generateApplicationId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `EBC-${timestamp}-${random}`.toUpperCase()
}

/**
 * Send premium confirmation email to applicant
 */
function sendPremiumConfirmation(data) {
  const subject = `🏆 ${CLUB_CONFIG.name} - Your Exclusive Application (#${data.applicationId})`

  const htmlBody = `
    <div style="font-family: 'Georgia', serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.3);">
      
      <!-- Premium Header -->
      <div style="background: linear-gradient(135deg, ${CLUB_CONFIG.brandColors.primary} 0%, #f59e0b 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">👑</div>
        <h1 style="margin: 0; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${CLUB_CONFIG.name}</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95; font-style: italic;">${CLUB_CONFIG.tagline}</p>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 50px 40px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: ${CLUB_CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Dear ${data.fullName},</h2>
          <p style="font-size: 16px; opacity: 0.8; margin: 10px 0 0 0;">Application ID: <strong>${data.applicationId}</strong></p>
        </div>
        
        <div style="background: rgba(212,175,55,0.1); border: 2px solid ${CLUB_CONFIG.brandColors.primary}; border-radius: 10px; padding: 30px; margin: 30px 0; text-align: center;">
          <h3 style="color: ${CLUB_CONFIG.brandColors.primary}; margin: 0 0 15px 0; font-size: 24px;">🎯 Application Received</h3>
          <p style="font-size: 18px; line-height: 1.6; margin: 0;">
            Your exclusive membership application has been received and is now under review by our executive committee.
          </p>
        </div>
        
        <!-- Process Timeline -->
        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 30px; margin: 30px 0;">
          <h3 style="color: ${CLUB_CONFIG.brandColors.accent}; margin: 0 0 25px 0; font-size: 22px; text-align: center;">🚀 Your Journey to Elite Membership</h3>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; align-items: center; padding: 15px; background: rgba(212,175,55,0.1); border-radius: 8px;">
              <div style="background: ${CLUB_CONFIG.brandColors.primary}; color: #0f172a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">1</div>
              <div>
                <strong>Executive Review</strong><br>
                <span style="opacity: 0.8;">Our committee reviews your profile within ${CLUB_CONFIG.responseTime}</span>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 15px; background: rgba(16,185,129,0.1); border-radius: 8px;">
              <div style="background: ${CLUB_CONFIG.brandColors.accent}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">2</div>
              <div>
                <strong>Personal Interview</strong><br>
                <span style="opacity: 0.8;">Qualified candidates receive an exclusive consultation call</span>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 15px; background: rgba(212,175,55,0.1); border-radius: 8px;">
              <div style="background: ${CLUB_CONFIG.brandColors.primary}; color: #0f172a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">3</div>
              <div>
                <strong>Elite Access</strong><br>
                <span style="opacity: 0.8;">Approved members gain instant access to our exclusive network</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Exclusivity Notice -->
        <div style="background: linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.1) 100%); border-left: 4px solid #ef4444; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
          <h4 style="color: #fca5a5; margin: 0 0 10px 0; font-size: 18px;">⚡ Exclusive Opportunity</h4>
          <p style="margin: 0; font-style: italic; line-height: 1.6;">
            Only <strong>${CLUB_CONFIG.maxMembers} founding member positions</strong> available. 
            Application submission does not guarantee membership - we maintain rigorous standards to preserve our exclusive community.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(212,175,55,0.3);">
          <p style="font-size: 20px; font-weight: bold; color: ${CLUB_CONFIG.brandColors.primary}; margin: 0;">Exceptional regards,</p>
          <p style="font-size: 18px; margin: 10px 0 0 0; opacity: 0.9;">The Elite Club Executive Team</p>
        </div>
      </div>
      
      <!-- Premium Footer -->
      <div style="background: rgba(0,0,0,0.4); padding: 25px; text-align: center; font-size: 14px; opacity: 0.8;">
        <p style="margin: 0 0 5px 0;">This is an automated message from our premium application system.</p>
        <p style="margin: 0; color: ${CLUB_CONFIG.brandColors.primary};">Please do not reply to this email.</p>
      </div>
    </div>
  `

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody,
    })
    console.log("[Elite Club] Premium confirmation sent to:", data.email)
  } catch (error) {
    console.error("[Elite Club] Error sending confirmation:", error)
  }
}

/**
 * Send executive notification to admin team
 */
function sendExecutiveNotification(data) {
  const subject = `🔥 High-Value Application: ${data.fullName} (#${data.applicationId})`

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff;">
      
      <!-- Executive Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: ${CLUB_CONFIG.brandColors.primary};">🏆 New Elite Application</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Executive Review Required</p>
      </div>
      
      <!-- Application Summary -->
      <div style="padding: 30px;">
        <div style="background: linear-gradient(135deg, ${CLUB_CONFIG.brandColors.primary} 0%, #f59e0b 100%); color: #0f172a; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">${data.fullName}</h2>
          <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.8;">Application #${data.applicationId}</p>
        </div>
        
        <!-- Key Details Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid ${CLUB_CONFIG.brandColors.primary};">
            <h3 style="margin: 0 0 10px 0; color: #1e293b;">Contact Information</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
            <p style="margin: 5px 0;"><strong>Age:</strong> ${data.age}</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${data.city}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid ${CLUB_CONFIG.brandColors.accent};">
            <h3 style="margin: 0 0 10px 0; color: #1e293b;">Application Details</h3>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Under Review</span></p>
            <p style="margin: 5px 0;"><strong>Source:</strong> ${data.referralSource || "Direct"}</p>
          </div>
        </div>
        
        <!-- Detailed Information -->
        <div style="background: #fefce8; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px solid #fbbf24;">
          <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 20px;">💼 Family Business Background</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; background: white; padding: 15px; border-radius: 6px;">${data.familyBusiness}</p>
        </div>
        
        ${
          data.personalInterests
            ? `
        <div style="background: #f0fdf4; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px solid #22c55e;">
          <h3 style="margin: 0 0 15px 0; color: #166534; font-size: 20px;">🎯 Personal Interests</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; background: white; padding: 15px; border-radius: 6px;">${data.personalInterests}</p>
        </div>
        `
            : ""
        }
        
        ${
          data.networkingGoals
            ? `
        <div style="background: #fdf2f8; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px solid #ec4899;">
          <h3 style="margin: 0 0 15px 0; color: #be185d; font-size: 20px;">🚀 Networking Goals</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; background: white; padding: 15px; border-radius: 6px;">${data.networkingGoals}</p>
        </div>
        `
            : ""
        }
        
        <!-- Action Required -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-top: 30px;">
          <h3 style="margin: 0 0 10px 0; font-size: 22px;">⚡ Executive Action Required</h3>
          <p style="margin: 0; font-size: 16px; line-height: 1.5;">
            <strong>Review this high-value application within ${CLUB_CONFIG.responseTime}</strong><br>
            Contact candidate if approved for executive interview process
          </p>
        </div>
      </div>
    </div>
  `

  try {
    MailApp.sendEmail({
      to: CLUB_CONFIG.adminEmail,
      subject: subject,
      htmlBody: htmlBody,
    })
    console.log("[Elite Club] Executive notification sent")
  } catch (error) {
    console.error("[Elite Club] Error sending admin notification:", error)
  }
}

/**
 * Premium function to retrieve all applications for admin dashboard
 * Returns formatted data for executive review
 */
function getExecutiveDashboardData() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet()
    const data = sheet.getDataRange().getValues()

    // Format data for executive dashboard
    const formattedData = data.map((row, index) => {
      if (index === 0) return row // Headers

      return {
        applicationId: row[0],
        timestamp: row[1],
        status: row[2],
        fullName: row[3],
        age: row[4],
        email: row[5],
        phone: row[6],
        city: row[7],
        familyBusiness: row[8],
        personalInterests: row[9],
        networkingGoals: row[10],
        referralSource: row[11],
        reviewNotes: row[12],
      }
    })

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        totalApplications: data.length - 1,
        applications: formattedData,
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("[Elite Club] Dashboard data error:", error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}
