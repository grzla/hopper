import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  await dbConnect();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  // Set the token as a cookie
  const response = new NextResponse(
    JSON.stringify({ message: 'Login successful' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 3600,
    sameSite: 'strict',
    path: '/',
  });

  return response;
} 