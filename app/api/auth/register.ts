import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  await dbConnect();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: 'User already exists' }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return new NextResponse(
    JSON.stringify({ message: 'User registered successfully' }),
    { status: 201, headers: { 'content-type': 'application/json' } }
  );
} 