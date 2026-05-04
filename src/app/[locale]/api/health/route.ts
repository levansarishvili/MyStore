export async function GET() {
  console.log("Request made ❤️");
  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
}
