import server from "./server";

process.loadEnvFile();

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
