import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, booking } = await req.json()

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(90deg, #1F1B18 0%, #D4AF37 50%, #F5E6CA 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
              <p>Elite Doorstep Barber Services</p>
            </div>
            
            <div class="content">
              <h2>Thank you for your booking!</h2>
              <p>Hi ${booking.customerName},</p>
              <p>We're excited to confirm your booking. Here are your appointment details:</p>
              
              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span>${booking.serviceName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span>${new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span>${booking.bookingTime}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Address:</span>
                  <span>${booking.address}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span>AED ${booking.price}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Booking ID:</span>
                  <span>${booking.id}</span>
                </div>
              </div>
              
              <p><strong>What to prepare:</strong></p>
              <ul>
                <li>A clean, well-lit space with access to a mirror</li>
                <li>A chair at comfortable height</li>
                <li>Access to water and a towel</li>
              </ul>
              
              <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
              
              <center>
                <a href="${Deno.env.get('SITE_URL')}/contact" class="button">Contact Us</a>
              </center>
            </div>
            
            <div class="footer">
              <p>Elite Doorstep Barber Services</p>
              <p>Professional grooming at your doorstep</p>
              <p>
                <a href="${Deno.env.get('SITE_URL')}/privacy">Privacy Policy</a> | 
                <a href="${Deno.env.get('SITE_URL')}/terms">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: 'Elite Barber Services <bookings@elitebarber.com>',
      to: [to],
      subject: `Booking Confirmation - ${booking.serviceName}`,
      html: emailHtml,
    })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
