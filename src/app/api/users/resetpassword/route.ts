import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    user.isVerified = true;
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpiry = null;

    return NextResponse.json({
      message: "User verification successful",
      success: true,
      userId: user._id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
