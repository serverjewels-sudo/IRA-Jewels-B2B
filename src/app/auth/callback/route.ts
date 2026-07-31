import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/portal'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
    
    // If there is an error during code exchange, you might want to redirect to an error page
    // For now we will just fall through and let the destination page handle unauthenticated state
    console.error('Auth callback code exchange error:', error)
  }

  // Fallback if no code or exchange fails
  return NextResponse.redirect(new URL('/login', request.url))
}
