import Router from "@plant/router";

const router = new Router();

router.get("/greet/:age", async ({ req, res }) => {
  console.log(req.url.pathname);
  res.body = "Hello, World!";
});

router.get("/500", () => {
  throw new Error("Test error");
});

export default router;
