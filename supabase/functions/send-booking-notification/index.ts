import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingData {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  notes?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!telegramBotToken || !telegramChatId) {
      return new Response(
        JSON.stringify({ 
          error: "Telegram credentials not configured",
          message: "Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your environment variables"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const bookingData: BookingData = await req.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("bookings")
      .insert({
        from_location: bookingData.from,
        to_location: bookingData.to,
        date: bookingData.date,
        time: bookingData.time,
        passengers: bookingData.passengers,
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        customer_whatsapp: bookingData.whatsapp || null,
        notes: bookingData.notes || null,
        status: 'pending',
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    const message = `
🚤 <b>New Speedboat Booking Request</b>

📍 <b>Route:</b>
From: ${bookingData.from}
To: ${bookingData.to}

📅 <b>Date & Time:</b>
Date: ${bookingData.date}
Time: ${bookingData.time}

👥 <b>Passengers:</b> ${bookingData.passengers}

👤 <b>Customer Details:</b>
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
WhatsApp: ${bookingData.whatsapp || 'Not provided'}

📝 <b>Notes:</b>
${bookingData.notes || 'No additional notes'}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Telegram API error:", errorData);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send notification",
          details: errorData
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking notification sent successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
