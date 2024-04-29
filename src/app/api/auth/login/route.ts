import User from "@/database/user.model";
import { compare } from "bcrypt";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    const isExistUser = await User.findOne({ email });

    if (!isExistUser) {
      return NextResponse.json(
        { message: "This user doesn't exists" },
        { status: 400 }
      );
    }

    const isCorrectPassword = await compare(password, isExistUser.password);

    if (!isCorrectPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, user:isExistUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ message: result.message }, { status: 400 });
  }
}
