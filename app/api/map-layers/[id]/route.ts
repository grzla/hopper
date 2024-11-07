import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@/middleware/auth';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const mapLayerId = params.id;
  const userId = (request as any).userId;

  await dbConnect();

  const mapLayer = await MapLayer.findOne({ _id: mapLayerId, userId });

  if (!mapLayer) {
    return new NextResponse(
      JSON.stringify({ message: 'Map layer not found or unauthorized' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  await mapLayer.remove();

  return new NextResponse(
    JSON.stringify({ message: 'Map layer deleted successfully' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

export const middleware = authMiddleware(DELETE); 