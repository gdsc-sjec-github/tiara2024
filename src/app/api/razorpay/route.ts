import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized", isOk: false },
      { status: 401 }
    );
  }
  const body = await req.json();
  console.log(body);
  const payment_capture = 1;
  const amount = body.amount * 100; // amount in paisa. In our case it's INR 1
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      contactPerson: body.prefillData.name,
      contactEmail: body.prefillData.email,
      contactNumber: body.prefillData.contact,
      collegeName: body.prefillData.college,
      events: JSON.stringify(body.prefillData.events),
      teamList: JSON.stringify(body.prefillData.teamList)
    },
  };
  const order = await razorpay.orders.create(options);
  console.log(order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
