import { NextRequest, NextResponse } from 'next/server'
import { sendStatusEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { to, name, status, token, appointmentDate } = await request.json()

    if (!to || !name || !status || !token) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendStatusEmail(to, name, status, token, appointmentDate)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
