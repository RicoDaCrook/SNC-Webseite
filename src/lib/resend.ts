import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendStatusEmail(
  to: string,
  name: string,
  status: string,
  token: string,
  appointmentDate?: string
) {
  const statusUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/status/${token}`
  
  let subject = ''
  let htmlContent = ''

  switch (status) {
    case 'termin_vereinbart':
      subject = 'Ihr Termin bei SNC Gutachter'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0e1a1a; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">SNC Gutachter</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.8;">Unabhängiger KFZ-Gutachter</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #0e1a1a; margin-top: 0;">Guten Tag ${name},</h2>
            
            <p style="line-height: 1.6; color: #333;">
              vielen Dank für Ihr Vertrauen. Ihr Termin wurde erfolgreich vereinbart.
            </p>

            ${appointmentDate ? `
              <div style="background: #ffff47; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold; color: #0e1a1a;">📅 Ihr Termin:</p>
                <p style="margin: 10px 0 0 0; font-size: 18px; color: #0e1a1a;">
                  ${new Date(appointmentDate).toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ` : ''}

            <p style="line-height: 1.6; color: #333;">
              Den aktuellen Status Ihres Gutachtens können Sie jederzeit hier abrufen:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${statusUrl}" 
                 style="display: inline-block; background: #ffff47; color: #0e1a1a; 
                        padding: 15px 40px; text-decoration: none; border-radius: 8px; 
                        font-weight: bold; font-size: 16px;">
                Status ansehen
              </a>
            </div>

            <div style="border-top: 2px solid #ddd; margin-top: 30px; padding-top: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Bei Fragen erreichen Sie uns:</strong><br>
                📞 <a href="tel:+4915209423739" style="color: #0e1a1a;">+49 1520 9423739</a><br>
                📧 <a href="mailto:kontakt@snc-svb.de" style="color: #0e1a1a;">kontakt@snc-svb.de</a><br>
                💬 <a href="https://wa.me/4915209423739" style="color: #0e1a1a;">WhatsApp</a>
              </p>
            </div>
          </div>

          <div style="background: #0e1a1a; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0; opacity: 0.7;">
              SNC Gutachter | Rohrackerstraße 5, 73029 Stuttgart<br>
              © 2025 Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      `
      break

    case 'besichtigung_durchgefuehrt':
      subject = 'Besichtigung erfolgreich durchgeführt'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0e1a1a; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">SNC Gutachter</h1>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #0e1a1a; margin-top: 0;">Guten Tag ${name},</h2>
            
            <div style="background: #10B981; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 24px;">✓</p>
              <p style="margin: 10px 0 0 0; font-weight: bold;">Besichtigung erfolgreich durchgeführt</p>
            </div>

            <p style="line-height: 1.6; color: #333;">
              Die Besichtigung Ihres Fahrzeugs wurde erfolgreich durchgeführt. 
              Wir erstellen nun Ihr detailliertes Gutachten.
            </p>

            <p style="line-height: 1.6; color: #333;">
              <strong>Voraussichtliche Fertigstellung:</strong> Innerhalb der nächsten 48 Stunden
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${statusUrl}" 
                 style="display: inline-block; background: #ffff47; color: #0e1a1a; 
                        padding: 15px 40px; text-decoration: none; border-radius: 8px; 
                        font-weight: bold;">
                Status verfolgen
              </a>
            </div>
          </div>

          <div style="background: #0e1a1a; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0; opacity: 0.7;">
              SNC Gutachter | Rohrackerstraße 5, 73029 Stuttgart
            </p>
          </div>
        </div>
      `
      break

    case 'in_bearbeitung':
      subject = 'Ihr Gutachten ist in Bearbeitung'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0e1a1a; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">SNC Gutachter</h1>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #0e1a1a; margin-top: 0;">Guten Tag ${name},</h2>
            
            <div style="background: #3B82F6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 24px;">⏳</p>
              <p style="margin: 10px 0 0 0; font-weight: bold;">Gutachten wird erstellt</p>
            </div>

            <p style="line-height: 1.6; color: #333;">
              Wir arbeiten derzeit an Ihrem detaillierten Gutachten. 
              Alle Schäden werden sorgfältig dokumentiert und bewertet.
            </p>

            <p style="line-height: 1.6; color: #333;">
              Sie werden per E-Mail benachrichtigt, sobald Ihr Gutachten fertiggestellt ist.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${statusUrl}" 
                 style="display: inline-block; background: #ffff47; color: #0e1a1a; 
                        padding: 15px 40px; text-decoration: none; border-radius: 8px; 
                        font-weight: bold;">
                Status ansehen
              </a>
            </div>
          </div>

          <div style="background: #0e1a1a; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0; opacity: 0.7;">
              SNC Gutachter | Rohrackerstraße 5, 73029 Stuttgart
            </p>
          </div>
        </div>
      `
      break

    case 'fertiggestellt':
      subject = '🎉 Ihr Gutachten ist fertig!'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ffff47 0%, #ffd700 100%); padding: 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; color: #0e1a1a;">🎉</h1>
            <h1 style="margin: 10px 0 0 0; color: #0e1a1a;">Ihr Gutachten ist fertig!</h1>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #0e1a1a; margin-top: 0;">Guten Tag ${name},</h2>
            
            <p style="line-height: 1.6; color: #333; font-size: 16px;">
              Ihr detailliertes Gutachten ist nun fertiggestellt und steht zum Download bereit!
            </p>

            <div style="background: white; border: 3px solid #10B981; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <p style="margin: 0 0 20px 0; color: #10B981; font-weight: bold; font-size: 18px;">
                ✓ Gutachten vollständig
              </p>
              <a href="${statusUrl}" 
                 style="display: inline-block; background: #ffff47; color: #0e1a1a; 
                        padding: 18px 50px; text-decoration: none; border-radius: 8px; 
                        font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                Jetzt herunterladen
              </a>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffff47; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Wichtig:</strong> Bewahren Sie dieses Gutachten sicher auf. 
                Sie benötigen es für die Abwicklung mit Ihrer Versicherung.
              </p>
            </div>

            <p style="line-height: 1.6; color: #333;">
              Bei Fragen zum Gutachten oder zur weiteren Vorgehensweise stehen wir Ihnen gerne zur Verfügung.
            </p>

            <div style="border-top: 2px solid #ddd; margin-top: 30px; padding-top: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Kontakt:</strong><br>
                📞 <a href="tel:+4915209423739" style="color: #0e1a1a;">+49 1520 9423739</a><br>
                📧 <a href="mailto:kontakt@snc-svb.de" style="color: #0e1a1a;">kontakt@snc-svb.de</a><br>
                💬 <a href="https://wa.me/4915209423739" style="color: #0e1a1a;">WhatsApp</a>
              </p>
            </div>
          </div>

          <div style="background: #0e1a1a; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0; opacity: 0.7;">
              SNC Gutachter | Rohrackerstraße 5, 73029 Stuttgart<br>
              Vielen Dank für Ihr Vertrauen!
            </p>
          </div>
        </div>
      `
      break

    default:
      return
  }

  try {
    await resend.emails.send({
      from: 'SNC Gutachter <kontakt@snc-svb.de>',
      to,
      subject,
      html: htmlContent,
    })
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
