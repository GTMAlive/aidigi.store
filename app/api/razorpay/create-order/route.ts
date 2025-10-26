import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { promptId, amount, buyerEmail, buyerName } = await request.json();

    // Verify the prompt exists and get actual price
    // @ts-ignore
    const db = process.env.DB || globalThis.DB;
    
    let promptPrice = amount;
    let promptExists = true;
    
    if (db) {
      const prompt = await db.prepare(
        'SELECT id, price, status FROM prompts WHERE id = ? AND status = "live"'
      ).bind(promptId).first();
      
      if (!prompt) {
        return NextResponse.json(
          { success: false, error: "Prompt not found or not available" },
          { status: 404 }
        );
      }
      
      promptPrice = prompt.price;
    }

    const Razorpay = require("razorpay");
    
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        promptId,
        buyerEmail,
        buyerName,
      },
    };

    const order = await razorpay.orders.create(options);

    // Create purchase record in database
    if (db) {
      const purchaseId = crypto.randomUUID();
      const platformFeePercent = 15; // 15% platform fee
      const platformFee = (promptPrice * platformFeePercent) / 100;
      const creatorAmount = promptPrice - platformFee;
      
      await db.prepare(`
        INSERT INTO purchases (
          id, prompt_id, buyer_email, buyer_name, amount,
          platform_fee, creator_amount, razorpay_order_id,
          status, download_count, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?)
      `)
      .bind(
        purchaseId,
        promptId,
        buyerEmail,
        buyerName,
        promptPrice,
        platformFee,
        creatorAmount,
        order.id,
        Date.now(),
        Date.now()
      )
      .run();
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
