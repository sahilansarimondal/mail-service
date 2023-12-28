import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, newPassword } = reqBody;
    console.log(reqBody);

    // hash the password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // find user first

    console.log("hi before user");

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );

    console.log(user);

    return NextResponse.json({
      message: "Password changed",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
