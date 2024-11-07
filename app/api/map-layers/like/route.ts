import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function POST(request: NextRequest) {
  const { mapLayerId } = await request.json();
  const userId = (request as any).userId;

  await dbConnect();

  const mapLayer = await MapLayer.findById(mapLayerId);

  if (!mapLayer) {
    return new NextResponse(
      JSON.stringify({ message: 'Map layer not found' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  if (!mapLayer.likedBy.includes(userId)) {
    mapLayer.likedBy.push(userId);
    await mapLayer.save();
  }

  return new NextResponse(
    JSON.stringify({ message: 'Liked map layer successfully' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(POST); 