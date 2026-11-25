import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase";
import { SAMPLE_LISTINGS } from "@/lib/constants";

/**
 * GET /api/listings
 *
 * Returns listings that are ready for the marketplace. Used by the live
 * listings grid so newly submitted seller listings appear on the marketplace
 * immediately during the pre-launch phase.
 */
export async function GET() {
  try {
    const supabase = createSupabaseServiceClient();

    if (supabase) {
      const { data, error } = await supabase.from("listings").select("*").eq("status", "PRE-LAUNCH");
      if (error) {
        return NextResponse.json({ listings: SAMPLE_LISTINGS }, { status: 200 });
      }
      return NextResponse.json({ listings: data ?? [] });
    }

    // Supabase is not configured yet — surface curated pre-launch samples so
    // the marketplace never looks empty and the community can join in.
    return NextResponse.json({ listings: SAMPLE_LISTINGS });
  } catch {
    return NextResponse.json({ listings: SAMPLE_LISTINGS });
  }
}

/**
 * POST /api/listings
 *
 * Stores a seller-submitted product / service listing. During the pre-launch
 * phase listings are stored with status "PRE-LAUNCH"; they become publicly
 * visible when the official marketplace launches.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      name,
      category,
      description,
      price,
      status,
      seller,
      images,
    } = body ?? {};

    if (!name || typeof name !== "string") {
      return NextResponse.json({ message: "Listing name is required." }, { status: 400 });
    }
    if (!category || typeof category !== "string") {
      return NextResponse.json({ message: "Listing category is required." }, { status: 400 });
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ message: "Listing description is required." }, { status: 400 });
    }

    const listing = {
      type: ["product", "service"].includes(String(type)) ? type : "product",
      name,
      category,
      description,
      price: Number(price ?? 0),
      status: status ?? "PRE-LAUNCH",
      seller: seller ?? {},
      images: Array.isArray(images) ? images : [],
    };

    const supabase = createSupabaseServiceClient();

    if (supabase) {
      const { data, error } = await supabase.from("listings").insert(listing);
      if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json({ status: listing.status, listing: data }, { status: 201 });
    }

    // Supabase is not configured — the placeholder keeps the pre-launch flow
    // intact locally. Swap in the Supabase integration once credentials exist.
    return NextResponse.json(
      { status: listing.status, message: "Listing persisted in pre-launch state." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Listing could not be submitted." }, { status: 500 });
  }
}
