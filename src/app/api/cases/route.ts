import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ cases: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique token
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15)

    const { data, error } = await supabase
      .from('cases')
      .insert([{
        ...body,
        status: 'termin_vereinbart',
        status_token: token,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ case: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 })
  }
}
