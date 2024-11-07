import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';
import User from '@/models/User';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function POST(request: NextRequest) {
  const { mapLayerId } = await request.json();
  const userId = (request as any).userId;

  await dbConnect();

  const user = await User.findById(userId);
  const mapLayer = await MapLayer.findById(mapLayerId);

  if (!user || !mapLayer) {
    return new NextResponse(
      JSON.stringify({ message: 'User or map layer not found' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  if (!user.subscribedMapLayers.includes(mapLayerId)) {
    user.subscribedMapLayers.push(mapLayerId);
    await user.save();
  }

  return new NextResponse(
    JSON.stringify({ message: 'Subscribed to map layer successfully' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(POST); 