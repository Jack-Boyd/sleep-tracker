import http from "http";
import { createHttpTerminator } from "http-terminator";

import { app } from "./app";

const PORT = process.env.NODE_ENV !== "test" ? process.env.PORT || 5002 : 0;
export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
