export const POST = async (request: Request) => {
  const coupon = await request.json();
  const url = `${process.env.NEXT_PUBLIC_API_URL}coupons/apply-coupon`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coupon),
  });

  const data = await response.json();

  return Response.json({ ...data, status: response.status });
};
