import { NextRequest, NextResponse } from 'next/server';
import MapLayer from '@/models/MapLayer';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  await dbConnect();

  const mapLayers = await MapLayer.find().populate('userId', 'email');

  return new NextResponse(
    JSON.stringify(mapLayers),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
} 