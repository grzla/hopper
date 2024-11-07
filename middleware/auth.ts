import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function authMiddleware(handler: Function) {
  return async (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      // You can attach the userId to the request if needed
      // (request as any).userId = decoded.userId;
      return handler(request);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid token' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  };
} 