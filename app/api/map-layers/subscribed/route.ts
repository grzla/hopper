import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';
import User from '@/models/User';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = (request as any).userId;

  await dbConnect();

  const user = await User.findById(userId).populate('subscribedMapLayers');

  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: 'User not found' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  const subscribedMapLayers = user.subscribedMapLayers;

  return new NextResponse(
    JSON.stringify(subscribedMapLayers),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(GET); 