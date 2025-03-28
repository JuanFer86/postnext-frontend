import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionDate = searchParams.get("transactionDate");
  const url = `${process.env.API_URL}transactions?transactionDate=${transactionDate}`;
  const response = await fetch(url);
  const data = await response.json();
  return Response.json(data);
}
