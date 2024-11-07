import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = (request as any).userId;

  await dbConnect();

  const userMapLayers = await MapLayer.find({ userId });

  return new NextResponse(
    JSON.stringify(userMapLayers),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(GET); 