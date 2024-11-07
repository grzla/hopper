import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';

export async function GET(request: NextRequest) {
  // Protected route logic
  return new NextResponse(
    JSON.stringify({ message: 'Protected route accessed successfully' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(GET); 