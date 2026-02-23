import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cartCreate, cartGet, cartLinesAdd, resolveMerchandiseId } from "@/lib/shopify/storefront";

const CART_COOKIE = "emeralds_cart_id";

type PrepareBody = {
  cartId?: string;
  addToken?: string;
  qty?: number;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE)?.value;
    if (!cartId) return NextResponse.json({ cart: null });
    const cart = await cartGet(cartId);
    return NextResponse.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load cart";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PrepareBody;
    const qty = Math.max(1, Math.min(10, Number(body.qty ?? 1)));
    const cookieStore = await cookies();
    const existingCookieCartId = cookieStore.get(CART_COOKIE)?.value;
    const incomingCartId = body.cartId || existingCookieCartId;

    let cart = incomingCartId ? await cartGet(incomingCartId) : null;

    if (!cart) {
      if (body.addToken) {
        const merchandiseId = await resolveMerchandiseId(body.addToken);
        cart = await cartCreate(merchandiseId, qty);
      } else {
        cart = await cartCreate();
      }
    } else if (body.addToken) {
      const merchandiseId = await resolveMerchandiseId(body.addToken);
      cart = await cartLinesAdd(cart.id, merchandiseId, qty);
    }

    const res = NextResponse.json({ cart });
    res.cookies.set(CART_COOKIE, cart.id, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare cart";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
