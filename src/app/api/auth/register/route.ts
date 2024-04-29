import User from "@/database/user.model";
import { hash } from "bcrypt";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, username, email, password, bio } = await req.json();

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return NextResponse.json(
        { message: "This user already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ message: result.message }, { status: 400 });
  }
}
