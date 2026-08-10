import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/portal'

  if (code) {
    // Redirect to the new client-side confirmation page instead of exchanging here
    // This prevents email security scanners from consuming the single-use code
    return NextResponse.redirect(new URL(`/auth/confirm?code=${code}&next=${next}`, request.url))
  }

  // Fallback if no code
  return NextResponse.redirect(new URL('/login', request.url))
}
